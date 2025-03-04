import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoriesPage from './pages/CategoriesPage';
import TestDataFetch from './components/TestDataFetch';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/test-data" element={<TestDataFetch />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Us</h3>
                  <p className="text-gray-600 mb-4">
                    Vaishnavi Enterprises is a leading provider of premium stationery and office supplies at wholesale prices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link></li>
                    <li><Link to="/products" className="text-gray-600 hover:text-indigo-600">Products</Link></li>
                    <li><Link to="/categories" className="text-gray-600 hover:text-indigo-600">Categories</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600">Contact Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600">Shipping Policy</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600">Return Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                  <p className="text-gray-600 mb-2">Email: info@vaishnavienterprise.com</p>
                  <p className="text-gray-600 mb-2">Phone: +91 9876543210</p>
                  <p className="text-gray-600">Address: 123 Main Street, Mumbai, India</p>
                </div>
              </div>
              <div className="text-center text-gray-600 pt-6 border-t border-gray-200">
                <p>&copy; {new Date().getFullYear()} Vaishnavi Enterprises. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;