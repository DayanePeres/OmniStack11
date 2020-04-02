const express = require('express');  //Importando módulo do express
const routes =  require('./routes'); // importar o arquivo routes. Usa ./ para não achar que é um pacote, e sim um arquivo
const Cors = require('cors');

const app = express(); //armazena a aplicação

app.use(Cors()); // se quiser pubicar o app dentro do parentes eu adiciono: origem: http://kmeuapp.com.br
app.use(express.json());
app.use(routes);

app.listen(3333); // acessar a aplicação