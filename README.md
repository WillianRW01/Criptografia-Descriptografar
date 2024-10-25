1. generateKeyPair
Essa função gera um par de chaves (pública e privada) que pode ser usado para criptografar e descriptografar mensagens.
name: "RSA-OAEP": Define o algoritmo de criptografia RSA-OAEP (Optimal Asymmetric Encryption Padding), que é um método seguro e comum de criptografia assimétrica.
modulusLength: 2048: Define o tamanho da chave em bits. Um valor de 2048 bits é considerado seguro para muitos casos de uso.
publicExponent: new Uint8Array([1, 0, 1]): Define o valor da exponencial pública, geralmente [1, 0, 1] representa o valor 65537, comumente usado por sua eficiência e segurança.
hash: "SHA-256": Define a função de hash para o algoritmo RSA-OAEP, que é usada para garantir a integridade e segurança da criptografia.
Retorno: A função retorna um objeto contendo a chave pública e privada.
2. encryptMessage
Esta função criptografa uma mensagem usando uma chave pública.
Parâmetros: Recebe uma publicKey e uma message.
TextEncoder: Converte a mensagem para um formato ArrayBuffer, necessário para o processo de criptografia.
window.crypto.subtle.encrypt: Criptografa a mensagem codificada usando o algoritmo RSA-OAEP e a chave pública fornecida.
Retorno: Retorna a mensagem criptografada como um ArrayBuffer.
3. decryptMessage
Essa função descriptografa a mensagem usando a chave privada correspondente à chave pública usada na criptografia.
Parâmetros: Recebe a privateKey e encryptedMessage.
window.crypto.subtle.decrypt: Descriptografa a mensagem criptografada usando a chave privada fornecida.
TextDecoder: Converte o ArrayBuffer descriptografado de volta para o texto original.
Retorno: Retorna a mensagem original em formato de texto.
4. arrayBufferToBase64
Essa função converte um ArrayBuffer (formato binário da mensagem criptografada) para uma string Base64.
Uso do Uint8Array: Converte o ArrayBuffer para um Uint8Array, o que permite a manipulação de bytes individuais.
Conversão para Base64: Converte os bytes em uma string binária usando String.fromCharCode() e depois codifica a string em Base64 com window.btoa().
5. base64ToArrayBuffer
Essa função faz o processo inverso de arrayBufferToBase64, convertendo uma string Base64 de volta para um ArrayBuffer.
Decodificação de Base64: Utiliza window.atob() para converter a string Base64 de volta para uma string binária.
Criação do ArrayBuffer: Converte a string binária para um Uint8Array, que é retornado como um ArrayBuffer.
 