// Demo of TypeScript
let data: number | string ;

data = "42";

export interface ICar  {
    color : string;
    model: string;
    topSpeed?: Number;
}


const car1 : ICar = { 
    color: 'blue',
    model: 'BMW'
}

const car2 : ICar = { 
    color: 'red',
    model: 'mercedes',
    topSpeed: 100
}


const multiply = (x: any, y: any) =>  {
    return x*y;
}

const add = (x: number, y: number): string =>  {
    return (x+y).toString();
}

// Returning void is optional when we don;t have any return value. 

export const cars = [car1, car2];