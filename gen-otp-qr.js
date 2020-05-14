var qrcode = require('qrcode');
var otplib = require('otplib');
const user = "Teacher";
const service = "NCC";
//IMPORANT: make sure secret is in base32 already and matches RegisterForm.js
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';

const otpauth = otplib.authenticator.keyuri(user, service, secret);

qrcode.toDataURL(otpauth, (err, imageURL) => {
    if(err){
        console.log("qrcode error");
        return;
    }
    console.log(imageURL);
//    qrcode.toFile("./ncc-otp.png", imageURL);
});
