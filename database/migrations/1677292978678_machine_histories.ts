import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('operation').defaultTo('')// signal/shedule/downtime/break

      table.integer('op_id').defaultTo(0)// signal/shedule/downtime/break thier id
      table.string('op_name').defaultTo('')// signal/shedule/downtime/break their name
      table.string('op_desc').defaultTo('')// signal/shedule/downtime/break their Desc
      table.string('op_min').defaultTo('')// signal/shedule/downtime/break their Desc

      table.string('message').defaultTo('')//
      table.dateTime('start_time').defaultTo(null)
      table.dateTime('end_time').defaultTo(null)
      table.integer('duration').defaultTo(null)
      table.integer('machine_id').defaultTo(0)
      table.integer('product_id').defaultTo(0)
      table.string('uq').defaultTo('')
      table.string('ruq').defaultTo('')

      table.integer('emp_id').defaultTo(0)
      table.string('shift').defaultTo('')
      table.string('type').defaultTo('') //manual or automate
      table.string('action').defaultTo('')// start or stop
      table.string('machine_status').defaultTo('')// start or stop
      table.integer('stroke').defaultTo(0)//
      table.string('reason').defaultTo('') //planned or unplanned
      table.string('remarks').defaultTo('')




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
