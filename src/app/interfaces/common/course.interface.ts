import {ChildCategory} from './child-category.interface';
import {Category} from './course-category.interface';
import {Instructor} from './instructor.interface';
import {SubCategory} from './sub-category.interface';
import {Tag} from './tag.interface';
import {Quiz} from './quiz.interface';

export interface Course {
  _id?: string;
  name: string;
  slug: string;
  type: 'video-course' | 'live-course' | 'lecture-sheet';
  description?: string;
  bannerImage?: string;
  image?: string;
  introYoutubeVideo?: string;
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
  tag?: Tag;
  instructor?: Instructor[];
  learningScopes?: string[];
  benefits?: string[];
  opportunities?: string[];
  isLiveClass?: boolean;
  groupLink?: string;
  courseModules?: CourseModule[];
  prices?: Price[];
  isMultiplePrice?: boolean;
  salePrice?: number;
  discountType?: number;
  discountAmount?: number;
  totalDuration?: string;
  totalUsers?: string;
  totalExam?: string;
  totalClass?: string;
  pdfAttachments?: PDFAttachment[];
  canSaleAttachment?: boolean;
  attachmentSalePrice?: number;
  attachmentDiscountType?: number;
  attachmentDiscountAmount?: number;
  status?: string;
  priority?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  specifications?: ProductSpecification[];
}

export interface CourseModule {
  _id?: string;
  name?: string;
  description?: string;
  video?: string;
  type?: string;
  attachment?: string;
  isFree?: boolean;
  quiz?: Quiz;
}

export interface Price {
  _id?: string;
  unit?: string;
  name?: string;
  duration: number,
  costPrice: number,
  salePrice: number,
  discountType: number,
  discountAmount: number;
}


export interface PDFAttachment {
  name?: string;
  url?: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
}
