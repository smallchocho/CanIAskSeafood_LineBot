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
            const message = utilties.createOnlyTextMessage("您好，歡迎使用iParking，我一次只能跟一個人說話喔。")
            return client.replyMessage(event.replyToken, [message])
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

function handleFirstJoinEventMessage(event) {
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

function handleFirstFollowEventMessage(event) {
    var source = event.source;
    var targetId = source[source.type+'Id'];
    const imageMapMassage = utilties.createImageMapMessage("https://s3-ap-northeast-1.amazonaws.com/res.findata/Test_images/welcome_pic.png#/1024", 1.40)
    const action1 = {
        "type": "uri",
        "uri": "https://www.findata.com.tw/webview/privacy"
    }
    const action2 = {
        "type":"postback",
        "data":"action=privacy&value=yes"
    }
    const privacyBubble = utilties.createConfirmBubble("使用者條款", "這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字", "隱私權暨個人資料保護政策", "我同意", action1, action2)
    const privacyMessage = utilties.createFlexBubbleMessage(privacyBubble)
    return client.replyMessage(event.replyToken, [imageMapMassage,privacyMessage])
}

function handleEventMessage(event){
    var source = event.source
    if (source.type != "user"){
        const message = utilties.createOnlyTextMessage("抱歉，人太多了，我不習慣在人群中說話，可以換個地方嗎？")
        return client.replyMessage(event.replyToken, [message])
    }
    switch (event.message.type) {
        case 'text':
            switch (event.message.text) {
                case "[menu][支付設定]":
                    break
                case "[menu][車牌設定]":
                    break
                case "[menu][發票設定]":
                    break
                default :
                    const message = utilties.createOnlyTextMessage("您好，我聽不懂你說的話，可以再說一次嗎？")
                    return client.replyMessage(event.replyToken, [message])
            }
            console.log(event.message.text)
    }
}

function handlePostbackEventMessage(event) {
    console.log(event.postback.data)
    let params = utilties.getParatemeterToObject(event.postback.data)
    if (!params["action"] || !params["value"] ) {
        console.log("No params")
    }
    console.log(params["action"])
    console.log(params["value"])
    switch (params.action) {
        case "privacy":
            if (!params.value){
                console.log("value error")
                return
            }
            const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg", 2.145)
            const message = utilties.createFlexBubbleMessage(utilties.createWelcomeToSettingBubble())
            return client.replyMessage(event.replyToken, message)
    }

}

app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
