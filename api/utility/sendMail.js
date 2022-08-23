import nodemailer from 'nodemailer'


export const sendMail = async (to, subject, text) => {

    try {

        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "ismailhaque2956@gmail.com",
                pass: "ttquwcefulwmpqhp"
            }
        });

        await transport.sendMail({

            from : 'ismailhaque2956@gmail.com',
            to : to,
            subject : subject,
            text : text

        })

    } catch (error) {
        console.log(error);
    }

}