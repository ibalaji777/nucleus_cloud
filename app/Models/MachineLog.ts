import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_time: any
  @column()
  public end_time: any
  @column()
  public duration: number
  @column()
  public machine_id: number
  @column()
  public product_id: number
  @column()
  public uq: string
  @column()
  public emp_id: number
  @column()
  public shift: String
  @column()
  public stroke: String
  @column()
  public actual_count: String
  @column()
  public rejected_count: String
  @column()
  public pieces_per_min: String


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
