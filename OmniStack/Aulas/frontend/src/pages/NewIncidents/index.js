import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from  'react-icons/fi';
import logoImg from '../../assets/logo.svg'; 
import api from '../../Services/api'

import './style.css';

export default function NewIncident (){
    // criando um componente para armazenar as informações dos inputs;
    const [title, setTitle] = useState('');   
    const [description, setDescriptio] = useState('');   
    const [value, setValue] = useState('');   

    const history = useHistory('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(E){
        //Usado em todos os formulários REACT para evitar que redirecte
        E.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        }
        catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    // ------------------------- FRONT-AND -----------------------------
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home.
                    </Link>
                </section>

                {/* chamando a função para cadastrar novo incidente */}
                <form onSubmit={handleNewIncident}>   
                    <input 
                            placeholder="Título do Caso" 
                    //usando o useState para armazenar as informações do imput
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                            placeholder="Descrição" 
                            value={description}
                            onChange={e => setDescriptio(e.target.value)}
                    />

                    <input 
                            placeholder="Valor em reais" 
                            value={value}
                            onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}