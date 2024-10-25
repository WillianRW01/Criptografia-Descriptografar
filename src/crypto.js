// Função para gerar um par de chaves assimétricas (pública e privada)
async function generateKeyPair() {
    try {
        return await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048, // Tamanho da chave em bits
                publicExponent: new Uint8Array([1, 0, 1]), // Valor fixo recomendado para RSA
                hash: "SHA-256", // Algoritmo de hash para OAEP
            },
            true, // As chaves são exportáveis
            ["encrypt", "decrypt"] // Permissões de uso (criptografar e descriptografar)
        );
    } catch (error) {
        console.error("Erro ao gerar o par de chaves:", error);
        throw new Error("Falha ao gerar o par de chaves.");
    }
}

// Função para criptografar uma mensagem com a chave pública
async function encryptMessage(publicKey, message) {
    try {
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(message); // Codifica a mensagem como Uint8Array
        return await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" }, // Algoritmo usado
            publicKey, // Chave pública
            encodedMessage // Mensagem codificada
        );
    } catch (error) {
        console.error("Erro ao criptografar a mensagem:", error);
        throw new Error("Falha ao criptografar a mensagem.");
    }
}

// Função para descriptografar uma mensagem com a chave privada
async function decryptMessage(privateKey, encryptedMessage) {
    try {
        const decryptedMessage = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" }, // Algoritmo usado
            privateKey, // Chave privada
            encryptedMessage // Mensagem criptografada
        );
        const decoder = new TextDecoder();
        return decoder.decode(decryptedMessage); // Decodifica de volta para texto
    } catch (error) {
        console.error("Erro ao descriptografar a mensagem:", error);
        throw new Error("Falha ao descriptografar a mensagem.");
    }
}

// Função auxiliar para converter ArrayBuffer para base64
function arrayBufferToBase64(buffer) {
    try {
        const binary = String.fromCharCode(...new Uint8Array(buffer)); // Converte para string binária
        return window.btoa(binary); // Codifica para base64
    } catch (error) {
        console.error("Erro ao converter ArrayBuffer para base64:", error);
        throw new Error("Falha na conversão para base64.");
    }
}

// Função auxiliar para converter base64 de volta para ArrayBuffer
function base64ToArrayBuffer(base64) {
    try {
        const binary = window.atob(base64); // Decodifica base64
        const buffer = new Uint8Array(binary.length); // Cria novo ArrayBuffer
        for (let i = 0; i < binary.length; i++) {
            buffer[i] = binary.charCodeAt(i); // Preenche o buffer
        }
        return buffer;
    } catch (error) {
        console.error("Erro ao converter base64 para ArrayBuffer:", error);
        throw new Error("Falha na conversão de base64.");
    }
}
