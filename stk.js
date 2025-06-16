const axios = require('axios');
const config = require('./config');

async function stkPush(phone) {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(config.shortcode + config.passkey + timestamp).toString('base64');
    
    const tokenResponse = await axios.get('https://payhero.co.ke/api/auth', {
        headers: { Authorization: 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64') }
    });

    const access_token = tokenResponse.data.access_token;

    const stkPayload = {
        amount: 100,
        msisdn: phone,
        account_no: "PAYHERO",
        shortcode: config.shortcode,
        callback_url: config.callbackUrl
    };

    const response = await axios.post('https://payhero.co.ke/api/transaction', stkPayload, {
        headers: { Authorization: 'Bearer ' + access_token }
    });

    return response.data;
}

module.exports = stkPush;