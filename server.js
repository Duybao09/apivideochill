const express = require("express")

const app = express()
const PORT = process.env.PORT || 3000

const API_KEY = "duybao095"
const LIMIT_TIME = 5000

const userCooldown = {}

const chillVideos = [
"https://cdn.coverr.co/videos/coverr-night-city-1565/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-city-lights-5176/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-night-drive-1566/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-rain-on-window-1573/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-rainy-street-1564/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-sunset-beach-1571/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-orange-sky-5175/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-anime-style-sky-6982/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-cloudy-sky-1568/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-lofi-room-4892/1080p.mp4"
]

function checkKey(req, res, next) {
  const key = req.query.apikey
  if (!key) return res.json({ error: "Thiếu apikey" })
  if (key !== API_KEY) return res.json({ error: "API key không hợp lệ" })
  next()
}

function rateLimit(req, res, next) {
  const user = req.ip
  const now = Date.now()

  if (userCooldown[user] && now - userCooldown[user] < LIMIT_TIME) {
    return res.json({ error: "Bạn đang spam, chờ 5 giây" })
  }

  userCooldown[user] = now
  next()
}

app.get("/", (req, res) => {
  res.send("API Video Chill do Duy Bảo Develop")
})

app.get("/chill", checkKey, rateLimit, (req, res) => {
  const random = chillVideos[Math.floor(Math.random() * chillVideos.length)]

  res.json({
    title: "Chill Video",
    mp4: random
  })
})

app.listen(PORT, () => {
  console.log("Server chạy tại cổng " + PORT)
})
