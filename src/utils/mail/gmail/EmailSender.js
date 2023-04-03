import { createTransport } from 'nodemailer';
import { logger } from '../../log/log4jsLogger.js';
import dotenv from 'dotenv';
const to = "oyhamburo.jeremias@gmail.com" //Mail q recibe

dotenv.config({ path: '../../.env' });

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
});

const gmailOptions = (emailSubject, htmlTemplate) => {
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: to,
        subject: emailSubject,
        html: htmlTemplate
    }
}


export async function sendGmail(subject, htmlTemplate) {
    try {
        const mailOptions = gmailOptions(
            subject,
            htmlTemplate
        );

        await transporter.sendMail(mailOptions);
        logger.info(`Email sent`)
    } catch (error) {
        logger.error(error);
    }
}