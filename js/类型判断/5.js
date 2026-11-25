let object ={}
let arr =[]
let fn = function(){}
let num = 100
let str = 'hello'
let bool = true
let nu = null
let un = undefined


console.log(Object.prototype.toString.call(fn).slice(8,-1));
//Object.prototype.toString会读取对象值的内部属性的toString方法
