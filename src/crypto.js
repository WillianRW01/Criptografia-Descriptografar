// Função para gerar um par de chaves (pública e privada)
async function gerarChaves() {
    try {
        const chaves = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048, // Tamanho da chave
                publicExponent: new Uint8Array([1, 0, 1]), // Valor padrão recomendado
                hash: "SHA-256" // Algoritmo de hash
            },
            true, // As chaves podem ser exportadas
            ["encrypt", "decrypt"] // Permissões: criptografar e descriptografar
        );
        return chaves;
    } catch (erro) {
        console.error("Erro ao gerar as chaves:", erro);
        throw new Error("Não foi possível gerar o par de chaves.");
    }
}

// Função para criptografar uma mensagem usando a chave pública
async function criptografarMensagem(chavePublica, mensagem) {
    try {
        const encoder = new TextEncoder();
        const mensagemCodificada = encoder.encode(mensagem);
        const mensagemCriptografada = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" }, // Algoritmo de criptografia
            chavePublica, // Chave pública
            mensagemCodificada // Mensagem em formato Uint8Array
        );
        return mensagemCriptografada;
    } catch (erro) {
        console.error("Erro ao criptografar a mensagem:", erro);
        throw new Error("Falha na criptografia da mensagem.");
    }
}

// Função para descriptografar uma mensagem com a chave privada
async function descriptografarMensagem(chavePrivada, mensagemCriptografada) {
    try {
        const mensagemDecodificada = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" }, // Algoritmo de descriptografia
            chavePrivada, // Chave privada
            mensagemCriptografada // Mensagem criptografada
        );
        const decoder = new TextDecoder();
        return decoder.decode(mensagemDecodificada); // Converte de volta para texto
    } catch (erro) {
        console.error("Erro ao descriptografar a mensagem:", erro);
        throw new Error("Falha na descriptografia da mensagem.");
    }
}

// Função para converter ArrayBuffer para Base64 (fácil de manipular)
function arrayBufferParaBase64(buffer) {
    try {
        const binario = String.fromCharCode(...new Uint8Array(buffer));
        return window.btoa(binario); // Codifica para Base64
    } catch (erro) {
        console.error("Erro ao converter ArrayBuffer para Base64:", erro);
        throw new Error("Conversão para Base64 falhou.");
    }
}

// Função para converter Base64 de volta para ArrayBuffer
function base64ParaArrayBuffer(base64) {
    try {
        const binario = window.atob(base64); // Decodifica Base64
        const buffer = new Uint8Array(binario.length);
        for (let i = 0; i < binario.length; i++) {
            buffer[i] = binario.charCodeAt(i); // Preenche o buffer com os caracteres
        }
        return buffer;
    } catch (erro) {
        console.error("Erro ao converter Base64 para ArrayBuffer:", erro);
        throw new Error("Conversão de Base64 falhou.");
    }
}
