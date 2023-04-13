# それぞれの階層での作成物を持ち込むことができる
# docker で起動するnodeのバージョンにおいては、細かい粒度で指定が可能　詳しくはdocker Hubで確認　https://hub.docker.com/_/node
# わりかし、bullseyeの方がバグが起きにくい、その中でもbullseye-slimが高速

# docker ignoreで不要なものを取り除いたらdocker build --no-cache .で実行し、作成できているかの確認が必要

#　ベストプラフィックスは見ておく

# dockerコマンドでrunするときに、--rmオプションをつけます。 --rmオプションは、コンテナ終了時に自動的にコンテナを削除してくれます。
# 今回のコマンド　docker run --rm -p 3000:3000 smyb-onestop-frontend
# name オプションのやり方をみておく

# docker container ls -a dockerの起動しているコンテナを一覧できる

#======================================================================================================================
# node.js
#======================================================================================================================
FROM node:16.19-bullseye as nodejs

WORKDIR /work

COPY ./vite-project/package.json .
COPY ./vite-project/package-lock.json .

RUN npm install

#======================================================================================================================
# build
#======================================================================================================================
FROM node:16.19-bullseye as build

WORKDIR /work

# 前タスクのnode.jsから持ってくる
COPY --from=nodejs /work/node_modules /work/node_modules
# vite-projectディレクトリのものをwork配下にコピーするという記述
COPY ./vite-project /work

RUN ls -l

RUN npm run build

#======================================================================================================================
# runtime
#======================================================================================================================
FROM node:16.19-bullseye as run

WORKDIR /usr/vite-project

COPY --from=build /work /usr/vite-project

# 下記はわりとvite固定値があるらしい
EXPOSE 5173
ENV VITE_HOST=127.0.0.1
ENV VITE_PORT=5173

CMD npm run host

# マルチステージにstaticを作って更新頻度の高いものと低いもので分けたほうが良いかも？