import { Descriptions } from "../constants/descriptions";
import { DailyTask } from "../types/output-types/daily-task";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthenticated } from "../auth/is-authenticated";
import { AppContext } from "../types/app-context";
import { getTasksForTheDay } from "../utils/task-query-helper";
import { mapToDailyTask } from "../mappers/daily-task-mapper";

@Resolver()
export class DailyTaskResolver {

    @Query(() => [DailyTask], {
        nullable: false,
        description: Descriptions.GET_DAILY_TASKS_QUERY_DESCRIPTION
    })
    @UseMiddleware(IsAuthenticated)
    async getDailyTasks(
        @Arg("date", () => Date, { description: Descriptions.GET_DAILY_TASKS_DATE_DESCRIPTION }) date: Date,
        @Ctx() { req }: AppContext
    ): Promise<DailyTask[]> {
        
        const userId = req.session.userId;
        const applicableTasks = await getTasksForTheDay(userId, date);
        const dailyTasks = applicableTasks.map(task => mapToDailyTask(task, date));

        return dailyTasks;
    }
}