import React from 'react';
import { RotateCcw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Return Policy" 
        description="Learn about Vaishnavi Enterprises return and refund policies. We ensure customer satisfaction with our hassle-free return process for stationery and office supplies."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Return Policy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Eligible Items</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Unused and unopened items</li>
              <li>• Damaged or defective products</li>
              <li>• Incorrect items received</li>
              <li>• Items in original packaging</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Non-Returnable Items</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Customized or personalized items</li>
              <li>• Used or opened products</li>
              <li>• Bulk order items</li>
              <li>• Clearance sale items</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Return Process</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Initiate Return</h3>
                <p className="text-gray-600">
                  Contact our customer service team within 7 days of receiving your order. 
                  You can reach us through email, phone, or the contact form on our website.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Return Authorization</h3>
                <p className="text-gray-600">
                  Our team will review your return request and provide you with a Return 
                  Authorization (RA) number and return shipping instructions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Package the Item</h3>
                <p className="text-gray-600">
                  Pack the item securely in its original packaging along with all accessories 
                  and documentation. Include the RA number on the package.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Ship the Return</h3>
                <p className="text-gray-600">
                  Send the package to our return address using a tracked shipping service. 
                  Keep the tracking number for reference.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <RotateCcw className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Refund Process</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Refunds processed within 5-7 business days</li>
              <li>• Original payment method will be refunded</li>
              <li>• Shipping charges may be non-refundable</li>
              <li>• Store credit option available</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Return Timeline</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 7 days return window</li>
              <li>• 48 hours for return approval</li>
              <li>• 5-7 days for refund processing</li>
              <li>• 24 hours for replacement dispatch</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Damaged Items:</strong> If you receive a damaged item, please take 
              photos of the damage and contact us immediately. We'll arrange for a 
              replacement or refund.
            </p>
            <p>
              <strong>Exchange Options:</strong> We offer direct exchanges for items of 
              equal or lesser value. If exchanging for a higher-priced item, you'll need 
              to pay the difference.
            </p>
            <p>
              <strong>Quality Guarantee:</strong> We stand behind the quality of our 
              products. If you're not satisfied with your purchase, please let us know, 
              and we'll make it right.
            </p>
            <p>
              <strong>Bulk Orders:</strong> Special return policies apply to bulk orders. 
              Please contact our sales team for specific details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;