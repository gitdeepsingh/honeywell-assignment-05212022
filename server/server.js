const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/corsMiddleware');
const AppRouter = require('./routes/route-config/appRouter');

class BuyMeSomethingApp {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4200;
    }

    configureSecurity() {
        this.app.use(corsMiddleware);
        this.app.use(bodyParser.json());
    }

    startRouter() {
        try {
            const _router = new AppRouter();
            this.app.use('/', [_router.router]);
        } catch (err) {
            console.log('startRouter Error. Reason=', err, JSON.stringify(err));
        }
    }

    startServer() {
        this.app.listen(this.port, async (err) => {
            if (err) throw err;
            console.log(`Server is up at port ${this.port}`);
            try {
                this.configureSecurity();

                // setting up routes
                this.startRouter();
            } catch (e) {
                console.log('Error startServer. Reason=', e, JSON.stringify(e));
                console.log(' Exiting now...');
                // db.end();
                process.exit();
            }
        });
    }

    startApp() {
        // server start
        this.startServer();
    }

    stopApp() {
        setTimeout(() => {
            console.log('Stopping server....');
            process.exit();
        }, 10 * 1000)
    }
}

const buyMeSomethingApp = new BuyMeSomethingApp();

process.on('uncaughtException', (excp) => {
    console.log('excp: ', excp);
    console.log(`UncaughtException occurred! Exception="${excp} || ${JSON.stringify(excp)}" Exiting now...`)
    buyMeSomethingApp.stopApp
})

buyMeSomethingApp.startApp();
module.exports = buyMeSomethingApp.app;