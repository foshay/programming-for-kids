var qrcode = require('qrcode');
require('otplib');
const user = "TestUsername";
const service = "NCC";

const otpauth = totp.keyuri(user, service, "sdnfosandounapsgonasadfasdf");

qrcode.toDateURL(otpauth, (err, imageURL) => {
    if(err){
        console.log('Error with QR');
        return;
    }
    console.log(imageURL);
});
