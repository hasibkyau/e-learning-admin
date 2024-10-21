import { Product } from './product.interface';
import { User } from './user.interface';

export interface ProductReview {
  _id?: string;
  image?: string;
  user?:  User;
  product?: Product;
  name?: string;
  reviewDate: string;
  review: string;
  rating: number;
  status: boolean;
  isReview: boolean;
  reply: string;
  replyDate: string;
  select?: boolean;
}
