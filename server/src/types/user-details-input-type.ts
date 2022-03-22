import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserDetailsInput {

    @Field(() => String, {nullable: false})
    @IsEmail({}, {
        message: "Please provide a valid E-mail ID"
    })
    email: string;

    @Field(() => String, {nullable: false})
    @Length(5, 50, {
        message: "Display name must be 5 to 50 characters long"
    })
    displayName: string;

    @Field(() => String, {nullable: false})
    @MinLength(10, {
        message: "Password must be atleast 10 characters long"
    })
    password: string;
}