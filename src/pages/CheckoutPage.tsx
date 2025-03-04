import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CustomerDetails {
  fullName: string;
  contactNumber: string;
  email: string;
  address: string;
  preferredDeliveryTime: string;
  specialInstructions: string;
}

interface FormErrors {
  fullName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  preferredDeliveryTime?: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(2); // Start at step 2 (customer details)
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    contactNumber: '',
    email: '',
    address: '',
    preferredDeliveryTime: '',
    specialInstructions: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Generate a random order ID when the component mounts
  useEffect(() => {
    const generateOrderId = () => {
      const timestamp = new Date().getTime().toString().slice(-8);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `VE-${timestamp}-${random}`;
    };

    setOrderId(generateOrderId());
  }, []);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate('/cart');
    }
  }, [cart, navigate, step]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!customerDetails.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!customerDetails.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(customerDetails.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
      isValid = false;
    }

    if (!customerDetails.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!customerDetails.address.trim()) {
      newErrors.address = 'Delivery address is required';
      isValid = false;
    }

    if (!customerDetails.preferredDeliveryTime.trim()) {
      newErrors.preferredDeliveryTime = 'Preferred delivery time is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate sending email and WhatsApp message
      console.log('Sending order summary to customer email:', customerDetails.email);
      console.log('Sending order summary to WhatsApp number: 7023312573');
      
      // Move to confirmation step
      setStep(3);
      
      // Clear cart after successful order
      clearCart();
    } catch (error) {
      setSubmitError('There was an error processing your order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // Delivery in 3 days
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderCustomerForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Customer Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={customerDetails.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={customerDetails.contactNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.contactNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit mobile number"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Complete address with pincode"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="preferredDeliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Delivery Time <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredDeliveryTime"
              name="preferredDeliveryTime"
              value={customerDetails.preferredDeliveryTime}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.preferredDeliveryTime ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a time slot</option>
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
              <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
              <option value="Any Time">Any Time</option>
            </select>
            {errors.preferredDeliveryTime && (
              <p className="mt-1 text-sm text-red-500">{errors.preferredDeliveryTime}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions (Optional)
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={customerDetails.specialInstructions}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Any special delivery instructions"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Cart
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
        
        {submitError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{submitError}</p>
          </div>
        )}
      </form>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Order ID:</span>
          <span className="font-medium">{orderId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Delivery:</span>
          <span className="font-medium">{getEstimatedDeliveryDate()}</span>
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-3">Items</h3>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <div>
                <span className="font-medium">{item.product.name}</span>
                <span className="text-gray-500 ml-2">x{item.quantity}</span>
              </div>
              <span>₹{(item.product.discountedPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span>₹0.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We've sent a confirmation to your email address.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order ID:</span>
          <span className="font-medium">{orderId}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Delivery:</span>
          <span className="font-medium">{getEstimatedDeliveryDate()}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8">
        We'll notify you when your order ships. For any questions, please contact our customer support.
      </p>
      
      <button
        onClick={() => navigate('/')}
        className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="text-sm mt-1">Cart</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="text-sm mt-1">Checkout</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 3 ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'
              }`}>
                3
              </div>
              <span className="text-sm mt-1">Confirmation</span>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {step === 2 && renderCustomerForm()}
            {step === 3 && renderOrderConfirmation()}
          </div>
          
          <div className="md:col-span-1">
            {step !== 3 && renderOrderSummary()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;