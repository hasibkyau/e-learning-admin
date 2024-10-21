export interface Instructor {
  select: boolean;
  _id?: string;
  name?: string;
  slug?:string;
  info?: string;
  courseCount?:number;
  image?: string;
  status?: string;
  priority?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
