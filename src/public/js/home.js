
const socket = io();


socket.on("connect", () => {
    console.log("Conectado al Server");
});


socket.on("saludo-respuesta", (data) => {
    console.log(data.message);
});

socket.on("realTimeProducts", (realtimeproducts) =>{
    console.log (realtimeproducts);

});


socket.on("disconnect", () => {
    console.log("Se desconecto el server");
});