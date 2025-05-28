export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
              Build Your Perfect <br className="hidden md:block" />
              <span className="text-orange-100">Daily Tiffin</span>
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-md drop-shadow-lg opacity-90">
              Create your own customized meal plan with our wide variety of healthy and delicious options
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
              <button className="w-full sm:w-auto px-6 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-base sm:text-lg font-medium shadow-lg hover:shadow-xl">
                Start Customizing
              </button>
              <button className="w-full sm:w-auto px-6 py-4 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl hover:bg-white transition-colors text-base sm:text-lg font-medium shadow-lg hover:shadow-xl">
                View Sample Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
