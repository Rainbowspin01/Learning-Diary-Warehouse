// 实现instanceof
function myinstanceof(a, b) {
    if(typeof a!=='object'||a===null||typeof b!=='function'){
        return false;
    }
    while(a.__proto__!==null){
        if(a.__proto__===b.prototype){
            return true;
        }
        a = a.__proto__;
    }
    return false;
}
console.log(myinstanceof([], Array));//true
console.log(myinstanceof({}, Object));//true
console.log(myinstanceof({}, Function));//false
console.log(myinstanceof([], Object));//true



