const { 
    getDataProyectos 
} = require("../_____/____");

const { enviarCorreo } = require("../utils/utils");



//Petition type GET
const petitions_get = async (req, res) => {

    try {

        //sacar el body el email
        const {
            email,
            hojaCalculo,
            data
        } = req.body

        const {
            hojaCalculo_
        } = req.params

        console.log(hojaCalculo_, 'data.hojaCalculo')

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const dispositivo = req.headers['user-agent'];

        if (email) {
            // enviarCorreo(email, {
            //     ipPub: ip,
            //     dispositivo: dispositivo
            // });
        }
       
        res.json({
            status: 'ok',
            data:  await getDataProyectos(hojaCalculo_)
        });
        
    } catch (error) {
        console.log(error);

        res.json({
            status: 'error',
            message: `Upsss, paso un error`
        })
    }

};


module.exports = {
    petitions_get
};