import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  gender: string;
  @Prop()
  avatar: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
