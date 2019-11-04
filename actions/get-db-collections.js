/**
 * @author fomav
 * @time  2019-11-04
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */


const connection = require('../mongo/connection');
const flowError = require('../helper/flow-error');


function getDbCollections(req, res, config) {
    let db = req.params.db;
    let collection = req.params.collection;
    connection.connectPromise(config.mongo.baseURI)
        .then(client => client.db(db), error => flowError('Db open error', error))
        .then(dbs => dbs && dbs.collections(), error => flowError(`Error get ${db} collection`, error))
        .then(data => data.map(item => item.collectionName), error => flowError(`Error get ${db} collection name`, error))
        .then(data => res.json(data))
        .catch(error => res.error(error));


}

module.exports = getDbCollections;
