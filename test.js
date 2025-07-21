import 'dotenv/config';
import fetch from 'node-fetch';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  console.error("❌ NEXT_PUBLIC_API_URL is undefined. Check your .env file.");
  process.exit(1);
}

try {
  const res = await fetch(`${baseUrl}/price`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ network: 'ethereum', date: '2023-08-01' }),
  });
  const rawText = await res.text();
  console.log("🔵 Raw Response:", rawText);
  const json = JSON.parse(rawText);
  console.log("✅ JSON Parsed:", json);
} catch (err) {
  console.error("❌ Invalid JSON:", err);
}
