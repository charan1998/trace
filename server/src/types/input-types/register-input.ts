import { IsEmail, Length, MinLength } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";
import { Field, InputType } from "type-graphql";
import { Descriptions } from "../../constants/descriptions";

@InputType({
    description: Descriptions.REGISTER_INPUT_DESCRIPTION
})
export class RegisterInput {

    @Field(() => String, {
        nullable: false,
        description: Descriptions.REGISTER_INPUT_EMAIL_DESCRIPTION
    })
    @IsEmail({}, {
        message: ValidationMessage.EMAIL_INVALID_MESSAGE
    })
    email: string;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.REGISTER_INPUT_DISPLAY_NAME_DESCRIPTION
    })
    @Length(5, 50, {
        message: ValidationMessage.DISPLAY_NAME_LENGTH_MESSAGE
    })
    displayName: string;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.REGISTER_INPUT_PASSWORD_DESCRIPTION
    })
    @MinLength(10, {
        message: ValidationMessage.PASSWORD_MIN_LENGTH_MESSAGE
    })
    password: string;
}