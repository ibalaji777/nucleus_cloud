import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Machine extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id: number
  @column()
  public branch: String
  @column()
  public name: number
  @column()
  public hours: Number
  @column()
  public description: String
  @column()
  public other: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
