/**
 * @author fomav
 * @time  2019-11-01
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

// set REST API routes


module.exports = (app, config) => {


    app.get(prefix('/dbs'), action('get-dbs'));
    app.get(prefix('/dbs/:db/collections'), action('get-db-collections'));
    app.get(prefix('/dbs/:db/collections/:collection'), action('get-query'));


    function action(name) {
        return function (req, res) {
            let action = require(`./${name}`);
            action(req, res, config);
        }
    }


    function prefix(url) {
        let prefix = config.server.prefix;
        if (!prefix) {
            return url;
        }
        if (prefix === '/') {
            return url;
        }
        return prefix + url;
    }

};
