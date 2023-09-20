const { 
    getDataProyectos ,
    getDataNgdaycare,
    postDataMoodleUplanner
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
        } = req.query

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

//newgdaycare GET DATA
const petitions_newgdaycare = async (req, res) => {
    
    try {

        const {
            hojaCalculo
        } = req.query

       
        res.json({
            status: 'ok',
            data:  await getDataNgdaycare(hojaCalculo)
        });
        
    } catch (error) {
        console.log(error);

        res.json({
            status: 'error',
            message: `Upsss, paso un error`
        })
    }
}


const petitions_uplannermoodle = async (req, res) => {
        
        try {

            //sacar la informacion del body
            const {
                json,
                response,
                success
            } = req.body

            const responsePetition = await postDataMoodleUplanner({
                json: JSON.stringify(json),
                response: JSON.stringify(response),
                success: success
            });
            
            res.json({
                status: responsePetition? '200' : '500',
            });
            
        } catch (error) {
            console.log(error);
    
            res.json({
                status: 'error',
                message: `Upsss, paso un error`
            })
        }
}




module.exports = {
    petitions_get,
    petitions_newgdaycare,
    petitions_uplannermoodle
};