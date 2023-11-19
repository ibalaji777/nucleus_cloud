import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run() {

    const hashedPassword = await Hash.make("google@124")

    await User.createMany([
      {
        company_name: 'oee',
        phone: '9047300073',
        email: 'angalware@gmail.com',
        password: hashedPassword,
        role: 1,
        status: 1,
      }
    ])
  }
}
