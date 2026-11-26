function xq() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('相亲结束');
            resolve()
        }, 3000)
    })
}
function marry(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('结婚');
            resolve()
        },2000)
    })
}
function baby(){
    setTimeout(()=>{
        console.log('生孩子');
    },1000)
}


// xq(marry)
xq().then(()=>{
    return marry()//.then(()=>{
    //     baby()
    // })
})
.then(()=>{ //then的源码中返回一个Promise对象，他的状态继承于上一个Promise对象
    baby()  //如果人为返回一个Promise对象，then就不会启用自己的Promise对象，而是采用人为返回的Promise对象
})

