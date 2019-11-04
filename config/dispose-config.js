/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */


//dispose custom config

const lib = require('../helper/lib');
const utilities = require('../helper/utilities');
const validation = require('../helper/validation');


let customConfig = {};

const disposeConfig = {

    init: function (config) {
        let parse = parseConfig(config);
        if (!validation.isEmpty(parse)) {
            customConfig = parse;
        }
    },

    inject(config) {
        let parse = parseConfig(config);
        if (!validation.isEmpty(parse)) {
            customConfig = lib._.assign(customConfig, parse);
        }
    },


    get() {
        return validation.isEmpty(customConfig) ? {} : customConfig;
    }


};


function parseConfig(config) {
    let isObj = validation.isObject(config);
    if (isObj) {
        return config;
    }
    let isPath = validation.isPath(config);
    if (!isPath) {
        throw new Error('config not file path or not exists please check config');
    }

    let content = lib.fs.readFileSync(config).toString();
    if (validation.isJson(config)) {
        return JSON.parse(content);
    }
    if (validation.isYaml(config)) {
        return utilities.loadYamlContent(content);
    }
    throw new Error('config not support this file please use ext json or yaml');
}


module.exports = disposeConfig;
