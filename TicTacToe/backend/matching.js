module.exports = () => {
    let players = {},
        onWait = [],
        onMatch = {}

    const loop = setInterval(checkQueue, 5000)

    function checkQueue() { 
        // Print the values from the pool
        console.info(`Queues: { Players: ${Object.keys(players).length}, onWait: ${onWait.length} }`)
        while(onWait.length > 2){
            console.info(`Building the rom...`)
            const player1 = players[onWait.pop()].user.name
            const player2 = players[onWait.pop()].user.name
            console.log(`There's a match between Player 1: ${player1} and Player 2: ${player2}`)
        }
    }
    
    return {
        userConnect: ({socket, user}) => {
            if(!players[socket.id]){
                // Add Players list
                players[socket.id] = {user, socket}
                // Add to the waiting list
                console.log(`Debbug socker.id ${socket.id}`)
                onWait.push(socket.id)
            }
        },
        // Stop the interval loop
        clear: () => clearInterval(loop),
        userDisconnect: id => {
            // Close ongoing game related to player if any
            console.log(`On disconnect ${id}`)
            if(players[id].roomID && onMatch[players[id].roomID]){
                const roomID = players[id].roomID
                // Put all players onWait
                onMatch[roomID].players.map(player =>{
                    console.log(`Debbug player.id ${player.id}`) 
                    onWait.push(player.id)
                })
                // Delete  match ROOM
                delete onMatch[players[id].roomID]
                // If the object is empty reset it
                if(!onMatch) onMatch = {}
            }
            // Delete all the instances of disconnecting player from waiting list 
            onWait = onWait.filter(el => el !== id)
            // Delete players from the list
            if(players[id]){
                console.log(`Debbug players[id] to delete: ${players[id]}`)
                delete players[id]
                if(!players) players = {}
            }
        }
    }
}