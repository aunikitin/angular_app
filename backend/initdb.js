var csvtojson = require("csvtojson");
var Vulnerability = require("./models/vulnerability");
var ConnectionManager = require('./db/connectionManager');

async function seedData() {
    const sequelize = new ConnectionManager().initSequalize();
    const dataPath = `F:\\University\\5 курс\\Борисенко 5 курс\\superProtectedApp\\backend\\db.csv`;
    const data = await csvtojson({
        delimiter: ';'
    }).fromFile(dataPath, {defaultEncoding: 'utf-8'});

    sequelize.sync({force: true}).then(()=>{
        return sequelize.transaction().then((t)=> {
            var promises = data.map((row, index) => {
                index++;
                return Vulnerability.create({id: index, ...row}, {transaction: t});
            });
            Promise.all(promises).then(()=> {
                t.commit();
                console.log('DB was init');
            });        
        });
    })
}

seedData();

module.exports = seedData;
