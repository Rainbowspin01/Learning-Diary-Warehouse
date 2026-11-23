// let fu = {
//     a: 1
// }

// function yang(x,y) {      //new Function()
//     console.log(this.a,x+y);
// }

// yang.call(fu,1,2)  //把函数中的this强行掰弯到对象中

// let obj = {
//     a: 2
// }
// function yang(x,y) {
//     console.log(this.a,x+y);    
// }
// yang.apply(obj,[1,2])


let obj2 = {
    a: 3
}
function yang(x,y) {
    console.log(this.a,x+y);    
}
// let fn = yang.bind(obj2,1,2)
// fn()
// let fn = yang.bind(obj2)
// fn(1,2)
// yang.bind(obj2,1,2)()
yang.bind(obj2)(1,2)
