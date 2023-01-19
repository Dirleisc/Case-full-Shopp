import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/UseForm';
import { useRequestData } from '../../hooks/UseRequestData';
import { goToEndOrder } from '../../routers/Coordinator';
import { MyOrderForm } from './styled';

export default function Form({ productList, setProductList }) {
   const navigate = useNavigate();
   //visible botão
   const [visibleBtnClient, setVisibleBtnClient] = useState(true)
   const [visibleBtnProduct, setVisibleBtnProduct] = useState(true)
   //dados formulaios
   const [form, onChange, restForm] = useForm({ client: '', product: '', qty: 1, deliveryDate: '' })
   //dados cliente
   const [dataClient, isloadingClient, errorClient, upClient, setUpClient] = useRequestData('http://localhost:3003/clients');
   //dados productos
   const [dataProduct, isloadingProduct, errorProduct] = useRequestData('http://localhost:3003/products');
   //-------------------------> Clientes ------------------------------------->
   //cliente selecionado
   const selectClient = !isloadingClient && dataClient && dataClient.find((dtClient) => {
      return dtClient.name === form.client;
   })
   //add client
   const addClient = () => {
      const body =
      {
         "name": form.client
      }
      axios.post('http://localhost:3003/client', body, {})
         .then((res) => {
            setUpClient(!upClient)
            console.log(res);
         }).catch((e) => {
            console.log(e.message);
         })
   }
   // selecionar cliente
   const selectClientBtn = () => {
      setVisibleBtnClient(!visibleBtnClient)

   }
   // -------------------------------- Produtos ------------------------------>

   // selecionar produtos
   const selectProduct = !isloadingProduct && dataProduct && dataProduct.find((dProduct) => {
      return dProduct.name === form.product;
   })
   // add produto
   const addProduct = () => {
      const newProduct = selectProduct;
      newProduct.qty = form.qty;
      setProductList([...productList, newProduct])
   }

   //-----------------------------------Order-------------------------------------->

   //
   const makeOrder = (e) => {
      e.preventDefault();
      if (!productList || !form.deliveryDate || !selectClient) {
          alert("Confira os dados")
      } else {
          const deliveryDateDb = `${form.deliveryDate.split("/")[2]}-${form.deliveryDate.split("/")[1]}-${form.deliveryDate.split("/")[0]}`
          const productListDB = productList.map((p) => {
              return { "id": p.id, "qty": Number(p.qty) }
          })
          const body = {
              "fk_client": Number(selectClient.id),
              "delivery_date": deliveryDateDb,
              "products": productListDB
          }
         axios.post("http://localhost:3003/order", body, {})
            .then((response) => {
               console.log(response);
               goToEndOrder(navigate)
            }
            ).catch((error) => {
               console.log(error.message);
            })

      }
   }


   return (
      <MyOrderForm onSubmit={makeOrder}>
         {selectClient && !visibleBtnClient &&
            <div>
               <h1>Cliente:{selectClient.name}</h1>
            </div>
         }
         {/* clientes */}
         {selectClient && !visibleBtnClient ||
            <div id='select-client'>

               <label htmlFor='client'>Nome Cliente:</label>
               <input id='client' list='dataClient' name='client' onChange={onChange} value={form.client}></input>
               <datalist id='dataClient'>
                  {isloadingClient && !dataClient && <option>Carregando...</option>}
                  {!isloadingClient && dataClient && dataClient.map((client) => {
                     return <option key={client.id}>
                        {client.name}
                     </option>
                  })}
               </datalist>
               {!selectClient && (form.client.length > 3) &&
                  <button type='button' onClick={() => { addClient() }}>Cadastrar Cliente</button>}

               {selectClient && visibleBtnClient &&
                  <button type='button' onClick={() => { selectClientBtn() }}>Confirmar</button>}
            </div>
         }
         {/* produtos */}
         {selectClient && !visibleBtnClient &&
            <div id='select-product'>
               <label htmlFor='product'>Produto</label>
               <input id='product' list='dataProduct' name='product' value={form.product} onChange={onChange}></input>
               <datalist id='dataProduct'>
                  {isloadingProduct && !dataProduct && <option>Carregando...</option>}
                  {!isloadingProduct && dataProduct && dataProduct.map((product) => {
                     return <option key={product.id}>
                        {product.name}
                     </option>
                  })}
               </datalist>

               <label htmlFor='qty'>Quantidade kg</label>
               <input id='qty' type={"number"} name='qty' value={form.qty} onChange={onChange}></input>
               <p>R$:{selectProduct && parseFloat(selectProduct.price * form.qty).toFixed(2)}</p>

               {selectProduct && visibleBtnProduct && selectProduct.qty_stock >= form.qty &&
                  <button type='button' onClick={() => { addProduct() }}>Adicionar</button>
               }
               {selectProduct && selectProduct.qty_stock < form.qty &&
                  <h3>Produto indisponível!</h3>
               }
            </div>
         }
         {/* order */}
         {productList.length > 0 &&
            <div id='order'>
               <label htmlFor='deliveryDate'>Data de entrega(DD/MM/AAAA)</label>
               <input id='deliveryDate' name='deliveryDate' value={form.deliveryDate} onChange={onChange} />
               <button type='submit'>Confirmar pedido</button>
            </div>
         }
      </MyOrderForm>
   );
}


