// Abstract base class for tasks
export abstract class UseCase<T> {
    protected data?: T;
  
    constructor(data?: T) {
      this.data = data;
    }
  
    abstract execute(): void;
  }