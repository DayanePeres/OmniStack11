import React, {useEffect, useState} from'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../Services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

//---------------- INTEGRAÇÃO BACK-AND + FRONT-AND ------------------
export default function Profile(){
    const [incidents, setInsidents] = useState([]);

    const history = useHistory('');

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(Response => {
            setInsidents(Response.data);
        })
  }, [ongId]); // para disparar alguma função em tela.

  async function handleDeleteIncident(id){
    try{
        await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId,
            }
        });

        //alert('Item deletado');

        // Para atualizar a página quando é deletado uma ong
        setInsidents(incidents.filter(incident => incident.id !== id))
    }
    catch(err){
        alert('Erro ao deletar caso.');
    }
  }

  function handleLogout(){
    localStorage.clear();  
    
    history.push('/');
  }
    
  //------------------------------ FRONT-AND -----------------------------------------
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vindo, {ongName}</span>                

                <Link className="button" to="/incident/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASOS:</strong>
                    <p>{incident.title} </p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    {/* para formatar valor em reais */}
                    <p>{Intl.NumberFormat('pt-Br', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>                    

                    {/* chamando a função para a exclusão no back-and */}
                    <button onClick={ () => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
               
            </ul>
        </div>
    );
}
