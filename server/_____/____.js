const { google } = require('googleapis');
const { sheetValuesToObject } = require('../utils/utils');
const jwt = require('jsonwebtoken');
const { nameHojaCalculo, 
  hojaCalcMoodle, 
  apiKey, 
  hojaCalcNgdaycare,
  client_email,
  private_key } = require('../conf');

console.log(client_email, private_key, 'client_email, private_key')
function _0x44a0($,x){let _=_0x2304();return(_0x44a0=function($,x){return _[$-=333]})($,x)}function _0x2304(){let $=["1245513VGTPMk","606230SUTNcG","4010tntSrs","35jEkiZf","amehanjhuy7nsayu","10388minEnt","4yeFLVR","87264UGCmhR","1686lXKrHZ","932032TLyCLD","3539727yADFpM","10nsus7s8ssjsisj","22RcFBZu"];return(_0x2304=function(){return $})()}const _0x9dfd71=_0x44a0;!function($,x){let _=_0x44a0,s=$();for(;;)try{let n=parseInt(_(343))/1+-parseInt(_(345))/2+-parseInt(_(338))/3*(-parseInt(_(344))/4)+parseInt(_(340))/5*(parseInt(_(333))/6)+-parseInt(_(341))/7*(parseInt(_(334))/8)+parseInt(_(335))/9+-parseInt(_(339))/10*(parseInt(_(337))/11);if(296826===n)break;s.push(s.shift())}catch(t){s.push(s.shift())}}(_0x2304,296826);const tokenAccess_=[_0x9dfd71(342),"ssss99ssjsj",_0x9dfd71(336)];

//configure a JWT auth client
let jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/spreadsheets']);

    //authenticate request
    jwtClient.authorize(function (err, tokens) {
          if (err) {
          console.log(err);
          return;
    } else {
         console.log("Successfully connected!");
    }
});


const GetDataSheet = async ({
    hojaCalculo,
    spreadsheetId_,
    defaultSheet
}) => {
      
      const sheets = google.sheets({ version: 'v4' });
      const spreadsheetId = spreadsheetId_;
      const range = hojaCalculo || defaultSheet;
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        key: apiKey, 
      });
     
      return  jwt.sign({ data: sheetValuesToObject(response.data.values) }, tokenAccess_.join(''));
}

// Obtener los datos de la hoja de calculo
const getDataProyectos = async (hojaCalculo) => {
   return await GetDataSheet({
        hojaCalculo: hojaCalculo,
        spreadsheetId_: nameHojaCalculo,
        defaultSheet: 'Proyectos'
   }); 
}

const getDataNgdaycare = async (hojaCalculo) => {
      return await GetDataSheet({
        hojaCalculo: hojaCalculo,
        spreadsheetId_: hojaCalcNgdaycare,
        defaultSheet: 'Full DATA'
      });
}


// Enviar los datos a la hoja de calculo
const postDataMoodleUplanner = async ({
   json,
   response,
   success
}) => {
    try {
      
      const sheets = google.sheets({ version: 'v4' , auth: jwtClient });
      const spreadsheetId = hojaCalcMoodle;
      const range = 'Grades';
      const dataSend = [[
           json,
           response,
           success
      ]]

      //Obtener los datos actuales en la hoja para determinar la fila siguiente
      const responseSheet = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        key: apiKey,
      });

      const currentValues = responseSheet.data.values;
      const nextRow = currentValues ? currentValues.length + 1 : 1;

      // Actualizar el rango para que sea la siguiente fila
      const updatedRange = `${range}!A${nextRow}`;

      //
      const sheetsResponse = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: updatedRange,
        valueInputOption: 'RAW', 
        resource: {
          values: dataSend,
        },
        key: apiKey,
      })


     if (sheetsResponse.status === 200) {
         return true;
     } 
     return false;
     
    } catch (error) {
      console.log(error);
    }

}

module.exports = {
    getDataProyectos,
    getDataNgdaycare,
    postDataMoodleUplanner
}