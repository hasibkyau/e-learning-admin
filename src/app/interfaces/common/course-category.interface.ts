export interface Category {
  readOnly?: boolean;
  _id?: string;
  name: string;
  slug?: string;
  createdAt?: Date;
  image?:string;
  updatedAt?: Date;
  select?: boolean;
}
