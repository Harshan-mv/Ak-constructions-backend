require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin@arkitektur.com exists
    let admin = await User.findOne({ email: 'admin@arkitektur.com' });
    
    if (!admin) {
      // Create it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      admin = new User({
        email: 'admin@arkitektur.com',
        // In the user model, there's a pre-save hook that hashes the password.
        // Wait, if I do password: 'admin123', the pre-save hook will hash it again if it's modified.
        // So I'll just save it plainly and let the model hash it.
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Successfully created admin@arkitektur.com with password: admin123');
    } else {
      console.log('admin@arkitektur.com already exists. Resetting password to admin123...');
      admin.password = 'admin123';
      await admin.save();
      console.log('Successfully reset password for admin@arkitektur.com to: admin123');
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
