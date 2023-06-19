const nodemailer = require('nodemailer');
const sendMail = async(email,subject,html) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 587,
            secure: true,
            auth: {
                user: "DoctorPatient6@gmail.com",
                pass: "sscwzfndzvwvwshc",
            },
        });
        await transporter.sendMail({
            from: "DoctorPatient6@gmail.com",
            to: email,
            subject: subject,
            html: html,
        });
    }
    catch(error){

    }
};

module.exports = sendMail;