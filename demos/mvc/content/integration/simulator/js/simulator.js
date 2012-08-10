if (kendo.support.browser.webkit || kendo.support.browser.mozilla) {
    (function($, undefined) {
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
                    fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
                    android: /(Android)\s+(\d+)\.(\d+(\.\d+)?)/,
                    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                    webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
                    blackberry: /(BlackBerry|PlayBook).*?Version\/(\d+)\.(\d+(\.\d+)?)/
                },
                osRxs = {
                    ios: /^i(phone|pad|pod)$/i,
                    android: /^android|fire$/i
                },
                testOs = function (agent) {
                    for (var os in osRxs) {
                        if (osRxs.hasOwnProperty(os) && osRxs[os].test(agent))
                            return os;
                    }
                    return agent;
                };

            for (var agent in agentRxs) {
                if (agentRxs.hasOwnProperty(agent)) {
                    match = ua.match(agentRxs[agent]);
                    if (match) {
                        os = {};
                        os.device = agent;
                        os.name = testOs(agent);
                        os[os.name] = true;
                        os.majorVersion = match[2];
                        os.minorVersion = match[3].replace("_", ".");
                        os.flatVersion = os.majorVersion + os.minorVersion.replace(".", "");
                        os.flatVersion = os.flatVersion + (new Array(4 - os.flatVersion.length).join("0")); // Pad with zeroes
                        os.appMode = window.navigator.standalone || typeof window._nativeReady !== "undefined";

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
                url = "../../content/integration/simulator/devices/" + devicename + "/styles.css", newLink, os, matches;

            if (!kendo.support.browser.msie) {
                newLink = deviceLink
                    .eq(0)
                    .clone()
                    .attr("href", url);
            } else {
                newLink = document.createStyleSheet(url);
            }

            head.append(newLink);

            if (frame.contentWindow.kendo)
                os = frame.contentWindow.kendo.support.mobileOS = detectOS(mobiles[devicename].ua);

            $(foreignDocument.body).removeClass("km-ios km-android").addClass("km-" + (!os ? "ios" : os.name));
            matches = deviceSelector.text().match(/(^\w+)\s(.*)/m);
            $(".description .device")
                    .html(matches[1] + "<span class='model'>" + matches[2] + "</span>")
                    .css("background-image", "url('../../content/integration/simulator/images/" + devicename + ".png')");

            setTimeout(function () {
                deviceLink.remove();
                setTimeout( function () {
                    $(".content").kendoStop(true, true).kendoAnimate("slide:down", true, function () {
                        resizeContent();
                    });
                }, 500);
            }, 0);
        }

        function resizeContent() {
            $(".device-container")[0].style.cssText = "";
            var offset = $(".device-skin").css("padding-top");
            if (offset != "0px") {
                $(".device-container").animate({ paddingTop: "+" + offset });
            }
        }

        function fixAdjust() {
            var doc = $(foreignDocument.documentElement);

            if (kendo.support.transitions.prefix == "webkit") {
                doc.add(foreignDocument.body).css("-webkit-text-size-adjust", "auto");
            }

            changeFontSize();
        }

        var deviceSelector = $("#device-selector")
                                    .val("ipad")
                                    .change( function () {
                                        $(".content").kendoStop(true, true).kendoAnimate("slide:down", function () {
                                            frame.contentWindow.location.href = frame.contentWindow.location.href.replace(/#.*$/, ""); // Remove the anchor or the browser will try to scroll to it!
                                            setTimeout(function () {
                                                fixAdjust();
                                            }, 200);
                                        });
                                    })
                                    .kendoDropDownList({
                                        dataSource: [
                                            { text: "Apple iPad 2", value: "ipad" },
                                            { text: "Apple iPhone 4", value: "iphone" },
                                            { text: "Google Nexus S", value: "nexuss" },
                                            { text: "Acer Iconia Tab A100", value: "a100" }
                                        ],
                                        dataTextField: "text",
                                        dataValueField: "value"
                                    }).data("kendoDropDownList");

        var frame = $("#simulator")[0],
            addressBar = $("#address-bar"),
            foreignDocument;

        function changeFontSize() {
            $(frame.contentWindow.document.documentElement).css({
                fontSize: $(".device-skin").css("font-size")
            }).css("font-size");
        }

        $(window).bind("DOMFrameContentLoaded", function () { setTimeout(changeFontSize, 300); } );
        $(frame.contentWindow).bind("DOMContentLoaded", changeFontSize);

        frame.onload = function () {
            frame.contentWindow.orientation = $(".device-container").hasClass("horizontal") ? 90 : 0;

            foreignDocument = frame.contentWindow.document;
            if (frame.src != addressBar.val())
                addressBar.val(frame.src);

            $(frame).unbind("mouseleave").bind("mouseleave", function (e) {
                var event = foreignDocument.createEvent("MouseEvents");
                event.initMouseEvent("mouseup", true, true, frame.contentWindow, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);

                var scroller = $(foreignDocument).find(".km-scroll-container:visible");
                if (scroller.length)
                    $(foreignDocument).find(".km-scroll-container:visible")[0].dispatchEvent(event);
            });

            changeDevice();
        };

        $(document)
                .delegate("[data-orientation]", "click", function () {
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
                                    fixAdjust();
                                });
                            }, 100);
                        });
                    }
                })
                .delegate("#navigate-back", "click", function () {
                    frame.contentWindow.history.back()
                });
    })(jQuery);
} else {
    $(document.body).addClass("old-browser");
    $(".header").hide();
    $(".content").empty().html("<span class='centered'><strong>The Kendo Mobile <span>simulator and demo</span></strong><span>are fully supported in WebKit based browsers and partially supported in Firefox.</span><br>Please use a compatible desktop browser or open the demo in a mobile WebKit based browser.</span>")
}
