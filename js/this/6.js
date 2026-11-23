// Child.prototype__proto__ = Object.prototype   //new Object()得到的
// Object.prototype__proto__ = null
function Child() {
    this.lastName = '张'
}
let c = new Child()
//c.__proto__ = Child.prototype
//Child.prototype.__proto__ = Object.prototype
//Object.prototype.__proto__ = null