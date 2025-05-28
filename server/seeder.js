const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/foodModel');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Sample food data
const foodItems = [
  {
    name: "Dal Rice",
    description: "Freshly cooked dal with steamed rice",
    price: 120,
    category: "Main Course",
    image: "https://example.com/images/dal-rice.jpg"
  },
  {
    name: "Roti Sabzi",
    description: "Fresh rotis with mixed vegetable curry",
    price: 100,
    category: "Main Course",
    image: "https://example.com/images/roti-sabzi.jpg"
  },
  {
    name: "Masala Dosa",
    description: "Crispy dosa with potato filling",
    price: 80,
    category: "South Indian",
    image: "https://example.com/images/masala-dosa.jpg"
  },
  {
    name: "Chole Bhature",
    description: "Spicy chickpea curry with fried bread",
    price: 110,
    category: "North Indian",
    image: "https://example.com/images/chole-bhature.jpg"
  },
  {
    name: "Veg Thali",
    description: "Complete meal with rice, dal, roti, sabzi and dessert",
    price: 150,
    category: "Thali",
    image: "https://example.com/images/veg-thali.jpg"
  }
];

// Import data
const importData = async () => {
  try {
    await Food.deleteMany();
    await Food.insertMany(foodItems);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Food.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
