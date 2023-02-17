import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../components/configAPI";

import { useNavigate } from "react-router-dom"
import ButtonForm from "../components/Button/ButtonForm"
import useAuth from "../hooks/useAuth"

import '../routes/HomeFunc.css'






const ContHome = () => {

  const { signout } = useAuth();
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);

  const getLivros = async() => {

    try {

      const response = await Api.get(`/livros`);
      

      const data = response.data;

      setLivros(data);

      console.log(data);
      
    } catch (error) {
      console.log(error);
    }

  }
  

  useEffect(() => {

    getLivros();

  }, [])

  function deletelivro(id) {
    Api.delete(`livros/${id}`)
   setLivros( livros.filter(livro => livro.id !== id))
  }

  
    
      

  if(!livros || !livros.length) return <div className='loading'>carregando</div>

  // '/livro/${livro.id}'



  return (

    <div className='estante'>
      {livros.map((livro, key) => {
        const { id, título, capa, autor, prefacio, preco, genero} = livro;

        return(
          <div className="livro">
            <img className="capa" src={capa} alt={título} />
            <div className="inform">
            <h1>{título}</h1>
            <p>{autor}</p>
            </div>
            <div className="btns">
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"><Link to={`/edit/${id}`} >Edit</Link></button>
              <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><Link to={`/lermais/${id}`} >Ler Mais</Link></button>
              <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => deletelivro(livro.id)}>Delete</button>
            </div>
            <hr></hr>
          </div>
        )

        })}

    <div>
      <title>Home</title>
      <ButtonForm text="Sair" onClick={() => [signout(), navigate("/")]}/>
    </div>

  </div>

  )
}

export default ContHome
