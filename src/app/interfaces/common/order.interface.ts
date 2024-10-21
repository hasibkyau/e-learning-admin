import { OrderType } from "src/app/core/utils/app-data";
import { Category } from "./course-category.interface";
import { ChildCategory } from "./child-category.interface";
import { SubCategory } from "./sub-category.interface";
import { Unit } from "./unit.interface";

export type Order = {
  _id?: string;
  name?: string;
  phoneNo?: string;
  email?: string;
  paymentStatus?: string;
  orderStatus?: string;
  subTotal?: number;
  discount?: number;
  grandTotal?: number;
  totalSold?: number;
  checkoutDate?: string;
  note?: string;
  user?: string;
  orderType?: OrderType;
  liveCourseCode?: string;
  approveStatus?: string;
  orderItem?: Item;
  registrationDate?: string;
  isFreeOrder?:boolean;
  select?:boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface Item {
  _id?: string;
  name?: string;
  slug?: string;
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
  isLiveClass?: boolean;
  salePrice?: number;
  discountType?: number;
  discountAmount?: number;
  unit?: Unit;
}
