import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qasform2config from 'App/Models/Qasform2config';
import Ws from 'App/Services/Ws'

export default class Qasform2configsController {

//   public async  readQasForm2Config(ctx: HttpContextContract/*unresolved*/) {


//     var checkHeaderConfig=await Qasform2config.query().where('id','config').first()

//     if(!checkHeaderConfig){
// await Qasform2config.create({
//   id:'config',
//   config:[

// 		{
// 			label:'Coil # Batch No',//input field label
// 			name:' ',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'BATCH',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},
// 		{
// 			label:'Sup #(Lot NO)',//input field label
// 			name:'lot_no',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'PONO',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},
// 		{
// 			label:'Weight In Kg',//input field label
// 			name:'weight',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'QTY',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},
// 		{
// 			label:'Width Min',//input field label
// 			name:'width_min',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},
// 		{
// 			label:'Width Max',//input field label
// 			name:'width_max',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},		{
// 			label:'Thick Min',//input field label
// 			name:'thick_min',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		},
// 		{
// 			label:'Thick Max',//input field label
// 			name:'thick_max',//column name
// 			value:'',//default value
// 			show:true,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'',
// 			validation:false,
// 			rule:'',

// 		}
// 		,
// 		{
// 			label:'Validation',//input field label
// 			name:'validation',//column name
// 			value:'',//default value
// 			show:false,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'For Overall Verification from qasform1',
// 			validation:false,
// 			rule:'width_sup_min <= width_min <= width_sup_max',

// 		},


// 		{
// 			label:'Indicator(Error)',//input field label
// 			name:'error_status',//column name
// 			value:false,//default value //false(error) or true(no error)
// 			show:false,
// 			map:'',
// 			mapFrom:'header',//header or product
// 			default:true,
// 			note:'PreDefined configuration,No need to change',
// 			validation:false,
// 			rule:'',

// 		},
// 	]
// }
// )
//     }

//        var config =await Qasform2config.query().where('id','config').first()||{};

//        return config['config']
//       }


//     public async updateQasForm2Config(ctx:HttpContextContract){

//       const {
//         config=[]
//       }=ctx.request.all();

//       // return config;
//       var updateConfig=await Qasform2config.query().where('id','config').update({config})

//       if(updateConfig){
//         return ctx.response.send({
//           successStatus:true
//         })
//       }
//       return ctx.response.send({
//         successStatus:false
//       })
//     }



public async getDefaultImport(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''

 return await Qasform2config.query().where('branch',branch).first();


}

  public async setDefaultImport(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''
 const searchPayload = { branch}
//  const persistancePayload = ctx.request.input('code')

 await Qasform2config.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
 Ws.io.emit('WatchQasform2config', {  })

 return await Qasform2config.query().where('branch',branch).first();


}


}
