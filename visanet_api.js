// Import required libraries
const axios = require('axios');
const qs = require('qs');

// VisaNet API credentials
const clientId = '9c52f059-e667-44d6-9580-ab60d511a166'; // Replace with actual client ID
const clientSecret = 'i4DOvmSOZCzeTF6e7DFQuN3UAU3MMwR7N0fyhRlHJ6OkFDNAU6OcVdqx04hocrxq'; // Replace with actual client secret

// Visa token endpoint
const tokenUrl = 'https://sandbox.api.visa.com/oauth2/token';

// VisaNet payment initiation endpoint
const paymentUrl = 'https://sandbox.api.visa.com/visa_direct/fundstransfer/v1/pushfundstransactions';

// Function to get access token
const getAccessToken = async () => {
  const authString = `${clientId}:${clientSecret}`;
  const base64Auth = Buffer.from(authString).toString('base64');

  try {
    const response = await axios.post(tokenUrl, qs.stringify({
      'grant_type': 'client_credentials'
    }), {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to initiate payment
const initiatePayment = async (requestData, token) => {
  try {
    const response = await axios.post(paymentUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Payment Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  getAccessToken,
  initiatePayment
};
