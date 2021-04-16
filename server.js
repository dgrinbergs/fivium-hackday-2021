let express = require('express')
let socket = require('socket.io')

// App setup
let app = express()
const port = 8080
let server = app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})

app.use(express.static('static'))

let users = new Map() //users connected and their selection of locations to eat at

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