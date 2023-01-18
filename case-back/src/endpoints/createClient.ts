import {Request, Response} from "express";
import connection from "../database/connections";

export const createClient=async (req:Request, res: Response) => {
   let erroCode=400;
   try {
      const name = req.body.name;
      if(!name){
         throw new Error("Nome Inválido!");
      }
      await connection("Case_Clients").insert({
         name
      })
      res.status(200).send("Novo cliente criado!")
   } catch (error:any) {
      res.status(erroCode).send({message: error.message})
      
   }
}