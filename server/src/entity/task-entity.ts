import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Descriptions } from "../constants/descriptions";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { RecurringType } from "../enum/recurring-type-enum";
import { User } from "./user-entity";

@ObjectType({
    description: Descriptions.TASK_DESCRIPTION
})
@modelOptions({ schemaOptions: { collection: "task", timestamps: true } })
export class Task {

    @Field(() => ID, {
        nullable: false,
        description: Descriptions.TASK_USER_DESCRIPTION
    })
    @prop({ ref: () => User })
    user: Ref<User>;

    @Field(() => String, {
        nullable: false,
        description: Descriptions.TASK_DESCRIPTION_DESCRIPTION
    })
    @prop({ type: () => String, required: true })
    description: string;

    @Field(() => Boolean, {
        nullable: false,
        description: Descriptions.TASK_IS_RECURRING_DESCRIPTION
    })
    @prop({ type: () => Boolean, required: true })
    isRecurring: boolean;

    @Field(() => Date, {
        nullable: true,
        description: Descriptions.TASK_ON_DATE_DESCRIPTION
    })
    @prop({ type: () => Date, required: false })
    onDate?: Date;

    @Field(() => Date, {
        nullable: true,
        description: Descriptions.TASK_FROM_DATE_DESCRIPTION
    })
    @prop({ type: () => Date, required: false })
    fromDate?: Date;

    @Field(() => Date, {
        nullable: true,
        description: Descriptions.TASK_TO_DATE_DESCRIPTION
    })
    @prop({ type: () => Date, required: false })
    toDate?: Date;

    @Field(() => RecurringType, {
        nullable: true,
        description: Descriptions.TASK_RECURRING_TYPE_DESCRIPTION
    })
    @prop({ type: () => String, enum: RecurringType, required: false })
    recurringType?: RecurringType;

    @Field(() => Int, {
        nullable: true,
        description: Descriptions.TASK_PERIOD_TYPE_DESCRIPTION
    })
    @prop({ type: () => Number, required: false })
    period?: number;

    @Field(() => [Int], {
        nullable: true,
        description: Descriptions.TASK_DAYS_OF_THE_WEEK_DESCRIPTION
    })
    @prop({ type: () => [Number], required: false })
    daysOfTheWeek?: number[];

    @Field(() => [Int], {
        nullable: true,
        description: Descriptions.TASK_DAYS_OF_THE_MONTH_DESCRIPTION
    })
    @prop({ type: () => [Number], required: false })
    daysOfTheMonth?: number[];

    @Field(() => [Date], {
        defaultValue: [],
        description: Descriptions.TASK_DONE_ON_DESCRIPTION
    })
    @prop({ type: () => [Date], required: true, default: []})
    doneOn: Date[];
}

const TaskModel = getModelForClass(Task);

export default TaskModel;