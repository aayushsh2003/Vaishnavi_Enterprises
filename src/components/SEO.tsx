import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) => {
  const siteTitle = 'Vaishnavi Enterprises';
  const defaultDescription = 'Premium stationery and office supplies at wholesale prices. Shop our wide selection of high-quality products for your workspace needs.';
  const defaultImage = 'https://vaishnavienterprise.com/og-image.jpg';
  const defaultUrl = 'https://vaishnavienterprise.com';
  const defaultKeywords = 'stationery, office supplies, wholesale, Jaipur, notebooks, pens, office equipment';

  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url || defaultUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Vaishnavi Enterprises" />
      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Jaipur" />
      <meta name="geo.position" content="26.8897;75.7967" />
      <meta name="ICBM" content="26.8897, 75.7967" />
      
      {/* Mobile Specific */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#4F46E5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
  );
};

export default SEO;