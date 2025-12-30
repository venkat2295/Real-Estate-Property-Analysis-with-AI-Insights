
export interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  aiAnalysis?: {
    estimatedValue: number;
    confidenceScore: number;
    verdict: 'Overpriced' | 'Underpriced' | 'Fair Value';
    summary: string;
    pros: string[];
    cons: string[];
  };
  
}

export interface PropertyFormData {
  title: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
}
export interface ApiResponse<T> {
  data: T;
  success?: boolean; 
  message?: string;  
}