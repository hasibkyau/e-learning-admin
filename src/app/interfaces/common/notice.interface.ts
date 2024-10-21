
export interface Notice {
  _id?: string;
  name?: string;
  bannerImage?: string;
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
