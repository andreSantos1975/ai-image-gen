const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000

const app = express();

///Ativa o analisador de corpo
///Habilita o middleware "body-parser" para analisar o corpo da solicitação como JSON.
app.use(express.json());
///Habilita o middleware "body-parser" para analisar o corpo da solicitação como dados 
///codificados em URL. O parâmetro "extended" está definido como "false", o que significa 
///que somente dados simples serão suportados.
app.use(express.urlencoded({extended: false}))
//Adiciona um manipulador de rota para a rota "/openai". A rota "/openai" será gerenciada 
//pelas rotas definidas no arquivo "./routes/openaiRoutes.js
app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
