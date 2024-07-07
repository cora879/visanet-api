const qr = require('qr-image');  // Import the qr-image library
const fs = require('fs');        // Import the file system module (for saving the QR code image)

// Function to generate QR code and save it to a file
const generateQRCode = (data, filePath) => {
    const qr_png = qr.imageSync(data, { type: 'png' });  // Synchronous image generation
    fs.writeFileSync(filePath, qr_png);                  // Write QR code image to file
    console.log(`QR code generated and saved to: ${filePath}`);
};

// Example usage: Generate QR code for a URL
const url = 'https://checkout.helix.money/checkout/Uj7RkmCsU8XK9uY51720080987';
const filePath = './qr-codes/helix.png';
generateQRCode(url, filePath);
