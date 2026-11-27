let a = '123';
console.log(Number(a));  //将字符串转换为数字
console.log(Number("a"));

console.log(Boolean(a));  //将字符串转换为布尔值
console.log(Boolean(''));
console.log(Boolean('010'));
console.log(Boolean(NaN));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(true));
console.log(Boolean(false));

console.log(String(123));  //将数字转换为字符串
console.log(String(true));
console.log(String(false));
console.log(String(null));
console.log(String(undefined),undefined);
console.log(String(NaN),NaN);
console.log(String(''),'');
console.log(String(Infinity),Infinity); 

console.log(new Number('123'));
