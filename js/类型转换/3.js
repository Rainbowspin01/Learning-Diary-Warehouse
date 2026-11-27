// //对象转换为字符串
// let a = {name:'张三',age:18};
// let b = 1;
// console.log(a.toString());
// console.log(b.toString());  
// console.log(a.valueOf());
// console.log(String(a));  

//toString() 方法内部原理：

let a = {}
console.log(Number(a));//内部原理：
//ToNumber(a)==>let primitive = ToPrimitive(a,Number);
//ToPrimitive(a,Number)==>a.valueOf();
//a.toString() 返回对象的字符串  //"[object Object]"
//ToNumber(primitive)==>Number(primitive);
//Number(primitive)==>NaN;
