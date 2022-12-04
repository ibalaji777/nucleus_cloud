import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('company_id').defaultTo(0)
      table.string('branch').defaultTo('')
      table.string('name').defaultTo('')
      table.string('part_no').defaultTo('')
      // table.string('material_code').defaultTo('')
      table.string('customer_name').defaultTo('')
      table.string('vendor_name').defaultTo('')
      table.string('other_detail').defaultTo('')
      table.string('ideal_cyle_time').defaultTo('')

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
