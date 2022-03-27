import { ResponseMessage } from "../constants/response-message";
import { AppContext } from "../types/app-context";
import { MiddlewareFn } from "type-graphql";

export const IsAuthenticated: MiddlewareFn<AppContext> = async ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error(ResponseMessage.NOT_AUTHENTICATED);
    }

    return next();
}