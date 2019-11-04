/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */


//the application flow error

module.exports = flowError;

function flowError(prefix, error) {
    const message = prefix + ' ' + error.message;
    throw new Error(message);
}
