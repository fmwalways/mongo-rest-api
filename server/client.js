/**
 * @author fomav
 * @time  2019-10-31
 * @email fomav@foxmail.com
 * @link  https://github.com/fmwalways
 */

const express = require('../helper/lib').express;
const http = require('../helper/lib').http;
const https = require('../helper/lib').https;
const fs = require('../helper/lib').fs;
const path = require('../helper/lib').path;
const resolve_config = require('../config/resolve-config');
const initRoutes = require('../actions/routes');


function init() {
    let config = resolve_config.resolve();
    let auto = !config.server.client;
    let app = config.server.client || express();
    initExpress(app);
    initRoutes(app, config);
    auto && start(app, config);
}


function start(app, config) {
    let host = config.server.host;
    let port = config.server.port;
    let ssl = config.server.ssl || {enabled: false, options: {}};
    let server;

    if (ssl.enabled) {
        if (ssl.key) ssl.options.key = fs.readFileSync(ssl.key);
        if (ssl.cert) ssl.options.cert = fs.readFileSync(ssl.cert);
        server = https.createServer(ssl.options, app);
    } else {
        server = http.createServer(app);
    }

    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.join(__dirname, '../static', 'favicon.ico'));
    });

    app.use(function (err, req, res, next) {
        config.logger.info(err);
        res.status(500).send(err);
    });

    server.listen(port, host, function () {
        config.logger.info('mongo rest api server started');
    });
}


function initExpress(app) {
    app.use((req, res, next) => {
        res.error = error;
        next();

        function error(err) {
            err = {
                code: err.code || 1,
                message: err.message || 'Unknown error'

            };
            if (err) {
                res.status(400).json(err);
            }
        }
    });
}


module.exports = {
    init
};
