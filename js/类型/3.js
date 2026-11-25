var person ={
    name: 'Tom',
    age: 18,
    like:{
        sport:'篮球',
        music:'摇滚'
    }
}

var person2 ={
    name:'Jerry',
    age:person.age,
    like:person.like
}
person2.like.sport = '足球'
console.log(person2)


// var person2 = person
// person.like={
//     sport:'足球',
//     music:'电子'
// }
// person.age = 30
// console.log(person2)
