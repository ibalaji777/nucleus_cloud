import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_activity_part_nos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('part_no')//main tracking
      table.integer('product_id')//main tracking
      table.string('company_id')//main tracking
      table.string('shift_id')//main tracking
      table.string('emp_id')//main tracking
      table.string('machine_client_id')//main tracking
      table.integer('machine_id')//
      table.double('total_count')
      table.double('good_count')
      table.double('bad_count')
      table.double('ideal_cyle')
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
