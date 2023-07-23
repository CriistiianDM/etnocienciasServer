//libs
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    only_petitions_fronted
} = require('./middleware/middleware')

//importar rutas
const routes = require('./routes/routes');


//inicializaciones
const app = express();

//Puerto para el despliegue en producción
const { PORT } = process.env;

//configuraciones
app.set('port', PORT || 3700);


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(only_petitions_fronted)
app.use(routes);



//despliegue del servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});