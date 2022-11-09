import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public invoice_client_id:String
  @column()
  public  supplier_name:String
  @column()
  public  invoice_no:String
  @column()
  public  invoice_date:Date
  @column()
  public  grn_no:String
  @column()
  public  grn_date:String
  @column()
  public  operator_id:Number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
