'use client';

import { useEffect, useState } from 'react';
import { Food, getAllFoods } from '../services/api';
import { useCart } from './Cart';

export default function FoodItemsSection() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getAllFoods();
        setFoods(data);
        
        // Set the first category as active if we have foods
        if (data.length > 0) {
          const categories = [...new Set(data.map(food => food.category))];
          setActiveCategory(categories[0]);
        }
      } catch (err) {
        setError('Failed to fetch food items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Get unique categories from foods
  const categories = [...new Set(foods.map(food => food.category))];

  // Filter foods by active category
  const filteredFoods = activeCategory 
    ? foods.filter(food => food.category === activeCategory)
    : foods;

  if (loading) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center px-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious food items prepared with fresh ingredients and authentic recipes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          {categories.length > 0 && (
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
          )}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div 
              key={food._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    // Fallback image if the food image fails to load
                    (e.target as HTMLImageElement).src = '/placeholder-food.jpg';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-lg">{food.name}</h3>
                  <span className="text-orange-500 font-bold">₹{food.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{food.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-black bg-orange-50 px-2 py-1 rounded-full">
                      {food.type}
                    </span>
                    <span className="text-xs text-black bg-blue-50 px-2 py-1 rounded-full">
                      {food.cuisine}
                    </span>
                  </div>
                  
                  {getItemQuantity(food._id) === 0 ? (
                    <button 
                      onClick={() => addToCart(food)}
                      className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(food._id, getItemQuantity(food._id) - 1)}
                        className="h-8 w-8 rounded-full bg-gray-100 text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="mx-2 text-black font-medium">{getItemQuantity(food._id)}</span>
                      <button 
                        onClick={() => addToCart(food)}
                        className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No food items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
