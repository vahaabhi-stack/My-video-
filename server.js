const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "MyVideo" });
});

app.get("/api/search", async (req, res) => {
  const query = String(req.query.q || "").trim();

  if (!query) {
    return res.status(400).json({ error: "कृपया सर्च में वीडियो का नाम लिखें।" });
  }

  if (query.length > 120) {
    return res.status(400).json({ error: "सर्च 120 अक्षरों से छोटा रखें।" });
  }

  if (!API_KEY) {
    return res.json({
      setupRequired: true,
      query,
      youtubeSearchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      videos: []
    });
  }

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: "12",
      regionCode: "IN",
      relevanceLanguage: "hi",
      safeSearch: "strict",
      key: API_KEY
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
      { signal: AbortSignal.timeout(10000) }
    );
    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || "YouTube API से परिणाम नहीं मिले।";
      return res.status(response.status).json({ error: message });
    }

    const videos = (data.items || [])
      .filter(item => item.id && item.id.videoId && item.snippet)
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title || "बिना शीर्षक वाला वीडियो",
        channel: item.snippet.channelTitle || "अज्ञात चैनल",
        description: item.snippet.description || "",
        thumbnail:
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          "",
        publishedAt: item.snippet.publishedAt || ""
      }));

    res.json({ videos });
  } catch (error) {
    console.error("Search error:", error);
    const timedOut = error && error.name === "TimeoutError";
    res.status(timedOut ? 504 : 500).json({
      error: timedOut
        ? "YouTube से जवाब आने में देर हुई। थोड़ी देर बाद फिर कोशिश करें।"
        : "कनेक्शन में समस्या है। थोड़ी देर बाद फिर कोशिश करें।"
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MyVideo is running on port ${PORT}`);
});
