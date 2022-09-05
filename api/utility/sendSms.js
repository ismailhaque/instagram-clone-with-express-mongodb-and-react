import Vonage from '@vonage/server-sdk'
import axios from 'axios'

const vonage = new Vonage({
    apiKey: "120dad1b",
    apiSecret: "qbK4uzF0uAyiTMib"
})

export const sendSms = (text) => {

    const from = "Vonage APIs"
    const to = "8801773302956"

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

export const blukSmsBd = async (number, message) => {
    try {

        await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=7kelQnVDPf96nNa2K00n&type=text&number=${number}&senderid=03590002777&message=${message}`)

    } catch (error) {
        console.log(error);
    }

}