require('../shared').server();

process.on('uncaughtException', (err, origin)=> {
    console.error(err,origin);
})