import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const SignUp = async (req, res) => {
    try{
        const { fullname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return  res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({fullname, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch(error){
         res.status(500).json({ message: 'Server error' });
    }}; 

    export const LogIn = async (req, res) => {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User does not exist' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign(
           {
        id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
         res.cookie('jwt', token, {
  httpOnly: true,
  secure: true,      
  sameSite: 'none',   
  maxAge: 24 * 60 * 60 * 1000,
});
            res.status(200).json({ message: 'Login successful', role: user.role });
        } catch(error){
           res.status(500).json({ message: 'Server error' });
        }};

export const Me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ name: user.fullname, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const Logout = async (req, res) => {
   res.cookie('jwt', '', {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 0,
});
    res.status(200).json({ message: 'Logged out successfully' });
};
