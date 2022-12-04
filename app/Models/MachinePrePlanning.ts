import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachinePrePlanning extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  company_id:Number
  @column()
  public machine_id:Number
  @column()
  public subject:String
  @column()
  public description:String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
