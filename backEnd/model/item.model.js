import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    itemCode: {type: String, unique: true},
    title: {type: String, required: true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    image:{type:String},
    quantity:{type:Number, required:true},
});

const Item = mongoose.model('Item', itemSchema);

export default Item;