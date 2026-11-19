let obj = {//创建对象字面量
    name:'张三',
    age:18,
} 
obj.girlfriend = '李四'
obj.age = 20
delete obj.girlfriend

let a = 'hello'
obj[a] = 'world' //动态添加属性


console.log(obj)