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
            // hojaCalculo,
        } = req.body

        const {
            hojaCalculo
        } = req.params

        console.log(hojaCalculo, 'data.hojaCalculo')

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
            data:  await getDataProyectos(hojaCalculo)
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