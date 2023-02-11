
// Importa o módulo "openai" na aplicação
const openai = require('openai');
//Importa a classe "Configuration" do módulo "openai
const Configuration = openai.Configuration;
//Importa a classe "OpenAIApi" do módulo "openai
const OpenAiApi = openai.OpenAIApi;
//Cria uma instância da classe "Configuration"
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
//Cria uma instância da classe "OpenAIApi" usando a instância da classe "Configuration". 
//A instância da classe "OpenAIApi" será usada para realizar chamadas à API do OpenAI.
const openaiClient = new OpenAiApi(configuration);
//Define a função "generateImage". Esta é uma função assíncrona que será executada 
//quando a rota correspondente for acionada. A função recebe
// dois parâmetros: "req" e "res". O objeto "req" contém informações sobre a solicitação, 
//enquanto o objeto "res" será usado para enviar uma resposta à solicitação.
const generateImage = async (req, res) => {
   //Desestrutura o objeto "req.body" para obter o "prompt" e o "size". 
   const { prompt, size } = req.body;

   const imageSize = size === 'small' ? '256x256' : size === 'medium' ? 
   '512x512' : '1024x1024'

   try{
      //Chama o método "createImage" da instância da classe "OpenAIApi".
      // O método "createImage" aceita um objeto de opções que inclui o "prompt" e o "size"
     const response = await openaiClient.createImage({
        prompt,
        n: 1,
        size: imageSize
     });
   //Extrai a URL da imagem gerada
     const imageUrl = response.data.data[0].url;

     res.status(200).json({
        success: true,
        data: imageUrl
     });
   } catch (error){
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      
     res.status(400).json({
        success: false,
        error: 'A image could not be generated'
     });
   }
};

module.exports = { generateImage };
