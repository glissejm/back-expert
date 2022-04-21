const {emailSender} = require('./mailer')

const url = process.env.URL_FRONT || "http://localhost:3000"

exports.recoveryPassword = (email,token) => {
    return emailSender({
        to: email,
        from: 'omarftt@gmail.com',
        subject: 'Recuperacion de contraseña',
        text: 'Hola, para recuperar tu contraseña por favor haz click en el siguiente enlace:',
        html:  `
                <div>
                    <h1>Recuperacion de contraseña</h1>
                    <a href=${url}/password-reset/${token}>Recuperar contraseña</a>
                </div>
                `
    })
}