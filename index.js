const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
    channelAccessToken: "cJ0QOtov5u0SlxEfU7ljYvDqWoqqDLlYS9FGs1faKa/3F86hJ8goon2P6cQdsgGUWnLqxbi6aO0W0y8+10KjcrN8jEMZAguJSgFPBWRNGnKstP9KuGeg/ThMsuYTwTteOQhJZszAIkFInmukOVFj+gdB04t89/1O/w1cDnyilFU=",
    channelSecret: "f879f7a437428ad3a8a388f855ea1565"
};
const client = new line.Client(lineConfig);
const app = express();


app.post('/', line.middleware(lineConfig), function(req, res) {
    Promise
        .all(
            [console.log(req.body),
            req.body.events.map(handleEvent)]
        )
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
                        type: "text", // ①
                        text: "Select your favorite food category or send me your location!",
                        quickReply: { // ②
                            items: [
                                {
                                    type: "action", // ③
                                    imageUrl: "http://www.sushiexpress.com.hk/wp-content/uploads/B02.png",
                                    action: {
                                        type: "message",
                                        label: "Sushi",
                                        text: "Sushi"
                                    }
                                }
                            ]
                        }
                    }
                );
            });
    }

}

app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
