// function A() {
//     return new Promise((resolve, reject) => {
//         let num = 100
//         setTimeout(() => {
//             console.log('A');
//             console.log(num);
//             resolve()
//         }, 1000)
//     })
// }
// function B() {
//     console.log('B');
// }
// A().then(B)

function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = 100
            console.log('A');
            console.log(num);
            resolve()
        }, 1000)
    })
}

function B() {
    console.log('B');
}
// await A()
// B()
async function foo() {
    await A() //await 只能约束promise对象
    B()
}
//await 让右侧代码变成了同步任务，await就将后续的代码挤到微任务队列中
foo()
