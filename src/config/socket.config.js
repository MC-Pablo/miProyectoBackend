import {Server} from "socket.io";
import realtimeproducts from "../files/items.js";


const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);

   
    serverIO.on("connection", (socket) => {
        const id = socket.client.id;
        console.log("Conexión establecida", id);

     
        socket.on("saludo", (data) => {
            console.log(data.message);

            serverIO.emit("saludo-respuesta", { message: "Hola Cliente" });
    

        });
        socket.emit("realTimeProducts", realtimeproducts);
      
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente");
        });
    });
};

export default { config };