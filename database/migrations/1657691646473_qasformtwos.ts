 import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'qasformtwos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('branch')
      table.integer('invoice_table_id')
      table.string('invoice_no')//
      table.string('invoice_client_id')
      table.integer('qas_form_one_id')
      table.string('rmcode')

      table.string('eds')
      table.string('supplier_name')
      // table.double('qty')
      table.string('grn_no')//
      table.date('grn_date')//
      table.boolean('error_status')
      table.string('batch_no')
      // table.string('coil')
      table.string('weight')
      // table.string('width_one')
      // table.string('width_two')
      // table.string('thick_one')
      // table.string('thick_two')
      table.string('lot_no')
      table.string('validation')
      table.jsonb('qas_form_two_values')//new
      table.jsonb('qas_form_two_validation')//new
      table.jsonb('other')
      table.date('date')

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
