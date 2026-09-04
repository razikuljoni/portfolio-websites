export interface Property {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  priceFormatted: string;
  listingType: 'sale' | 'rent';
  propertyType: 'Penthouse' | 'Modernist Villa' | 'Alpine Chalet' | 'Waterfront Estate' | 'Historic Residence' | 'Minimalist Haven';
  status: 'Exclusive' | 'Active' | 'Under Offer' | 'Private Collection';
  location: {
    city: string;
    neighborhood: string;
    country: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    livingAreaSqFt: number;
    livingAreaSqM: number;
    lotSizeSqFt: number;
    lotSizeSqM: number;
    yearBuilt: number;
    architect: string;
    architecturalStyle: string;
    energyRating: 'A+++' | 'A++' | 'A+' | 'A' | 'B';
    hoaMonthly: number;
    annualTaxes: number;
  };
  amenities: string[];
  images: {
    url: string;
    caption: string;
  }[];
  floorPlans: {
    level: string;
    dimensions: string;
    image: string;
    description: string;
  }[];
  virtualTourUrl?: string;
  agentId: string;
  featured: boolean;
  publishedAt: string;
  scores: {
    walk: number;
    transit: number;
    schools: number;
    privacy: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  title: string;
  office: string;
  email: string;
  phone: string;
  languages: string[];
  photo: string;
  bio: string;
  specialization: string;
  experienceYears: number;
  totalVolume: string;
  activeListingsCount: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  country: string;
  region: 'Switzerland' | 'Europe' | 'Americas' | 'Asia-Pacific';
  description: string;
  highlightText: string;
  image: string;
  medianPricePerSqM: string;
  medianPricePerSqFt: string;
  fiveYearGrowth: string;
  michelinRestaurants: number;
  greenSpacePercent: number;
  lifestyleTags: string[];
  featuredEstatesCount: number;
  atmosphere: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  propertyTransacted: string;
  year: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: 'Architectural Spotlight' | 'Market Intelligence' | 'Interior Craft' | 'Sustainable Design';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
}

export interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  metric?: string;
}

export interface FilterState {
  searchQuery: string;
  listingType: 'all' | 'sale' | 'rent';
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minBathrooms: number;
  city: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'year-desc';
  selectedAmenities: string[];
}

export interface ViewingBooking {
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  tourType: 'in-person' | 'virtual-360';
  notes?: string;
  agentName?: string;
}
