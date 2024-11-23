import CryptoJS from 'crypto-js';

const SECRET_KEY = '672ecebb-2ac0-8008-b56f-5fcc1705a9dc'; 

export function encryptUserId(combinedUserIds) {
  const encrypted = CryptoJS.AES.encrypt(combinedUserIds, SECRET_KEY).toString();
  return CryptoJS.enc.Base64url.stringify(CryptoJS.enc.Utf8.parse(encrypted));
}

export function decryptUserId(encryptedUserIds) {
  try {
    const decodedBytes = CryptoJS.enc.Base64url.parse(encryptedUserIds);
    const encryptedString = decodedBytes.toString(CryptoJS.enc.Utf8);
    const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedString.split('-');
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
