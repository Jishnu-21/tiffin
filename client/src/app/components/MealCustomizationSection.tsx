export default function MealCustomizationSection() {
  const mealCategories = [
    {
      name: 'Main Course',
      items: [
        { id: 1, name: 'Dal Tadka', image: '/meals/dal-tadka.jpg', calories: '180 kcal' },
        { id: 2, name: 'Palak Paneer', image: '/meals/palak-paneer.jpg', calories: '250 kcal' },
        { id: 3, name: 'Mix Veg', image: '/meals/mix-veg.jpg', calories: '150 kcal' },
        { id: 4, name: 'Chole Masala', image: '/meals/chole.jpg', calories: '220 kcal' },
      ]
    },
    {
      name: 'Rice & Breads',
      items: [
        { id: 5, name: 'Steamed Rice', image: '/meals/rice.jpg', calories: '130 kcal' },
        { id: 6, name: 'Jeera Rice', image: '/meals/jeera-rice.jpg', calories: '150 kcal' },
        { id: 7, name: 'Roti', image: '/meals/roti.jpg', calories: '80 kcal' },
        { id: 8, name: 'Paratha', image: '/meals/paratha.jpg', calories: '150 kcal' },
      ]
    },
    {
      name: 'Sides',
      items: [
        { id: 9, name: 'Raita', image: '/meals/raita.jpg', calories: '50 kcal' },
        { id: 10, name: 'Green Salad', image: '/meals/salad.jpg', calories: '30 kcal' },
        { id: 11, name: 'Papad', image: '/meals/papad.jpg', calories: '35 kcal' },
        { id: 12, name: 'Pickle', image: '/meals/pickle.jpg', calories: '20 kcal' },
      ]
    }
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center px-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Customize Your Tiffin</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Mix and match your favorite dishes to create your perfect meal. Select items from each category to build your personalized tiffin.
          </p>
        </div>

        <div className="space-y-10">
          {mealCategories.map((category) => (
            <div key={category.name} className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{category.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.items.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="text-sm text-gray-500">{item.calories}</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-white border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                        Add to Tiffin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center px-4">
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-base sm:text-lg">
            <span>Preview Your Tiffin</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
