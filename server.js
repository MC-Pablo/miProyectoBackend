import express from "express";
import path from "path";



import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";


const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api/public", express.static(path.join("src", "public")));


server.use('/api/products', productsRouter);
server.use('/api/carts', cartsRouter);



server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});