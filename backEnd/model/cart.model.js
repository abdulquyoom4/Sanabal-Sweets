import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemCode: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
    quantity: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;