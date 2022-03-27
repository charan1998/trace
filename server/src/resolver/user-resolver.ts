import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ApiResponse } from "../types/output-types/api-response";
import UserModel, { User } from "../entity/user-entity";
import { RegisterInput } from "../types/input-types/register-input";
import { LoginInput } from "../types/input-types/login-input";
import { compare } from "bcrypt";
import { ResponseMessage } from "../constants/response-message";

@Resolver()
export class UserResolver {

    @Query(() => [User])
    getAllUsers(): Promise<User[]> {
        return UserModel.find().exec();
    }

    @Mutation(() => ApiResponse)
    async register(
        @Arg("registerInput", () => RegisterInput) userDetails: RegisterInput 
    ): Promise<ApiResponse> {

        const emailFound = await UserModel.countDocuments({ email: userDetails.email }) > 0;

        if (emailFound) {
            return {
                success: false,
                message: ResponseMessage.EMAIL_ALREADY_REGISTERED
            };
        }

        try {
            const user = new UserModel({
                email: userDetails.email,
                displayName: userDetails.displayName,
                password: userDetails.password
            });
            await user.save();
        }
        catch (err) {
            console.error(err);
            return {
                success: false,
                message: ResponseMessage.USER_CREATION_ERROR
            };
        }

        return {
            success: true
        };
    }

    @Mutation(() => ApiResponse)
    async login(
        @Arg("loginInput", () => LoginInput) { email, password }: LoginInput
    ): Promise<ApiResponse> {

        const user = await UserModel.findOne({ email }).exec();

        if(!user) {
            return {
                success: false,
                message: ResponseMessage.INVALID_LOGIN
            };
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return {
                success: false,
                message: ResponseMessage.INVALID_LOGIN
            };
        }

        return {
            success: true
        };
    }
}