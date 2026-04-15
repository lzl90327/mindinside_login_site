/**
 * 旧端「可逆混淆」语义：非加密。实现采用 UTF-8 → base64，便于与常见旧前端互操作。
 * 若与源 Svelte 实现算法不一致，需走迁移专项（见冻结 §8.4）。
 */
export function obfuscatePassword(plain: string): string {
  const bytes = new TextEncoder().encode(plain);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export function deobfuscatePassword(encoded: string): string {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}
