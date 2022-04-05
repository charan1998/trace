import { IsEmail, IsNotEmpty } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";
import { Field, InputType } from "type-graphql";
import { Descriptions } from "../../constants/descriptions";

@InputType({
    description: Descriptions.LOGIN_INPUT_DESCRIPTION
})
export class LoginInput {

    @Field(() => String, {
        nullable: false,
        description: Descriptions.LOGIN_INPUT_EMAIL_DESCRIPTION
    })
    @IsEmail({}, {
        message: ValidationMessage.EMAIL_INVALID_MESSAGE
    })
    email: string;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.LOGIN_INPUT_PASSWORD_DESCRIPTION
    })
    @IsNotEmpty({
        message: ValidationMessage.PASSWORD_EMPTY_MESSAGE
    })
    password: string;
}