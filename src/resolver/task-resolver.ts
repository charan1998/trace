import { IsAuthenticated } from "../auth/is-authenticated";
import { ApiResponse } from "../types/output-types/api-response";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TaskInput } from "../types/input-types/task-input";
import TaskModel, { Task } from "../entity/task-entity";
import { ResponseMessage } from "../constants/response-message";
import { AppContext } from "../types/app-context";
import UserModel from "../entity/user-entity";
import { validateTaskInput } from "../validators/task-input-validators";
import { mapToTaskObject } from "../mappers/task-mapper";
import { Descriptions } from "../constants/descriptions";
import { ObjectId } from "mongodb";

@Resolver()
export class TaskResolver {

    @Query(() => Task, {
        nullable: true,
        description: Descriptions.GET_TASK_QUERY_DESCRIPTION
    })
    @UseMiddleware(IsAuthenticated)
    async getTask(
        @Arg("taskId", () => ID, { description: Descriptions.GET_TASK_TASK_ID_DESCRIPTION }) taskId: ObjectId,
        @Ctx() { req }: AppContext
    ): Promise<Task | null> {

        const userId = req.session.userId;

        const task = await TaskModel.findOne({
            _id: taskId,
            user: {
                _id: userId
            }
        });

        if (!task) {
            return null;
        }

        return task;
    }

    @Mutation(() => ApiResponse, {
        description: Descriptions.ADD_TASK_MUTATION_DESCRIPTION
    })
    @UseMiddleware(IsAuthenticated)
    async addTask(
        @Arg("taskInput", () => TaskInput) taskInput: TaskInput,
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