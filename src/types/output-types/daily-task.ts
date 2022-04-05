import { Descriptions } from "../../constants/descriptions";
import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType({
    description: Descriptions.DAILY_TASK_DESCRIPTION
})
export class DailyTask {

    @Field(() => ID, {
        nullable: false,
        description: Descriptions.DAILY_TASK_TASK_ID_DESCRIPTION
    })
    id: ObjectId;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.DAILY_TASK_DESCRIPTION_DESCRIPTION
    })
    description: string;

    @Field(() => Date, {
        nullable: false,
        description: Descriptions.DAILY_TASK_DATE_DESCRIPTION
    })
    date: Date;

    @Field(() => Boolean, {
        nullable: false,
        description: Descriptions.DAILY_TASK_IS_DONE_DESCRIPTION
    })
    isDone: boolean;
}