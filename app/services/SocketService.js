var io;

function SocketService() {
    this.Init = function (server) {
        io = server;
    };

    this.UpdateAuction = function (auction) {
        if (io) {
            io.emit("update-auction", auction);
        }
    }
    this.FinishAuction = function () {
        if (io) {
            io.emit("finish-auction");
        }
    }
}

module.exports = new SocketService();
