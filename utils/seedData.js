const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');
const Member = require('../models/Member');
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');

dotenv.config();

const mockProjects = [
  { title: 'Modern Villa', description: 'Luxury residential design with ocean view.', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', status: 'completed', place: 'Malibu, CA', ownerName: 'John Smith', timeline: '14 Months', publicId: 'mock-id-1' },
  { title: 'Corporate HQ', description: 'Sustainable office building in downtown.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', status: 'ongoing', place: 'Austin, TX', ownerName: 'TechFlow Inc.', timeline: 'Ongoing', publicId: 'mock-id-2' },
  { title: 'Minimalist Apartment', description: 'Clean and functional urban living space.', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', status: 'completed', place: 'New York, NY', ownerName: 'Jane Doe', timeline: '6 Months', publicId: 'mock-id-3' },
  { title: 'Eco Retreat', description: 'Nature-integrated hospitality complex.', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', status: 'ongoing', place: 'Portland, OR', ownerName: 'Green Hospitality Group', timeline: 'Ongoing', publicId: 'mock-id-4' },
];

const mockTestimonials = [
  { name: 'John Doe', role: 'CEO, TechCorp', text: 'Arkitektur totally transformed our workspace. The team was professional and the design is stunning.', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80', publicId: 'mock-id-t1' },
  { name: 'Jane Smith', role: 'Homeowner', text: 'Our new villa design exceeded all expectations. They perfectly captured our vision for a minimalist home.', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', publicId: 'mock-id-t2' },
  { name: 'Robert Johnson', role: 'Developer', text: 'Consistently exceptional work. We partner with them for all our luxury commercial projects.', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', publicId: 'mock-id-t3' },
];

const mockMembers = [
  { name: 'Sarah Jenkins', role: 'Principal Architect', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80', publicId: 'mock-id-m1' },
  { name: 'David Chen', role: 'Lead Interior Designer', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', publicId: 'mock-id-m2' },
  { name: 'Michael Ross', role: 'Structural Engineer', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', publicId: 'mock-id-m3' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for data seeding...');

    // Clear existing data to avoid duplicates
    await Project.deleteMany({});
    await Member.deleteMany({});
    await Testimonial.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing collections...');

    // Insert mock data
    await Project.insertMany(mockProjects);
    await Testimonial.insertMany(mockTestimonials);
    await Member.insertMany(mockMembers);
    
    // Ensure admin user exists
    // Ensure admin user exists
    const existingAdmin = await User.findOne({ email: 'ak.construktions@gmail.com' });
    if (!existingAdmin) {
      await User.create({
        email: 'ak.construktions@gmail.com',
        password: 'admin',
        role: 'admin',
      });
      console.log('Admin user recreated (ak.construktions@gmail.com / admin)');
    }

    console.log('✅ All static frontend data pushed to MongoDB successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
