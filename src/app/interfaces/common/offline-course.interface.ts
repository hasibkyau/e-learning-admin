import {Category} from "./course-category.interface";
import {SubCategory} from "./sub-category.interface";

export interface OfflineCourse {
  _id?: string;
  name?: string;
  select: boolean;
  slug?: string;
  description?: string;
  shortDesc?: string;
  image?: string;
  category?: Category;
  subCategory?: SubCategory;
  priority?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
