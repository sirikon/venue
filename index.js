const cluster = require('cluster');
const debug = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT || 8000;

function getNumWorkers() {
    return require('os').cpus().length;
}

if (cluster.isMaster && !debug) {
    const numWorkers = getNumWorkers();
    console.log(`Initializing with ${numWorkers} workers.\nWill listen on port ${PORT}.`);

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        if (!debug) {
            cluster.fork();
        }
    });
} else {
    const talks = require('./src/data/talks');
    const app = require('./src/app')(talks);
    app.listen(PORT, '0.0.0.0');
}
