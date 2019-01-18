module.exports = () => {
    let players = {},
        onWait = [],
        onMatch = {}

    
    
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