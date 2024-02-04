import CryptoJS from "crypto-js";

function encrypt (text, key) {
  var encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
}

export default encrypt;