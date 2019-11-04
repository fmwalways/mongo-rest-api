/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const connection = require('../mongo/connection');
const flowError = require('../helper/flow-error');


function getDataBases(req, res, config) {

    connection.connectPromise(config.mongo.baseURI)
        .then(client => client.db().admin().listDatabases(), error => flowError('Db open error', error))
        .then(dbs => dbs && dbs.databases, error => flowError('Error get databases', error))
        .then(data => res.json(data))
        .catch(error => res.error(error));

}

module.exports = getDataBases;





