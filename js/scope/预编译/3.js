function foo(a, b) {
  console.log(b);
  c = 0
  var c
  a = 3
  b = 2
  console.log(b);
  function b() {}
  console.log(b);
}
foo(1)
//AO：{a: undefined, 1
//  b: undefined,    function b()，2，2
//  c: undefined
// function b()
//}