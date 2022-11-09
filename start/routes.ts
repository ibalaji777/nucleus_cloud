/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
/*eslint-disable*/
import Route from '@ioc:Adonis/Core/Route'
import AssurancemediasController from 'App/Controllers/Http/AssurancemediasController'
import BranchesController from 'App/Controllers/Http/BranchesController'
import ConfigProductFormatsController from 'App/Controllers/Http/ConfigProductFormatsController'
import CustomrulesController from 'App/Controllers/Http/CustomrulesController'
import DefaultConfigsController from 'App/Controllers/Http/DefaultConfigsController'
import GuiHeadersController from 'App/Controllers/Http/GuiHeadersController'
import GuiqasformonesController from 'App/Controllers/Http/GuiqasformonesController'
import GuiqasformtwosController from 'App/Controllers/Http/GuiqasformtwosController'
import HeaderconfigsController from 'App/Controllers/Http/HeaderconfigsController'
import LabelsettingsController from 'App/Controllers/Http/LabelsettingsController'
import MapproductcodesController from 'App/Controllers/Http/MapproductcodesController'
import MasterproductsController from 'App/Controllers/Http/MasterproductsController'
import PrintconfigsController from 'App/Controllers/Http/PrintconfigsController'
import Qasform2configsController from 'App/Controllers/Http/Qasform2configsController'
import QasformonedefaultsController from 'App/Controllers/Http/QasformonedefaultsController'
import QasformonesController from 'App/Controllers/Http/QasformonesController'
import QasformtwodefaultsController from 'App/Controllers/Http/QasformtwodefaultsController'
import QasformtwosController from 'App/Controllers/Http/QasformtwosController'
import SapimportconfigsController from 'App/Controllers/Http/SapimportconfigsController'
import UnitsController from 'App/Controllers/Http/UnitsController'
import UploadtypesController from 'App/Controllers/Http/UploadtypesController'
import UsersController from 'App/Controllers/Http/UsersController'
import WhatsappsController from 'App/Controllers/Http/WhatsappsController'
import ConfigProductFormat from 'App/Models/ConfigProductFormat'
import Qasformtwodefault from 'App/Models/Qasformtwodefault'




// --------------------------?
Route.get('/qr', async (ctx) => {

return new WhatsappsController().qrcode(ctx)
})
// Route.get('qr ',async(ctx)=>{
//   return 'ok'
//     return new WhatsappsController().qrcode(ctx)
//      })
// --------------------------?


//branches

Route.get('/branches', async (ctx) => {

return new BranchesController().readBranches(ctx)
})

// Route.get('/', async (ctx) => {
//   return 'working'
//   return new UsersController().creaeUser(ctx)
// })

// *****************USER*******************************
Route.post('/login', async (ctx) => {
return new UsersController().checkUser(ctx)
})

Route.post('/user/create', async (ctx) => {
return new UsersController().createUser(ctx)
})

Route.get('/getusers', async (ctx) => {
return new UsersController().getBranchUsers(ctx)
})


Route.post('/user/remove', async (ctx) => {
return new UsersController().removeUser(ctx)
})

Route.post('/user/update', async (ctx) => {
return new UsersController().updateUser(ctx)
})

Route.get('/user/test', async (ctx) => {
return new UsersController().defaultUser(ctx)
})


// *********************qasformone************************

Route.post('/product/find', async (ctx) => {
return new MasterproductsController().findProducts(ctx)
})

Route.get('/product/test', async (ctx) => {
return new MasterproductsController().defaultProduct(ctx)
})
Route.post('/product/create', async (ctx) => {
// return ctx.request.all()

return new MasterproductsController().createProduct(ctx)
})

Route.post('/product/remove', async (ctx) => {
return new MasterproductsController().removeProduct(ctx)
})

Route.post('/product/update', async (ctx) => {
return new MasterproductsController().updateProduct(ctx)
})


Route.get('/readproducts', async (ctx) => {
return new MasterproductsController().getBranchProducts(ctx)
})




// Route.post('/user/create', async (ctx) => {
//   return new UsersController().createUser(ctx)
// })
// Route.post('/user/create', async (ctx) => {
//   return new UsersController().createUser(ctx)
// })
// Route.post('/user/create', async (ctx) => {
//   return new UsersController().createUser(ctx)
// })


// **************branches***************

Route.get('/readbranch', async (ctx) => {
return new BranchesController().readBranches(ctx)
})

Route.post('/branch/create', async (ctx) => {
return new BranchesController().createBranch(ctx)
})


Route.post('/branch/remove', async (ctx) => {
return new BranchesController().removeBranch(ctx)
})

Route.post('/branch/update', async (ctx) => {
return new BranchesController().updateBranch(ctx)
})

// **************upload Types***************

Route.get('/readuploadtype', async (ctx) => {
return new UploadtypesController().readUploadType(ctx)
})

Route.post('/uploadtype/create', async (ctx) => {
return new UploadtypesController().createUploadType(ctx)
})


Route.post('/uploadtype/remove', async (ctx) => {
return new UploadtypesController().removeUploadType(ctx)
})

Route.post('/uploadtype/update', async (ctx) => {
return new UploadtypesController().updateUploadType(ctx)
})

// *************config**********************

Route.get('/getheaderconfig', async (ctx) => {
return new HeaderconfigsController().getHeaderConfig(ctx)
})

Route.post('/setheaderconfig', async (ctx) => {
return new HeaderconfigsController().setHeaderConfig(ctx)
})
Route.get('/readqasform2config', async (ctx) => {
return new Qasform2configsController().getDefaultImport(ctx)
})

Route.post('/headerqasform2/update', async (ctx) => {
return new Qasform2configsController().setDefaultImport(ctx)
})

// Route.post('/productbatch/check', async (ctx) => {
//   return new QasformonesController().productBatchCheck(ctx)
// })

Route.post('/checkproductsbatch', async (ctx) => {
return new QasformonesController().checkProductsBatch(ctx)
})


Route.post('/addInvoices', async (ctx) => {
return new QasformonesController().addInvoices(ctx)
})

Route.post('/addInvoicesingle', async (ctx) => {
  return new QasformonesController().addInvoiceSingle(ctx)
  })



Route.post('/invoiceupload', async (ctx) => {
return new QasformonesController().invoiceUpload(ctx)
})

// public async getelement(ctx:HttpContextContract){
Route.get('/getelement', async (ctx) => {
return new QasformonesController().getelement(ctx)

})

Route.get('/test1', async (ctx) => {
  return new QasformonesController().filter(ctx)

  })


// Route.get('/readqasformonedatelist', async (ctx) => {
//   return new QasformonesController().getQasFormOneDateList(ctx)

//   })

Route.get('/readqasformonelist', async (ctx) => {
return new QasformonesController().getQasFormOneList(ctx)

})
Route.post('/readqasformonesingle', async (ctx) => {
return new QasformonesController().getQasSingleForm(ctx)

})

Route.post('/qasformone/update', async (ctx) => {
return new QasformonesController().updateQasFormOne(ctx)

})

Route.post('/qasformtwo/update', async (ctx) => {
return new QasformonesController().updateQasFormTwo(ctx)

})

Route.post('/media/delete', async (ctx) => {
return new QasformonesController().invoiceImageDelete(ctx)

})

Route.post('/readoperatorforms', async (ctx) => {
return new QasformonesController().getOperatorQasFormList(ctx)

})

Route.post('/qasformstatus/update', async (ctx) => {
return new QasformonesController().qasFormUpdateStatus(ctx)

})
Route.post('/qasformsbulkstatus/update', async (ctx) => {
return new QasformonesController().qasFormBulkUpdateStatus(ctx)

})


Route.post('/productformat/update', async (ctx) => {
return new ConfigProductFormatsController().updateConfig(ctx)

})

Route.get('/productformat/read', async (ctx) => {
return new ConfigProductFormatsController().getProductConfig(ctx)

})

Route.post('/approverlist',async(ctx)=>{

return new QasformonesController().approverlist(ctx)
})

Route.get('/startusersiFnotexist',async(ctx)=>{

return new UsersController().startUsersiFNotExist(ctx)
})
Route.get('/irnum',async(ctx)=>{

return new QasformonesController().irNum('Chennai')
})

Route.post('/getqasoneir',async(ctx)=>{

return new QasformonesController().getQasOneIR(ctx)
})

//  Route.post('/deleteqasformone',async(ctx)=>{
//   return new QasformonesController().deleteQasFormOne(ctx)
//    })

Route.post('/qasformone/delete',async(ctx)=>{
return new QasformonesController().deleteQasFormOne(ctx)
})

Route.post('/product_batch/check',async(ctx)=>{
return new MasterproductsController().checkBatchNo(ctx)
})

Route.post('/qasforms/update',async(ctx)=>{
return new QasformonesController().updateQasForms(ctx)
})
Route.post('/findbyheader',async(ctx)=>{
  return new QasformonesController().findbyheader(ctx)
  })



Route.post('/labelsetting/save',async(ctx)=>{
return new LabelsettingsController().labelSettingSave(ctx)
})

Route.get('/labelsetting/read',async(ctx)=>{
return new LabelsettingsController().labelSetting(ctx)
})

Route.post('/find_qas_form2',async(ctx)=>{
  // console.log(ctx.request.all())
  return new QasformonesController().find_qas_form2(ctx)
  })
Route.post('/find_qas_form',async(ctx)=>{
console.log(ctx.request.all())
return new QasformonesController().find_qas_form(ctx)
})

Route.post('/find_qas_form_date',async(ctx)=>{
  return new QasformonesController().find_qas_form_date(ctx)
  })


Route.post('/labelgenerate',async(ctx)=>{
  return new QasformonesController().labelGenerate(ctx)
  })


// Route.get('/headerconfig/read',async(ctx)=>{
// return new HeaderconfigsController().getHeaderConfig(ctx)
// })

// Route.post('/headerconfig/save',async(ctx)=>{
// console.log(ctx.request.all())
// return new HeaderconfigsController().setHeaderConfig(ctx)
// })




Route.get('/datOneCode/read',async(ctx)=>{
  return new MapproductcodesController().getDatOneCode(ctx)
  })

  Route.post('/datOneCode/save',async(ctx)=>{
  console.log(ctx.request.all())
  return new MapproductcodesController().setDatOneCode(ctx)
  })

  Route.get('/datTwoCode/read',async(ctx)=>{
    return new MapproductcodesController().getDatTwoCode(ctx)
    })

    Route.post('/datTwoCode/save',async(ctx)=>{
    console.log(ctx.request.all())
    return new MapproductcodesController().setDatTwoCode(ctx)
    })

    Route.get('/getsapimport',async(ctx)=>{
      return new SapimportconfigsController().getSapImport(ctx)
      })

      Route.post('/setsapimport',async(ctx)=>{
      return new SapimportconfigsController().setSapImport(ctx)
      })

      Route.get('/getdefaultimport',async(ctx)=>{
        return new DefaultConfigsController().getDefaultImport(ctx)
        })

        Route.post('/setdefaultimport',async(ctx)=>{
        return new DefaultConfigsController().setDefaultImport(ctx)
        })
        Route.get('/getprintconfig',async(ctx)=>{
          return new PrintconfigsController().getPrintConfig(ctx)
          })

          Route.post('/setprintconfig',async(ctx)=>{
          return new PrintconfigsController().setPrintConfig(ctx)
          })




          Route.get('/getqasformonedefault',async(ctx)=>{
            return new QasformonedefaultsController().get(ctx)
            })

            Route.post('/setqasformonedefault',async(ctx)=>{
              return new QasformonedefaultsController().set(ctx)

            })


            Route.get('/getqasformtwodefault',async(ctx)=>{
              return new QasformtwodefaultsController().get(ctx)
              })

              Route.post('/setqasformtwodefault',async(ctx)=>{
              return new QasformtwodefaultsController().set(ctx)
              })



              Route.get('/getguiqasformone',async(ctx)=>{
                return new GuiqasformonesController().get(ctx)
                })

                Route.post('/setguiqasformone',async(ctx)=>{
                return new GuiqasformonesController().set(ctx)
                })


                Route.get('/getguiqasformtwo',async(ctx)=>{
                  return new GuiqasformtwosController().get(ctx)
                  })

                  Route.post('/setguiqasformtwo',async(ctx)=>{
                  return new GuiqasformtwosController().set(ctx)
                  })


                  Route.get('/getguiheader',async(ctx)=>{
                    return new GuiHeadersController().get(ctx)
                    })

                    Route.post('/setguiheader',async(ctx)=>{
                    return new GuiHeadersController().set(ctx)
                    })


Route.post('/skiplevel',async(ctx)=>{
 return new QasformonesController().skiplevel(ctx)
})
Route.post('/saverule',async(ctx)=>{
  return new CustomrulesController().save(ctx)
 })
 Route.post('/ruleDelete',async(ctx)=>{
  return new CustomrulesController().delete(ctx)
 })


 Route.get('/ruleslist',async(ctx)=>{
  return new CustomrulesController().ruleslist(ctx)
 })





  // public async getelement(ctx:HttpContextContract){

// Route.get('/defaultUser', async (ctx) => {
//  return new UsersController().defaultUser(ctx)

// })
// Route.get('/test1 ',async(ctx)=>{

//   return new QasformonesController().filter(ctx)
//    })

///----------------------------

