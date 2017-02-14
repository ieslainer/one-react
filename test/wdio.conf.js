/**
 * Created by ldejan on 2/10/2017.
 */
exports.config = {
    host: 'localhost',
    port: 4444,
    path: '/wd/hub',
    services: ['selenium-standalone'],
    capabilities: [{
        browserName: 'chrome',
        specs: [
            './test/e2e/test.js'
        ],
    }],

    maxInstances: 10,

    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,

    baseUrl: 'http://webdriver.io',

    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000
    },
    seleniumLogs: './',
};
