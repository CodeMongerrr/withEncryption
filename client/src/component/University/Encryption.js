import React, { useState } from "react";
import CryptoJS from "crypto-js";

function EncryptionDemo() {
  const [tokenID, setTokenID] = useState(1);
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  // Function to generate a hashed key based on a token ID
  function generateKey(tokenID) {
    const hashedTokenID = CryptoJS.SHA256(tokenID.toString()).toString();
    return hashedTokenID;
  }

  // Function to encrypt data using AES encryption
  function encryptData(tokenID, data) {
    const key = generateKey(tokenID);

    // Generate a random IV (Initialization Vector)
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the data using AES encryption
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Combine IV and ciphertext into a single string
    const encryptedData = iv.toString() + encrypted.toString();

    return encryptedData;
  }

  // Function to decrypt data using AES decryption
  function decryptData(tokenID, encryptedData) {
    const key = generateKey(tokenID);

    // Extract IV from the encrypted data
    const iv = CryptoJS.enc.Hex.parse(encryptedData.slice(0, 32)); // IV is 16 bytes (32 hex characters)

    // Extract ciphertext from the encrypted data
    const ciphertext = encryptedData.slice(32);

    // Decrypt the data using AES decryption
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the decrypted data to a string
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedData;
  }

  const handleEncrypt = () => {
    const encrypted = encryptData(tokenID, data);
    setEncryptedData(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = decryptData(tokenID, encryptedData);
    setDecryptedData(decrypted);
  };

  return (
    <div>
      <h1>AES Encryption and Decryption</h1>
      <div>
        <label>
          Token ID:
          <input
            type="number"
            value={tokenID}
            onChange={(e) => setTokenID(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Data to Encrypt/Decrypt:
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <h2>Encrypted Data:</h2>
        <p>{encryptedData}</p>
      </div>
      <div>
        <h2>Decrypted Data:</h2>
        <p>{decryptedData}</p>
      </div>
    </div>
  );
}

export default EncryptionDemo;
