const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_SERVER}:27017/secretDB`,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
require('./users');