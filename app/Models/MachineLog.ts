import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public operation: any
  @column()
  public action: any


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
  public ruq: string
  @column()
  public emp_id: number
  @column()
  public shift: String
  @column()
  public start_stroke: any
  @column()
  public end_stroke: any
  @column()
  public actual_stroke: any

  @column()
  public actual_count: String
  @column()
  public rejected_count: String
  @column()
  public pieces_per_stroke: String
  @column()
  public emp_remarks: String
  @column()
  public shift_start_time:any
  @column()
  public shift_end_time:any
  @column()
  public is_delete:any


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
