module.exports = {
  client: 'mysql2',
  connection: {
    host: "localhost",
    user: "root",
    password: "danigomez123",
    database: "como_nuevos"
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations'
  }
};