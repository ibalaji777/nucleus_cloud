import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machines'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('company_id').defaultTo(0)
      table.string('branch').defaultTo('')
      table.string('name').defaultTo('')
      table.string('group').defaultTo('')
      table.string('code').defaultTo('')
      table.integer('hours').defaultTo(0)
      table.string('description').defaultTo('')
      table.string('other').defaultTo('')
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
