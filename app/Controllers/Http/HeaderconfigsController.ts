import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headerconfig from 'App/Models/Headerconfig';
import moment from 'moment';
import Ws from 'App/Services/Ws'

export default class HeaderconfigsController {

  public async getHeaderConfig(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   return await Headerconfig.query().where('branch',branch).first();
  }

    public async setHeaderConfig(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
   await Headerconfig.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})

   Ws.io.emit('watchHeaderConfig', {  })

   return await Headerconfig.query().where('branch',branch).first();


  }

	// public async HeaderConfig(ctx: HttpContextContract/*unresolved*/) {


	// 	var checkHeaderConfig = await Headerconfig.query().where('id', 'config').first()

	// 	if (!checkHeaderConfig) {
	// 		await Headerconfig.create({
	// 			id: 'config',
	// 			config: [

  //         {
  //           label:'SUPPLIER',//input field label
  //           name:'supplier_name',//column name
  //           value:'',//default value
  //           show:true,
  //           map:'',
  //           input_type:'text',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },
  //         {
  //           label:'PRODUCT NAME',//input field label
  //           name:'product_name',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''

  //         },


  //         {
  //           label:'INVOICE / DC #',//input field label
  //           name:'invoice_no',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''

  //         },
  //         {
  //           label:'INVOICE / DC DATE',//input field label
  //           name:'invoice_date',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'DATE_EXT',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''

  //         },
  //         {
  //           label:'INVOICE QTY',//input field label
  //           name:'invoice_qty',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'number',

  //           map:'invoiceQty',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:'No Need to Map'

  //         },

  //         {
  //           label:'IR #',//input field label
  //           name:'ir',//column name
  //           value:'',//default value
  //           show:true,            input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },
  //         {
  //           label:'GRN NO',//input field label
  //           name:'grn_no',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''

  //         },
  //         {
  //           label:'GRN DATE',//input field label
  //           name:'grn_date',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'LAST_GR_DATE_EXT',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },
  //         {
  //           label:'R/M CODE',//input field label
  //           name:'rmcode',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },		{
  //           label:'EDS /Q /P #',//input field label
  //           name:'eds',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },
  //         {
  //           label:'DATE',//input field label
  //           name:'date',//column name
  //           value:moment().format("YYYY-MM-DD"),//default value
  //           show:true,
  //           input_type:'date',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },
  //       {
  //           label:'R/M',//input field label
  //           name:'rm',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'text',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:''
  //         },		{
  //           label:'RECEIVED QTY',//input field label
  //           name:'received_qty',//column name
  //           value:'',//default value
  //           show:true,
  //           input_type:'number',

  //           map:'',
  //           mapFrom:'header',//header or product
  //           default:true,
  //           note:'No Need to Map'

  //         },

  //         ]
	// 		}
	// 		)
	// 	}

	// 	var config = await Headerconfig.query().where('id', 'config').first() || {};

	// 	return config['config']
	// }



  // public async getHeaderConfig(ctx: HttpContextContract/*unresolved*/) {
  //   var branch=ctx.request.headers()['branch']||''
  //   var get = await Headerconfig.query().where('branch', branch).first()
  //   return ctx.response.send(get)
	// }
  // public async setHeaderConfig(ctx: HttpContextContract/*unresolved*/) {
  //   var config=ctx.request.input('config')
  //   var branch=ctx.request.headers()['branch']||''
  //   var get = await Headerconfig.query().where('branch', branch).first()
  //  if(get){
  //   //update
  //   var header= await Headerconfig.findByOrFail('branch',branch)
  //   await header.merge({config}).save()

  //     return ctx.response.send(await Headerconfig.query().where('branch', branch).first());
  //   }
  //   //insert
  //   await Headerconfig.create({
  //     branch,
  //     config

  // })



  // return ctx.response.send(await Headerconfig.query().where('branch', branch).first());
	// }


	// public async updateHeaderConfig(ctx: HttpContextContract) {

	// 	const {
	// 		config = []
	// 	} = ctx.request.all();

	// 	// return config;
	// 	var updateConfig = await Headerconfig.query().where('id', 'config').update({ config })

	// 	if (updateConfig) {
	// 		return ctx.response.send({
	// 			successStatus: true
	// 		})
	// 		return;
	// 	}
	// 	return ctx.response.send({
	// 		successStatus: false
	// 	})
	// 	return;
	// }
}
