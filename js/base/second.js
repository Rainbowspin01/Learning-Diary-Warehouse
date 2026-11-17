let obj = {
    name: '张三',
    age: 18,
    sex: '男',
    like:{
        music:'摇滚',
        sport:'篮球'
    }
}
console.log(obj);
console.log(obj.name);
console.log(obj.age);
console.log(obj.sex);
console.log(obj.like.music);
console.log(obj.like.sport);
let arr = ["张三",18,男,{a:1}];
console.log(arr);
arr.push("篮球");
arr.unshift("足球");
arr.pop();
arr.shift();
console.log(arr);