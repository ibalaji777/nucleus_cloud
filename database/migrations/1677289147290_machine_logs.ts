import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('start_time').defaultTo(null)
      table.dateTime('end_time').defaultTo(null)
      table.integer('duration').defaultTo(null)
      table.integer('machine_id').defaultTo(0)
      table.integer('product_id').defaultTo(0)
      table.string('uq').defaultTo('')//for group
      table.string('ruq').defaultTo('')//new
      table.integer('emp_id').defaultTo(0)
      table.string('shift').defaultTo('')
      table.string('shift_start_time').defaultTo('')//new
      table.string('shift_end_time').defaultTo('')//new

      table.integer('stroke').defaultTo(0)
      table.integer('actual_count').defaultTo(0)
      table.integer('rejected_count').defaultTo(0)
      table.integer('pieces_per_min').defaultTo(0)
      table.integer('pieces_per_stroke').defaultTo(1)//new
      table.string('emp_remarks').defaultTo('')
      table.integer('is_delete').defaultTo(0)


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
