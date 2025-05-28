const Food = require('../models/foodModel');

// @desc    Get all food items
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const { category } = req.query;
    
    // If category is provided, filter by category
    const filter = category ? { category } : {};
    
    const foods = await Food.find(filter);
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single food item
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private (you can add auth later)
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    
    const food = new Food({
      name,
      description,
      price,
      category,
      image,
    });

    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private (you can add auth later)
const updateFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    
    const food = await Food.findById(req.params.id);
    
    if (food) {
      food.name = name || food.name;
      food.description = description || food.description;
      food.price = price || food.price;
      food.category = category || food.category;
      food.image = image || food.image;
      
      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private (you can add auth later)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (food) {
      await food.deleteOne();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
