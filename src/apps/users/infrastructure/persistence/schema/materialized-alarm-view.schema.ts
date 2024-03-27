import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class MaterializedUserView  {
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
export const MaterializedUserViewSchema  = SchemaFactory.createForClass(MaterializedUserView);
