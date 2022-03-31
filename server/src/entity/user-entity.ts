import { getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";
import { hash } from "bcrypt";
import { Descriptions } from "../constants/descriptions";
import { Field, ObjectType } from "type-graphql";

@pre<User>("save", async function() {
    this.password = await hash(this.password, 10);
})

@ObjectType({
    description: Descriptions.USER_DESCRIPTION
})
@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class User {

    @Field(() => String, {
        nullable: false,
        description: Descriptions.USER_EMAIL_DESCRIPTION
    })
    @prop({ type: () => String, required: true, unique: true })
    email: string;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.USER_DISPLAY_NAME_DESCRIPTION
    })
    @prop({ type: () => String, required: true })
    displayName: string;

    @prop({ type: () => String, required: true })
    password: string;
}

const UserModel = getModelForClass(User);

export default UserModel;