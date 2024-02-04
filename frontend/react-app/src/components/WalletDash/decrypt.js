import CryptoJS from "crypto-js";

function decrypt (encrypted, key) {
  var decrypted = CryptoJS.AES.decrypt(encrypted, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default decrypt;