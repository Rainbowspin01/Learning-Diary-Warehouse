// let obj = new Object()  let obj = {}
// console.log(obj)
//let arr = new Array()  let arr = []
//console.log(arr)


function Car(color){
    this.name = '奔驰'
    this.price = 1000000
    this.color = '红色'
    this.engine = 'V82.0'
}
Car.prototype.push = function(){
    console.log('push')
}

let car1 = new Car()  
console.log(car1)
let car2 = new Car('蓝色')
console.log(car2)
let car3 = new Car('黄色')
console.log(car3)



