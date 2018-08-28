const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
    channelAccessToken: process.env.HEROKU_LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.HEROKU_LINE_CHANNEL_SECRET
};
const client = new line.Client(lineConfig);
const app = express();

app.listen(3210, function() {
    console.log('App now running on port', this.address().port);
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