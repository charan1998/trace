import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ApiResponse } from "../types/api-response-type";
import UserModel, { User } from "../entity/user-entity";
import { UserDetailsInput } from "../types/user-details-input-type";

@Resolver()
export class UserResolver {

    @Query(() => [User])
    getAllUsers(): Promise<User[]> {
        return UserModel.find().exec();
    }

    @Mutation(() => ApiResponse)
    async register(
        @Arg("userDetails", () => UserDetailsInput) userDetails: UserDetailsInput 
    ): Promise<ApiResponse> {

        const emailFound = await UserModel.countDocuments({ email: userDetails.email }) > 0;

        if (emailFound) {
            return {
                success: false,
                message: "E-mail ID already registered."
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
                message: "Error creating user."
            };
        }

        return {
            success: true
        };
    }
}