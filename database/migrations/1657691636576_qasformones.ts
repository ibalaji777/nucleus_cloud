import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'qasformones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('operator_id').nullable()//user id only operator
      table.integer('invoice_table_id').nullable()

      table.string('invoice_client_id').nullable()

      table.string('supplier_name').nullable()
      table.string('invoice_no').nullable()
      table.date('invoice_date').nullable()
      table.double('invoice_qty').nullable()
      table.string('ir').nullable()
      table.string('grn_no').nullable()
      table.date('grn_date').nullable()
      table.string('rmcode').nullable()
      table.string('eds').nullable()
      table.string('rm').nullable()
      table.double('received_qty').nullable()
      table.string('product_name').nullable()
      table.string('form_format').nullable()
      table.string('comment').nullable()
      table.date('duedate').nullable()


      // table.jsonb('qas_form_two_values').nullable()

      // table.specificType('qasformtwo','json ARRAY').nullable()
      // table.specificType('observation_print_view','json ARRAY').nullable()
      // table.specificType('observation_format','json ARRAY').nullable()
      table.specificType('header_format','jsonb ARRAY').nullable()
      table.string('remarks').nullable()
      table.string('status').nullable()//(approved or acceptedOnDeviation or ppap)
      table.integer('approved_by').nullable()//user id approver or admin
      table.boolean('skiplevel_status').defaultTo(false)
      table.string('roletype').nullable()
      table.string('batch').nullable()
      table.string('branch').nullable()

      table.string('notes').nullable()

      table.string('skuid').nullable()
      table.integer('sk_index').defaultTo(0)
      table.string('sk_order').defaultTo(0)
      table.date('date').nullable()

      table.jsonb('qas_form_one_values').nullable()
      table.jsonb('qas_form_one_validation').nullable()

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
