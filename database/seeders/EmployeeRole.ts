import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EmployeeRole from 'App/Models/EmployeeRole'

export default class extends BaseSeeder {
  public async run () {
    await EmployeeRole.createMany([
      {
        name: 'machine Operator',
        description: 'Machine Operator',
      },
      {
        name: 'Tool Incharge',
        description: 'Tool Setup',
      },
      {
        name: 'Supervisor',
        description: 'Machine Incharge',
      }
    ])

  }
}
