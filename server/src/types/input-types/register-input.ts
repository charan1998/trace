import { IsEmail, Length, MinLength } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {

    @Field(() => String, {nullable: false})
    @IsEmail({}, {
        message: ValidationMessage.EMAIL_INVALID_MESSAGE
    })
    email: string;

    @Field(() => String, {nullable: false})
    @Length(5, 50, {
        message: ValidationMessage.DISPLAY_NAME_LENGTH_MESSAGE
    })
    displayName: string;

    @Field(() => String, {nullable: false})
    @MinLength(10, {
        message: ValidationMessage.PASSWORD_MIN_LENGTH_MESSAGE
    })
    password: string;
}