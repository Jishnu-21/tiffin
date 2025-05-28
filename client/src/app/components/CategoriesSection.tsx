import Link from "next/link";

export default function CategoriesSection() {
  const categories = [
    { name: 'North Indian', icon: '🍚' },
    { name: 'South Indian', icon: '🥘' },
    { name: 'Gujarati', icon: '🍲' },
    { name: 'Bengali', icon: '🍛' },
    { name: 'Punjabi', icon: '🍗' },
    { name: 'Jain', icon: '🥗' },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link 
              href={`/category/${category.name.toLowerCase().replace(' ', '-')}`} 
              key={index} 
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="text-sm font-semibold text-gray-800 text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
