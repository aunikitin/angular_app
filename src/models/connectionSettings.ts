import SequelizeOptions from './sequelizeOptions'

export default class ConnectionSettings{
    dbName: string;
    userName: string;
    password: string;
    options: SequelizeOptions;

    constructor(){
        this.dbName = 'testdb';
        this.userName = 'postgres';
        this.password = '12345';
        this.options = new SequelizeOptions();
        console.log(this);
    }
}