import { Category } from "./course-category.interface";
import { SubCategory } from "./sub-category.interface";


export interface ChildCategory {
  _id?: string;
  name?: string;
  slug: any;
  image?:string;
  category?: Category;
  subCategory?:SubCategory;
  select: Boolean;
  status?: string;
  priority?:number;
  createdAt?: Date;
  updatedAt?: Date;
}
