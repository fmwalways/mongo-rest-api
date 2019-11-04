/**
 * @author fomav
 * @time  2019-11-01
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const connection = require('../mongo/connection');
const flowError = require('../helper/flow-error');


function getQuery(req, res, config) {
    let db = req.params.db;
    let collection = req.params.collection;
    let where = buildQuery(req);
    let options = buildOptions(req);
    connection.connectPromise(config.mongo.baseURI)
        .then(client => client.db(db), error => flowError(`Db open ${db} error`, error))
        .then(db => db && db.collection(collection), error => flowError(`Error get ${db} collection ${collection}`, error))
        .then(collection => collection.find(where), error => flowError(`Error find ${db} collection ${collection}`, error))
        .then(cursor => applyOptions(cursor, options), error => flowError(`Error find ${db} collection ${collection} document`, error))
        .then(docs => parseDocs(docs))
        .then(data => res.json(data))
        .catch(error => res.error(error));
}


function parseDocs(docs) {
    if (Number.isInteger(docs)) {
        return {count: docs};
    }
    return docs;
}


function applyOptions(cursor, options) {
    if (options.sort) cursor.sort(options.sort);
    if (options.limit) cursor.limit(parseInt(options.limit));
    if (options.skip) cursor.skip(parseInt(options.skip));
    if (options.only_count) return cursor.count(true);
    return cursor.toArray();
}


function buildQuery(req) {
    return req.query.where && JSON.parse(req.query.where) || {};
}


function buildOptions(req) {
    let order = req.query.order;
    let skip = req.query.skip;
    let limit = req.query.limit || 20;
    let only_count = req.query.only_count === 'true';
    return {order, skip, limit, only_count}
}


module.exports = getQuery;
