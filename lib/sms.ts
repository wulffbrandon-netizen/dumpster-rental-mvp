export async function sendSmsMock(phone: string, message: string) {
  console.log("[MOCK SMS]", { phone, message });
}
