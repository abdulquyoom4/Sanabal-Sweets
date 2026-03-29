import mongoose from 'mongoose';
import Order from '../model/order.model.js';
import Item from '../model/item.model.js';
import Cart from '../model/cart.model.js';

export const placeOrder = async (req, res) =>{
    const { name, email, phone, address, orderItems } = req.body;
    if (!orderItems || !orderItems.length) {
        return res.status(400).json({ message: 'Order must include at least one item' });
    }

    try {
        const newOrder = new Order({ userId: req.user.id, name, email, phone, address, orderItems });
        await newOrder.save();

        for (const item of orderItems) {
            const storeItem = await Item.findOne({ itemCode: item.itemCode });
            if (!storeItem) {
                return res.status(400).json({ message: `Item ${item.itemCode} not found in inventory` });
            }

            if (storeItem.quantity < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${storeItem.title}` });
            }

            await Item.updateOne(
                { itemCode: item.itemCode },
                { $inc: { quantity: -item.quantity } }
            );
        }

        await Cart.deleteMany({ userId: req.user.id });

        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Order placement failed:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getOrder = async (req, res) =>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}