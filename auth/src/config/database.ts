// import { Pool } from "pg"

// const dbParams = {
//   user: "postgres",
//   password: process.env.POSTGRES_PASSWORD,
//   database: "postgres",
//   host: "postgres-service",
//   port: 5432,
// }

// const pool = new Pool(dbParams)

// export { pool }

import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
  `postgres://postgres:${process.env.POSTGRES_PASSWORD}@postgres-service:5432/postgres`
)

export default sequelize
