import Item from '../model/item.model.js';

export const getItem = async (req, res) =>{
    try{
   const item = await Item.find();
    res.json(item);
    }catch(error){
        console.log("Error: ", error);
    }
}

export const addItem = async (req, res) =>{
    const { itemCode, title, price, category, image, quantity} = req.body;
    const existingItem = await Item.findOne({ itemCode });
    if(existingItem){
        return res.status(400).json({ message: 'Item with this code already exists' });
    }
    try{
        const newItem = new Item({itemCode, title, price, category, image, quantity});
        await newItem.save();
        res.json(newItem);
        res.status(200).json({message: 'Item added successfully'});
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}

export const editItem = async (req, res) =>{
    const { itemCode } = req.body;
    try{
       const selectedItem = await Item.findOne({itemCode});
        if (!selectedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const {itemCode, title, price, category, image, quantity} = req.body;
    await selectedItem.updateOne({itemCode, title, price, category, image, quantity});
    res.status(200).json({ message: 'Item updated successfully' });   
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteItem = async (req, res) =>{
    const { itemCode } = req.body;
    try{
       const selectedItem = await Item.findOne({itemCode});
        if (!selectedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await Item.deleteOne({ itemCode });
    res.status(200).json({ message: 'Item deleted successfully' });   } catch {
        res.status(500).json({ message: 'Server error' });
    }
}