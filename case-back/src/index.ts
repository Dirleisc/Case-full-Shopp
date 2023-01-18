import express from "express";
import cors from "cors";
import { createClient } from "./endpoints/createClient";
import { getAllClients } from "./endpoints/allClients";
import { getAllProducts } from "./endpoints/allProducts";
import { createOrder } from "./endpoints/createOrder";
import { getStock } from "./endpoints/stock";

const app = express();

 app.use(express.json());
 app.use(cors());

 app.listen(3003,()=> {
   console.log("Servidor na porta 3003!");
 })
 
 //retorna todos clientes
 app.get("/clients", getAllClients);
 
 //retorna todos produtos
 app.get("/products", getAllProducts);

 //retorna stock
 app.get("/stock", getStock);

 //retorna dados dos produtos
 app.post("/order", createOrder);
 
 //criar novo cliente
app.post("/client", createClient);