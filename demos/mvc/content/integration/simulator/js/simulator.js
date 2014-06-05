if (kendo.support.browser.webkit || kendo.support.browser.mozilla || (kendo.support.browser.msie && kendo.support.browser.version >= 10)) {
    (function($, undefined) {
        var original = $("#simulator")[0].src,
            mobiles = {
                ipad: {
                    ua: "Mozilla/5.0(iPad; U; CPU OS 7_0_2 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0.2 Mobile/11a501 Safari/8536.25",
                    size: "11px"
                },
                iphone: {
                    ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 7_0_2 like Mac OS X; xx-xx) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11a501",
                    size: "12px"
                },
                nexus5: {
                    ua: "Mozilla/5.0 (Linux; U; Android 2.3.3; en-gb; Nexus S Build/GRI20) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
                    size: "12px"
                },
                a100: {
                    ua: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; A100 Build/HTJ85B) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
                    size: "11px"
                },
                z10: {
                    ua: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
                    size: "12px"
                },
                playbook: {
                    ua: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.1+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.1+",
                    size: "11px"
                },
                wp8: {
                    ua: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)",
                    size: "14px"
                },
                n9: {
                    ua: "Mozilla/5.0 (MeeGo; NokiaN950-00/00) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
                    size: "11px"
                }
            },
            currentDevice = kendo.support.detectOS(mobiles["ipad"].ua);

        function setOrientation(orientation) {
            var orientationClass = "km-" + orientation;

            $(".device-container")
                .removeClass("horizontal vertical")
                .addClass(orientation);

            if (currentDevice.blackberry) {
                orientationClass = orientationClass == "km-horizontal" ? "km-vertical" : "km-horizontal";
            }

            frame.contentWindow.orientation = orientationClass == "km-horizontal" ? 90 : 0;

            $(foreignDocument.documentElement)
                .removeClass("km-horizontal km-vertical")
                .addClass(orientationClass);
        }

        function changeDevice() {
            var devicename = deviceSelector.value(),
                head = $(document.getElementsByTagName("head")[0]),
                deviceLink = head.find("link[href*='devices/']"),
                location = (/^.*?(?=\?|#)/.exec(window.location.href) || [ window.location.href ])[0],
                url, newLink, matches;

            location += location[location.length-1] != "/" ? "/" : "";

            url = location + "../../content/integration/simulator/devices/" + devicename + "/styles.css";

            if (kendo.support.browser.msie && kendo.support.browser.version < 11) {
                newLink = document.createStyleSheet(url);
            } else {
                newLink = deviceLink
                    .eq(0)
                    .clone()
                    .attr("href", url);
            }

            head.append(newLink);

            matches = deviceSelector.text().match(/(^\w+)\s(.*)/m);
            $(".description .device")
                    .html(matches[1] + "<span class='model'>" + matches[2] + "</span>")
                    .css("background-image", "url('" + location + "../../content/integration/simulator/images/" + devicename + ".png')");

            setTimeout(function () {
                deviceLink.remove();
                setTimeout( function () {
                    $(".content").kendoStop(true, true).kendoAnimate("tile:up", function () {
                        resizeContent();
                    });
                }, 500);
            }, 0);
        }

        function resizeContent() {
            var container = $(".device-container"),
                iframe = $(".device-container iframe");
            container[0].style.cssText = "";
            iframe[0].style.cssText = "";
            var offset = parseInt($(".device-skin").css("padding-top"), 10),
                heightOffset = parseInt(container.css("padding-top"), 10) - offset;

            if (offset) {
                iframe.animate({
                    height: iframe.height() + heightOffset
                });
                container.animate({
                    paddingTop: "+" + offset
                });
            }
        }

        function fixAdjust() {
            var doc = $(foreignDocument.documentElement);

            if (kendo.support.transitions.prefix == "webkit") {
                doc.add(foreignDocument.body).css("-webkit-text-size-adjust", "auto");
            }

            changeFontSize();
        }

        function loadUrl(url) {
            var currentMobile = mobiles[deviceSelector.value()];

            $.get(url, function (file) {
                var fileContent = file.replace(/(<head\b.*?>)/igm, "$1\n<base href='" + url + "' />\n" +
                    "<script>\n" +
                    "    var kendoSimulatorAgent = function() {\n" +
                    "            return '" + currentMobile.ua + "';\n" +
                    "        };\n" +
                    "    if (navigator.__defineGetter__) {\n" +
                    "        navigator.__defineGetter__('userAgent', kendoSimulatorAgent);\n" +
                    "    }  else if (Object.defineProperty) {\n" +
                    "        Object.defineProperty(navigator, 'userAgent', {\n" +
                    "            get: kendoSimulatorAgent\n" +
                    "        });\n" +
                    "    }\n" +
                    "    document.addEventListener('DOMContentLoaded', function () {\n" +
                    "        if (kendo.support.mobileOS.wp) {\n" +
                    "            setTimeout(function () { $(document.body).removeClass('km-wp-light').addClass('km-wp-dark'); }, 0)\n" +
                    "        }\n" +
                    "    }, false)\n" +
                    "</script>\n" +
                    "<style>\n" +
                    "    html { font-size: " + currentMobile.size + " !important; }\n" +
                    "    body { overflow: hidden; height: 100% !important; }\n" +
                    "</style>\n"),
                preview = frame.contentDocument ||  frame.contentWindow.document;

                currentDevice = kendo.support.detectOS(currentMobile.ua);

                if (window.URL && !kendo.support.browser.msie) {
                    window.blob = window.URL.createObjectURL(new Blob([ fileContent ], { type: "text/html" }));
                    frame.contentWindow.location.href = window.blob;
                } else {
                    preview.open();
                    preview.write(fileContent);
                    preview.close();
                }
            });
        }

        var deviceSelector = $("#device-selector")
                                    .val("ipad")
                                    .change( function () {
                                        $(".content").kendoStop(true, true).kendoAnimate("tile:up", true, function () {
                                            loadUrl(original);
                                        });
                                    })
                                    .kendoDropDownList({
                                        dataSource: [
                                            { text: "Apple iPad Air", value: "ipad" },
                                            { text: "Apple iPhone 5S", value: "iphone" },
                                            { text: "Google Nexus 5", value: "nexus5" },
                                            { text: "Acer Iconia Tab A100", value: "a100" },
                                            { text: "BlackBerry Z10", value: "z10" },
                                            { text: "BlackBerry PlayBook", value: "playbook" },
                                            { text: "Nokia Lumia 920", value: "wp8" }
                                        ],
                                        dataTextField: "text",
                                        dataValueField: "value"
                                    }).data("kendoDropDownList");

        var frame = $("#simulator")[0],
            addressBar = $("#address-bar"),
            foreignDocument;

        function changeFontSize() {
            $(frame).css("height", "");

            foreignDocument = frame.contentWindow.document;
            setTimeout(function () {
                setOrientation($(".device-container")[0].className.match(/horizontal|vertical/)[0]);
            }, 300);
        }

        $(window).bind("DOMFrameContentLoaded", changeFontSize);
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

        loadUrl(original);

        $(document)
                .delegate("[data-orientation]", "click", function () {
                    var button = $(this),
                        container = $(".device-container"),
                        currentOrientation = button.data("orientation");

                    if (!container.hasClass(button.data("orientation"))) {
                        $(".content").kendoStop(true, true).kendoAnimate("tile:right", true, function () {

                            setOrientation(currentOrientation);

                            frame.contentWindow.orientation = currentOrientation == "horizontal" ? 90 : 0;
                            $(foreignDocument.documentElement)
                                .removeClass("km-horizontal km-vertical")
                                .addClass("km-" + currentOrientation);

                            container[0].style.cssText = "";

                            setTimeout( function () {
                                $(".content").kendoStop(true, true).kendoAnimate("tile:right", function () {
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
