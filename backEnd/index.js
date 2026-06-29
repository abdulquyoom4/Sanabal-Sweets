import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import itemRoute from './route/item.route.js'
import userRoute from './route/user.route.js'
import contactRoute from './route/contact.route.js'
import orderRoute from './route/order.route.js'
import cartRoute from './route/cart.route.js'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://snabelsweets-pmlc3m8r8-abdulquyoom4s-projects.vercel.app",
  "https://project-dekrw.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.endsWith('.vercel.app') || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

;(async ()=>{
  try {
    await mongoose.connect(process.env.MONGOURI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})()

app.use('/items', itemRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
<<<<<<< HEAD

module.exports = app;
=======
>>>>>>> ad0d333fe5588494675f5bfd83d832d84ad31c66
