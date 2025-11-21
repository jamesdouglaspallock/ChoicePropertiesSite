export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  type: string;
  location: string;
  images: string[];
  featured: boolean;
}
