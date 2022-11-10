import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_activities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      //company
      table.integer('company_id')
      //shift
      table.integer('shift_id')
      table.string('shift_name')
      //machine
      table.integer('machine_id')
      table.string('machine_name')
      table.string('machine_client_id')//main tracking
      table.date('machine_date')
      table.time('machine_time')
      table.string('machine_active_status')
      table.string('break_type')
      table.string('break_reason')
      //product
      table.integer('product_id')
      table.string('product_name')
      //employee
      table.integer('emp_id')
      table.string('emp_name')
      table.double('stroke')


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
