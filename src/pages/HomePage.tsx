import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Percent, Award, TrendingUp } from 'lucide-react';
import { fetchProducts } from '../utils/localDataApi';
import { Product } from '../types/Product';
import ProductGrid from '../components/ProductGrid';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topSellers, setTopSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const products = await fetchProducts();
        
        // Get unique categories
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
          .filter(Boolean);
        setCategories(uniqueCategories);
        
        // Get top sellers (products with "Top Seller" tag)
        const sellers = products.filter(p => p.tag === 'Top Seller').slice(0, 4);
        setTopSellers(sellers);
        
        // Get featured products (first 8 products that are not top sellers)
        const featured = products
          .filter(p => p.tag !== 'Top Seller')
          .slice(0, 8);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Group categories by type
  const stationeryCategories = ['Pens', 'Pencils', 'Notebooks', 'Journals', 'Sticky Notes'];
  const officeCategories = ['Desk Organizer', 'File Organizer', 'Calculators', 'Staplers', 'Scissors'];

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Payday Sale!</h1>
              <p className="text-xl md:text-2xl mb-6">Extra 10% OFF on orders above ₹2000</p>
              <div className="bg-white text-indigo-600 inline-block px-4 py-2 rounded-md font-semibold">
                PAYDAY10
              </div>
              <div className="mt-8">
                <Link 
                  to="/products" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-semibold transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Office Supplies" 
                className="rounded-lg shadow-lg max-h-80 object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* {/* Discount Codes Section 
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Use These Codes & Save More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">PAYDAY5</h3>
                <p className="text-lg text-gray-700 mb-4">5% off above ₹1000</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Copy Code
                </button>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">PAYDAY7</h3>
                <p className="text-lg text-gray-700 mb-4">7% off above ₹1500</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Copy Code
                </button>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">PAYDAY10</h3>
                <p className="text-lg text-gray-700 mb-4">10% off above ₹2000</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Stationery Categories */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Elevate Your Workspace with Premium Stationery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stationeryCategories.map((category, index) => (
            <Link 
              key={index}
              to={`/products?category=${category}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img 
                  src={`https://images.unsplash.com/photo-${1550000000 + index * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                  alt={category}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-800">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Exam Essentials Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-100 rounded-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ACE YOUR EXAMS WITH THE RIGHT TOOLS!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Grab your exam must-haves today and write your way to success.
            </p>
            <Link 
              to="/products?category=Stationery" 
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            >
              Shop Exam Essentials
            </Link>
          </div>
        </div>
      </div>

      {/* Office Essentials */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Elevate Your Workspace Efficiency - Office Essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {officeCategories.map((category, index) => (
            <Link 
              key={index}
              to={`/products?category=${category}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img 
                  src={`https://images.unsplash.com/photo-${1560000000 + index * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                  alt={category}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-800">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Price Point Sections */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div className="w-1/2 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80" 
                  alt="Under 99" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">UNDER 99</h3>
                <Link 
                  to="/products" 
                  className="inline-block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div className="w-1/2 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Under 199" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">UNDER 199</h3>
                <Link 
                  to="/products" 
                  className="inline-block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div className="w-1/2 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Under 299" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">UNDER 299</h3>
                <Link 
                  to="/products" 
                  className="inline-block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div className="w-1/2 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80" 
                  alt="Under 499" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">UNDER 499</h3>
                <Link 
                  to="/products" 
                  className="inline-block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Sellers</h2>
          <Link to="/products?tag=Top Seller" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <ProductGrid products={topSellers} isLoading={isLoading} />
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} isLoading={isLoading} />
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-12 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Vaishnavi Enterprises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">Premium stationery and office supplies that meet the highest standards.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Percent className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wholesale Prices</h3>
            <p className="text-gray-600">Get the best deals with our competitive wholesale pricing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Brands</h3>
            <p className="text-gray-600">We partner with the most reliable brands in the industry.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bulk Discounts</h3>
            <p className="text-gray-600">Special pricing for bulk orders to meet your business needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;