let str = 'hello';
let num = 10;
let bool = true;
let nullval = null;
let undefinedval = undefined;
let bigintval = 100n;
let symbolval = Symbol('symbol');

let objectval = {};
let arrayval = [];
let functionval = function () {};
let dateval = new Date();

console.log(objectval instanceof Object);//true
console.log(arrayval instanceof Array);//true
console.log(functionval instanceof Function);//true
console.log(dateval instanceof Date);//true
console.log(str instanceof String);//false
console.log(num instanceof Number);//false
console.log(bool instanceof Boolean);//false
console.log(nullval instanceof Object);//false
console.log(undefinedval instanceof Object);//false
console.log(bigintval instanceof BigInt);//false
console.log(symbolval instanceof Symbol);//false
console.log(objectval instanceof Array);//false
console.log(arrayval instanceof Object);//true//arrayval.__proto__ === Array.prototype 
// 且 Array.prototype.__proto__ === Object.prototype
console.log(functionval instanceof Object);//true
console.log(dateval instanceof Object);//true



