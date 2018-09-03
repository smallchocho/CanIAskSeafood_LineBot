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
            req.body.events.map(handleEvent)
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
            console.log(event.source)
            var source = event.source;
            var targetId = source[source.type+'Id'];
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: ('Hi,歡迎使用iParking')
            }).then(function() {
                const quickreplyItems = [{
                    imageUrl: "https://www.sushiexpress.com.hk/wp-content/uploads/B02.png",
                    label:"測試喔",
                    text:"測試"
                }]
                const bubbles = [createFlexBubbleMessage(),createFlexBubbleMessage()]
                const carouselMessage = createFlexCarouselMessage(bubbles)
                return client.pushMessage(targetId, createConfirmTemplateMessage("請問你要付款嗎？","確定","取消"));
            });
    }


}

function createQuickReplys(message,items){
    const quickReplys = {
        type: "text", // ①
        text: message,
        quickReply: { // ②
            items: [ ]
        }
    }

    let i
    for (i = 0; i < items.length; i++) {
        quickReplys.quickReply.items[i] = {
            type: "action", // ③
            imageUrl: items[i].imageUrl,
            action: {
                type: "message",
                label: items[i].label,
                text: items[i].text
            }
        }
    }
    return quickReplys

}
/*showQuickReplys完整格式：
 {
  "type": "text", // ①
  "text": "Select your favorite food category or send me your location!",
  "quickReply": { // ②
    "items": [
      {
        "type": "action", // ③
        "imageUrl": "https://example.com/sushi.png",
        "action": {
          "type": "message",
          "label": "Sushi",
          "text": "Sushi"
        }
      },
      {
        "type": "action",
        "imageUrl": "https://example.com/tempura.png",
        "action": {
          "type": "message",
          "label": "Tempura",
          "text": "Tempura"
        }
      },
      {
        "type": "action", // ④
        "action": {
          "type": "location",
          "label": "Send location"
        }
      }
    ]
  }
}
    */
function createFlexBubbleMessage(){
    const message = {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://i.screenshot.net/woj4ksy",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://linecorp.com"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "action": {
                        "type": "uri",
                        "uri": "https://linecorp.com"
                    },
                    "contents": [
                        {
                            "type": "text",
                            "text": "歡迎使用 iParking",
                            "size": "sm",
                            "weight": "bold"
                        },
                        {
                            "type": "text",
                            "text": "這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字",
                            "margin": "sm",
                            "wrap": true,
                            "color": "#aaaaaa",
                            "size": "xxs"
                        }
                    ]
                },
                "footer":{
                    "type":"box",
                    "layout":"vertical",
                    "spacing":"md",
                    "contents":[
                        {
                            "type": "button",
                            "style": "link",
                            "color": "#1e79a9",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "支付設定",
                                "uri": "https://linecorp.com"
                            }
                        },
                        {
                            "type": "button",
                            "style": "link",
                            "color": "#1e79a9",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "車牌設定",
                                "uri": "https://linecorp.com"
                            }
                        },
                        {
                            "type": "button",
                            "style": "link",
                            "color": "#1e79a9",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "發票設定",
                                "uri": "https://linecorp.com"
                            }
                        }
                    ]
                },
                "styles": {
                    "footer": {
                        "separator": true,
                        "separatorColor": "#95ceae"
                    }
                }
            }
    return message
}

function createFlexCarouselMessage(bubbles) {
    const flexMessage = {
        type: "flex",
        altText: "This is a Flex Message",
        contents: {
            "type": "carousel",
            "contents": bubbles
        }
    }
    return flexMessage
}

function createConfirmTemplateMessage(title,yesTitle = "確定",noTitle = "取消",yesAction = "aaaaa",noAction = "cccccccc"){
    let message = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": title,
            "actions": [
                {
                    "type": "message",
                    "label": yesTitle,
                    "text": yesAction
                },
                {
                    "type": "message",
                    "label": noTitle,
                    "text": noAction
                }
            ]
        }
    }
    return message
}


app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
