var qrcode = require('qrcode');
var otplib = require('otplib');
var imageDataURI = require('image-data-uri');

const user = "Teacher";
const service = "NCC";

//IMPORANT: make sure secret is in base32 already and matches
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';

const otpauth = otplib.authenticator.keyuri(user, service, secret);

qrcode.toDataURL(otpauth, (err, imageURL) => {
    if(err){
        console.log("qrcode error");
        return;
    }
    imageDataURI.outputFile(imageURL, './otp-qrcode.png');
});
