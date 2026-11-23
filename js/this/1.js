var a = 1
function fn() {
    var a = 2
    console.log(this.a);
}
fn()
