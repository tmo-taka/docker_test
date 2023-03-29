import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import uuid4 from 'uuid4'
import { createServer as createViteServer } from 'vite'

async function createServer() {
    const app = express()

  // ミドルウェアモードで Vite サーバを作成し、app type を 'custom' に指定します。
  // これにより、Vite 自体の HTML 配信ロジックが無効になり、親サーバが
  // 制御できるようになります。
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

  // Vite の接続インスタンスをミドルウェアとして使用。独自の express ルータ
  // (express.Route()) を利用する場合は、router.use を使用してください
    app.use(vite.middlewares)

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
