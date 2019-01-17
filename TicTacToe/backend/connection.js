module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('register', user => {
            console.info(`User registered: { user: ${user.name}, id: ${user.id} }`)
        })
        socket.on('disconnect', () => {
            console.info(`User with id: ${socket.id} disconnected.`)
        })
        socket.on('message', (id, msg) => {
            console.log(id, msg)
            console.info(`Message sent to ${id}`)
            socket.to(id).emit(msg.type, msg.body)
        })
    })
}