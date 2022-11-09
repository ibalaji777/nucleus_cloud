import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qasformonemedia extends BaseModel {
  @column({ isPrimary: true })
  public id: number
@column()
public invoice_client_id:String
@column()
public invoice_table_id:Number
@column()
public invoice_no:String
@column()
public ext:String
@column()
public name:String
@column()
public full_name:String
@column()
public file_type:String
@column()
public title:String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
