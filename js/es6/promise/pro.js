Promise.prototype.then = function(thenCB){
    this.arr.push(thenCB)
    return this
}
Promise.prototype.catch = function(catchCB){
    this.catchArr.push(catchCB)
    return this
}
function Promise(fn){
    this.status = 'pending'//状态
    this.arr = []//成功回调函数数组
    this.catchArr = []//失败回调函数数组


    const resolve = () => {
        this.status = 'fulfilled'
        console.log('resolve');
        for(let i = 0;i<this.arr.length;i++){
            this.arr[i]()
        }
    }
    const reject = () => {
        this.status = 'rejected'
        console.log('reject');
        for(let i = 0;i<this.catchArr.length;i++){
            this.catchArr[i]()
        }
    }
    fn(resolve, reject)
}
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve()
    },3000)
})

p.then(()=>{
    console.log('then');
})
.catch(()=>{
    console.log('catch');
})
