import { ValidationMessage } from "../constants/validation-message";
import { RecurringType } from "../enum/recurring-type-enum";
import { TaskInput } from "../types/input-types/task-input";
import { isArrayEmpty, isEmpty } from "../utils/app-utils";

export function validateTaskInput(taskInput: TaskInput): string[] {
  const errors: string[] = [];
  
  if (taskInput.isRecurring) {
    validateRecurringTask(taskInput).forEach(error => errors.push(error));
  }
  else {
    validateNonRecurringTask(taskInput).forEach(error => errors.push(error));
  }

  return errors;
}

function validateRecurringTask(taskInput: TaskInput): string[] {
  const errors: string[] = [];

  if (isEmpty(taskInput.fromDate)) {
    errors.push(ValidationMessage.FROM_DATE_REQUIRED_MESSAGE);
  }

  if (isEmpty(taskInput.recurringType)) {
    errors.push(ValidationMessage.RECURRING_TYPE_REQIRED_MESSAGE);
  }

  if (taskInput.recurringType === RecurringType.FIXED && isEmpty(taskInput.period)) {
    errors.push(ValidationMessage.PERIOD_REQUIRED_MESSAGE);
  }

  if (taskInput.recurringType === RecurringType.WEEKLY && isArrayEmpty(taskInput.daysOfTheWeek)) {
    errors.push(ValidationMessage.DAYS_OF_THE_WEEK_REQUIRED_MESSAGE);
  }

  if (taskInput.recurringType === RecurringType.MONTHLY && isArrayEmpty(taskInput.daysOfTheMonth)) {
    errors.push(ValidationMessage.DAYS_OF_THE_MONTH_REQUIRED_MESSAGE);
  }

  return errors;
}

function validateNonRecurringTask(taskInput: TaskInput): string[] {
  const errors: string[] = [];

  if (isEmpty(taskInput.onDate)) {
    errors.push(ValidationMessage.ON_DATE_REQUIRED_MESSAGE);
  }

  return errors;
}