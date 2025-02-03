import { NextResponse } from 'next/server';
import { Client, LocalAuth } from 'whatsapp-web.js';

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR Recebido:', qr);
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.initialize();

export default async function POST(req: Request) {
    const body = await req.json()
        try {
            const { number, message } = body
            const chatId = `${number}@c.us`;
            await client.sendMessage(chatId, message);
            NextResponse.json({ status: 'Mensagem enviada!' });
        } catch (error) {
            NextResponse.json({ error: `Erro ao enviar mensagem! ${error}`,});
        }
}
