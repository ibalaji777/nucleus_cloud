import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public company_id:number
  @column()
  public branch:string
  @column()
  public name:string
  @column()
  public part_no:string
  @column()
  public  customer_name:string
  @column()
  public  vendor_name:string
  @column()
  public other_detail:string
  @column()
  public production_per_stroke:Number
  @column()
  public ideal_cyle_time:string
  @column()
  public target_oee:String
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
