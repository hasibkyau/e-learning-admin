import { Course } from "./course.interface";

/* eslint-disable prettier/prettier */
export interface Review {
  select: boolean;
  _id?: string;
  user:User;
  course?:Course;
  review?: string;
  rating?:number;
  status:"publish" | "draft",
  priority?:number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface User{
  name:string,
  username:string,
  phoneNo: string,
  email: string,
  profileImg:string;
}
