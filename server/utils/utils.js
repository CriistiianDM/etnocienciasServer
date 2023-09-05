const nodeMailer = require('nodemailer');
const { config } = require('dotenv');
config();


const addHeadings = (people, headings) => {
    return people.map(personAsArray => {
      const personAsObj = {};
  
      headings.forEach((heading, i) => {
        personAsObj[heading] = personAsArray[i];
      });
  
      return personAsObj;
    });
}

const normalizeString = (value) => {
    return String(value || '')
      .trim()
      .toLowerCase();
}

const sheetValuesToObject = (sheetValues, headers) => {
    const headings = headers || sheetValues[0].map(normalizeString);
    let people = null;
    if (sheetValues) people = headers ? sheetValues : sheetValues.slice(1);
    const peopleWithHeadings = addHeadings(people, headings);
    return peopleWithHeadings;
}

const sheetValuesToObjectNull = (sheetValues, headers) => {
    const headings = headers || sheetValues[0].map(normalizeString);
    const people = headers ? sheetValues.slice(1) : sheetValues;
    
    const peopleWithHeadings = people.map(personAsArray => {
      const personAsObj = {};
  
      headings.forEach((heading, i) => {
        personAsObj[heading] = personAsArray[i];
      });
  
      return personAsObj;
    });
    
    return peopleWithHeadings;
}


//peticion post
const enviarCorreo = (email,data) => {
    try {

        //sacar hora y fecha en variables const aparate
        const date = new Date();
        const hora = date.getHours();
        const fecha = date.getDate();

        data.hora = hora;
        data.fecha = fecha;

        const config = {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.remindEmail,
                pass: process.env.correoToken
            }
        };

        const transporter = nodeMailer.createTransport(config);

        const mailOptions = {
            from: process.env.remindEmail,
            to: email,
            cc: process.env.ccEmail,
            subject: `Inicio de sesión regristado Etnociencias`,
            text: '',
            html: menssageEmail(data)
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

const menssageEmail = ({
    ipPub,
    dispositivo,
    hora,
    fecha
}) => {
    const menssaje = `
            <div style="display: grid; width: 100%;">
                <div style="display: flex; width: 80%; margin-left: 10%; margin-right: 10%;">
                    <img style="object-fit: scale-down; height: 4em; width: 100%" src="https://i0.wp.com/etnociencias.org/wp-content/uploads/2021/02/logo-para-inicio.png?w=2400&ssl=1" alt="logo" /> 
                </div>
                 <h1 style="text-align: center; color: #61a229;">Has Iniciado Sesion En Etnociencias</h1>
                <p style="width: 80%; margin-left: 10%; margin-right: 10%; text-align: left; display: grid; gap: 10px">
                <span> Lugar:    <strong>${ipPub}</strong> </span>
                <span> dispositivo: <strong>${dispositivo}</strong> </span>
                <span> Fecha:   <strong>${hora}</strong> </span>
                <span> Hora:    <strong>${fecha}</strong> </span>
                </p>
        </div>
    `
    return menssaje;
}

module.exports = {
    addHeadings,
    normalizeString,
    sheetValuesToObject,
    enviarCorreo,
    sheetValuesToObjectNull
}