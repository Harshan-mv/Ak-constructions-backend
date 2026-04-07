require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = await User.find({});
  console.log('Users found in db:');
  users.forEach(u => console.log(`Email: ${u.email}`));
  if (users.length === 0) {
    console.log('No users found in database.');
  }
  mongoose.disconnect();
}).catch(err => {
  console.log('Error connecting to DB:', err);
});
