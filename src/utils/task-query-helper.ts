import { ObjectId } from "mongodb";
import { RecurringType } from "../enum/recurring-type-enum";
import TaskModel, { Task } from "../entity/task-entity";

export async function getTasksForTheDay(userId: ObjectId, date: Date): Promise<Task[]> {
    
    let tasks: Task[] = await TaskModel.find({
        user: {
            _id: userId
        },
        $or: [
            {
                isRecurring: false,
                onDate: {
                    $eq: date
                }
            },
            {
                isRecurring: true,
                fromDate: {
                    $lte: date,
                },
                toDate: {
                    $not: {
                        $lt: date
                    }
                }
            }
        ]
    }).exec();

    tasks = tasks.filter(task => {
        if (!task.isRecurring) {
            return true;
        }

        if (task.recurringType === RecurringType.FIXED) {
            return ((date.getTime() - task.fromDate!.getTime()) / (1000 * 60 * 60 * 24)) % task.period! === 0;
        }

        if (task.recurringType === RecurringType.WEEKLY) {
            return task.daysOfTheWeek!.includes(date.getDay() + 1);
        }

        if (task.recurringType === RecurringType.MONTHLY) {
            return task.daysOfTheMonth!.includes(date.getDate());
        }

        return false;
    });

    return tasks;
}