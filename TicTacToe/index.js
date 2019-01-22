const server = require('http').Server()
const io = require('socket.io')(server)
const port = require('./config').SERVER_PORT
require('./backend/connection')(io)

const banner = `
*********************************************
*       NodeJS connection with Sockets      *
*           By: davidle.codes               *
*           Tic-Tac-Toe Server              *
* ----------------------------------------- *
*  Status: Online                           *
*  Server port: ${port}                        *
*  Frontend link: http://localhost:${port-1}     * 
*********************************************
`


server.listen(port, () => {
    console.log(banner)
})