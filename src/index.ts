import {Utils} from "./util";
import {start} from "./start";

import cluster from 'cluster';

const numCPUs = require('os').cpus().length;

const {url, token, clusterMode} = Utils.getProgramArguments()

if (clusterMode && cluster.isMaster) {
    console.info(`Start in cluster mode, spawning ${numCPUs} processes.`)
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    start(url, token)
}
