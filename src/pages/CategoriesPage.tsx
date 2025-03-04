import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/localDataApi';

interface CategoryData {
  name: string;
  count: number;
  brands: string[];
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const products = await fetchProducts();
        
        // Group products by category
        const categoryMap = new Map<string, CategoryData>();
        
        products.forEach(product => {
          if (!product.category) return;
          
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, {
              name: product.category,
              count: 0,
              brands: []
            });
          }
          
          const categoryData = categoryMap.get(product.category)!;
          categoryData.count++;
          
          if (product.brand && !categoryData.brands.includes(product.brand)) {
            categoryData.brands.push(product.brand);
          }
        });
        
        setCategories(Array.from(categoryMap.values()));
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={`/products?category=${category.name}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">
                {category.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-gray-600 mb-2">{category.count} products</p>
              {category.brands.length > 0 && (
                <p className="text-sm text-gray-500">
                  Brands: {category.brands.slice(0, 3).join(', ')}
                  {category.brands.length > 3 && ' and more...'}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;