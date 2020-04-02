import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'; 
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../Services/api'; //conectando back com front

export default function Register(){

    // criando um componente para armazenar as informações dos inputs;
    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); // para salvat o usuário cadastrado

    // ------- CADASTRO DE USUÁRIO - Back-and ------------
    async function handleRegister(E){
        //Usado em todos os formulários REACT para evitar que redirecte
        E.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('');
        }
        catch(err){
            alert('Erro no cadastro, teste novamente.')
        }
        
    }


    // ----------- FRONT-AND -----------------------------
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro.
                    </Link>
                </section>
                 {/* **********   usando o preventDefault ********* */}
                <form onSubmit={handleRegister}>   
                    <input placeholder="Nome da ONG." 
                            //usando o useState para armazenar as informações do imput
                            value={name}
                            onChange={e => setName(e.target.value)}
                    />

                    <input type="email" placeholder="E-mail" 
                             value={email}
                             onChange={e => setEmail(e.target.value)}
                    />

                    <input placeholder="WhatsApp" 
                             value={whatsapp}
                             onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade" 
                                 value={city}
                                 onChange={e => setCity(e.target.value)}
                        />

                        <input placeholder="UF" style={{ width: 80 }}
                                 value={uf}
                                 onChange={e => setUf(e.target.value)}
                        />

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}