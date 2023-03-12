import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { colors } from 'vuetify/lib'

export default class MachineSheduler extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  group:String
  @column()
  branch:String
  @column()
  name:String
  @column()
  description:String
  @column()
  minutes:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
