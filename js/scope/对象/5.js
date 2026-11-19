var str = 'hello'
// var obj = {}

// obj.a = 1
str.a = 2  //正在往字符串对象上添加一个属性a
console.log(str.a) //不报错 读取的是primitivevalue
//str是原始类型，不能添加属性 delete str.a
//obj是引用类型，可以添加属性
console.log(str) //hello
