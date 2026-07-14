const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('=== COD QR GENERAT PENTRU WHATSAPP ===');
    console.log('Deschide WhatsApp -> Settings -> Linked Devices și scanează codul de mai jos:');
});

client.on('ready', () => {
    console.log('====================================');
    console.log('ROBOTUL ESTE ONLINE ȘI PĂZEȘTE CONTUL!');
    console.log('====================================');
});

client.on('message', async (msg) => {
    try {
        const contact = await msg.getContact();
        
        // Trimite răspuns doar dacă numărul NU este salvat în agenda ta și NU este un grup
        if (!contact.isMyContact && !msg.from.includes('@g.us')) {
            const textRaspuns = `Salut! Ca să pornim rapid și corect, uite condițiile flotei noastre:\n\n` +
                `1. Colaborarea este legală doar pe bază de PFA. Dacă nu ai, juristul nostru ți-l înființează online. Costul lui este de 200 de lei (plată unică către el pentru acte).\n` +
                `2. Pe Bolt Food te activăm în 24h și poți ieși la livrat imediat. Pe Glovo aprobarea durează 2-4 săptămâni (băieții noștri încep pe Bolt, iar Glovo se procesează pe fundal).\n` +
                `3. Lucrezi cu vehiculul tău (mașină, scuter, bicicletă). Comisionul este de 10.5%.\n\n` +
                `Dacă ești de acord, lasă-mi mesaj cu:\n` +
                `- Orașul tău:\n` +
                `- Vehiculul tău:\n` +
                `Te voi ghida eu prin mesaje mai departe! 🚀`;

            await msg.reply(textRaspuns);
            console.log(`Răspuns automat trimis cu succes către: ${msg.from}`);
        }
    } catch (err) {
        console.error('Eroare la trimiterea mesajului:', err);
    }
});

client.initialize();
