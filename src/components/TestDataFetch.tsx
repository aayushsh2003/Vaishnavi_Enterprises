import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/localDataApi';
import { Product } from '../types/Product';

const TestDataFetch: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data from local CSV file');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Local CSV Data Test</h2>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data from local CSV file...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {!isLoading && !error && (
        <>
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>Successfully fetched {products.length} products from local CSV file!</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Brand</th>
                  <th className="px-4 py-2 border">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">₹{product.discountedPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 border">{product.brand}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length > 5 && (
            <p className="mt-2 text-gray-600">Showing 5 of {products.length} products</p>
          )}
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Raw Data Sample (First Product):</h3>
            {products.length > 0 ? (
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {JSON.stringify(products[0], null, 2)}
              </pre>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TestDataFetch;