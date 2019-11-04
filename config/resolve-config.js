/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const utilities = require('../helper/utilities');
const validation = require('../helper/validation');
const defaultLogger = require('../helper/logger');
const dispose_config = require('./dispose-config');

const defaultConfig = utilities.loadYaml(__dirname, 'config.default.yaml');


function resolve() {
    let custom = dispose_config.get();
    let logger = custom && custom.logger || defaultLogger;
    let config;
    if (!validation.isEmpty(custom)) {
        logger.info('user custom configuration');
        config = custom;
    } else {
        config = defaultConfig;
        logger.info('user default configuration');
    }
    config.logger = logger;
    config = adjustConfig(config);
    config.mongo.baseURI = buildMongoUri(config);

    logger.info('configuration resolve success');
    logger.info(config);
    return config;
}


function adjustConfig(config) {
    if (!config.server) {
        config.server = defaultConfig.server;
    }
    if (!config.server.host) config.server.host = defaultConfig.server.host;
    if (!config.mongo) {
        config.mongo = defaultConfig.mongo;
    }
    if (!config.mongo.host) config.mongo.host = defaultConfig.mongo.host;
    if (!config.mongo.host) config.mongo.port = defaultConfig.mongo.port;
    if (!config.mongo.auth) config.mongo.auth = defaultConfig.mongo.auth;
    return config;
}


function buildMongoUri(config) {
    let baseURI = 'mongodb://';
    if (config.mongo.user && config.mongo.password) {
        baseURI += config.mongo.user + ':' + config.mongo.password + '@';
    }
    baseURI += config.mongo.host;
    if (config.mongo.port) {
        baseURI += ':' + config.mongo.port;
    }

    if (config.mongo.replicaSet && config.mongo.replicaSet.length) {
        for (let item of config.mongo.replicaSet) {
            baseURI += ',' + item.host + ':' + item.port;
        }
    }

    baseURI += '/?slaveOk=true';

    if (config.mongo.auth) {
        baseURI += ';';
        baseURI += 'authSource=' + config.mongo.auth;
    }

    return baseURI;
}


module.exports = {
    resolve
};

