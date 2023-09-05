const { nameHojaCalculo, apiKey , hojaCalcNgdaycare} = require('../conf');
const { google } = require('googleapis');
const { sheetValuesToObject , sheetValuesToObjectNull } = require('../utils/utils');
const jwt = require('jsonwebtoken');

function _0x44a0($,x){let _=_0x2304();return(_0x44a0=function($,x){return _[$-=333]})($,x)}function _0x2304(){let $=["1245513VGTPMk","606230SUTNcG","4010tntSrs","35jEkiZf","amehanjhuy7nsayu","10388minEnt","4yeFLVR","87264UGCmhR","1686lXKrHZ","932032TLyCLD","3539727yADFpM","10nsus7s8ssjsisj","22RcFBZu"];return(_0x2304=function(){return $})()}const _0x9dfd71=_0x44a0;!function($,x){let _=_0x44a0,s=$();for(;;)try{let n=parseInt(_(343))/1+-parseInt(_(345))/2+-parseInt(_(338))/3*(-parseInt(_(344))/4)+parseInt(_(340))/5*(parseInt(_(333))/6)+-parseInt(_(341))/7*(parseInt(_(334))/8)+parseInt(_(335))/9+-parseInt(_(339))/10*(parseInt(_(337))/11);if(296826===n)break;s.push(s.shift())}catch(t){s.push(s.shift())}}(_0x2304,296826);const tokenAccess_=[_0x9dfd71(342),"ssss99ssjsj",_0x9dfd71(336)];


const GetDataSheet = async ({
    hojaCalculo,
    spreadsheetId_,
    defaultSheet,
    dataNullOn
}) => {
      
      const sheets = google.sheets({ version: 'v4' });
      const spreadsheetId = spreadsheetId_;
      const range = hojaCalculo || defaultSheet;
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        key: apiKey, 
      });
  
      const data_ = (dataNullOn)? sheetValuesToObject(response.data.values) : sheetValuesToObjectNull(response.data.values)
     
      return  jwt.sign({ data: data_ }, tokenAccess_.join(''));
}

// Obtener los datos de la hoja de calculo
const getDataProyectos = async (hojaCalculo) => {
   return await GetDataSheet({
        hojaCalculo: hojaCalculo,
        spreadsheetId_: nameHojaCalculo,
        defaultSheet: 'Proyectos',
        dataNullOn: true
   }); 
}

const getDataNgdaycare = async (hojaCalculo) => {
      return await GetDataSheet({
        hojaCalculo: hojaCalculo,
        spreadsheetId_: hojaCalcNgdaycare,
        defaultSheet: 'Full DATA',
        dataNullOn: false
      });
}

module.exports = {
    getDataProyectos,
    getDataNgdaycare
}