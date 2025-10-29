// File: /api/spotify-token.js
export default async function handler(req, res) {
  try {
    // Parse body
    const body = new URLSearchParams(req.body);
    const code = body.get("code");
    const redirect_uri = body.get("redirect_uri");
    const code_verifier = body.get("code_verifier");

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // optional for PKCE

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

    // Send response
    res.status(response.status).send(text);

  } catch (err) {
    console.error("Token exchange error:", err);
    res.status(500).json({ error: "server_error", message: err.message });
  }
}
