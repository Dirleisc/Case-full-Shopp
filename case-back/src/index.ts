import express from "express";
import cors from "cors";
import { createClient } from "./endpoints/createClient";
import { getAllClients } from "./endpoints/allClients";
import { getAllProducts } from "./endpoints/allProducts";
import { createOrder } from "./endpoints/createOrder";
import { getStock } from "./endpoints/stock";
import { AddressInfo } from "net";

const app = express();

 app.use(express.json());
 app.use(cors());

 const server = app.listen(process.env.PORT || 3003, () => {
  if(server){
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
  }else{
      console.error(`Failure upon starting server.`)
  }
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