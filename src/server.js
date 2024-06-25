import express from "express";
import handlebars from "express-handlebars";
import paths from "./utils/path.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import shoppingCartRouter from "./routes/shoppingCart.router.js";
import products from "./files/products.json" assert { type: 'json' };

import serverSocket from "./config/socket.config.js"



const server = express();
const PORT = 8080;
const HOST = "localhost";

// Declaración del motor de plantillas
server.engine("handlebars", handlebars.engine());
server.set("views", paths.views);
server.set("view engine", "handlebars");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// ENDPOINTS

server.use("/api/public", express.static(paths.public));
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);
server.use("/api/shopping-cart", shoppingCartRouter);
server.get("/home", (req, res) => {
    const allProducts = products;

    res.render("home", { title: "Inicio", allProducts });
});
server.get("/api/realtimeproducts", (req, res) => {
  
    res.render("realTimeProducts", { title: "Actualizacion de productos"});
});



// Método oyente de solicitudes
const serverHTTP = server.listen(PORT, () => {
  console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});


// Servidor de websocket
serverSocket.config(serverHTTP);