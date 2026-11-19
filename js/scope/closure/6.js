function add(i=0){
    i++
    console.log(i);
    return function(){
        i++
        console.log(i);
    }
}
bar = add()
bar()
bar()
bar()
