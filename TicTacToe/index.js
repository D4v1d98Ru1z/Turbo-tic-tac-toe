const server = require('http').Server()
const io = require('socket.io')(server)
const port = require('./config').SERVER_PORT

const banner = `
*********************************************
*       NodeJS connection with Sockets      *
*           By: davidle.codes               *
*           Tic-Tac-Toe Server              *
* ----------------------------------------- *
*  Status: Online                           *
*  Server port: ${port}                        *
*  Frontend link: http://localhost:${port}     * 
*********************************************
`

io.on('connection', socket => {
    socket.on('register', user => {
        console.info(`User registered: ${user.name}`)
    })
})

server.listen(port, () => {
    console.log(banner)
})