const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeMail = async (message) => {
    try{
        await sgMail.send(message)
        console.log('Message sent succesfully')
    } catch (error) {
        console.error(error)

        if (error.response) {
            console.error(error.response.body)
        }
    };

};

exports.sendMail = (user) => {
    console.log("REVISAR",user.email,user.name)
    return welcomeMail({
        to: user.email,
        from: 'omarftt@gmail.com',
        subject: `Bienvenido ${user.name} a Expert`,
        text: 'Nos sentimos felices que te unas a este equipo',
        
    });
};