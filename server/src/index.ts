import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/user-resolver";

async function initApp() {
    const port = process.env.PORT || 4000;

    const app = express();

    await createConnection();

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