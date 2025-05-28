'use client';

import { useState, useEffect } from 'react';
import { Food, getFoodsByType, deleteFood } from '../services/api';
import FoodItemForm from './FoodItemForm';

interface FoodManagerProps {
  foodType: 'breakfast' | 'lunch' | 'dinner';
}

export default function FoodManager({ foodType }: FoodManagerProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await getFoodsByType(foodType);
      setFoods(data);
    } catch (err) {
      setError(`Failed to fetch ${foodType} items`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [foodType]);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${foodType} item?`)) {
      try {
        setDeletingId(id);
        setError(null);
        setDeleteSuccess(null);
        
        await deleteFood(id);
        
        // Show success message
        setDeleteSuccess(`${foodType.charAt(0).toUpperCase() + foodType.slice(1)} item deleted successfully`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
        
        // Refresh the list
        fetchFoods();
      } catch (err) {
        setError('Failed to delete food item');
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleAddClick = () => {
    setEditingFood(null);
    setShowForm(true);
  };

  const handleEditClick = (food: Food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingFood(null);
    fetchFoods();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  if (loading && !showForm) {
    return (
      <div>
        <h2 className="text-xl font-bold text-black mb-4">{foodType.charAt(0).toUpperCase() + foodType.slice(1)} Items</h2>
        <div className="animate-pulse">
          <div className="bg-white p-6 rounded-lg h-64 border border-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-black">{foodType.charAt(0).toUpperCase() + foodType.slice(1)} Items</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-base shadow-sm"
          >
            Add {foodType.charAt(0).toUpperCase() + foodType.slice(1)} Item
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-6 font-medium">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {deleteSuccess && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 mb-6 font-medium">
          {deleteSuccess}
          <button 
            onClick={() => setDeleteSuccess(null)}
            className="ml-4 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {showForm && (
        <FoodItemForm
          initialData={editingFood || undefined}
          isEditing={!!editingFood}
          foodType={foodType}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {/* Food Items List */}
      {foods.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
          <p className="text-black font-medium">No {foodType} items found. Add your first {foodType} item!</p>
        </div>
      ) : (
        <div>
          {/* Mobile View - Card Layout */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {foods.map((food) => (
                <div key={food._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="h-14 w-14 flex-shrink-0">
                        <img 
                          className="h-14 w-14 rounded-lg object-cover border border-gray-200" 
                          src={food.image} 
                          alt={food.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                          }} 
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-black text-base">{food.name}</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-black text-xs px-2 py-1 bg-orange-50 rounded-full">{food.type}</span>
                          <span className="text-black text-xs px-2 py-1 bg-blue-50 rounded-full">{food.cuisine}</span>
                        </div>
                        <div className="text-orange-600 font-bold mt-1">₹{food.price}</div>
                      </div>
                    </div>
                    <div className="text-sm text-black mt-3 line-clamp-2">{food.description}</div>
                    <div className="flex justify-end space-x-3 mt-4 border-t pt-3">
                      <button
                        onClick={() => handleEditClick(food)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        disabled={deletingId === food._id}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${deletingId === food._id 
                          ? 'bg-gray-100 text-black cursor-not-allowed' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200 transition-colors'}`}
                      >
                        {deletingId === food._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop View - Table Layout */}
          <div className="hidden sm:block overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Cuisine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {foods.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img 
                            className="h-12 w-12 rounded-lg object-cover border border-gray-200" 
                            src={food.image} 
                            alt={food.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                            }} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-medium text-black">{food.name}</div>
                          <div className="text-sm text-black line-clamp-1">{food.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-black text-xs px-2 py-1 bg-orange-50 rounded-full">{food.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-black text-xs px-2 py-1 bg-blue-50 rounded-full">{food.cuisine}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-orange-600 font-bold">₹{food.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEditClick(food)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        disabled={deletingId === food._id}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${deletingId === food._id 
                          ? 'bg-gray-100 text-black cursor-not-allowed' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200 transition-colors'}`}
                      >
                        {deletingId === food._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
