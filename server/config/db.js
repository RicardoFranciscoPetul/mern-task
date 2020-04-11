const mongoose = require('mongoose');
const path = 'variables.env';

require('dotenv').config({ path });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('db conectada');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
