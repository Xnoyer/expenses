var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.sqlite', sqlite3.OPEN_READWRITE);


module.exports =
{

};

db.close();