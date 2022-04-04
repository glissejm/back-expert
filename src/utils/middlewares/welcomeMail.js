const {emailSender} = require('./mailer')


exports.welcomeMailFirst = (user) => {
    console.log("REVISAR",user.email,user.name)
    return emailSender({
        to: user.email,
        from: 'omarftt@gmail.com',
        subject: `Bienvenido ${user.name} a Expert`,
        text: 'Nos sentimos felices que te unas a este equipo',
        
    });
};