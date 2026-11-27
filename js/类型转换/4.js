console.log(Number([1, 2, 3]));

if([]){
    console.log('数组');
}
[]=={}//把两边转换为数字后比较
//Number([])==Number({})
//Number('')==>0    Number([object,Object])==>NaN
//Number([])==Number({})==>false

console.log([]=={});
console.log(Number(''));

let str = '123';
console.log(+str);
