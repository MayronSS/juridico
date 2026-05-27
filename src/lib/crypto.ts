// ============================================
// Criptografia — AES-256-GCM
// ============================================
// Para criptografar tokens sensíveis e dados confidenciais.
// NÃO use para senhas (use bcrypt para senhas).
// Chave de criptografia via ENCRYPTION_KEY env var.

/**
 * Criptografa texto com AES-256-GCM.
 * Retorna string Base64 contendo IV + ciphertext + authTag.
 */
export async function encrypt(plaintext: string): Promise<string> {
  const key = getEncryptionKey();
  if (!key) {
    throw new Error("ENCRYPTION_KEY não configurada. Não é possível criptografar.");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // IV aleatório — nunca reutilizar com a mesma chave
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cryptoKey = await importKey(key);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    data
  );

  // Combina IV + ciphertext para armazenamento
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return Buffer.from(combined).toString("base64");
}

/**
 * Descriptografa texto criptografado com AES-256-GCM.
 */
export async function decrypt(encryptedBase64: string): Promise<string> {
  const key = getEncryptionKey();
  if (!key) {
    throw new Error("ENCRYPTION_KEY não configurada. Não é possível descriptografar.");
  }

  const combined = Buffer.from(encryptedBase64, "base64");

  // Extrai IV (primeiros 12 bytes) e ciphertext
  const iv = combined.subarray(0, 12);
  const ciphertext = combined.subarray(12);

  const cryptoKey = await importKey(key);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Verifica se criptografia está disponível
 */
export function isEncryptionAvailable(): boolean {
  return !!getEncryptionKey();
}

// ============================================
// Helpers internos
// ============================================

function getEncryptionKey(): string | undefined {
  return process.env.ENCRYPTION_KEY;
}

async function importKey(keyString: string): Promise<CryptoKey> {
  // Gera chave de 256 bits a partir da string usando SHA-256
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyString);
  const hash = await crypto.subtle.digest("SHA-256", keyData);

  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}
