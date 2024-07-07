// generateInvoicePDF.js
const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { authHeader, handleError } = require('./visaNetUtils');

// Function to generate PDF invoice
async function generateInvoice(invoiceData, filePath) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    // Add title
    doc.fontSize(20).text('Invoice', { align: 'center' });

    // Add customer details
    doc.fontSize(12).text(`Customer: ${invoiceData.customerName}`);
    doc.text(`Email: ${invoiceData.customerEmail}`);
    doc.text(`Address: ${invoiceData.customerAddress}`);

    // Add invoice details
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`);
    doc.text(`Date: ${invoiceData.date}`);
    doc.moveDown();

    // Add items
    invoiceData.items.forEach(item => {
        doc.text(`${item.name} - ${item.quantity} x ${item.unitPrice} = ${item.totalPrice}`);
    });

    // Add total amount
    doc.moveDown();
    doc.fontSize(16).text(`Total Amount: ${invoiceData.totalAmount}`, { align: 'right' });

    doc.end();

    // Example: Initiate payment after generating invoice
    try {
        const paymentUrl = 'https://sandbox.api.visa.com/visapayouts/v3/payouts';
        const response = await axios.post(paymentUrl, invoiceData, { headers: authHeader });
        console.log('Payment initiated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error); // Use handleError function to handle the error
        throw error; // Propagate error to caller
    }
}

module.exports = {
    generateInvoice
};
