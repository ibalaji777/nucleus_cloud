import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'downtimes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').defaultTo('')
      table.string('description').defaultTo('')
      table.integer('type').defaultTo(0)//0 is downtime makr and 1 is shedule downtime
      table.integer('minutes').defaultTo(0)//0 is downtime makr and 1 is shedule downtime
      table.string('group').defaultTo('')
      table.string('branch').defaultTo('')
      // table.string('type').defaultTo('')
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
