/**
 * @author fomav
 * @time  2019-11-01
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const lib = require('./lib');


const utilities = {
    loadYaml: function () {
        return lib.yaml.safeLoad(lib.fs.readFileSync(lib.path.join(...arguments)));
    },

    loadYamlContent: function (content) {
        return lib.yaml.safeLoad(content);
    }
};


module.exports = utilities;






