import crypto from "crypto"
import { Buffer } from "buffer"
const algorithm = "aes-256-ctr"
const secretKey = "4eve6sdmpNWjRRIqCc7rdxs01lwaking"

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return `${iv.toString("hex")}@${encrypted.toString("hex")}`
}

export const decrypt = (iv, content) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, "hex"))

  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, "hex")), decipher.final()])

  return decrypted.toString()
}

export const parseHexString = (str) => {
  const result = []
  while (str.length >= 2) {
    result.push(parseInt(str.substring(0, 2), 16))
    str = str.substring(2, str.length)
  }

  return result
}
