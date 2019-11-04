/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const lib = require('./lib');

//the validation rules of application


const validation = {

    isPath: function (path) {
        if (!path || typeof path !== 'string') {
            return false;
        }
        return lib.fs.existsSync(path);
    },


    isObject: function (object) {
        return typeof object === 'object'
    },


    isJson: function (fileName) {
        let ext = ['json'];
        return ext.includes(getFileExt(fileName));
    },

    isYaml: function (fileName) {
        let ext = ['yml', 'yaml'];
        return ext.includes(getFileExt(fileName));
    },


    isEmpty: function (object) {
        return lib._.isEmpty(object);
    }


};


function getFileExt(fileName) {
    return lib.path.extname(fileName).replace('.', '');
}


module.exports = validation;
