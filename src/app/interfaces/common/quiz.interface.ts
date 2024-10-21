import {StatusType} from "../../core/utils/all-data-types.type";
import {Category} from "./course-category.interface";
import {SubCategory} from "./sub-category.interface";
import {ChildCategory} from "./child-category.interface";

export type Quiz = {
  _id?: string;
  name?: string;
  questionCount?: number;
  timeInSec?: number;
  passMark?: number;
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
  isNegativeMark?: boolean;
  questions: Question[];
  image?: string;
  priority?: number;
  status?: StatusType;
  createdAt?: string;
  updatedAt?: string;
  select?: boolean;
};

export interface Question {
  name: string;
  image: string;
  briefQuestion: string;
  options: Option[];
}

export interface Option {
  name: string;
  isCorrect: boolean;
}
