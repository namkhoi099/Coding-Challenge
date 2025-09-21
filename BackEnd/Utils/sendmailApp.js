const sendmail = require('sendmail')();


const sendMail = (receiver = 'xagifej685@dotxan.com', title = 'Employee Task Management', description = 'Mail of test sendmail ') => {
    sendmail({
        from: 'no-reply@coding-challenge.com',
        to: receiver,
        subject: title,
        html: description,
    }, function (err, reply) {

    });
}

module.exports = { sendMail }