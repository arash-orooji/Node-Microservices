import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  gender: string;
  @Prop()
  avatar: Buffer;
}
export const UserSchema = SchemaFactory.createForClass(User);
