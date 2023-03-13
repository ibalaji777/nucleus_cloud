import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineActivityMain extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public shift_id: Number
  @column()
  public emp_id: Number
  @column()
  public machine_client_id: String
  @column()
  public machine_id: Number
  // @column()
  // public machine_active_status:Boolean
  @column()
  public machine_date: Date
  @column()
  public machine_time: String
  @column()
  public machine_date_time: String

  @column()
  public is_closed: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
