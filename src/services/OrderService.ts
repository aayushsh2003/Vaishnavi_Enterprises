import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CustomerDetails {
  fullName: string;
  contactNumber: string;
  email: string;
  address: string;
  preferredDeliveryTime: string;
  specialInstructions: string;
}

interface OrderDetails {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  customerDetails: CustomerDetails;
  orderDate: Date;
  estimatedDeliveryDate: Date;
}

export const sendOrderConfirmationEmail = async (orderDetails: OrderDetails): Promise<boolean> => {
  // In a real application, this would connect to an email service API
  // For this demo, we'll just simulate a successful email send
  console.log('Sending email to:', orderDetails.customerDetails.email);
  console.log('Order details:', orderDetails);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return true;
};

export const sendOrderToWhatsApp = async (orderDetails: OrderDetails, whatsappNumber: string): Promise<boolean> => {
  // In a real application, this would connect to a WhatsApp Business API
  // For this demo, we'll just simulate a successful message send
  console.log('Sending WhatsApp message to:', whatsappNumber);
  console.log('Order details:', orderDetails);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return true;
};

export const createOrder = async (
  orderId: string,
  items: CartItem[],
  totalAmount: number,
  customerDetails: CustomerDetails
): Promise<OrderDetails> => {
  // In a real application, this would save the order to a database
  // For this demo, we'll just create and return the order object
  
  const orderDate = new Date();
  const estimatedDeliveryDate = new Date(orderDate);
  estimatedDeliveryDate.setDate(orderDate.getDate() + 3); // Delivery in 3 days
  
  const orderDetails: OrderDetails = {
    orderId,
    items,
    totalAmount,
    customerDetails,
    orderDate,
    estimatedDeliveryDate
  };
  
  // Simulate API call to save order
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Send confirmations
  await sendOrderConfirmationEmail(orderDetails);
  await sendOrderToWhatsApp(orderDetails, '7023312573');
  
  return orderDetails;
};