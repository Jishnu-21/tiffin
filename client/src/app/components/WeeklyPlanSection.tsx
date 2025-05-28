export default function WeeklyPlanSection() {
  const weekDays = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
  ];

  return (
    <section className="py-12 px-4 bg-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center px-4 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Plan Your Week</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your meals for the entire week. You can set different combinations for each day or repeat your favorite ones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {weekDays.map((day) => (
            <div key={day.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{day.name}</h3>
                
                {/* Empty State */}
                <div className="bg-gray-50 rounded-lg p-4 text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No meals selected</p>
                </div>

                <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                  Customize Meal
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Weekly Summary</h3>
              <p className="text-sm sm:text-base text-gray-600">Plan your meals for the entire week and save time.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 bg-white border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                Save Draft
              </button>
              <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                Confirm Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
