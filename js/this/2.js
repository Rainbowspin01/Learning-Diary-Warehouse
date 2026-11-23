// let obj = {
//     a: 1,
//     b: 2,
//     fn() {
//         console.log(this.a);
//     }
// }


// obj.fn()
// function bar() {
//     console.log(this.a);
// }
// let obj ={
//     a: 1
// }
// obj.foo()=bar
// obj.foo()


function foo() {
    console.log(this.a);
}
let m ={
    a: 1,
    foo: foo
}
let n ={
    a: 2,
    foo: m
}
n.foo.foo()

