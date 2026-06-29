import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        message: {type: String, required: true}
<<<<<<< HEAD
    },
    {
        timestamps: true
=======
>>>>>>> ad0d333fe5588494675f5bfd83d832d84ad31c66
    }
)

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;