import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'assurancemedias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('qasformone_id').nullable()
      table.string('branch').nullable()
      table.string('name').nullable()
      table.string('actualname').nullable()
      table.string('mime').nullable()
      table.string('ext').nullable()
      table.string('url').nullable()
      table.string('file_type').nullable()
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
