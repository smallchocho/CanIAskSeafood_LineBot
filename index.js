const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
    channelAccessToken: "cJ0QOtov5u0SlxEfU7ljYvDqWoqqDLlYS9FGs1faKa/3F86hJ8goon2P6cQdsgGUWnLqxbi6aO0W0y8+10KjcrN8jEMZAguJSgFPBWRNGnKstP9KuGeg/ThMsuYTwTteOQhJZszAIkFInmukOVFj+gdB04t89/1O/w1cDnyilFU=",
    channelSecret: "f879f7a437428ad3a8a388f855ea1565"
};
const client = new line.Client(lineConfig);
const app = express();

app.listen(process.env.PORT || 3210, function() {
    console.log('App now running on port', this.address().port);
});

app.post('/callBack', function (req, res) {
    let promise = new Promise(function (resolve,reject) {
        if (true){
            resolve()
        }
        reject()
    }).then(function () {
        const body = {status: {status: 'ok', statusCode: 200}, data: data};
        res.json(body);
    }).catch(function (e) {
        logger.error('get region fail:%s', e);
        const body = {status: {status: 'fail', statusCode: 1}};
        res.json(body);
    });
    promise
});


app.post('/', line.middleware(lineConfig), function(req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(function(result) {
            res.json(result);
        });
});


function handleEvent(event) {
    switch (event.type) {
        case 'join':
        case 'follow':
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: '你好請問我們認識嗎?'
            });
        case 'message':
            handleEventMessage(event)
    }
}
function handleEventMessage(event){
    switch (event.message.type) {
        case 'text':
            var source = event.source;
            var targetId = source[source.type+'Id'];
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: ('你是'+source.type)
            }).then(function() {
                return client.pushMessage(targetId, {
                    type: 'text',
                    text: ('使用'+source.type+'Id推送訊息')
                });
            });
    }

}
//
// var express = require('express');
//
// var app = express();
//
// app.get('/', function(request, response) {
//     response.send('Hello World!');
// });
//
// var port = process.env.PORT || 3000;
// app.listen(port, function() {
//     console.log("Listening on " + port);
// });