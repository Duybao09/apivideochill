const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 PEXELS API KEY (đăng ký miễn phí tại pexels.com/api)
const PEXELS_KEY = "duybao095";

app.get("/", (req, res) => {
  res.json({
    api: "Chill Video API",
    usage: "/chill"
  });
});

app.get("/chill", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.pexels.com/videos/search",
      {
        headers: {
          Authorization: PEXELS_KEY
        },
        params: {
          query: "lofi chill night city",
          per_page: 15
        }
      }
    );

    const videos = response.data.videos;

    if (!videos.length) {
      return res.json({ error: "Không có video" });
    }

    // Random 1 video
    const randomVideo =
      videos[Math.floor(Math.random() * videos.length)];

    const file = randomVideo.video_files.find(
      v => v.quality === "sd"
    );

    res.json({
      title: "Chill Video",
      duration: randomVideo.duration + "s",
      thumbnail: randomVideo.image,
      mp4: file.link
    });

  } catch (err) {
    res.json({ error: "Lỗi hệ thống" });
  }
});

app.listen(PORT, () => {
  console.log("Server chạy cổng " + PORT);
});
