var mobiles = {
    ipad: {
        ua: "Mozilla/5.0(iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5"
    },
    iphone: {
        ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; xx-xx) AppleWebKit/532.9 (KHTML, like Gecko) Mobile/7D11"
    },
    nexuss: {
        ua: "Mozilla/5.0 (Linux; U; Android 2.3.3; en-gb; Nexus S Build/GRI20) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    },
    a100: {
        ua: "Mozilla/5.0 (Linux; U; Android 3.2; en-us; A100 Build/HTJ85B) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"
    },
    n9: {
        ua: "Mozilla/5.0 (MeeGo; NokiaN950-00/00) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13"
    }
};

function detectOS(ua) {
    var os = false, match = [],
        agentRxs = {
            android: /(Android)\s+(\d+)\.(\d+(\.\d+)?)/,
            iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
            ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
            meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
            webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
            blackberry: /(BlackBerry|PlayBook).*?Version\/(\d+)\.(\d+(\.\d+)?)/
        };
    for (var agent in agentRxs) {
        if (agentRxs.hasOwnProperty(agent)) {
            match = ua.match(agentRxs[agent]);
            if (match) {
                os = {};
                os.device = agent;
                os.name = /^i(phone|pad|pod)$/i.test(agent) ? "ios" : agent;
                os[os.name] = true;
                os.majorVersion = match[2];
                os.minorVersion = match[3].replace("_", ".");
                os.flatVersion = os.majorVersion + os.minorVersion.replace(".", "");
                os.flatVersion = os.flatVersion + (new Array(4 - os.flatVersion.length).join("0")); // Pad with zeroes
                os.appMode = false;

                break;
            }
        }
    }
    return os;
}

function changeDevice() {
    var devicename = deviceSelector.value(),
        head = $(document.getElementsByTagName("head")[0]),
        deviceLink = head.find("link[href*='devices/']"),
        url = "devices/" + devicename + "/styles.css", newLink, os, matches;

    if (!$.browser.msie) {
        newLink = deviceLink
            .eq(0)
            .clone()
            .attr("href", url);
    } else {
        newLink = document.createStyleSheet(url);
    }

    head.append(newLink);

    os = frame.contentWindow.kendo.support.mobileOS = detectOS(mobiles[devicename].ua);
    foreignDocument.documentElement.className = "km-" + (!os ? "ios" : os.name);
    matches = deviceSelector.text().match(/(^\w+)\s(.*)/m);
    $(".description .device")
            .html(matches[1] + "<span class='model'>" + matches[2] + "</span>")
            .css("background-image", "url('images/" + devicename + ".png')");

    setTimeout(function () {
        deviceLink.remove();
        setTimeout( function () {
            $(".description").kendoStop().kendoAnimate("fadeOut", true);
            $(".content").kendoStop(true, true).kendoAnimate("slide:down", true, function () {
                resizeContent();
            });
        }, 200);
    }, 0);
}

function resizeContent() {
    $(".device-container")[0].style.cssText = "";
    setTimeout( function () {
        var offset = $(".device-skin").css("padding-top");
        $(".device-container")
                .css({
                    paddingTop: offset != "0px" ? offset : false
                });
        fixFF();
    }, 500 );
}

function fixFF() {
    var doc = $(foreignDocument.documentElement);

//            if (kendo.support.transitions.prefix == "Moz") { // FlexBox is broken in FF.
//                var kendoView = doc.find(".km-view");
//
//                if (kendoView.length) {
//                    var head = doc.find("head")/*,
//                        headerHeight = foreignDocument.find(".km-header").outerHeight(),
//                        footerHeight = foreignDocument.find(".km-footer").outerHeight()*/;
//
//                    $("<style type='text/css' id='ffFlexBoxFix'>.km-view{position:relative}</style>").appendTo(head); //TODO: Have to find a better way since this will break transitions.
//                }
//            }
    if (kendo.support.transitions.prefix == "webkit") {
        doc.add(foreignDocument.body).css("-webkit-text-size-adjust", "auto");
    }

    $(foreignDocument.documentElement).css({
        fontSize: $(".device-skin").css("font-size")
    });
}

var deviceSelector = $("#device-selector")
                            .val("ipad")
                            .change( function () {
                                $(".description").kendoStop().kendoAnimate("fadeOut");
                                $(".content").kendoStop(true, true).kendoAnimate("slide:down", function () {
                                    frame.contentWindow.location.reload();
                                });
                            })
                            .kendoDropDownList([
                                { text: "Apple iPad 2", value: "ipad" },
                                { text: "Apple iPhone 4", value: "iphone" },
                                { text: "Google Nexus S", value: "nexuss" },
                                { text: "Acer Iconia Tab A100", value: "a100" }
                            ]).data("kendoDropDownList");

var frame = $("#simulator")[0],
    addressBar = $("#address-bar"),
    foreignDocument;

frame.onload = function () {
    frame.contentWindow.orientation = $(".device-container").hasClass("horizontal") ? 90 : 0;

    foreignDocument = frame.contentWindow.document;
    if (frame.src != addressBar.val())
        addressBar.val(frame.src);

    fixFF();
    changeDevice();
};

$(document).delegate("[data-orientation]", "click", function () {
    var button = $(this),
        currentOrientation = button.data("orientation");

    if (!$(".device-container").hasClass(button.data("orientation"))) {
        $(".content").kendoStop(true, true).kendoAnimate("slide:left", function () {

            $(".device-container")
                .removeClass("horizontal vertical")
                .addClass(currentOrientation);

            frame.contentWindow.orientation = currentOrientation == "horizontal" ? 90 : 0;
            $(foreignDocument.documentElement)
                .removeClass("km-horizontal km-vertical")
                .addClass("km-" + currentOrientation);

            $(".device-container")[0].style.cssText = "";

            setTimeout( function () {
                $(".content").kendoStop(true, true).kendoAnimate("slide:left", true, function () {
                    resizeContent();
                });
            }, 100);
        });
    }
});
