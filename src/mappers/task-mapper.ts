import { RecurringType } from "../enum/recurring-type-enum";
import { Task } from "../entity/task-entity";
import { User } from "../entity/user-entity";
import { TaskInput } from "../types/input-types/task-input";
import { isEmpty } from "../utils/app-utils";

export function mapToTaskObject(taskInput: TaskInput, user: User): Task {
    const task: Task = {
        user,
        description: taskInput.description,
        isRecurring: taskInput.isRecurring,
        doneOn: []
    };

    if (!taskInput.isRecurring) {
        task.onDate = taskInput.onDate;
    }
    else {
        task.recurringType = taskInput.recurringType;
        task.fromDate = taskInput.fromDate;
        
        if (!isEmpty(taskInput.toDate)) {
            task.toDate = taskInput.toDate;
        }

        if (taskInput.recurringType === RecurringType.FIXED) {
            task.period = taskInput.period;
        }

        if (taskInput.recurringType === RecurringType.WEEKLY) {
            task.daysOfTheWeek = taskInput.daysOfTheWeek;
        }

        if (taskInput.recurringType === RecurringType.MONTHLY) {
            task.daysOfTheMonth = taskInput.daysOfTheMonth;
        }
    }

    return task;
}