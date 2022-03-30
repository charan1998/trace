import { IsAuthenticated } from "../auth/is-authenticated";
import { ApiResponse } from "../types/output-types/api-response";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { TaskInput } from "../types/input-types/task-input";
import TaskModel from "../entity/task-entity";
import { ResponseMessage } from "../constants/response-message";
import { AppContext } from "../types/app-context";
import UserModel from "../entity/user-entity";
import { validateTaskInput } from "../validators/task-input-validators";
import { mapToTaskObject } from "../mappers/task-mapper";

@Resolver()
export class TaskResolver {

    @Mutation(() => ApiResponse)
    @UseMiddleware(IsAuthenticated)
    async addTask(
        @Arg("taskImput", () => TaskInput) taskInput: TaskInput,
        @Ctx() { req }: AppContext
    ): Promise<ApiResponse> {
        
        const taskInputErrors = validateTaskInput(taskInput);
        
        if (taskInputErrors.length > 0) {
            return {
                success: false,
                message: ResponseMessage.TASK_INPUT_INVALID_ERROR,
                errors: taskInputErrors
            }
        }

        const userId = req.session.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return {
                success: false,
                message: ResponseMessage.TASK_CREATION_ERROR
            }
        }

        try {
            const task = new TaskModel(mapToTaskObject(taskInput, user));
            await task.save();
        }
        catch (err) {
            console.error(err);
            return {
                success: false,
                message: ResponseMessage.USER_CREATION_ERROR
            };
        }

        return {
            success: true
        };
    }

}