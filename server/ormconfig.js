module.exports = {
   type: "mongodb",
   database: "trace",
   host: process.env.MONGO_HOST,
   port: process.env.MONGO_PORT,
   username: process.env.MONGO_USERNAME,
   password: process.env.MONGO_PASSWORD,
   authSource: "admin",
   synchronize: true,
   logging: false,
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
}