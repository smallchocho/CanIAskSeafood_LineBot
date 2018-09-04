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
                const parkingBubble = createParkingPlateBubble(false,"2018.07.09 09:00","ABD-0133","建國高架H站")
                const billTicketBubble = createBillTiketBubble(2000,500,"discountInfoArray","2018.07.09 09:00","2018.07.10 10:00","ABD-0133","市政府轉運站大樓站")
                return client.pushMessage(targetId, createFlexCarouselMessage([billTicketBubble]));
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
    const flexBubbleMessage = {
        type: "flex",
        altText: "This is a Flex Message",
        contents: {
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
    }
    return flexBubbleMessage
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

function createParkingPlateBubble(isEntrance,time,plate,lotName){
    const bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "xxl",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": isEntrance ? "進場":"出場",
                                    "size": "lg",
                                    "color": "#518785",
                                    "flex": 0
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": time,
                                    "weight": "bold",
                                    "size": "xl",
                                    "color": "#555555",
                                    "flex": 0
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": plate,
                                    "size": "xs",
                                    "color": "#9b9b9c",
                                    "flex": 0
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": lotName,
                                    "size": "xs",
                                    "color": "#9b9b9c",
                                    "flex": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    return bubble
}
function createBillTiketBubble(fee,totalFee,discountInfoArray,startTime,endTime,plate,lotName){
    const billTiketBubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "付款資訊",
                    "weight": "bold",
                    "color": "#518785",
                    "size": "md"
                },
                {
                    "type": "text",
                    "margin":"sm",
                    "text": "實付金額：" + fee + "元",
                    "weight": "bold",
                    "size": "xl"
                },
                {
                    "type": "text",
                    "margin":"md",
                    "text": startTime + " - " + endTime ,
                    "size": "xxs",
                    "wrap": true
                },
                {
                    "type": "text",
                    "text": plate,
                    "margin":"md",
                    "size": "sm",
                    "color": "#9b9b9c",
                    "flex": 0
                },
                {
                    "type": "text",
                    "text": lotName,
                    "margin":"xs",
                    "size": "sm",
                    "color": "#9b9b9c",
                    "flex": 0
                },
                {
                    "type": "separator",
                    "margin": "xl"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "xl",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "應付金額",
                                    "size": "xxs",
                                    "color": "#555555",
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": totalFee + " 元",
                                    "size": "xxs",
                                    "color": "#555555",
                                    "align": "end"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "台新優惠：2201（1.0 小時）",
                                    "size": "xxs",
                                    "color": "#518785",
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "- 100 元",
                                    "size": "xxs",
                                    "color": "#518785",
                                    "align": "end"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "台新紅利：2201（1.0 小時）",
                                    "size": "xxs",
                                    "color": "#518785",
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "- 20 元",
                                    "size": "xxs",
                                    "color": "#518785",
                                    "align": "end"
                                }
                            ]
                        },
                        {
                            "type": "separator",
                            "margin": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "margin": "xxl",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "統一發票",
                                    "size": "xs",
                                    "color": "#555555"
                                },
                                {
                                    "type": "text",
                                    "text": "由 E-mail 寄送",
                                    "size": "xs",
                                    "color": "#111111",
                                    "align": "end"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "separator",
                    "margin": "xxl"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "俥酷消費明細僅供參考；優惠相關折抵結果依合作夥伴交易明細為準。如有疑問，請參見各合作夥伴之官方網站說明或洽詢其客服窗口。",
                            "size": "xxs",
                            "wrap": true,
                            "color": "#aaaaaa"
                        }
                    ]
                }
            ]
        }
    }
    return billTiketBubble
}

app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
