import fetch from 'node-fetch';

// Your existing code that uses fetch
const userId = 'JWTDU8L2TBHDGH0ZH1Y321dEABzcwuzcMtWR9QPLYaf9sWPPg';
const secretPhrase = 'mono2B7As3GnVJBZB5';
const endpointUrl = 'https://sandbox.api.visa.com/visapayouts/v3/payouts';

async function sendPayment() {
    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId}:${secretPhrase}`
            },
            body: JSON.stringify({
                amount: 100.00,
                currency: 'USD',
                merchantRef: 'INV-001',
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                customerAddress: '123 Main St, City, Country'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Payment link:', responseData.paymentLink);
    } catch (error) {
        console.error('Error sending payment:', error.message);
    }
}

sendPayment();
