import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { RecurringType } from "../enum/recurring-type-enum";
import { User } from "./user-entity";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "task", timestamps: true } })
export class Task {

    @Field(() => ID, { nullable: false })
    @prop({ ref: () => User })
    user: Ref<User>;

    @Field(() => String, { nullable: false })
    @prop({ type: () => String, required: true })
    description: string;

    @Field(() => Boolean, { nullable: false })
    @prop({ type: () => Boolean, required: true })
    isRecurring: boolean;

    @Field(() => Date, { nullable: true })
    @prop({ type: () => Date, required: false })
    onDate?: Date;

    @Field(() => Date, { nullable: true })
    @prop({ type: () => Date, required: false })
    fromDate?: Date;

    @Field(() => Date, { nullable: true })
    @prop({ type: () => Date, required: false })
    toDate?: Date;

    @Field(() => RecurringType, { nullable: true })
    @prop({ type: () => String, enum: RecurringType, required: false })
    recurringType?: RecurringType;

    @Field(() => Int, { nullable: true })
    @prop({ type: () => Number, required: false })
    period?: number;

    @Field(() => [Int], { nullable: true })
    @prop({ type: () => [Number], required: false })
    daysOfTheWeek?: number[];

    @Field(() => [Int], { nullable: true })
    @prop({ type: () => [Number], required: false })
    daysOfTheMonth?: number[];

    @Field(() => [Date], { nullable: false, defaultValue: [] })
    @prop({ type: () => [Date], required: true, default: []})
    doneOn: Date[];
}

const TaskModel = getModelForClass(Task);

export default TaskModel;