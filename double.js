
console.log(process.argv);
const dbl =(num) => num * 2;
const[, , n]=process.argv;

console.log(dbl(process.argv[2]));
// console.log(global);