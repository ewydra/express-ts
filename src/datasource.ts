import { DataSource } from "typeorm";
import path from "path";

export default new DataSource({
  type: "sqlite",

  database: path.resolve(__dirname, "..", "database", "db.sqlite"),
  migrations: [path.resolve(__dirname, "migrations", "**.{t,j}s")],
  entities: [path.resolve(__dirname, "**", "*.entity.{t,j}s")],
});
