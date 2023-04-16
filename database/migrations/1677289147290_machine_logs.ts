import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('operation').defaultTo(null)
      table.string('action').defaultTo('')// start or stop

      table.dateTime('start_time').defaultTo(null)
      table.dateTime('end_time').defaultTo(null)
      table.integer('duration').defaultTo(null)
      table.integer('machine_id').defaultTo(0)
      table.integer('product_id').defaultTo(0)
      table.string('uq').defaultTo('')//for group
      table.integer('emp_id').defaultTo(0)
      table.string('shift').defaultTo('')
      table.string('shift_start_time').defaultTo('')//new
      table.string('shift_end_time').defaultTo('')//new

      table.integer('start_stroke').defaultTo(0)
      table.integer('end_stroke').defaultTo(0)
      table.integer('actual_stroke').defaultTo(0)

      table.integer('actual_count').defaultTo(0)
      table.integer('rejected_count').defaultTo(0)
      table.integer('pieces_per_stroke').defaultTo(1)//new
      table.string('emp_remarks').defaultTo('')

      table.double('quality').defaultTo(0)//new
      table.double('performance').defaultTo(0)//new
      table.double('availability').defaultTo(0)//new
      table.double('oee').defaultTo(0)//new



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
