let socket = require('socket.io')

let users = new Map() //users connected and their selection of locations to eat at
module.exports = (server) => {
  let io = socket(server)

  io.on('connection', socket => {
    io.sockets.emit('users', Array.from(users.values()))

    socket.on('disconnect', () => {
      if (users.has(socket.id)) {
        let name = users.get(socket.id).name
        console.log(`Disonnected: ${name}`)

        users.delete(socket.id)

        io.sockets.emit('users', Array.from(users.values()))
        console.log(users)
      }
    })

    socket.on('register', userData => {
      console.log(`Registered: ${userData.name}`)

      users.set(socket.id, userData);
      io.sockets.emit('users', Array.from(users.values()))
      console.log(users)
    })

    socket.on('unregister', () => {
      let name = users.get(socket.id).name
      console.log(`Unregistered: ${name}`)
      users.delete(socket.id)

      io.sockets.emit('users', Array.from(users.values()))
      console.log(users)
    })

    socket.on('user-update', userData => {
      users.set(socket.id, userData)

      io.sockets.emit('user-update', Array.from(users.values()))
      console.log(users)
    })

  })
}