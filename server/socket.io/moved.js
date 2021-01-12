module.exports = socket => {
    socket.on('i-moved', ({ currentPlayer, room }) => {
        socket.to(room.name).emit('opponent-moved', { room, currentPlayer });
    });
};