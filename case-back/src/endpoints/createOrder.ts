import {Request, Response} from "express";
import connection from "../database/connections";
import { TProduct } from "../models/products";

export const createOrder=async (req:Request, res: Response) => {
   let erroCode=400;
   try {
      //dados de request
      const delivery_date = req.body.delivery_date;
      const fk_client = req.body.fk_client;
      const products:TProduct[]=req.body.products;


      if(!delivery_date||!products|| !fk_client){
         throw new Error("Body invalid!");
      }
      // verifiicar stock
      const idsProducts=products.map((product)=>product.id);
      const stockProducts = await connection.select("qty_stock").from("Case_Products")
      .whereIn("id",idsProducts)

      for(let i=0; i<products.length;i++){
         if(products[i].qty > stockProducts[i].qty_stock){
            throw new Error("Estoque indisponivel!");
            
         }
      }
      
   //    //fazer pedidos no estoque
      await products.forEach(async product=>{

      //add registros
      await connection("Case_Orders").insert(
         {
         order_date:new Date().toISOString().slice(0,10),
         delivery_date,
         qty:product.qty,
         fk_client,
         fk_product:product.id
      })
      // get stock
     const getStock = await connection.select("qty_stock")
      .from("Case_Products")
      .where({id:product.id})
      const stockAtual = Number(getStock[0].qty_stock);

      //atualizar estoque
      await connection("Case_Products")
      .where({id:product.id})
      .update({qty_stock:stockAtual-product.qty})
   })
      res.status(200).send("Pedido criado com sucesso!")
   } catch (error:any) {
      res.status(erroCode).send({message: error.message})
      
   }
}
