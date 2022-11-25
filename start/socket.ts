import MachinesController from 'App/Controllers/Http/MachinesController'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  socket.on('SK_IO_INSERT_MACHINE_ACTIVITY', (payload) => {
    // console.log("SK_IO_INSERT_MACHINE_ACTIVITY",payload)
    if(typeof payload.data.machine_id!='undefined'){
    var watcher='machine'+payload.data.machine_id
    Ws.io.emit(watcher, payload.data)
    // console.log(payload.data)
    // console.log('D'+watcher)
    }
    new MachinesController().FN_INSERT_MACHINE_ACTIVITY(payload.data)

  })

  socket.on('SK_IO_INSERT_MACHINE_PART_NO', (payload) => {
    console.log("SK_IO_INSERT_MACHINE_PART_NO",payload)
    new MachinesController().FN_INSERT_MACHINE_PART_NO(payload.data)

   })
   socket.on('SK_IO_INSERT_MACHINE_MAIN', (payload) => {
    // console.log("SK_IO_INSERT_MACHINE_MAIN",payload)

    new MachinesController().FN_INSERT_MACHINE_MAIN(payload.data)
   })


})


