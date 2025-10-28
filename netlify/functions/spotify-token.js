// File: netlify/functions/spotify-token.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = new URLSearchParams(event.body);
    const code = body.get("code");
    const redirect_uri = body.get("redirect_uri");
    const code_verifier = body.get("code_verifier");

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // optional for PKCE, but good to log if missing

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
      client_id,
      code_verifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await response.text();

    console.log("Spotify token response:", response.status, text);

    return {
      statusCode: response.status,
      body: text,
    };
  } catch (err) {
    console.error("Token exchange error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "server_error", message: err.message }),
    };
  }
}
