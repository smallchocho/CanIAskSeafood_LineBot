const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
    channelAccessToken: "uqQTw+29bxDlCYKmzocOx8ZpfvFuTT8OlsCaEtXc03k54BdSIUZvWz7HtfLBawI/WnLqxbi6aO0W0y8+10KjcrN8jEMZAguJSgFPBWRNGnKZ65whoKrLhYMG0RWVnIGVCTWB1MyIxrzvk8V9339A6wdB04t89/1O/w1cDnyilFU=",
    channelSecret: "5c5fe089c4020a5e32a3861a201796a5Issue"
};
const client = new line.Client(lineConfig);
const app = express();

app.listen(3210, function() {
    console.log('App now running on port', this.address().port);
});

app.get('/', function(request, response) {
    response.send('Hello World!');
});


// app.post('/', line.middleware(lineConfig), function(req, res) {
//     Promise
//         .all(req.body.events.map(handleEvent))
//         .then(function(result) {
//             res.json(result);
//         });
// });


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