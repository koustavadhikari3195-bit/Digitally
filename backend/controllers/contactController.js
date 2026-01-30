const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');
const { sendWhatsApp } = require('../utils/whatsapp');
const { sendTelegram } = require('../utils/telegram');

// Configure transporter
// For Gmail, you need an App Password if 2FA is on, or "Less Secure Apps" enabled (deprecated)
// Best practice: Use an App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
});

exports.sendContactEmail = async (req, res) => {
    try {
        const { name, email, service, budget, message, location } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        // 1. Log to Database as a Lead
        await Lead.create({
            name,
            email,
            service,
            budget,
            message,
            location,
            type: 'contact'
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender address
            to: process.env.EMAIL_TO || 'koustavadhikari3195@gmail.com', // Receiver address
            subject: `🔥 New Lead: ${name} - ${service || 'General Inquiry'}`, // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #3B82F6;">New Project Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
                    <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <h3 style="color: #333;">Message:</h3>
                    <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #555;">${message.replace(/\n/g, '<br>')}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">This email was sent from your Digitally Agency contact form.</p>
                </div>
            `
        };

        // Try Email first
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Email failed, falling back to WhatsApp/Logs:', emailError.message);
        }

        // Always prioritize Telegram for real-time alerts
        let notificationText = `🔥 *New Lead from Digitally!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${service || 'General Inquiry'}\n*Budget:* ${budget || 'Not specified'}\n\n*Message:* ${message}`;

        if (location) {
            notificationText += `\n\n📍 *Location:* [${location.lat}, ${location.lng}](https://www.google.com/maps?q=${location.lat},${location.lng})`;
        }

        await sendTelegram(notificationText);

        // Optional WhatsApp secondary
        if (process.env.WHATSAPP_PHONE && process.env.WHATSAPP_PHONE !== '91XXXXXXXXXX') {
            await sendWhatsApp(notificationText);
        }

        res.status(200).json({ message: 'Lead received successfully!' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
};
