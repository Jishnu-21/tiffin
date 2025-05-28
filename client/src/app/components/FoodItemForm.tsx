'use client';

import { useState, FormEvent } from 'react';
import { Food, createFood, updateFood } from '../services/api';

interface FoodItemFormProps {
  initialData?: Partial<Food>;
  isEditing: boolean;
  foodType: 'breakfast' | 'lunch' | 'dinner';
  onSuccess: () => void;
  onCancel: () => void;
}

export default function FoodItemForm({
  initialData,
  isEditing,
  foodType,
  onSuccess,
  onCancel
}: FoodItemFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || foodType as 'breakfast' | 'lunch' | 'dinner',
    type: initialData?.type || 'main dish',
    cuisine: initialData?.cuisine || 'Indian',
    image: initialData?.image || ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isEditing && initialData?._id) {
        await updateFood(initialData._id, formData);
      } else {
        await createFood(formData);
      }
      onSuccess();
    } catch (err) {
      setError('Failed to save food item. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-black mb-4">{isEditing ? 'Edit' : 'Add'} {foodType.charAt(0).toUpperCase() + foodType.slice(1)} Item</h2>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-4 font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 text-base"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-black mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 text-base"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black text-base"
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black text-base"
              required
            >
              <option value="main dish">Main Dish</option>
              <option value="side dish">Side Dish</option>
              <option value="appetizer">Appetizer</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Cuisine</label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black text-base"
              required
            >
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Thai">Thai</option>
              <option value="Japanese">Japanese</option>
              <option value="Continental">Continental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black text-base"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-black mb-2">Image Preview</label>
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-base"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-base shadow-sm"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditing ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
