function Log(_: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log(`descriptor.value = ${descriptor.value}`);

  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);

      const result = descriptor.value.apply(this, args);
      console.log(`Result:`);
      console.dir(result);
      return result;
    },
  };

  return newDescriptor;
}

class Calculator {
  @Log
  adddddd(x: number, y: number): number {
    return x + y;
  }
}

const calculator = new Calculator();
calculator.adddddd(1, 2);
