import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;

@Schema()
export class User extends Document {
    @Prop({required: true})
    fname: string;

    @Prop({required: true})
    lname: string

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);