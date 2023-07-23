const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const {
    clientSecret,
    clientId,
    redirectUris,
    apiKey
} = require('../conf');


const authorize = () => {
  console.log(clientId, clientSecret, redirectUris, apiKey,'j');
  //const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris);
  const oAuth2Client =new google.auth.GoogleAuth({
    credentials: null, // Deja las credenciales en null para que no intente utilizar OAuth 2.0.
  });

  return new Promise((resolve, reject) => {
    oAuth2Client.setCredentials({
        access_token: apiKey,
        token_type: 'Bearer',
        expiry_date: 9999999999999,
    });
    resolve(oAuth2Client);
  });
};


module.exports = {
    SCOPES,
    authorize
};