// Função para gerar par de chaves (pública e privada)
async function generateKeyPair() {
    return await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
    }, true, ["encrypt", "decrypt"]);
}

// Função para criptografar a mensagem usando a chave pública
async function encryptMessage(publicKey, message) {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    return await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encodedMessage);
}

// Função para descriptografar a mensagem usando a chave privada
async function decryptMessage(privateKey, encryptedMessage) {
    const decryptedMessage = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedMessage);
    const decoder = new TextDecoder();
    return decoder.decode(decryptedMessage);
}

// Converter ArrayBuffer para Base64
function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
}

// Converter Base64 para ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binary = window.atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer;
}
