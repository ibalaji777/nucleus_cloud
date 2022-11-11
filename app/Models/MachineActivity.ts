import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public company_id: number
  @column()
  public shift_id: number
  @column()
  public shift_name: String
  @column()
  public machine_id: number
  @column()
  public machine_name: String
  @column()
  public machine_client_id: String
  @column()
  public machine_date: Date
  @column()
  public machine_time: DateTime
  @column()
  public break_type: String
  @column()
  public break_reason: String
  @column()
  public product_id: number
  @column()
  public product_name: String
  @column()
  public emp_id: number
  @column()
  public emp_name: String

  @column()
  public stroke: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
