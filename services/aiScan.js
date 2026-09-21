// services/aiScan.js
// Sender billedet af bilaget til en vision-model og får strukturerede felter
// retur: forretning, dato, beløb, moms og foreslået kategori.
//
// VIGTIGT - to ting der bevidst er forsimplet i denne prototype:
//
// 1. API-nøglen ligger i klienten. Det er acceptabelt i en prototype, men
//    uacceptabelt i produktion: dér skal kaldet gå gennem egen backend, så
//    nøglen aldrig forlader serveren.
// 2. Bilaget sendes til en ekstern leverandør. Det er netop den afhængighed
//    en senere version kan fjerne ved at lade modellen køre på selve enheden.
//
// Uden nøgle falder funktionen tilbage til et simuleret svar, så appen kan
// demonstreres uden netværk.

const API_NOEGLE = ''; // <-- indsæt nøgle her for at bruge den rigtige model
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

const INSTRUKS = `Du læser et dansk købsbilag. Svar UDELUKKENDE med JSON i formatet:
{"forretning": string, "dato": "YYYY-MM-DD", "beloeb": number, "moms": number, "kategori": string}
Kategori vælges blandt: Transport, Kontor, IT og software, Repræsentation, Rejse, Øvrigt.
Moms er momsbeløbet i kroner. Kan et felt ikke læses, sæt det til null.`;

export async function scanBilag(base64Billede) {
  // Fallback, så prototypen kan vises frem uden nøgle eller netværk.
  if (!API_NOEGLE) {
    await new Promise((r) => setTimeout(r, 1200)); // simuler svartid
    return {
      simuleret: true,
      forretning: 'Circle K Valby',
      dato: '2026-09-19',
      beloeb: 412.5,
      moms: 82.5,
      kategori: 'Transport',
    };
  }

  const svar = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_NOEGLE}`,
    },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: INSTRUKS },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Billede}` },
            },
          ],
        },
      ],
    }),
  });

  if (!svar.ok) {
    throw new Error(`AI-kaldet fejlede (${svar.status})`);
  }

  const data = await svar.json();
  return JSON.parse(data.choices[0].message.content);
}
