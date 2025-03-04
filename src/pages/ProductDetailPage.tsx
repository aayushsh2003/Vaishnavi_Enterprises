import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { fetchProducts } from '../utils/localDataApi';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const products = await fetchProducts();
        const foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Set active image
          setActiveImage(foundProduct.thumbnail || foundProduct.image1 || '');
          
          // Find related products (same category)
          const related = products
            .filter(p => p.category === foundProduct.category && p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && (!product?.minimumOrderQuantity || newQuantity >= product.minimumOrderQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 w-1/4 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-300 rounded-lg mb-4"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 w-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-300 w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-300 w-full mb-2"></div>
              <div className="h-4 bg-gray-300 w-full mb-2"></div>
              <div className="h-4 bg-gray-300 w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-300 w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-300 w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.price > 0 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  // Default image if no images are provided
  const defaultImage = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';
  
  // Get all available images
  const images = [
    product.thumbnail,
    product.image1,
    product.image2,
    product.image3
  ].filter(Boolean);

  // If no images are available, use default
  if (images.length === 0) {
    images.push(defaultImage);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/products" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4 border border-gray-200">
            <img 
              src={activeImage || defaultImage} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={`border-2 rounded-md overflow-hidden h-20 w-20 flex-shrink-0 ${
                    activeImage === image ? 'border-indigo-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold text-gray-900 mr-3">₹{product.discountedPrice.toFixed(2)}</span>
            {product.price > product.discountedPrice && (
              <>
                <span className="text-sm text-gray-500 line-through mr-2">₹{product.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.details}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {product.brand && (
                <div>
                  <span className="text-gray-600 text-sm">Brand:</span>
                  <p className="font-medium">{product.brand}</p>
                </div>
              )}
              
              {product.category && (
                <div>
                  <span className="text-gray-600 text-sm">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
              )}
              
              {product.code && (
                <div>
                  <span className="text-gray-600 text-sm">Code:</span>
                  <p className="font-medium">{product.code}</p>
                </div>
              )}
              
              {product.size && (
                <div>
                  <span className="text-gray-600 text-sm">Size:</span>
                  <p className="font-medium">{product.size}</p>
                </div>
              )}
              
              {product.color && (
                <div>
                  <span className="text-gray-600 text-sm">Color:</span>
                  <div className="flex items-center">
                    <span 
                      className="h-4 w-4 rounded-full mr-2 border border-gray-300"
                      style={{ backgroundColor: product.color.toLowerCase() }}
                    ></span>
                    <p className="font-medium">{product.color}</p>
                  </div>
                </div>
              )}
              
              {product.stock > 0 && (
                <div>
                  <span className="text-gray-600 text-sm">Availability:</span>
                  <p className="font-medium text-green-600">In Stock ({product.stock})</p>
                </div>
              )}
              
              {product.minimumOrderQuantity > 1 && (
                <div>
                  <span className="text-gray-600 text-sm">Minimum Order:</span>
                  <p className="font-medium">{product.minimumOrderQuantity} units</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || (product.minimumOrderQuantity && quantity <= product.minimumOrderQuantity)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full flex items-center justify-center py-3 px-6 rounded-md ${
              product.stock > 0 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors mb-4`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          {/* Tags */}
          {product.tag && (
            <div className="mt-4">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {product.tag}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} isLoading={false} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;