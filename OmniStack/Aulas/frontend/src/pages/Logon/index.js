import React, {useState, useReducer} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style.css';
import {FiLogIn} from 'react-icons/fi';

import heroesimg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../Services/api';

export default function Logon() {

    // criando componente para armazenar o imput
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(E){
        //Usado em todos os formulários REACT para evitar que redirecte
        E.preventDefault();

        try{
            const response = await api.post('session', {id});
            
            // salva as informações e redireciona para outra página
            history.push('profile'); 
        }
        catch(err){
            alert('Falah no login, tente novamente');
        }
    }

   return(
    <div className="logon-container">
        <section className="form">
            <img src={ logoImg } alt="Be The Hero"/>

            {/* **********   usando o preventDefault ********* */}
            <form onSubmit={handleLogin}> 
                <h1> Faça seu Logon</h1>
                <input placeholder="Sua ID"
                        //usando o useState para armazenar as informações do imput
                        value={id}
                        onChange={e => setId(e.target.value)}
                />

                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro.
                </Link>
            </form>
        </section>

        <img src={ heroesimg } alt="Heroes" />
    </div>    

   );
}