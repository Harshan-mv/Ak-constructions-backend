const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Check if admin already exists
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'ak.construktions@gmail.com' });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
    } else {
      await User.create({
        email: 'ak.construktions@gmail.com',
        password: 'admin',
        role: 'admin',
      });
      console.log('Admin user created successfully!');
      console.log('  Email: ak.construktions@gmail.com');
      console.log('  Password: admin');
    }

    process.exit(0);
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
