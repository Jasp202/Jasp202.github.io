// File: /api/spotify-search.js
export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow any origin
  res.setHeader("Content-Type", "application/json");

  // Always return JSON (even for missing credentials)
  if (!clientId || !clientSecret) {
    return res.status(200).json([]);
  }

  try {
    // Get Spotify access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get search query from URL (fallback to 'Eminem')
    const query = req.query.q || 'Eminem';

    // Perform Spotify search
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const searchData = await searchResponse.json();

    // Safely extract tracks
    const tracks = (searchData.tracks?.items || []).map(track => ({
      id: track.id,
      name: track.name,
      image: track.album?.images?.length ? track.album.images[track.album.images.length - 1].url : null,
      artist: track.artists.map(a => a.name).join(", "),
    }));

    return res.status(200).json(tracks);

  } catch (error) {
    // Always return valid JSON (empty array) on error
    return res.status(200).json([]);
  }
}
