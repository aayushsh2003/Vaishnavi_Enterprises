import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from '../types/Product';

interface ProductSchemaProps {
  product: Product;
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.details,
    image: [product.thumbnail, product.image1, product.image2, product.image3].filter(Boolean),
    sku: product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      url: `https://vaishnavienterprise.com/product/${product.id}`,
      priceCurrency: 'INR',
      price: product.discountedPrice,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Vaishnavi Enterprises'
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;