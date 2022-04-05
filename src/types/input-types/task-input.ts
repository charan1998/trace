import { RecurringType } from "../../enum/recurring-type-enum";
import { Field, InputType, Int } from "type-graphql";
import { IsBoolean, IsDate, IsEnum, IsInt, Length, Max, Min } from "class-validator";
import { ValidationMessage } from "../../constants/validation-message";
import { Descriptions } from "../../constants/descriptions";

@InputType({
    description: Descriptions.TASK_INPUT_DESCRIPTION
})
export class TaskInput {

    @Field(() => String, {
        nullable: false,
        description: Descriptions.TASK_INPUT_DESCRIPTION_DESCRIPTION
    })
    @Length(1, 2000, {
        message: ValidationMessage.TASK_DESCRIPTION_MESSAGE
    })
    description: string;

    @Field(() => Boolean, {
        nullable: false,
        description: Descriptions.TASK_INPUT_IS_RECURRING_DESCRIPTION
    })
    @IsBoolean({
        message: ValidationMessage.IS_RECURRING_MESSAGE
    })
    isRecurring: boolean;

    @Field({
        nullable: true,
        description: Descriptions.TASK_INPUT_ON_DATE_DESCRIPTION
    })
    @IsDate({
        message: ValidationMessage.ON_DATE_MESSAGE
    })
    onDate?: Date;

    @Field(() => Date, {
        nullable: true,
        description: Descriptions.TASK_INPUT_FROM_DATE_DESCRIPTION
    })
    @IsDate({
        message: ValidationMessage.FROM_DATE_MESSAGE
    })
    fromDate?: Date;

    @Field(() => Date, {
        nullable: true,
        description: Descriptions.TASK_INPUT_TO_DATE_DESCRIPTION
    })
    @IsDate({
        message: ValidationMessage.TO_DATE_MESSAGE
    })
    toDate?: Date;

    @Field(() => RecurringType, {
        nullable: true,
        description: Descriptions.TASK_INPUT_RECURRING_TYPE_DESCRIPTION
    })
    @IsEnum(RecurringType, {
        message: ValidationMessage.RECURRING_TYPE_MESSAGE
    })
    recurringType?: RecurringType;

    @Field(() => Int, {
        nullable: true,
        description: Descriptions.TASK_INPUT_PERIOD_TYPE_DESCRIPTION
    })
    @IsInt({
        message: ValidationMessage.PERIOD_MESSAGE
    })
    @Min(1, {
        message: ValidationMessage.PERIOD_MESSAGE
    })
    period?: number;

    @Field(() => [Int], {
        nullable: true,
        description: Descriptions.TASK_INPUT_DAYS_OF_THE_WEEK_DESCRIPTION
    })
    @IsInt({
        each: true,
        message: ValidationMessage.DAYS_OF_THE_WEEK_MESSAGE
    })
    @Min(1, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_WEEK_MESSAGE
    })
    @Max(7, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_WEEK_MESSAGE
    })
    daysOfTheWeek?: number[];

    @Field(() => [Int], {
        nullable: true,
        description: Descriptions.TASK_INPUT_DAYS_OF_THE_MONTH_DESCRIPTION
    })
    @IsInt({
        each: true,
        message: ValidationMessage.DAYS_OF_THE_MONTH_MESSAGE
    })
    @Min(1, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_MONTH_MESSAGE
    })
    @Max(31, {
        each: true,
        message: ValidationMessage.DAYS_OF_THE_MONTH_MESSAGE
    })
    daysOfTheMonth?: number[];
}