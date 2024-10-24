import { swapKeysAndValues } from "../../services/helper-functions/object-mainpulation";




export class ORM {
  static findMany(this: typeof ORM): string {
    const tableName = Reflect.get(this, 'tableName');
    return `SELECT * FROM ${tableName}`;
  }

  static insert<T extends Record<string, any>>(this: typeof ORM, instance: T): string {
    const tableName = Reflect.get(this, 'tableName');
    //Map Passed Values to instance of Class
    const defaultObject = new this();
    const mappedObject = Object.assign(defaultObject, instance);
    const fields = Object.keys(defaultObject).join(', ');
    const values = Object.keys(defaultObject).map(key => {
      const value = mappedObject[key];
      return typeof value === 'string' ? `'${value}'` : value;
    });
    const valuesString = values.join(', ')
    return `INSERT INTO ${tableName} (${fields}) VALUES (${valuesString})`;
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

  // private static getColumnToPropertyMap(this: typeof ORM): { [columnName: string]: string } {
  public static getModelProperties(this: typeof ORM) {
    const columns = Reflect.get(this.prototype, 'columns') || {};
    return columns    
  }

  public static getTableColumns(){
    const columns = this.getModelProperties();
    return swapKeysAndValues(columns)
  }


}





