// bootstrapper file for Kendo ThemeBuilder
(function() {
    // do not initialize twice
    if (typeof kendo != "undefined" && kendo.ThemeBuilder) {
        // reopen themebuilder
        $("#kendo-themebuilder-wrapper").data("kendoThemeBuilder").open();
        return;
    }

    var queue = [],
        doc = document,
        UNDEFINED = "undefined"
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
        stylesCss = "styles.css"

    function getScript(url, callback) {
        var script = doc.createElement("script");
        script.onload = callback;
        script.src = url;

        head.appendChild(script);
    }

    // page without jQuery
    if (typeof jQuery == UNDEFINED) {
        queue.push(function(callback) {
            getScript(jQueryJs, callback);
        });
    }

    // page without kendo -- maybe components are loaded asynchronously?
    if (typeof kendo == UNDEFINED) {
        queue.push(function(callback) {
            $(head).append("<link rel='stylesheet' href='" + kendoCommonCss + "' />");
            $(head).append("<link rel='stylesheet' href='" + kendoSkinCss + "' />");

            // TODO: use CDN when a recent version is uploaded
            getScript(kendoAllJs, callback);
        });
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
         * @content-background-color: @widget-background-color;
         * @group-background-color: #f1f4f5;
         * @input-background-color: @widget-background-color;
         * @splitbar-background-color: @header-background-color;
         * @alt-background-color: @group-background-color;
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
            title: "Hover state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@selected",
            title: "Selected state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@active",
            title: "Active state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
        }, {
            prefix: "@disabled",
            title: "Disabled state",
            properties: returnProperties([COLOR])
        }, {
            prefix: "@error",
            title: "Error state",
            properties: returnProperties([BGCOLOR, COLOR, BORDERCOLOR])
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
                getScript(applicationRoot + templateJs);
            });
        });
    });

    (function resolveQueue() {
        if (queue.length) {
            queue.shift()(resolveQueue);
        }
    })();
})();

