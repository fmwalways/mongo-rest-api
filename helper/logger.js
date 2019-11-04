/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */


//default logger

const defaultLogger = {

    info: function (message) {
        console.info(message);
    },

    log: function (message) {
        console.log(message);
    },

    warn: function (message) {
        console.warn(message);
    },

    error: function (message) {
        console.error(message);
    }

};

module.exports = defaultLogger;
