import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_activity_mains'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('shift_id').defaultTo(0)//main tracking
      table.string('emp_id').defaultTo(0)//main tracking
      table.string('machine_client_id').defaultTo(0)//main tracking
      table.integer('machine_id').defaultTo(0)//
      // table.boolean('machine_active_status').defaultTo(false)
      table.boolean('is_closed').defaultTo(false)
      table.date('machine_date')
      table.time('machine_time')
      table.dateTime('machine_date_time')

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
