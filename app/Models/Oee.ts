import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Oee extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  machine_id:any
  @column()
  uq:any
  @column()
  quality:any
  @column()
  performance:any
  @column()
  availability:any
  @column()
  oee:any
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
