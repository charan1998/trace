import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/user-resolver";
import mongoose from "mongoose";
import session from "express-session";
import connectRedis from "connect-redis";
import { redisClient } from "./redis/redis-client";
import { TaskResolver } from "./resolver/task-resolver";
import { DailyTaskResolver } from "./resolver/daily-task-resolvers";
import { AppConstants } from "./constants/app-constants";

async function initApp() {
    const port = process.env.PORT || 4000;
    const mongoUserName = process.env.MONGO_USERNAME;
    const mongoPassword = process.env.MONGO_PASSWORD;
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT;
    const sessionSecret = process.env.SESSION_SECRET!;

    const databaseUrl = `mongodb://${mongoHost}:${mongoPort}/trace`;

    const app = express();
    app.set('trust proxy', process.env.NODE_ENV !== 'production');

    const RedisStore = connectRedis(session);
    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            name: AppConstants.SESSION_COOKIE_NAME,
            saveUninitialized: false,
            resave: false,
            secret: sessionSecret,
            cookie: {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
            }
        })
    );

    mongoose.connect(databaseUrl, {
        authSource: 'admin',
        auth: {
            username: mongoUserName,
            password: mongoPassword
        }
    }, (err) => {
        if (err) {
            throw err;
        }
        console.log("Connected to DB");
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, TaskResolver, DailyTaskResolver],
            validate: true
        }),
        context: ({ req, res }: any) => ({ req, res })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: "https://studio.apollographql.com",
            credentials: true
        }
    });

    app.listen(port, () => {
        console.log(`Application listening on port ${port}`);
    });
}

initApp();