import Cart from '../model/cart.model.js';

export const getCart = async (req, res) =>{
    try{
        const cart = await Cart.find({ userId: req.user.id });
        res.json(cart);
    }catch(error){
        console.error("Cart fetch error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const addCart = async (req, res) =>{
    const {itemCode, title, price, category, image, quantity} = req.body;
    try{
        const newCart = new Cart({ userId: req.user.id, itemCode, title, price, category, image, quantity });
        await newCart.save();
        res.status(200).json({message: 'Added to Cart', data: newCart});
    } catch (error) {
        console.error('Cart add error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}

export const deleteCart = async (req, res) =>{
    const { id } = req.params;
    try {
        const deleted = await Cart.deleteOne({ _id: id, userId: req.user.id });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Cart delete error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
    