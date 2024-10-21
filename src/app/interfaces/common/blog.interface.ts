
export interface Blog {
  _id?: string;
  name?: string;
  select: boolean;
  slug?: string;
  description?: string;
  shortDesc?: string;
  image?: string;
  priority?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
