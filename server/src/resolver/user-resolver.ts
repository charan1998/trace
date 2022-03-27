import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ApiResponse } from "../types/output-types/api-response";
import UserModel, { User } from "../entity/user-entity";
import { RegisterInput } from "../types/input-types/register-input";
import { LoginInput } from "../types/input-types/login-input";
import { compare } from "bcrypt";
import { ResponseMessage } from "../constants/response-message";
import { AppContext } from "../types/app-context";
import { IsAuthenticated } from "../auth/is-authenticated";

@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    @UseMiddleware(IsAuthenticated)
    me(
        @Ctx() { req }: AppContext
    ): Promise<User | null> {
        const userId = req.session.userId;
        return UserModel.findById(userId).exec();
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
        @Arg("loginInput", () => LoginInput) { email, password }: LoginInput,
        @Ctx() { req }: AppContext
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

        req.session.userId = user.id;

        return {
            success: true
        };
    }
}