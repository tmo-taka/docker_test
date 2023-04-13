# メモ

## image関連

### docker imagesでnoneのみを削除コマンド
`docker rmi $(docker images -f "dangling=true" -q)`

### image削除
`docker rmi [イメージID]`

## image作成
`docker image build -t イメージ名[:タグ名] [Dockerfileが配置されているディレクトリパス]`

## コンテナ関連

### 全てのコンテナを表示 (実行中でないものも)
`docker ps -a`

### コンテナ ID のみ表示
`docker ps -p`  
`docker ps -a -p`

### コンテナ起動
`docker run --name [コンテナ名] -it [イメージ名]`

### stopした際にimageを削除するコマンド
`docker run --name [コンテナ名] -it [イメージ名] --rm`

### コンテナ停止
`docker stop <CONTAINER IDまたはNAME>`

### コンテナ削除
`docker rm {{CONTAINER ID}}`

### コンテナを裏側で起動
`docker container run -d`

### コンテナのログ確認
`Docker logs -f <コンテナID>`

### 止まっているコンテナ一括削除
`docker rm `docker ps -f "status=exited" -q``

## この問題が起きているくさい
https://qiita.com/amuyikam/items/01a8c16e3ddbcc734a46
→関係なく -pオプションでポートフォワードする必要あり。

## docker compose についての説明
https://o2mamiblog.com/docker-beginner-2/

### node_modulesをvolumesのmountから除外する
https://zenn.dev/yumemi_inc/articles/3d327557af3554

### dockerについて
https://qiita.com/tearoom6/items/326895f0a35774d70729

## キャッシュ値の詳細
https://suzuken.hatenablog.jp/entry/2018/12/03/175048

## 即時更新について
https://qiita.com/YUKI178504/items/7cd63d915915e8f85820

## dockerのベストプラクティス
https://zenn.dev/masibw/articles/57a47a7381b9b3

## React関連

### contextの扱い
https://zenn.dev/yuta_ura/articles/react-context-api

### atomFamily
https://tech-blog.rakus.co.jp/entry/20221208/recoil

| コマンド | 解説                                                 | 
| -------- | ---------------------------------------------------- | 
| CMD      | DockerイメージからDockerコンテナを作成するときに実行 | 
| RUN      | DockerfileからImageを作成するときに実行              | 
