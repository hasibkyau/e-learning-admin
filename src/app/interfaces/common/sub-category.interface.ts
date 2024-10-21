import { Category } from "./course-category.interface";


export interface SubCategory {
  _id?: string;
  name?: string;
  slug: any;
  image?:string;
  category?: Category;
  select: Boolean;
  status?: string;
  priority?:number;
  createdAt?: Date;
  updatedAt?: Date;
}
