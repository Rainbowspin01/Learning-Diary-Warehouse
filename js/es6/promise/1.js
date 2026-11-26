// let a = 10
// console.log(a);//不耗时 同步代码
// for(let i = 0;i<10;i++){
//     console.log(i);
// }//不耗时 同步代码

setTimeout(()=>{ //回调函数
    console.log('hello world');
},3000)//耗时 异步代码

// setInterval(()=>{//定时器
//     console.log('hello world');

// },3000)//耗时 异步代码
// setTimeout(()=>{
//     clearInterval(timer)
// },10000)

// fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer')
// .then(res=>{
//     return res.json()
// })
// .then(data=>{
//     console.log(data);
// })

let a = 10
console.log(a);