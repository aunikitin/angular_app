export default class SequelizeOptions {
    port: string;
    host: string;

    constructor(){
        this.port = '5432';
        this.host = '192.168.0.11';
    }
}