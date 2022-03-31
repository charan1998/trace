import { DailyTask } from "src/types/output-types/daily-task";
import { Task } from "../entity/task-entity";

export function mapToDailyTask(task: Task, date: Date): DailyTask {
    return {
        id: (task as any).id,
        description: task.description,
        date: date,
        isDone: task.doneOn.map(date => date.getTime()).includes(date.getTime())
    };
}