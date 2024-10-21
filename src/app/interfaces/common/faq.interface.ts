
export interface Faq {
  _id?: string;
  select: boolean;
  name?: string;
  image?: string;
  answer?: string;
  type?: string;
  url?: string;
  urlType?: string;
  priority?: number;
  status?: 'publish' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}
