var io;

function SocketService() {
    this.Init = function (server) {
        io = server;
    };

    this.UpdateAuction = function (auction) {
        if (io) {
            io.emit("update", auction);
        }
    }
}

module.exports = new SocketService();
