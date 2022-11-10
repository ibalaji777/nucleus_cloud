import MachinesController from 'App/Controllers/Http/MachinesController'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  // socket.emit('news', { hello: 'world' })

  socket.on('machine_activity', (data) => {

    // return new MachinesController().insert(ctx)
    console.log(data)
  })



})


