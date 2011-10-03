// bootstrapper file for Kendo ThemeBuilder
(function() {
    var queue = [],
        doc = document,
        UNDEFINED = "undefined",
        head = doc.getElementsByTagName("head")[0],
        applicationRoot = "http://localhost/kendo/themebuilder/",
        jQueryJs = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",
        stylesRoot = "http://localhost/kendo/live/styles/",
        kendoCommonCss = stylesRoot + "kendo.common.css",
        kendoSkinCss = stylesRoot + "kendo.kendo.css",
        kendoAllJs = "http://localhost/kendo/deploy/kendoUI/js/kendo.all.min.js",
        lessJs = "less.js",
        themebuilderJs = "themebuilder.js",
        templateJs = "template.js",
        colorEngineJs = "colorengine.js",
        stylesCss = "styles.css";

    // do not initialize twice
    if (typeof kendo != UNDEFINED && kendo.ThemeBuilder) {
        // reopen themebuilder
        $("#kendo-themebuilder-wrapper").data("kendoThemeBuilder").open();
        return;
    }

    function getScript(url, callback) {
        var script = doc.createElement("script");
        script.onload = callback;
        script.src = url;

        head.appendChild(script);
    }

    if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
        // show error message -- not a relevant page
        var messageId = 'kendoThemeBuilderMessage',
            styles = 'position:absolute;top:50%;margin-top:-1.6em;left:50%;margin-left:-16em;z-index:9999999;font:12px sans-serif;text-align:center;width:32em;padding:1em;border:1px solid #2�2�2�;background:#f2f2f2;color:#ef652a;-moz-box-shadow: 1px 1px 7px 1px #666;-webkit-box-shadow: 1px 1px 7px 1px #666;box-shadow: 1px 1px 7px 1px #666;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;';

        if (!doc.getElementById(messageId)) {
            var messageWrap = doc.createElement("div");
            messageWrap.id = messageId;
            messageWrap.style.cssText = styles;
            messageWrap.innerHTML =
                '<p style="margin:0;padding:0;">' +
                'It seems there are no Kendo widgets on this page, so the Kendo themebuilder will be of no use. Please try running it elsewhere.' +
                '</p>' +
                '<p style="margin:1em 0 0;padding:0;">' +
                '<button type="button" style="border:1px solid #aaa;background:#e3e3e3;color:#2e2e2e;cursor:pointer;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;" onclick="var msg = document.getElementById(\'' + messageId + '\');msg.parentNode.removeChild(msg);return false;">Close</button></p>';
            doc.body.appendChild(messageWrap);
        }

        return;
    }

    function buildConstants() {
        var properties = {
                bgColor: { property: "background-color", label: "Background" },
                color: { property: "color", lessSuffix: "text-color", label: "Text color" },
                borderColor: { property: "border-color", label: "Border color" }
            },
            extend = $.extend,
            BGCOLOR = "bgColor",
            COLOR = "color",
            BORDERCOLOR = "borderColor";

        function returnProperties(propertyNames) {
            var result = [], j;

            for (j = 0; j < propertyNames.length; j++) {
                result.push(extend({}, properties[propertyNames[j]]));
            }

            return result;
        }

        /* missing constants:
         * @gradientUrl: "..."; // on Telerik CDN
         * @image-folder: "BlueOpal"; // we should think of something that allows us to change the gradients
        * @loading-panel-color: #fff;
        * @shadow-color: #aaa;
        * @shadow-inset-color: #555;
        * @shadow-light-color: #aaa;
        * @input-text-color: #000;
         */

        return [{
            prefix: "@widget",
            title: "Widgets",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@header",
            title: "Headers",
            properties: returnProperties([BGCOLOR, COLOR])
        }, {
            prefix: "@link",
            title: "Links",
            properties: returnProperties([COLOR])
        }, {
            prefix: "@button",
            title: "Buttons",
            properties: returnProperties([BGCOLOR, COLOR])
        }, {
            prefix: "@tooltip",
            title: "Tooltips",
            properties: returnProperties([BGCOLOR, COLOR])
        }, {
            prefix: "@hover",
            cssClass: "k-state-hover",
            title: "Hover state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@selected",
            cssClass: "k-state-selected",
            title: "Selected state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@active",
            cssClass: "k-state-active",
            title: "Active state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@disabled",
            cssClass: "k-state-disabled",
            title: "Disabled state",
            properties: returnProperties([COLOR])
        }, {
            prefix: "@error",
            cssClass: "k-state-error",
            title: "Error state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@content",
            title: "Content wrappers",
            properties: returnProperties([BGCOLOR])
        }, {
            prefix: "@group",
            title: "Item groups",
            properties: returnProperties([BGCOLOR, BORDERCOLOR])
        }, {
            prefix: "@input",
            title: "Textboxes",
            properties: returnProperties([BGCOLOR])
        }, {
            prefix: "@splitbar",
            title: "Splitbars",
            properties: returnProperties([BGCOLOR])
        }, {
            prefix: "@alt",
            title: "Grid alt rows",
            properties: returnProperties([BGCOLOR])
        }, {
            prefix: "@loading",
            title: "Loading panels",
            properties: returnProperties([BGCOLOR])
        }];
    }

    window.lessLoaded = function(lessTemplate) {
        new kendo.ThemeBuilder(lessTemplate, new kendo.LessConstants(buildConstants()));
    };

    queue.push(function(){
        $("<link rel='stylesheet' href='" + applicationRoot + stylesCss + "' />").appendTo("head");

        // TODO: these can be merged during build
        getScript(applicationRoot + lessJs, function() {
            getScript(applicationRoot + themebuilderJs, function() {
                getScript(applicationRoot + colorEngineJs, function() {
                    getScript(applicationRoot + templateJs);
                });
            });
        });
    });

    (function resolveQueue() {
        if (queue.length) {
            queue.shift()(resolveQueue);
        }
    })();
})();

