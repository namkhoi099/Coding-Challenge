const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = new twilio(accountSid, authToken);

const sendVerificationCode = async (to, channel) => {
    try {
        const verification = await client.verify.services(verifyServiceSid)
            .verifications
            .create({ to: to, channel: channel });
        console.log(`Verification initiated: ${verification.sid}`);
        return verification;
    } catch (error) {
        console.error('Error sending verification:', error);
        throw error;
    }
}

const checkVerificationCode = async (to, code) => {
    try {
        const verificationCheck = await client.verify.services(verifyServiceSid)
            .verificationChecks
            .create({ to: to, code: code });
        console.log(`Verification check status: ${verificationCheck.status}`);
        return verificationCheck.status === 'approved';
    } catch (error) {
        console.error('Error checking verification:', error);
        return false;
    }
}

module.exports = {
    sendVerificationCode,
    checkVerificationCode
}