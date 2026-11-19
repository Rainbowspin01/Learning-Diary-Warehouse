function foo (){
    var age = 18
    let height = 1.8

    function bar(){
        console.log(age,height)
    }
    return bar

}
var baz = foo()
baz() 