import MachinesController from 'App/Controllers/Http/MachinesController'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  socket.on('FN_INSERT_MACHINE_ACTIVITY', (data) => {
   new MachinesController().FN_INSERT_MACHINE_ACTIVITY(data)
    console.log(data)
  })



})


