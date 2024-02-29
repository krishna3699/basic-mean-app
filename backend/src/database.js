const mongoose = require('mongoose');

async function connectToDb(req, res, next) {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('Db connection susccessful');
        next();
    } catch(err) {
        console.error(`Error in conecting the database: ${err.msg}`);
        res.status(404).json({
            errorMsg: 'Cananot connect to DB'
        })
    }
}

module.exports = {
    connectToDb
}
