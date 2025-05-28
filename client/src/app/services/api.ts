// API base URL - adjust if your server runs on a different port
const API_BASE_URL = 'http://localhost:5000/api';

export interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner';
  type: string; // main dish, side dish, dessert, etc.
  cuisine: string; // Indian, Chinese, Italian, etc.
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all foods
export const getAllFoods = async (): Promise<Food[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};



// Get food by ID
export const getFoodById = async (id: string): Promise<Food> => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching food with id ${id}:`, error);
    throw error;
  }
};

// Get foods by category
export const getFoodsByCategory = async (category: string): Promise<Food[]> => {
  try {
    // Fetch all foods and filter by category on the client side
    // In a real app, you might want to add a backend endpoint for this
    const foods = await getAllFoods();
    return foods.filter(food => food.category === category);
  } catch (error) {
    console.error(`Error fetching foods by category ${category}:`, error);
    throw error;
  }
};

// Get foods by type (breakfast, lunch, dinner)
export const getFoodsByType = async (type: 'breakfast' | 'lunch' | 'dinner'): Promise<Food[]> => {
  try {
    // Fetch all foods and filter by category on the client side
    const foods = await getAllFoods();
    return foods.filter(food => food.category === type);
  } catch (error) {
    console.error(`Error fetching foods by type ${type}:`, error);
    throw error;
  }
};

// Admin Functions

// Create a new food item
export const createFood = async (foodData: Omit<Food, '_id' | 'createdAt' | 'updatedAt'>): Promise<Food> => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating food:', error);
    throw error;
  }
};

// Update a food item
export const updateFood = async (id: string, foodData: Partial<Omit<Food, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Food> => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating food with id ${id}:`, error);
    throw error;
  }
};

// Delete a food item
export const deleteFood = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting food with id ${id}:`, error);
    throw error;
  }
};
