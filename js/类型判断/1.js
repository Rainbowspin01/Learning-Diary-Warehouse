function add(a, b) {
    // if (typeof a !== 'number' || typeof b !== 'number') {
    //     return '参数必须是数字';
    // } else {
    //     return a + b;
    // }
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else {
        return '参数必须是数字';
    }

}
console.log(add(1, 2));
console.log(add('1', 2));
console.log(add(1, '2'));
console.log(add('1', '2'));
