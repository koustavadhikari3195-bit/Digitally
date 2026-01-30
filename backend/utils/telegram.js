const axios = require('axios');

/**
 * Sends a Telegram message using the Telegram Bot API
 * @param {string} text - The message to send
 * @returns {Promise} - Axios promise
 */
const sendTelegram = async (text) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn('Telegram credentials missing. Skipping notification.');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        });
        console.log('Telegram notification sent!');
    } catch (error) {
        console.error('Failed to send Telegram notification:', error.response?.data || error.message);
    }
};

module.exports = { sendTelegram };
