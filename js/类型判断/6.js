Function.prototype.mycall = function(context){
    //谁调用我就把谁里面的this掰弯到 context
    //谁调用我就把谁添加到 context 对象里面，再让context调用它
    context.fn = this;
    context.fn();
    delete context.fn;
}

let obj = {
    a:1,
};
function add(){
    console.log(this.a);
}
// add.call(obj);
add.mycall(obj);
