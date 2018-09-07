//basic
function createQuickReplys(message, items) {
    const quickReplys = {
        type: "text", // ①
        text: message,
        quickReply: { // ②
            items: []
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

function createFlexBubbleMessage(bubble) {
    const flexBubbleMessage = {
        type: "flex",
        altText: "This is a Flex Message",
        contents: bubble
    }
    return flexBubbleMessage
}

function createFlexCarouselMessage(bubbles) {
    const flexCarouselMessage = {
        type: "flex",
        altText: "This is a Flex Message",
        contents: {
            "type": "carousel",
            "contents": bubbles
        }
    }
    return flexCarouselMessage
}

function createConfirmTemplateMessage(title,actions = []) {
    let message = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": title,
            "actions": actions
        }
    }
    // action example:
    // {
    //         "type": "message",
    //         "label": "確定"
    //         "text": yesActionText
    // }
    return message
}

function createConfirmBubble(title, body, yesTitle, noTitle, yesAction, noAction) {
    const message = {
        "type": "bubble",
        "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": title,
                    "size": "lg",
                    "weight": "bold"
                },
                {
                    "type": "text",
                    "text": body,
                    "margin": "xs",
                    "wrap": true,
                    "color": "#aaaaaa",
                    "size": "md"
                }
            ]
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "lg",
            "contents": [
                {
                    "type": "text",
                    "text": yesTitle,
                    "size": "md",
                    "color": "#1e79a9",
                    "align": "center",
                    "action": yesAction
                },
                {
                    "type": "text",
                    "text": noTitle,
                    "size": "md",
                    "color": "#1e79a9",
                    "align": "center",
                    "action": noAction
                }
            ]
        },
        "styles": {
            "body": {
                "separator": true,
                "separatorColor": "#4ea1a1"
            }
        }
    }
    return message
    // action example:
    // {
    //         "type": "message",
    //         "label": "確定"
    //         "text": yesActionText
    // }
}

function createImageMapMessage(imgUrl, aspectRatio, actions = []) {
    const imageMapMessage = {
        "type": "imagemap",
        "baseUrl": imgUrl,
        "altText": "This is an imagemap",
        "baseSize": {
            "height": 1040 / aspectRatio,
            "width": 1040
        },
        "actions": actions
        // "actions": [
        //     {
        //         "type": "uri",
        //         "linkUri": "https://google.com/",
        //         "area": {
        //             "x": 0,
        //             "y": 0,
        //             "width": 520,
        //             "height": 1040
        //         }
        //     },
        //     {
        //         "type": "message",
        //         "text": "Hello",
        //         "area": {
        //             "x": 520,
        //             "y": 0,
        //             "width": 520,
        //             "height": 1040
        //         }
        //     }
        // ]
    }
    return imageMapMessage
}


//iParking Custom
function createParkingPlateBubble(isEntrance, time, plate, lotName) {
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
                                    "text": isEntrance ? "進場" : "出場",
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

function createBillTiketBubble(fee, totalFee, discountInfoArray, startTime, endTime, plate, lotName) {

    const discountBubbleArray = []
    // let i
    for (i = 0; i < discountInfoArray.length; i++) {
        const discountItem = {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "text",
                    "text": discountInfoArray[i].name,
                    "size": "xxs",
                    "color": "#518785",
                    "flex": 0
                },
                {
                    "type": "text",
                    "text": discountInfoArray[i].amount + " 元",
                    "size": "xxs",
                    "color": "#518785",
                    "align": "end"
                }
            ]
        }
        discountBubbleArray[i] = discountItem
    }
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
                    "margin": "sm",
                    "text": "實付金額：" + fee + "元",
                    "weight": "bold",
                    "size": "xl"
                },
                {
                    "type": "text",
                    "margin": "md",
                    "text": startTime + " - " + endTime,
                    "size": "xxs",
                    "wrap": true
                },
                {
                    "type": "text",
                    "text": plate,
                    "margin": "md",
                    "size": "sm",
                    "color": "#9b9b9c",
                    "flex": 0
                },
                {
                    "type": "text",
                    "text": lotName,
                    "margin": "xs",
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
                            "layout": "vertical",
                            "spacing": "sm",
                            "contents": discountBubbleArray
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

function createWelcomeToSettingBubble() {
    const bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "lg",
            "contents": [
                {
                    "type": "text",
                    "text": "歡迎使用 iParking",
                    "size": "lg",
                    "color": "#2c2c2c",
                    "align":"start"
                },
                {
                    "type": "text",
                    "text": "iParking 可以讓您不用排隊、不用揮汗如雨，輕輕鬆鬆完成停車繳費。",
                    "wrap":true,
                    "size": "md",
                    "color": "#2c2c2c",
                    "align":"start"
                },
                {
                    "type": "text",
                    "text": "請點此前往完成 >>>>>>",
                    "size": "md",
                    "color": "#1e79a9",
                    "align":"start",
                    "action": {
                        "type": "uri",
                        "uri": "https://www.google.com"
                    }
                },
                {
                    "type": "text",
                    "text": "1. 手機認證",
                    "margin":"sm",
                    "size": "md",
                    "color": "#2c2c2c",
                    "align":"start",
                    "action": {
                        "type": "uri",
                        "uri": "https://www.google.com"
                    }
                },
                {
                    "type": "text",
                    "text": "2. 支付與發票設定",
                    "margin":"xs",
                    "size": "md",
                    "color": "#2c2c2c",
                    "align":"start",
                    "action": {
                        "type": "uri",
                        "uri": "https://www.google.com"
                    }
                },
                {
                    "type": "text",
                    "text": "3. 車牌綁定",
                    "margin":"xs",
                    "size": "md",
                    "color": "#2c2c2c",
                    "align":"start",
                    "action": {
                        "type": "uri",
                        "uri": "https://www.google.com"
                    }
                },
                {
                    "type": "text",
                    "text": "即可開始使用我們的服務喔～",
                    "margin":"sm",
                    "size": "md",
                    "color": "#2c2c2c",
                    "align":"start",
                    "action": {
                        "type": "uri",
                        "uri": "https://www.google.com"
                    }
                }
            ]
        },
        "styles": {
            "body": {
                "separator": true,
                "separatorColor": "#4ea1a1"
            }
        }
    }
    return bubble
}

module.exports = {
    createQuickReplys,
    createFlexBubbleMessage,
    createFlexCarouselMessage,
    createConfirmTemplateMessage,
    createConfirmBubble,
    createImageMapMessage,
    createParkingPlateBubble,
    createBillTiketBubble,
    createWelcomeToSettingBubble
}


