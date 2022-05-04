import express from 'express';
import cors from 'cors';
import router from './src/router';
const app = express();
import middleware from './src/middleware/auth';
import mongoose from 'mongoose';
import { development } from './src/config';

app.use(cors());
app.use(middleware.decodeToken);
app.use(express.json());
app.use(router);

const PORT = development.port;

(async function bootstrap(){
  await mongoose.connect(`mongodb://${development.domain}/${development.database}`);
  
  
  console.log('Connection has been established successfully.');
  app.listen(PORT, ()=> console.log(`running on port ${PORT}`));
})()


/* mongoose.connection.once('open', async function () {
  console.log(development)
  if(development.database === 'groupay_test'){
    await mongoose.connection.collections.users.drop();
    await mongoose.connection.collections.groups.drop();
  }
}).on('error', function (error) {
  console.log('TestDB connection error', error);
}); */

export default app;