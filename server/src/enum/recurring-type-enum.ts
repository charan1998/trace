import { registerEnumType } from "type-graphql";

export enum RecurringType {
    FIXED = 'FIXED',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY'
}

registerEnumType(RecurringType, {
    name: "RecurringType",
    description: "Types of recurring tasks"
});