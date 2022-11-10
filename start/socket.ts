import MachinesController from 'App/Controllers/Http/MachinesController'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  socket.on('FN_INSERT_MACHINE_ACTIVITY', (payload) => {
   new MachinesController().FN_INSERT_MACHINE_ACTIVITY(payload.data)
    console.log(payload)
  })

  socket.on('FN_INSERT_MACHINE_PART_NO', (payload) => {
    new MachinesController().FN_INSERT_MACHINE_PART_NO(payload.data)
     console.log(payload)
   })
   socket.on('FN_INSERT_MACHINE_MAIN', (payload) => {
    new MachinesController().FN_INSERT_MACHINE_MAIN(payload.data)
     console.log(payload)
   })


})


