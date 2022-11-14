import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Emprole extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id:Number
  @column()
  public name:String
  @column()
  public description:String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
