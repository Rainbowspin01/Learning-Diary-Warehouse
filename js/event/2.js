console.log(1); // 1
new Promise((resolve, reject) => {
  console.log(2); // 2
  resolve()
}).then(() => {
  console.log(3);//4
  setTimeout(() => {
    console.log(4);//6
  }, 0)
})
setTimeout(() => {
  console.log(5);//5
}, 0)
console.log(6);    //3
//1 2 6 3 5 4