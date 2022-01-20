const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('dotenv').config();

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
