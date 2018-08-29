// const line = require('@line/bot-sdk');
// const express = require('express');
// const lineConfig = {
//     channelAccessToken: "cJ0QOtov5u0SlxEfU7ljYvDqWoqqDLlYS9FGs1faKa/3F86hJ8goon2P6cQdsgGUWnLqxbi6aO0W0y8+10KjcrN8jEMZAguJSgFPBWRNGnKstP9KuGeg/ThMsuYTwTteOQhJZszAIkFInmukOVFj+gdB04t89/1O/w1cDnyilFU=",
//     channelSecret: "f879f7a437428ad3a8a388f855ea1565"
// };
// const client = new line.Client(lineConfig);
// const app = express();
//
// app.listen(process.env.PORT || 3210, function() {
//     console.log('App now running on port', this.address().port);
// });
//
// app.post('/callBack', function (req, res) {
//     let promise = new Promise(function (resolve,reject) {
//         if (true){
//             resolve()
//         }
//         reject()
//     }).then(function () {
//         const body = {status: {status: 'ok', statusCode: 200}, data: data};
//         res.json(body);
//     }).catch(function (e) {
//         logger.error('get region fail:%s', e);
//         const body = {status: {status: 'fail', statusCode: 1}};
//         res.json(body);
//     });
//     promise
// });
//
//
// app.post('/', line.middleware(lineConfig), function(req, res) {
//     Promise
//         .all(req.body.events.map(handleEvent))
//         .then(function(result) {
//             res.json(result);
//         });
// });
//
//
// function handleEvent(event) {
//     switch (event.type) {
//         case 'join':
//         case 'follow':
//             return client.replyMessage(event.replyToken, {
//                 type: 'text',
//                 text: '你好請問我們認識嗎?'
//             });
//         case 'message':
//             handleEventMessage(event)
//     }
// }
// function handleEventMessage(event){
//     switch (event.message.type) {
//         case 'text':
//             var source = event.source;
//             var targetId = source[source.type+'Id'];
//             return client.replyMessage(event.replyToken, {
//                 type: 'text',
//                 text: ('你是'+source.type)
//             }).then(function() {
//                 return client.pushMessage(targetId, {
//                     type: 'text',
//                     text: ('使用'+source.type+'Id推送訊息')
//                 });
//             });
//     }
//
// }
#!/usr/bin/env node

const linebot = require('linebot')
const express = require('express')

const app = express()

let bot = linebot({
    channelId: '1589842755',
    channelSecret: 'f879f7a437428ad3a8a388f855ea1565',
    channelAccessToken: 'cJ0QOtov5u0SlxEfU7ljYvDqWoqqDLlYS9FGs1faKa/3F86hJ8goon2P6cQdsgGUWnLqxbi6aO0W0y8+10KjcrN8jEMZAguJSgFPBWRNGnKstP9KuGeg/ThMsuYTwTteOQhJZszAIkFInmukOVFj+gdB04t89/1O/w1cDnyilFU='
})

const linebotParser = bot.parser()

bot.on('message', function (event) {
    console.log(`event: ${JSON.stringify(event)}`)
    if (event.message.type = 'text') {
        let msg = event.message.text;
        event.reply(msg).then(function (data) {
            // success
            console.log(msg);
            console.log(`data: ${data}`)
        }).catch(function (error) {
            // error
            console.log('error: ' + error);
        });
    }
});

app.post('/', linebotParser)

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port
    console.log("App now running on port", port)
});