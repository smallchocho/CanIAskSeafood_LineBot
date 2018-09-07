const line = require('@line/bot-sdk');
const express = require('express');
const utilties = require('./utilties')

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
            break
        case 'follow':
            handleFirstFollowEventMessage(event)
            break
        case 'message':
            handleEventMessage(event)
            break
        case 'postback':
            handlePostbackEventMessage(event)
            break
    }
}

// function handleFirstJoinEventMessage(event) {
//     const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg",2.145)
//     const action1 = {
//         "type": "uri",
//         "uri": "https://www.findata.com.tw/webview/privacy"
//     }
//     const action2 = {
//         "type": "uri",
//         "uri": "https://www.google.com"
//     }
//     const privacyBuble = utilties.createConfirmBubble("使用者條款","這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字","隱私權暨個人資料保護政策","我同意",action1,action2)
//     const privacyMessage =  utilties.createFlexCarouselMessage([privacyBuble])
//     return client.replyMessage(event.replyToken,[imageMapMassage,privacyMessage]);
// }

function handleFirstFollowEventMessage(event) {
    const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg",2.145)
    const action1 = {
        "type": "uri",
        "uri": "https://www.findata.com.tw/webview/privacy"
    }
    const action2 = {
        "type": "uri",
        "uri": "https://www.google.com"
    }
    const privacyBuble = utilties.createConfirmBubble("使用者條款","這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字","隱私權暨個人資料保護政策","我同意",action1,action2)
    const privacyMessage =  utilties.createFlexCarouselMessage([privacyBuble])
    return client.replyMessage(event.replyToken,[imageMapMassage,privacyMessage]);
}

function handleEventMessage(event){
    switch (event.message.type) {
        case 'text':
            console.log(event.message.text)
            var source = event.source;
            var targetId = source[source.type+'Id'];
            const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg", 2.145)
            const action1 = {
                "type": "uri",
                "uri": "https://www.google.com"
            }
            const action2 = {
                "type":"postback",
                "label":"Buy",
                "data":"action=buy&itemid=111"
            }
            const privacyBubble = utilties.createConfirmBubble("使用者條款", "這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字", "隱私權暨個人資料保護政策", "我同意", action1, action2)
            const privacyMessage = utilties.createFlexCarouselMessage([privacyBubble])
            return client.replyMessage(event.replyToken, [utilties.createFlexBubbleMessage(utilties.createWelcomeToSettingBubble()),imageMapMassage,privacyMessage])
    }
}

function handlePostbackEventMessage(event) {
    const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg", 2.145)
    const action1 = {
        "type": "uri",
        "uri": "https://www.google.com"
    }
    const action2 = {
        "type": "postback",
        "label": "Buy",
        "data": "action=buy&itemid=111"
    }
    const privacyBuble = utilties.createConfirmBubble("使用者條款", "這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字", "隱私權暨個人資料保護政策", "我同意", action1, action2)
    const privacyMessage = utilties.createFlexCarouselMessage([privacyBuble])
    return client.replyMessage(event.replyToken, [utilties.createFlexBubbleMessage(utilties.createWelcomeToSettingBubble()), imageMapMassage, privacyMessage])
}

app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
