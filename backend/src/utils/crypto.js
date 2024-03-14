const aes = require("aes-js");

const key = aes.utils.utf8.toBytes(process.env.AES_KEY);
if (key.lenght !== 32)
  throw new Error("Invalid key for AES. Must be 256 bit / 32 bytes");

function encrypt(text) {
  const bytesInfo = aes.utils.utf8.toBytes(text);
  const aesCTR = new aes.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCTR.encrypt(bytesInfo);
  return aes.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(encryptedHex) {}

module.exports = {
  encrypt,
  decrypt,
};
