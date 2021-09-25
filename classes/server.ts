
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';

import { createAssosiations } from '../database/assosiations';
import sequelize from '../database/database';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        this.mysqlConnect();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }


    private async mysqlConnect() {
        createAssosiations();
        sequelize.sync({ force: false }).then(() => {
            console.log("✅  MySQL connection");
        }).catch((err) => {
            console.error(err);
        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }

}