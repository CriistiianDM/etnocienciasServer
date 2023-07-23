const { config } = require('dotenv');
config();


//console.log(process.env.password);
//exportar modulo
module.exports = {  
    port: process.env.DB_PORTS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUris: process.env.REDIRECT_URIS,
    nameHojaCalculo: process.env.URL_HOJA_CALCULO,
    apiKey: process.env.API_KEY,
};