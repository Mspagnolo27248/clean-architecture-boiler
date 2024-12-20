import { swapKeysAndValues } from "../../services/helper-functions/object-mainpulation";

//TODO - a table column should use the class name unless specifically has @TableColumn decorator or @Exclude
//TODO -how to handle identity columns and composite keys.

export class ORM {
  static findMany(this: typeof ORM): string {
    const tableName = Reflect.get(this, 'tableName');
    return `SELECT * FROM ${tableName}`;
  }

  static insert<T extends Record<string, any>>(this: typeof ORM, instance: T): string {
    const tableName = Reflect.get(this, 'tableName');
    const defaultModel = new this();
    const target = updateTargetValuesFromSource(defaultModel, instance);
    const record = this.mapModelToRecord(target);
    const propertyMap = this.getModelProperties();
    const identityFields = Reflect.get(this.prototype, 'identityFields') || [];
    const identityTableFields = identityFields.map((field: string | number)=>propertyMap[field])
    
    
    const tableFields = Object.keys(record)
        .filter(field => !identityTableFields.includes(field))  // Exclude identity fields
        .join(', ');
    const fieldValues = Object.keys(record)
        .filter(field => !identityTableFields.includes(field))  // Exclude identity fields
        .map(key => {
            const value = record[key];
            return typeof value === 'string' ? `'${value}'` : value;
        });
    
    const valuesString = fieldValues.join(', ');
    return `INSERT INTO ${tableName} (${tableFields}) VALUES (${valuesString})`;
}



  static delete<T extends Record<string, any>>(this: typeof ORM, instance: T): string {
    const keyValues: string[] = [];
    const defaultObject = new this();
    const tableName = Reflect.get(this, 'tableName');
    const keyFields = Reflect.get(this.prototype, 'keyFields') as [];
    const mappedObject = Object.assign(defaultObject, instance);
    keyFields.forEach(key => keyValues.push(`${key}=${mappedObject[key]}`));
    const params = keyValues.join(', ')
    const sql = `DELETE FROM ${tableName} WHERE ${params}`
    return sql;
  }



  static update<T extends Record<string, any>>(this: typeof ORM, instance: T): string {
    const defaultObject = new this();
    const tableName = Reflect.get(this, 'tableName');
    const keyFields = Reflect.get(this.prototype, 'keyFields') as [];
    const keyValues: string[] = [];

    const mappedObject = Object.assign(defaultObject, instance);
    keyFields.forEach(key => keyValues.push(`${key}=${mappedObject[key] === '' ? "''" : mappedObject[key]}`));
    const setValues: string[] = Object.keys(defaultObject).map(key => (`${key}=${mappedObject[key] === '' ? "''" : mappedObject[key]}`));
    const whereParams = keyValues.join(', ');
    const setParams = setValues.join(', ');
    const sql = `UPDATE ${tableName} SET ${setParams} WHERE ${whereParams}`
    return sql;
  }

  
  public static getModelProperties(this: typeof ORM) {
    const columns = Reflect.get(this.prototype, 'columns') || {};
    return columns
  }

  public static getTableColumns() {
    const columns = this.getModelProperties();
    return swapKeysAndValues(columns)
  }


  public static mapRecordToModel<T extends Record<string, any>>(this: typeof ORM, record: any, model: Constructor<T>): T {
    const modelToColumnMapping = this.getModelProperties();
    const instance = new model();
    const keys = Object.keys(instance);

    keys.forEach(key => {
      if (record.hasOwnProperty(modelToColumnMapping[key])) {
        (instance as any)[key] = record[modelToColumnMapping[key]]; // Map record properties to instance
      }
    });
    return instance;
  }


  public static mapModelToRecord<T extends Record<string, any>>(
    this: typeof ORM,
    modelInstance: T
  ): Record<string, any> {
    const modelToColumnMapping = this.getModelProperties();
    const record: Record<string, any> = {};

    Object.keys(modelInstance).forEach((key) => {
      const columnName = modelToColumnMapping[key];
      if (columnName) {
        record[columnName] = (modelInstance as any)[key];
      }
    });

    return record;
  }


}

type Constructor<T> = new (...args: any[]) => T;


function updateTargetValuesFromSource(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  Object.keys(target).forEach((key) => {
    if (key in source) {
      target[key] = source[key];
    }
  });
  return target;
}








