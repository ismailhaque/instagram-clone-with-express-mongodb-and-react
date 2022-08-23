import Vonage from '@vonage/server-sdk'

const vonage = new Vonage({
    apiKey: "120dad1b",
    apiSecret: "qbK4uzF0uAyiTMib"
})

const sendSms = () => {

    const from = "Vonage APIs"
    const to = "8801773302956"
    const text = 'Wellcome Our Instagram'

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

}

export default sendSms;