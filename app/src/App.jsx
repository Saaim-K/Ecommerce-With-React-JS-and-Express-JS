import React, { useState } from 'react'
import axios from 'axios'
import './App.css'


let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:4444' }


const App = () => {

  // ----------------------------- Axios -----------------------------

  // ----------------------------- Axios -----------------------------


  // ----------------------------- States -----------------------------
  const [post, setPost] = useState('')
  // ----------------------------- States -----------------------------

  // ----------------------------- Functions -----------------------------
  const createPost = (e) => {
    e.preventDefault();

    axios.post(`${baseUrl}/todo`)
      .then(response => {
        console.log(response.data.data);
        // setPost(response.data.data)
      })
      .catch(error => {
        console.log(error);
      })
    console.log('post created')
  }
  // ----------------------------- Functions -----------------------------

  return (
    <>
      <h1>
        Hello World From React App
      </h1>
      <form onSubmit={createPost}>
        <h3>
          Todo App
          <input type="text" onChange={(e) => (setPost(e.target.value))} />
          <button>Post</button>
        </h3>
      </form>
      <h3>{post}</h3>
    </>
  )
}

export default App