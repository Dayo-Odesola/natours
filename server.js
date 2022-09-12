const colors = require('colors')
const mongoose = require('mongoose')

const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

const port = process.env.PORT || 3000;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(app.listen(port, () => {
  console.log(`Listening for requests on port ${port}...`.brightYellow.underline);
}))

