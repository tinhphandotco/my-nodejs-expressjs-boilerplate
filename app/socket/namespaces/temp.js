// const pareJwtToken = require("../../utils/func").pareJwtToken;

// const chat = (io) => {
//     let _socket = null;

//     io.on("connection", socket => {
//         _socket = socket;
//         let jwtUser = {};
//         try {
//             jwtUser = pareJwtToken(_socket.handshake.query.token);
//         } catch (er) {
//             console.log("USER HAVE NOT LOGIN");
//         }
//     })
// }

// module.exports = chat;
