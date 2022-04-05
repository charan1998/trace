import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ApiResponse {

    @Field(() => Boolean)
    success: boolean;

    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => [String], { nullable: true })
    errors?: string[];
}