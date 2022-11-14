import Route from '@ioc:Adonis/Core/Route'
import MachinesController from 'App/Controllers/Http/MachinesController'
import MainsController from 'App/Controllers/Http/MainsController'

//branch k
//company k
//shift k
//breaks k

//employee k
//product K
//machine k
//downtimes


//machine activity k
//machine main  k
//machine part no k

Route.group(() => {
Route.post('/create_branch',(ctx)=>{
return new  MainsController().CREATE_BRANCH(ctx)
})
Route.post('/create_company',(ctx)=>{
return new  MainsController().CREATE_COMPANY(ctx)
})
Route.post('/create_shift',(ctx)=>{
return new  MainsController().CREATE_SHIFT(ctx)
})
Route.post('/create_break',(ctx)=>{
return new  MainsController().CREATE_BREAK(ctx)
})
Route.post('/create_employee',(ctx)=>{
  return new  MainsController().CREATE_EMPLOYEE(ctx)
  })
  Route.post('/create_product',(ctx)=>{
    return new  MainsController().CREATE_PRODUCT(ctx)
    })
}).prefix('/api')
Route.get('/',  ({ view }) => {
  return view.render('index',{name:'hello world',hello:'hello'})
})
Route.post('/machine_activity', async (ctx) => {
  return new MachinesController().insert(ctx)
})

