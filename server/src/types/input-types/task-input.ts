import { RecurringType } from "../../enum/recurring-type-enum";
import { Field, InputType, Int } from "type-graphql";
import { IsBoolean, IsDate, IsEnum, IsInt, Length, Min } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";

@InputType()
export class TaskInput {

    @Field(() => String, { nullable: false })
    @Length(1, 2000, {
        message: ValidationMessage.TASK_DESCRIPTION_MESSAGE
    })
    description: string;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean({
        message: ValidationMessage.IS_RECURRING_MESSAGE
    })
    isRecurring: boolean;

    @Field({ nullable: true })
    @IsDate({
        message: ValidationMessage.ON_DATE_MESSAGE
    })
    onDate?: Date;

    @Field(() => Date, { nullable: true })
    @IsDate({
        message: ValidationMessage.FROM_DATE_MESSAGE
    })
    fromDate?: Date;

    @Field(() => Date, { nullable: true })
    @IsDate({
        message: ValidationMessage.TO_DATE_MESSAGE
    })
    toDate?: Date;

    @Field(() => RecurringType, { nullable: true })
    @IsEnum(RecurringType, {
        message: ValidationMessage.RECURRING_TYPE_MESSAGE
    })
    recurringType?: RecurringType;

    @Field(() => Int, { nullable: true })
    @IsInt({
        message: ValidationMessage.PERIOD_MESSAGE
    })
    @Min(1, {
        message: ValidationMessage.PERIOD_MESSAGE
    })
    period?: number;

    @Field(() => [Int], { nullable: true })
    @IsInt({
        each: true,
        message: ValidationMessage.DAYS_OF_THE_WEEK_MESSAGE
    })
    @Min(1, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_WEEK_MESSAGE
    })
    daysOfTheWeek?: number[];

    @Field(() => [Int], { nullable: true })
    @IsInt({
        each: true,
        message: ValidationMessage.DAYS_OF_THE_MONTH_MESSAGE
    })
    @Min(1, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_MONTH_MESSAGE
    })
    daysOfTheMonth?: number[];
}