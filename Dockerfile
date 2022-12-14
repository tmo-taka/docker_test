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

WORKDIR /work/node

COPY ./vite-project/package.json .
COPY ./vite-project/package-lock.json .

RUN npm install

#======================================================================================================================
# build
#======================================================================================================================
FROM node:16.19-bullseye as build

WORKDIR /work

# srcディレクトリのものをwork配下にコピーするという記述
COPY ./vite-project /work
COPY --from=nodejs /work/node/node_modules /work/node_modules

RUN ls -l

RUN npm run build

#======================================================================================================================
# runtime
#======================================================================================================================
FROM node:16.19-bullseye

WORKDIR /usr/vite-project

COPY --from=build /work/package.json /usr/vite-project/.
COPY --from=build /work/package-lock.json /usr/vite-project/.
COPY --from=build /work/vite.config.ts /usr/vite-project/.
COPY --from=build /work/node_modules /usr/vite-project/node_modules
COPY --from=build /work/dist /usr/vite-project/dist


# 下記はわりとnuxt固定値があるらしい
EXPOSE 4173
ENV VITE_HOST=127.0.0.1
ENV VITE_PORT=4173

CMD npm run dev