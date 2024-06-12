import { DataSource } from "typeorm"

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "chat-bot",
    entities: ["dist/entity/*.js"],
    migrations: ["dist/migrations/*.js"],
    logging: false,
    synchronize: true,
})