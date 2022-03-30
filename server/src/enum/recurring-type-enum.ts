import { registerEnumType } from "type-graphql";

export enum RecurringType {
    FIXED = 'FIXED',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTLY'
}

registerEnumType(RecurringType, {
    name: "RecurringType",
    description: "Types of recurring tasks"
});