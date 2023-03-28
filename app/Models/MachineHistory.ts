import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachineHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public operation: any
  @column()
  public op_id: any
  @column()
  public op_name: any
  @column()
  public op_desc: any
  @column()
  public op_min: any
  @column()
  public op_time: any

  @column()
  public message: any


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
  public type: String
  @column()
  public action: String
  @column()
  public machine_status: any
  @column()
  public start_stroke: any
  @column()
  public end_stroke: any
  @column()
  public actual_stroke: any

  @column()
  public reason: String
  @column()
  public remarks: String



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
