'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllFoods, Food } from '../services/api';
import FoodManager from '../components/FoodManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'breakfast' | 'lunch' | 'dinner'>('dashboard');
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getAllFoods();
        setFoods(data);
      } catch (err) {
        setError('Failed to fetch food items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Count foods by type
  const breakfastCount = foods.filter(food => food.type === 'breakfast').length;
  const lunchCount = foods.filter(food => food.type === 'lunch').length;
  const dinnerCount = foods.filter(food => food.type === 'dinner').length;
  const totalCount = foods.length;

  // Tab navigation
  const renderTabContent = () => {
    switch (activeTab) {
      case 'breakfast':
        return <FoodManager foodType="breakfast" />;
      case 'lunch':
        return <FoodManager foodType="lunch" />;
      case 'dinner':
        return <FoodManager foodType="dinner" />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md h-32"></div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-64"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-orange-600 mb-2">Breakfast Items</h2>
            <div className="flex justify-between items-center">
              <p className="text-3xl text-black font-bold">{breakfastCount}</p>
              <button 
                onClick={() => setActiveTab('breakfast')}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Manage
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-orange-600 mb-2">Lunch Items</h2>
            <div className="flex justify-between items-center">
              <p className="text-3xl text-black font-bold">{lunchCount}</p>
              <button 
                onClick={() => setActiveTab('lunch')}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Manage
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-orange-600 mb-2">Dinner Items</h2>
            <div className="flex justify-between items-center">
              <p className="text-3xl text-black font-bold">{dinnerCount}</p>
              <button 
                onClick={() => setActiveTab('dinner')}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-black font-semibold">Recent Food Items</h2>
            <span className="text-sm text-gray-500">Total: {totalCount}</span>
          </div>
          
          {foods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No food items found. Add your first food item!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foods.slice(0, 5).map((food) => (
                    <tr key={food._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={food.image} 
                              alt={food.name} 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{food.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {food.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{food.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => setActiveTab(food.category as 'breakfast' | 'lunch' | 'dinner')}
                          className="text-orange-600 hover:text-orange-900 mr-4"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6 hidden sm:block">Food Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap overflow-x-auto bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-3 px-5 font-medium text-base flex-grow sm:flex-grow-0 ${activeTab === 'dashboard' 
            ? 'bg-orange-500 text-white' 
            : 'text-black hover:bg-orange-50'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('breakfast')}
          className={`py-3 px-5 font-medium text-base flex-grow sm:flex-grow-0 ${activeTab === 'breakfast' 
            ? 'bg-orange-500 text-white' 
            : 'text-black hover:bg-orange-50'}`}
        >
          Breakfast
        </button>
        <button
          onClick={() => setActiveTab('lunch')}
          className={`py-3 px-5 font-medium text-base flex-grow sm:flex-grow-0 ${activeTab === 'lunch' 
            ? 'bg-orange-500 text-white' 
            : 'text-black hover:bg-orange-50'}`}
        >
          Lunch
        </button>
        <button
          onClick={() => setActiveTab('dinner')}
          className={`py-3 px-5 font-medium text-base flex-grow sm:flex-grow-0 ${activeTab === 'dinner' 
            ? 'bg-orange-500 text-white' 
            : 'text-black hover:bg-orange-50'}`}
        >
          Dinner
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
}
