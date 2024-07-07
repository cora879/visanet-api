const axios = require('axios');

const VISA_API_BASE_URL = 'https://sandbox.api.visa.com';

// Function to initiate payment
async function initiatePayment(amount, currency, merchantRef, customerName, customerEmail, customerAddress) {
    try {
        const response = await axios.post(`${VISA_API_BASE_URL}/vdp/helloworld`, {
            amount,
            currency,
            merchantRef,
            customerName,
            customerEmail,
            customerAddress
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${getBase64EncodedApiKey()}`
            }
        });

        return response.data; // Assuming VisaNet API responds with appropriate data
    } catch (error) {
        throw new Error(`VisaNet API Error: ${error.message}`);
    }
}

// Function to get base64-encoded API key
function getBase64EncodedApiKey() {
    const apiKey = 'your-visanet-api-key'; // Replace with your actual VisaNet API key
    return Buffer.from(apiKey).toString('base64');
}

module.exports = {
    initiatePayment,
    getBase64EncodedApiKey
};
