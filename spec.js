
console.log(process.argv);
const os=require('os');
console.log('Free memory in GB',os.freemem()/1024/1024/1024);
console.log('Free memory in GB',os.version());
console.log('Free memory in GB',os.cpus());