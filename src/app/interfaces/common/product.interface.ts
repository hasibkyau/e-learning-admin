import { Brand } from './brand.interface';
import {Tag} from './tag.interface';

import {SubCategory} from './sub-category.interface';
import {Author} from './author.interface';
import {Publisher} from './publisher.interface';
import {ProductCategory} from "./product-category.interface";

export interface Product {
  selectedVariation: any;
  // publisher: any;
  _id?: string;
  name: string;
  slug?: string;
  nameEn?: string;
  url?: string;
  edition?: string;
  pdfFile?: any;
  description?: string;
  productType?: string;
  shortDescription?: string;
  featureTitle?: string;
  language?: string;
  country?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  sku: string;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: ProductCategory;
  subCategory?: SubCategory;
  author?: Author[];
  brand?: Brand;
  totalPages?:number | any;
  currentVersion?: string;
  publishedDate?:Date;
  translatorName?:any;
  publisher?: Publisher;
  tags?: string[] | Tag[];
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
  hasVariations?: boolean;
  // variations?: Variation[];
  // variationsOptions?: VariationOption[];
  status?: string;
  videoUrl?: string;
  threeMonth?: number;
  sixMonth?: number;
  twelveMonth?: number;
  unit?: string;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  selectedQty?: number;
  // For Create Order
  // orderVariationOption?: VariationOption;
  orderVariation?: string;

  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
}

interface CatalogInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
  type?: string;
}

export interface ProductFeature {
  name?: string;
  value?: string;
}
