import { Product } from '../types/Product';

// Google Sheet ID from the provided URL
const SHEET_ID = '1PkK7NdYlQhHbD1-Jst3Qq4BF9prYqrp4XBlwtzql6yA';
const TAB_NAME = 'Sheet1';

// Google Sheets API URL to fetch the data as CSV
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${TAB_NAME}`;

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    
    const csvText = await response.text();
    const products = parseCSV(csvText);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function parseCSV(csvText: string): Product[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => 
    header.trim().replace(/^"|"$/g, '')
  );
  
  const products: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Handle commas within quoted fields
    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let char of lines[i]) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue); // Add the last value
    
    // Clean up values (remove quotes)
    const cleanValues = values.map(val => val.replace(/^"|"$/g, '').trim());
    
    const product: Product = {
      id: `product-${i}`,
      name: cleanValues[headers.indexOf('Name')] || '',
      category: cleanValues[headers.indexOf('Category')] || '',
      code: cleanValues[headers.indexOf('Code')] || '',
      price: parseFloat(cleanValues[headers.indexOf('Price')]) || 0,
      discountedPrice: parseFloat(cleanValues[headers.indexOf('Discounted Price')]) || 0,
      details: cleanValues[headers.indexOf('Details')] || '',
      size: cleanValues[headers.indexOf('Size')] || '',
      color: cleanValues[headers.indexOf('Color')] || '',
      brand: cleanValues[headers.indexOf('Brand')] || '',
      tag: cleanValues[headers.indexOf('Tag')] || '',
      stock: parseInt(cleanValues[headers.indexOf('Stock')]) || 0,
      availability: cleanValues[headers.indexOf('Availability')] || '',
      thumbnail: cleanValues[headers.indexOf('Thumbnail')] || '',
      image1: cleanValues[headers.indexOf('Image1')] || '',
      image2: cleanValues[headers.indexOf('Image2')] || '',
      image3: cleanValues[headers.indexOf('Image3')] || '',
      minimumOrderQuantity: parseInt(cleanValues[headers.indexOf('Minimum Order Quantity')]) || 1
    };
    
    products.push(product);
  }
  
  return products;
}