import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { fetchProducts } from '../utils/localDataApi';
import { Product } from '../types/Product';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter from '../components/PriceFilter';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get initial filter values from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const tagParam = searchParams.get('tag');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // Handle tag parameter separately when filtering products
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
        
        // Extract unique categories and brands
        const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)))
          .filter(Boolean);
        const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand)))
          .filter(Boolean);
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        
        // Find min and max prices
        const prices = allProducts.map(p => p.discountedPrice).filter(p => p > 0);
        if (prices.length > 0) {
          setMinPrice(Math.floor(Math.min(...prices)));
          setMaxPrice(Math.ceil(Math.max(...prices)));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    if (products.length === 0) return;
    
    const tagParam = searchParams.get('tag');
    
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.details.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Filter by tag
    if (tagParam) {
      filtered = filtered.filter(p => p.tag === tagParam);
    }
    
    // Filter by price
    filtered = filtered.filter(p => 
      p.discountedPrice >= minPrice && p.discountedPrice <= maxPrice
    );
    
    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice, searchQuery, searchParams]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0]);
    }
    
    if (selectedBrands.length === 1) {
      params.set('brand', selectedBrands[0]);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    // Preserve tag parameter if it exists
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      params.set('tag', tagParam);
    }
    
    setSearchParams(params);
  }, [selectedCategories, selectedBrands, searchQuery, setSearchParams, searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchParams({});
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={toggleMobileFilter}
            className="md:hidden flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md mr-2"
          >
            <Filter size={18} className="mr-1" />
            Filters
          </button>
          
          <button 
            onClick={clearAllFilters}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Clear All Filters
          </button>
        </div>
      </div>
      
      {/* Active filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategories.map(category => (
            <div key={category} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
              {category}
              <button 
                onClick={() => handleCategoryChange(category)}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          
          {selectedBrands.map(brand => (
            <div key={brand} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
              {brand}
              <button 
                onClick={() => handleBrandChange(brand)}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <CategoryFilter 
            categories={categories} 
            selectedCategories={selectedCategories} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor={`brand-${brand}`}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <PriceFilter 
            minPrice={minPrice} 
            maxPrice={maxPrice} 
            onPriceChange={handlePriceChange} 
          />
        </div>
        
        {/* Filters - Mobile */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="bg-white h-full w-4/5 max-w-sm p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={toggleMobileFilter}>
                  <X size={24} />
                </button>
              </div>
              
              <CategoryFilter 
                categories={categories} 
                selectedCategories={selectedCategories} 
                onCategoryChange={handleCategoryChange} 
              />
              
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`mobile-brand-${brand}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <PriceFilter 
                minPrice={minPrice} 
                maxPrice={maxPrice} 
                onPriceChange={handlePriceChange} 
              />
              
              <button 
                onClick={toggleMobileFilter}
                className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Product Grid */}
        <div className="md:w-3/4 lg:w-4/5">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;