import express from 'express'
import uuid4 from 'uuid4'

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

    app.listen(8080)
}

createServer()
