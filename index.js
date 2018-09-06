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
                const bubbles = [utilties.createFlexBubbleMessage(),utilties.createFlexBubbleMessage()]
                const carouselMessage = utilties.createFlexCarouselMessage(bubbles)
                const parkingBubble = utilties.createParkingPlateBubble(false,"2018.07.09 09:00","ABD-0133","建國高架H站")
                const discountInfoArray = [
                    {
                        name : "台新優惠：2201（1.0 小時）",
                        amount:"- 10"
                    },
                    {
                        name:"台新紅利：2201（1.0 小時）",
                        amount:"- 20"
                    }
                ]
                const billTicketBubble = utilties.createBillTiketBubble(2000,500,discountInfoArray,"2018.07.09 09:00","2019.07.09 09:00","ABD-0133","市政府轉運站大樓站")
                const imageMapMassage = utilties.createImageMapMessage("https://news.cts.com.tw/photo/cts/201612/201612071828599_l.jpg",2.145)
                const action1 = {
                    "type": "uri",
                    "uri": "https://www.google.com"
                }
                const action2 = {
                    "type": "uri",
                    "uri": "https://www.google.com"
                }

                const privacyBuble = utilties.createConfirmBubble("使用者條款","這裡是說明文字這裡是說明文字這裡是說明文字這裡是說明文字","隱私權暨個人資料保護政策","我同意",action1,action2)
                const privacyMessage =  utilties.createFlexCarouselMessage([privacyBuble])
                return client.pushMessage(targetId, utilties.createWelcomToSettingMessage());
            });
    }


}


app.listen(process.env.PORT || 8080, function() {
    console.log('App now running on port', this.address().port);
});
