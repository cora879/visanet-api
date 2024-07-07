// invoiceRoutes.js
const express = require('express');
const router = express.Router();
const { generateInvoice } = require('./generateInvoicePDF');

// Route to generate invoice and initiate payment
router.post('/create', async (req, res) => {
    try {
        const { body } = req;
        const invoiceFilePath = `./invoices/invoice_${Date.now()}.pdf`;
        await generateInvoice(body, invoiceFilePath);
        res.status(200).json({ message: 'Invoice generated and payment initiated successfully' });
    } catch (error) {
        console.error('Error generating invoice and initiating payment:', error);
        res.status(500).json({ error: 'Failed to generate invoice and initiate payment' });
    }
});

module.exports = router;
