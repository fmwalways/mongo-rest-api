/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */


const MongoClient = require('mongodb').MongoClient;
const clients = {};
const options = {useUnifiedTopology: true, useNewUrlParser: true};


//connect mongodb with callback
function connect(url, callback) {
    let client = clients[url];
    if (client) {
        callback(null, clients[url]);
        return;
    }
    MongoClient.connect(url, options, function (error, client) {
        if (error) {
            return callback(error);
        }
        clients[url] = client;
        callback(null, client);
    });
}


//connect mongodb with promise
function connectPromise(url) {
    let client = clients[url];
    if (client) {
        return Promise.resolve(client);
    }
    return MongoClient.connect(url, options).then(client => clients[url] = client);
}


//close opened connections
function closeAll() {
    for (let key in clients) {
        if (clients.hasOwnProperty(key) && clients[key]) {
            clients[key].close();
        }
    }
}

module.exports = {
    connect,
    connectPromise,
    closeAll
};
