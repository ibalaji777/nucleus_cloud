import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('invoice_client_id').nullable()
      table.string('supplier_name').nullable()
      table.string('invoice_no').nullable()
      table.date('invoice_date').nullable()
      table.string('grn_no').nullable()
      table.string('grn_date').nullable()
      table.integer('operator_id').nullable()
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
