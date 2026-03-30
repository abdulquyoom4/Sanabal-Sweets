import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import itemRoute from './route/item.route.js'
import userRoute from './route/user.route.js'
import contactRoute from './route/contact.route.js'
import orderRoute from './route/order.route.js'
import cartRoute from './route/cart.route.js'

const port = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin === (process.env.CLIENT_URL || 'http://localhost:5173')) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

try {
    mongoose.connect(process.env.MONGOURI);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log("Error: ", error);
}

app.use('/items', itemRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





const uri = "mongodb://abdulquyoom402_db_user:<db_password>@ac-glzkrsi-shard-00-00.azo2471.mongodb.net:27017,ac-glzkrsi-shard-00-01.azo2471.mongodb.net:27017,ac-glzkrsi-shard-00-02.azo2471.mongodb.net:27017/?ssl=true&replicaSet=atlas-evy6qm-shard-0&authSource=admin&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
   
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
