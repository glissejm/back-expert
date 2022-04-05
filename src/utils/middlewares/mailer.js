const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.emailSender = async (message) => {
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

