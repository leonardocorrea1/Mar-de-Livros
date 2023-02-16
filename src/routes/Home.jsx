import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Api from "../components/configAPI";

import "../routes/Home.css"




const Home = () => {

  const [livros, setLivros] = useState([]);

  const getLivros = async() => {

    try {

      const response = await Api.get("/livros");
      

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

  if(!livros || !livros.length) return <div className='loading'>carregando</div>



  return (
    
    <div className='cards '>
      {livros.map((card) => {
        const { id, título, capa, autor, prefacio, preco, genero} = card;

        return(          

      <div className="card card1">
        <div className="container2">
          <img src={capa} 
           alt={título}/>
        
      </div> 
        <div className="details">
          <h3 className="card-autor">{autor}

          </h3>
          <h2 className="card-titulo">{título}
            
          </h2>
          <p className="card-texto">Na cidade de Veneza, no século XVI, Bassânio pede ao mercador Antônio três mil ducados emprestados para poder cortejar Pórcia, uma rica herdeira de Belmonte. Não tendo recursos imediatos para auxiliar o amigo, Antônio decide pedir um empréstimo a Shylock, um judeu agiota e seu inimigo.

          </p>
         
        
       </div>
       <div className="card-footer">
        {/* <Link  to={`/lermais/${id}`}>Ler mais</Link> */}
        <Link to={`lermais/${id}`}>Ler Mais</Link>
      </div>
    </div>
          )

        })}

  </div>
  
  )
}

export default Home