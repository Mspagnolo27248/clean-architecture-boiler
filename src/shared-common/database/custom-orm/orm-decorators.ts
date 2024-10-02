
    
  // Define decorator to attach metadata for class name or table name
  export function ARGModel(tableName?: string): ClassDecorator {
    return function(target: any) {
      const name = tableName || target.name;
      Reflect.defineProperty(target,'tableName', {value:name,enumerable:false,writable:false} );
    };
  }

  
  // Define decorator to attach metadata for key fields
  export function KeyField(target: any, propertyKey: string) {
    const keyFields = Reflect.get( target,'keyFields') || [];
    keyFields.push(propertyKey);
    Reflect.defineProperty( target , 'keyFields',{value:keyFields,writable:false});
  }

  // Define decorator to attach metadata for validators
export function Required(target: any, propertyKey: string) {
    const validators = Reflect.get( target,'validators') || {};
    validators[propertyKey] = 'required';
    Reflect.set(target,'validators', validators);
  }
  
  export function MaxLength(max: number) {
    return function(target: any, propertyKey: string) {
      const validators = Reflect.get(target,'validators' ) || {};
      validators[propertyKey] = `max_length:${max}`;
      Reflect.set(target,'validators', validators);
    };
  }