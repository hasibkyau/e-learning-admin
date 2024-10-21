
export interface Popup {
  _id?: string;
  select: boolean;
  name?: string;
  image?: string;
  type?: string;
  url?: string;
  urlType?: string;
  priority?: number;
  enableVideo?: boolean;
  enableImage?: boolean;
  status?: 'publish' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}
