
export interface ProductType {
  _id?: string;
  select: boolean;
  name?: string;
  image?: string;
  type?: string;
  url?: string;
  urlType?: string;
  priority?: number;
  status?: 'publish' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}
