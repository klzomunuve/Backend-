import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import path from "path";

export async function startSession(phoneNumber) {
  const authDir = path.join("sessions", phoneNumber);
  const { state, saveCreds } = await useMultiFileAuthState(authDir);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") {
      console.log("✅ WhatsApp connected successfully!");
    }
  });
}
