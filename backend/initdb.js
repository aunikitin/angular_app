var csvtojson = require("csvtojson");
var Vulnerability = require("./models/vulnerability");
var User = require('./models/user');
var connectionManager = require('./models/connectionManager');

async function seedData() {
    const sequelize = connectionManager.sequelize;
    connectionManager.connect();
    const dataPath = `F:\\University\\5 курс\\Борисенко 5 курс\\superProtectedApp\\backend\\db.csv`;
    const data = await csvtojson({
        delimiter: ';'
    }).fromFile(dataPath, {defaultEncoding: 'utf-8'});

    sequelize.sync({force: true}).then(()=>{
        return sequelize.transaction().then((t)=> {
            var promises = data.map((row, index) => {
                return Vulnerability.create({id: index, ...row}, {transaction: t});
            });
            var userPromise = User.create({login: 'admin', password: 'admin', accessLevel: 0}, {transaction: t});
            Promise.all(promises,userPromise).then(()=> {
                t.commit();
                console.log('DB was init');
            });        
        });
    })
}

seedData();

module.exports = seedData;
