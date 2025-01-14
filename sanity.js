// sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: "74oywf4n", 
  dataset: 'production',      
  useCdn: false,               
  apiVersion: '2025-01-12',    
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
