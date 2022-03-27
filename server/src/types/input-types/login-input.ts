import { IsEmail, IsNotEmpty } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field(() => String, { nullable: false })
    @IsEmail({}, {
        message: ValidationMessage.EMAIL_INVALID_MESSAGE
    })
    email: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty({
        message: ValidationMessage.PASSWORD_EMPTY_MESSAGE
    })
    password: string;
}