import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.string('branch').nullable()
      table.string('roletype').nullable()
      table.string('username').nullable()
      table.string('password').nullable()
      table.string('dial_code').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('address').nullable()
      table.string('status').nullable()
      table.date('date')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
