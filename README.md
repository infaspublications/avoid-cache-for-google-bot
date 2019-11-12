[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com) [![CircleCI](https://circleci.com/gh/infaspublications/avoid-cache-for-google-bot/tree/master.svg?style=svg)](https://circleci.com/gh/infaspublications/avoid-cache-for-google-bot/tree/master) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# Avoid Cache For Google Bot
Googleボットからのアクセスであれば、CloudFrontのキャッシュキーを変更して通常のユーザアクセスに影響を与えないためのLambda@Edgeファンクション

## 使い方
対象のCloudFrontのディストリビューションのビヘイビアに対して、Cache Based Whitelist Headersに `Is-Google-Bot-Request`を許可してください。
GoogleBotの場合はIPから判断して、そこに`1`をそれ以外のアクセスでは`0`が指定されます

`npx serverless deploy` でLambdaをデプロイして、マネジメントコンソールからマニュアルで対象ディストリビューションのビヘイビアの`Viewer Request`へLambda@Edgeをデプロイしてください

## インストール

```shell
$ git clone git@github.com:infaspublications/avoid-cache-for-google-bot.git
$ cd avoid-cache-for-google-bot
$ npm install
```

## Lint & コードフォッマット

```shell
$ npm run lint
$ npm run fmt
```

## テスト

```shell
$ npm run test
```

## デプロイ

```shell
$ npx serverless deploy --stage <ステージ名>
```
