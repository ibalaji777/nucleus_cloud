import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_activities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      //company
      table.integer('company_id').defaultTo(0)
      //shift
      table.integer('shift_id').defaultTo(0)
      table.string('shift_name').defaultTo("")
      //machine
      table.integer('machine_id').defaultTo(0)
      table.string('machine_name').defaultTo("")
      table.string('machine_client_id').defaultTo(0)//main tracking
      table.date('machine_date')
      table.time('machine_time')
      table.string('machine_active_status').defaultTo('OFF')
      table.string('break_type').defaultTo("")
      table.string('break_reason').defaultTo("")
      //product
      table.integer('product_id').defaultTo(0)
      table.string('product_name').defaultTo("")
      //employee
      table.integer('emp_id').defaultTo(0)
      table.string('emp_name').defaultTo(0)
      table.double('stroke').defaultTo(0)


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
