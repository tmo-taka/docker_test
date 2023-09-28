const express = require("express");
const uuid4 = require("uuid4");

const port = 8080;

async function createServer() {
    const app = express()

    app.use(express.json());

    app.post('/auth/', async (req, res,next) => {
        const name = req.body?.name;
        if(name === 'テスト' ){
          const id = uuid4();
          res.send({id});
        }else {
          // エラーのステータスを送る
          res.status(400).send({status: 'Unauthorized User'})
          next()
        }
    })

    app.listen(port)
}

createServer()
