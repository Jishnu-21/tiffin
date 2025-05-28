'use client';

import { useState, useEffect } from 'react';
import { Food } from '../services/api';

export interface CartItem extends Food {
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

// Cart item card component for displaying items in the cart
function CartItemCard({ item, updateQuantity, removeFromCart }: CartItemCardProps) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100">
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-food.jpg';
          }}
        />
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-black">{item.name}</h3>
          <p className="text-black font-medium text-sm">₹{item.price * item.quantity}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="text-xs text-black bg-orange-50 px-1.5 py-0.5 rounded-full">{item.type}</span>
          <span className="text-xs text-black bg-blue-50 px-1.5 py-0.5 rounded-full">{item.cuisine}</span>
        </div>
        <div className="flex items-center mt-1.5">
          <button 
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="text-black hover:text-gray-700 bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center text-xs"
          >
            -
          </button>
          <span className="mx-2 text-black text-sm">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="text-black hover:text-gray-700 bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center text-xs"
          >
            +
          </button>
          <button 
            onClick={() => removeFromCart(item._id)}
            className="ml-3 text-red-500 hover:text-red-700 text-xs"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render and set up event listener
  useEffect(() => {
    const savedCart = localStorage.getItem('tiffinCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    // Add event listener for toggle-cart event from footer
    const handleToggleCart = () => {
      setIsCartOpen(prev => !prev);
    };
    
    window.addEventListener('toggle-cart', handleToggleCart);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('toggle-cart', handleToggleCart);
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tiffinCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Food) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (id: string) => {
    const item = cartItems.find(item => item._id === id);
    return item ? item.quantity : 0;
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    isCartOpen,
    toggleCart
  };
}

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    isCartOpen,
    toggleCart
  } = useCart();
  
  // Group items by category for custom tiffin creation
  const breakfastItems = cartItems.filter(item => item.category === 'breakfast');
  const lunchItems = cartItems.filter(item => item.category === 'lunch');
  const dinnerItems = cartItems.filter(item => item.category === 'dinner');

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-black">Your Tiffin</h2>
          <button 
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-black text-center">Your cart is empty</p>
            <button 
              onClick={toggleCart}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3 border-b pb-2">Your Custom Tiffin</h3>
                <p className="text-sm text-black mb-4">Select items from each category to create your own tiffin.</p>
              </div>
              
              {/* Breakfast Section */}
              {breakfastItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-black mb-2 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Breakfast
                  </h4>
                  {breakfastItems.map((item) => (
                    <CartItemCard 
                      key={item._id} 
                      item={item} 
                      updateQuantity={updateQuantity} 
                      removeFromCart={removeFromCart} 
                    />
                  ))}
                </div>
              )}
              
              {/* Lunch Section */}
              {lunchItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-black mb-2 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Lunch
                  </h4>
                  {lunchItems.map((item) => (
                    <CartItemCard 
                      key={item._id} 
                      item={item} 
                      updateQuantity={updateQuantity} 
                      removeFromCart={removeFromCart} 
                    />
                  ))}
                </div>
              )}
              
              {/* Dinner Section */}
              {dinnerItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-black mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Dinner
                  </h4>
                  {dinnerItems.map((item) => (
                    <CartItemCard 
                      key={item._id} 
                      item={item} 
                      updateQuantity={updateQuantity} 
                      removeFromCart={removeFromCart} 
                    />
                  ))}
                </div>
              )}
              
              {/* Suggestions to complete the tiffin */}
              {!breakfastItems.length || !lunchItems.length || !dinnerItems.length ? (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-4">
                  <p className="text-sm text-black">
                    <span className="font-medium">Complete your tiffin:</span> 
                    {!breakfastItems.length && <span className="block mt-1">• Add breakfast items</span>}
                    {!lunchItems.length && <span className="block mt-1">• Add lunch items</span>}
                    {!dinnerItems.length && <span className="block mt-1">• Add dinner items</span>}
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-4">
                  <p className="text-sm text-black font-medium">
                    Your tiffin is complete with breakfast, lunch, and dinner items! 🎉
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
              <div className="flex justify-between mb-4">
                <span className="text-black font-medium">Total</span>
                <span className="text-black font-bold">₹{getTotalPrice()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
                <button 
                  onClick={() => alert('Checkout functionality will be implemented soon!')}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
