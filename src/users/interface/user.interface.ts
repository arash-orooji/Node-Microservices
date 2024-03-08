import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: string;
  readonly avatar: Buffer;
}
