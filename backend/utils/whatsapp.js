const axios = require('axios');

/**
 * Sends a WhatsApp message using CallMeBot API
 * @param {string} text - The message to send
 * @returns {Promise} - Axios promise
 */
const sendWhatsApp = async (text) => {
    const phone = process.env.WHATSAPP_PHONE;
    const apiKey = process.env.WHATSAPP_API_KEY;

    if (!phone || !apiKey) {
        console.warn('WhatsApp credentials missing. Skipping notification.');
        return;
    }

    try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
        await axios.get(url);
        console.log('WhatsApp notification sent!');
    } catch (error) {
        console.error('Failed to send WhatsApp:', error.message);
    }
};

module.exports = { sendWhatsApp };
