import Image from "next/image";
import Link from "next/link";

export default function PopularProvidersSection() {
  const providers = [
    {
      id: 1,
      name: 'Homely Tiffin',
      image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviews: 120,
      cuisines: ['North Indian', 'Punjabi'],
      price: '₹100/meal',
      deliveryTime: '30 min',
    },
    {
      id: 2,
      name: "Mom's Kitchen",
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
      rating: 4.5,
      reviews: 98,
      cuisines: ['South Indian', 'Kerala'],
      price: '₹120/meal',
      deliveryTime: '35 min',
    },
    {
      id: 3,
      name: 'Ghar Ka Khana',
      image: 'https://images.unsplash.com/photo-1596097557993-54e1bbd4a1b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviews: 150,
      cuisines: ['Gujarati', 'Rajasthani'],
      price: '₹90/meal',
      deliveryTime: '25 min',
    },
    {
      id: 4,
      name: 'Healthy Bites',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.6,
      reviews: 85,
      cuisines: ['Diet', 'Jain'],
      price: '₹150/meal',
      deliveryTime: '40 min',
    },
  ];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-black font-bold">Popular Tiffin Providers</h2>
          <Link href="/providers" className="text-orange-600 font-medium text-sm">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <Link href={`/provider/${provider.id}`} key={provider.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {provider.rating}
                </div>
                <Image 
                  src={provider.image} 
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{provider.cuisines.join(', ')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">{provider.price}</span>
                  <span className="text-sm font-medium text-gray-700">{provider.deliveryTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
