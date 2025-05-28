export default function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
            </div>
            <div className="mt-6">
              <div className="w-12 h-12 mx-auto mb-4 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Customize Your Meals</h3>
              <p className="text-gray-700 text-center">Select your favorite dishes from our menu to create your perfect daily tiffin combination.</p>
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
            </div>
            <div className="mt-6">
              <div className="w-12 h-12 mx-auto mb-4 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Plan Your Week</h3>
              <p className="text-gray-700 text-center">Schedule different meal combinations for each day of the week according to your preferences.</p>
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
            </div>
            <div className="mt-6">
              <div className="w-12 h-12 mx-auto mb-4 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Confirm & Enjoy</h3>
              <p className="text-gray-700 text-center">Review your meal plan, confirm your choices, and enjoy your personalized tiffin every day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
