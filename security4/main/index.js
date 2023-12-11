const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1612572",
  key: "6b75d2757ba8398d7a72",
  secret: "efa2195f3d9e5502a8c8",
  cluster: "us2",
  useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
   await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
      });
      res.json([]);
})

console.log('Listening to port 8000');
app.listen(8000)