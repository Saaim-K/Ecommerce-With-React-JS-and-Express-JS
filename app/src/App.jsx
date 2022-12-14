import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:4444' }


const App = () => {
  // ----------------------------- States -----------------------------
  const [product, setProduct] = useState([])
  const [addProduct, setAddProduct] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  // ----------------------------- States -----------------------------


  // ----------------------------- Create Product Function -----------------------------
  const createPost = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/product`, { name, description, price })
      .then(response => {
        console.log("Response Sent ", response.data);
        setAddProduct(!addProduct)
      })
      .catch(error => {
        console.log(error);
      })
    console.log('Post created Succesfully 👍')
  }
  // ----------------------------- Create Product Function -----------------------------


  // ----------------------------- Get Product Function -----------------------------
  useEffect(() => {
    const allProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products`)
        console.log(response.data);
        setProduct(response.data.data)
      }
      catch (error) {
        console.log('error in getting all products', error)
      }
    }
    allProducts()

    // ---------- Cleanup Function ----------
    return () => { allProducts() }
    // ---------- Cleanup Function ----------

  }, [addProduct])
  // ----------------------------- Get Product Function -----------------------------


  // ----------------------------- Delete Product Function -----------------------------
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`)
      console.log("response: ", response.data);
      setAddProduct(!addProduct)
    } catch (error) {
      console.log("error in getting all products", error);
    }
  }
  // ----------------------------- Delete Product Function -----------------------------


  // ----------------------------- Edit Product Function -----------------------------

  const editProduct = async(id) => {
    try {
      const response = await axios.put(`${baseUrl}/product/${id}`)
      console.log("response: ", response.data);
      setAddProduct(!addProduct)
    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  // ----------------------------- Edit Product Function -----------------------------




  return (
    <>
      <form onSubmit={createPost}>
        <h3>
          Product Name:
          <input placeholder='Enter Product' type="text" onChange={(e) => (setName(e.target.value))} /> <br />
          Product Description:
          <input placeholder='Enter Product Description' type="text" onChange={(e) => (setDescription(e.target.value))} /> <br />
          Product Price:
          <input placeholder='Enter Product Price' type="number" onChange={(e) => (setPrice(e.target.value))} /> <br />
          <button>Post</button>
        </h3>
      </form>

      <div>
        {product.map((eachProduct, i) =>
        (
          <div key={i}>
            <hr />
            <h1>{eachProduct.name}</h1>
            <h3>{eachProduct.description}</h3>
            <h3>{eachProduct.price}</h3>
            <h3>{eachProduct.id}</h3>
            <button onClick={() => { deleteProduct(eachProduct.id) }}>Delete</button>
            <button onClick={() => { editProduct(eachProduct.id) }}>Edit</button>
            <hr />
            <br />
          </div>

        ))}
      </div>



    </>
  )
}

export default App