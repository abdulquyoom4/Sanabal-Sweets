import contact from '../model/contact.model.js';

export const Contact = async (req, res) =>{
    const name = req.body.name || req.body.fullname;
    const { email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email and message are required' });
    }
    try{
        const newContact = new contact({name, email, message});
        await newContact.save();
        res.status(200).json({message: 'Message sent successfully'});
    } catch (error) {
        console.error('Contact save error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await contact.find();
        res.status(200).json({messages});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }};