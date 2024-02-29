const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('Db connection susccessful');
    } catch(err) {
        console.error(`Error in conecting the database: ${err.msg}`);
    }
}

module.exports = {
    connectToDb
}
