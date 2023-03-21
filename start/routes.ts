import Route from '@ioc:Adonis/Core/Route'
import CompaniesController from 'App/Controllers/Http/CompaniesController'
import MachinesController from 'App/Controllers/Http/MachinesController'
import MainsController from 'App/Controllers/Http/MainsController'
import Mail from '@ioc:Adonis/Addons/Mail'
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

Route.get('/machineLog',(ctx)=>{
  return new  MachinesController().MACHINELOG(ctx)
  })





Route.get('/mail',async (ctx)=>{
  await Mail.send((message) => {
    message
      .from('inucleusedgei@gmail.com')
      .to('ibalaji39@gmail.com')
      .subject('Welcome Onboard!')
      .htmlView('emails/welcome', {  })
  })
  })
Route.group(() => {


  Route.post('/machine-logs',(ctx)=>{
    return new  MachinesController().getMachineLogs(ctx)
    });

  Route.post('/mark-downtime',(ctx)=>{
    return new  MachinesController().markDownTimeHistoryReason(ctx)
    });
    Route.post('/mark-oee-info',(ctx)=>{
      return new  MachinesController().MACHINE_LOG_UPDATE(ctx)
      });





  Route.post('/watch-machine',(ctx)=>{
    return new  MachinesController().MACHINELOG(ctx)
    });

  Route.get('/socket1',(ctx)=>{
    return new  MainsController().socket_one(ctx)
    })
    Route.post('/machine_login',(ctx)=>{
      return new  MainsController().MACHINE_LOGIN(ctx)
      })

      Route.post('/update-oee',(ctx)=>{
        return new  MachinesController().updateOee(ctx)
        })



  Route.post('/create_machine',(ctx)=>{
    return new  MainsController().CREATE_MACHINE(ctx)
    })
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
Route.post('/create_group',(ctx)=>{
return new  MainsController().CREATE_GROUP(ctx)
})
Route.post('/create_emprole',(ctx)=>{
return new  MainsController().CREATE_EMPROLE(ctx)
})
Route.post('/create_machine_pre_planning',(ctx)=>{
  return new  MainsController().CREATE_MACHINE_PLANNING(ctx)
  })
Route.post('/create_down_time',(ctx)=>{
  return new  MainsController().CREATE_DOWNTIME(ctx)
  })
  Route.post('/update_employee',(ctx)=>{
    return new  MainsController().UPDATE_EMPLOYEE(ctx)
    })

  Route.post('/get_machine',(ctx)=>{
    return new  MainsController().GET_MACHINES(ctx)
    })
    Route.post('/get_machine_pre_planning',(ctx)=>{
      return new  MainsController().GET_MACHINE_PRE_PLANNING(ctx)
      })

Route.post('/get_branch',(ctx)=>{
return new  MainsController().GET_BRANCHES(ctx)
})
Route.post('/get_group',(ctx)=>{
return new  MainsController().GET_GROUPS(ctx)
})
Route.post('/get_break',(ctx)=>{
  return new  MainsController().GET_BREAK(ctx)
})
Route.post('/get_downtime',(ctx)=>{
return new  MainsController().GET_DOWNTIME(ctx)
})
Route.post('/get_shift',(ctx)=>{
return new  MainsController().GET_SHIFT(ctx)
})
Route.post('/get_products',(ctx)=>{
  return new  MainsController().GET_PRODUCTS(ctx)
  })

Route.post('/company_signup',(ctx)=>{
return new  CompaniesController().SIGNUP_COMPANY(ctx)
})
Route.post('/company_signin',(ctx)=>{
return new  CompaniesController().SIGNIN_COMPANY(ctx)
})

Route.post('/get_employee',(ctx)=>{
return new  MainsController().GET_EMPLOYEES(ctx)
})
Route.post('/get_emprole',(ctx)=>{
  return new  MainsController().GET_EMPROLE(ctx)
  })

  Route.post('/employee_signin',(ctx)=>{
    return new  MainsController().EMPLOYEE_SIGNIN(ctx)
    })
    Route.post('/machine_employee_signin',(ctx)=>{
      return new  MainsController().MACHINE_EMPLOYEE_SIGNIN(ctx)
      })
Route.post('/remove_branch',(ctx)=>{
return new  MainsController().REMOVE_BRANCH(ctx)
})
Route.post('/remove_group',(ctx)=>{
  return new  MainsController().REMOVE_GROUP(ctx)
  })
Route.post('/remove_machine',(ctx)=>{
  return new  MainsController().REMOVE_MACHINE(ctx)

})

Route.post('/remove_product',(ctx)=>{
return new  MainsController().REMOVE_PRODUCT(ctx)
})
Route.post('/remove_employee',(ctx)=>{
  return new  MainsController().REMOVE_EMPLOYEE(ctx)
  })
Route.post('/remove_downtime',(ctx)=>{
return new  MainsController().REMOVE_DOWNTIME(ctx)
})
Route.post('/remove_shift',(ctx)=>{
return new  MainsController().REMOVE_SHIFT(ctx)
})
Route.post('/remove_break',(ctx)=>{
  return new  MainsController().REMOVE_BREAK(ctx)
  })
  Route.post('/remove_machine_pre_planning',(ctx)=>{
    return new  MainsController().REMOVE_MACHINE_PRE_PLANNING(ctx)
    })


  Route.post('/get_machines_main_status_by_date',(ctx)=>{
    return new  MachinesController().GET_MACHINE_STATUS_BY_DATE(ctx)
  })

 Route.post('/get_machine_running_part_no',(ctx)=>{
    return new  MachinesController().GET_MACHINE_RUNNING_PART_NO(ctx)
  })
  Route.post('/get_machine_running_main',(ctx)=>{
    return new  MachinesController().GET_MACHINE_RUNNING_MAIN(ctx)
  })
  Route.post('/get-machine-data',(ctx)=>{
    return new  MachinesController().getMachineData(ctx)
  })



  Route.post('/get_machine_running_activity',(ctx)=>{
    return new  MachinesController().GET_MACHINE_RUNNING_ACTIVITY(ctx)
  })
  Route.post('/close_shift',(ctx)=>{
    return new  MachinesController().CLOSE_SHIFT(ctx)
  })
  Route.post('/create_shedule',(ctx)=>{
    return new  MainsController().CREATE_SHEDULE(ctx)
  })
  Route.post('/get_shedule',(ctx)=>{
    return new  MainsController().GET_SHEDULE(ctx)
  })



}).prefix('/api')
Route.get('/',  ({ view }) => {
  return view.render('index',{name:'hello world',hello:'hello'})
})
Route.post('/machine_activity', async (ctx) => {
  return new MachinesController().insert(ctx)
})

