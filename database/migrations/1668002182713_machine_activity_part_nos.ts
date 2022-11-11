import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_activity_part_nos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('part_no').defaultTo("")//main tracking
      table.integer('product_id').defaultTo(0)//main tracking
      table.string('company_id').defaultTo(0)//main tracking
      table.string('shift_id').defaultTo(0)//main tracking
      table.string('emp_id').defaultTo(0)//main tracking
      table.string('machine_client_id').defaultTo("")//main tracking
      table.integer('machine_id').defaultTo(0)//
      table.double('total_count').defaultTo(0)

      table.double('good_count').defaultTo(0)
      table.double('reject_count').defaultTo(0)
      table.double('ideal_cycle').defaultTo(0)
      table.date('machine_date')
      table.time('machine_time')

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
