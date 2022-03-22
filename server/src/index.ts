import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/user-resolver";
import mongoose from "mongoose";

async function initApp() {
    const port = process.env.PORT || 4000;
    const mongoUserName = process.env.MONGO_USERNAME;
    const mongoPassword = process.env.MONGO_PASSWORD;
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT;

    const databaseUrl = `mongodb://${mongoHost}:${mongoPort}/trace`;

    const app = express();

    mongoose.connect(databaseUrl, {
        authSource: 'admin',
        auth: {
            username: mongoUserName,
            password: mongoPassword
        }
    }).then(() => {
        console.log('Connected to DB');
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: true
        })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`Application listening on port ${port}`);
    });
}

initApp();