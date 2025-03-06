import React from 'react';
import { Truck, Clock, Package, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const ShippingPolicyPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Shipping Policy" 
        description="Learn about Vaishnavi Enterprises shipping policies, delivery times, and shipping methods. We ensure safe and timely delivery of your stationery and office supplies."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shipping Policy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Shipping Methods</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Standard Delivery (3-5 business days)</li>
              <li>• Express Delivery (1-2 business days)</li>
              <li>• Same Day Delivery (within Jaipur city limits)</li>
              <li>• International Shipping (7-14 business days)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Processing Time</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Orders processed within 24 hours</li>
              <li>• Bulk orders may require additional processing time</li>
              <li>• Order confirmation sent via email</li>
              <li>• Tracking information provided once shipped</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Order Value</th>
                  <th className="px-4 py-2 text-left">Standard Delivery</th>
                  <th className="px-4 py-2 text-left">Express Delivery</th>
                  <th className="px-4 py-2 text-left">Same Day Delivery</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Below ₹500</td>
                  <td className="px-4 py-2">₹50</td>
                  <td className="px-4 py-2">₹100</td>
                  <td className="px-4 py-2">₹150</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">₹500 - ₹1000</td>
                  <td className="px-4 py-2">₹40</td>
                  <td className="px-4 py-2">₹80</td>
                  <td className="px-4 py-2">₹120</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Above ₹1000</td>
                  <td className="px-4 py-2">Free</td>
                  <td className="px-4 py-2">₹60</td>
                  <td className="px-4 py-2">₹100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Order Tracking</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Track your order status at any time through:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Order confirmation email</li>
              <li>• SMS updates</li>
              <li>• WhatsApp notifications</li>
              <li>• Our website's tracking system</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Shipping Insurance</h2>
            </div>
            <p className="text-gray-600 mb-4">
              All shipments are insured against:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Loss during transit</li>
              <li>• Damage during handling</li>
              <li>• Theft or misplacement</li>
              <li>• Weather-related incidents</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Delivery Areas:</strong> We deliver to all major cities across India. 
              International shipping is available to select countries.
            </p>
            <p>
              <strong>Bulk Orders:</strong> Special shipping arrangements and rates are 
              available for bulk orders. Please contact our sales team for details.
            </p>
            <p>
              <strong>Holiday Shipping:</strong> During peak seasons and holidays, 
              delivery times may be extended. We'll notify you of any potential delays.
            </p>
            <p>
              <strong>Address Accuracy:</strong> Please ensure your shipping address is 
              complete and accurate. Additional charges may apply for failed delivery attempts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicyPage;