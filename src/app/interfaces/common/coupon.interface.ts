import {Course} from "./course.interface";

export interface Coupon {
  image: any;
  select: boolean;
  _id?: string;
  name?: string;
  couponCode?: string;
  course?: Course;
  bannerImage?: string;
  description?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
