import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineActivityPartNo extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public part_no: String

  @column()
  public product_id: Number


  @column()
  public shift_id: Number

  @column()
  public emp_id: Number

  @column()
  public machine_client_id: String
  @column()
  public machine_id: Number


  @column()
  public total_count: Number

  @column()
  public good_count: Number

  @column()
  public reject_count: Number

  @column()
  public ideal_cycle: Number

  @column()
  public machine_date: Date

  @column()
  public machine_time: String
  @column()
  public machine_date_time: String
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
