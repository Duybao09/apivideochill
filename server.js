const express = require("express")

const app = express()
const PORT = process.env.PORT || 3000

const API_KEY = "duybao095"
const LIMIT_TIME = 5000

const userCooldown = {}

const chillVideos = [
"https://image2url.com/r2/default/videos/1772271305920-ce222746-ae77-401a-9a89-6e84638354a2.mp4",
"https://image2url.com/r2/default/videos/1772271331245-43968dd4-be9e-44f4-a5c0-23704bfa879e.mp4",
"https://image2url.com/r2/default/videos/1772271505612-129c90cf-4a08-4120-a922-ff3ad5867580.mp4",
"https://image2url.com/r2/default/videos/1772271535129-d952f1e3-362a-47ea-a5ff-f0f387b65fe3.mp4",
"https://image2url.com/r2/default/videos/1772271553484-088841ff-22e3-466d-9d08-0d8c34d91394.mp4",
"https://image2url.com/r2/default/videos/1772271567348-5053d15d-6e12-44bc-ba90-2aefd6e87c9c.mp4",
"https://image2url.com/r2/default/videos/1772271581116-8d3e4737-f09a-4a8c-963b-5527f6a894db.mp4",
"https://image2url.com/r2/default/videos/1772271598450-9fc0c8b9-e497-4d56-943b-0d107324fb03.mp4",
"https://image2url.com/r2/default/videos/1772271615469-ca3ff65f-8216-4a6a-85bd-3d14a4c3756e.mp4",
"https://image2url.com/r2/default/videos/1772271627704-68252d5e-2e15-4db6-84f6-9dea9250ef40.mp4",
"https://image2url.com/r2/default/videos/1772271643474-8af97460-fe2f-49c8-a5c2-c347fdb28f61.mp4",
"https://image2url.com/r2/default/videos/1772271657040-1c9ab316-2648-4098-82d0-32bc0f48e1b1.mp4",
"https://image2url.com/r2/default/videos/1772271677046-f18a7dcf-704b-4a11-b4ad-9540e4d1e5ed.mp4",
"https://image2url.com/r2/default/videos/1772271691365-543dac53-9e96-4dec-b44e-a1621d7e3ac9.mp4",
"https://image2url.com/r2/default/videos/1772271707855-fe6a7768-08ae-41cf-8803-64e26b0f510b.mp4",
"https://image2url.com/r2/default/videos/1772271726941-fd20f990-0d98-4807-9be3-35c2ac7dbd40.mp4",
"https://image2url.com/r2/default/videos/1772271743642-b5f2882a-4ba1-4309-86d4-adb9cc6e2829.mp4",
"https://image2url.com/r2/default/videos/1772271757817-fab7f434-32f2-4550-9362-3acff2c2ea01.mp4",
"https://image2url.com/r2/default/videos/1772271770384-28f5944a-361a-4964-a242-027790e73ccb.mp4",
"https://image2url.com/r2/default/videos/1772271783747-478deaad-ff58-4051-a048-da237289692b.mp4",
"https://image2url.com/r2/default/videos/1772271815127-5cd47c33-760a-480b-ad8f-baddec0dc7fa.mp4",
"https://image2url.com/r2/default/videos/1772271827236-65e3aa17-7c25-4957-a05a-4bf1f4c848e1.mp4",
"https://image2url.com/r2/default/videos/1772271838478-ad18f072-3612-4ef5-816b-4a54fa7f622e.mp4",
"https://image2url.com/r2/default/videos/1772271849792-9f988a04-e5a7-4da8-8b69-4199847142e6.mp4",
"https://image2url.com/r2/default/videos/1772271860787-7a00bd79-633f-4f63-94f6-d2b2fb14903b.mp4",
"https://image2url.com/r2/default/videos/1772271872853-7ea2668e-86fe-40d0-9ee1-e1b5213c5ca6.mp4",
"https://image2url.com/r2/default/videos/1772271883556-fb4bb11a-1a87-4a60-a163-75593d222bc0.mp4",
"https://image2url.com/r2/default/videos/1772271893806-a1be90cb-cf59-4967-a058-e0e1dc630a79.mp4",
"https://image2url.com/r2/default/videos/1772271904117-aedbc586-c498-46c8-8dfe-cbfe170f8aa0.mp4"
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
