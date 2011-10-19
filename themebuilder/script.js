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

    var constant = function(target, property, values){
            return {
                target: target,
                property: property,
                values: values
            };
        },
        BGCOLOR = "background-color",
        BORDERCOLOR = "border-color",
        COLOR = "color",
        constants = {
            "@image-folder": {
                readonly: true,
                infer: function() {
                    // TODO: compute from current skin. determine what should be the context for this function.
                    return "\"http://localhost/kendo/live/styles/Black/\"";
                }
            },

            "@texture-url": constant(".k-header", "background-image", [
                "http://localhost/kendo/live/styles/Black/gradient.png",
                "http://localhost/kendo/live/styles/BlueOpal/gradient.png",
                "http://localhost/kendo/live/styles/Hakama/gradient.png"
            ]),

            "@widget-background-color":         constant(".k-widget", BGCOLOR),
            "@widget-border-color":             constant(".k-widget", BORDERCOLOR),
            "@widget-text-color":               constant(".k-widget", COLOR),

            "@header-background-color":         constant(".k-header", BGCOLOR),
            "@header-text-color":               constant(".k-header", COLOR),

            "@button-background-color":         constant(".k-button", BGCOLOR),
            "@button-text-color":               constant(".k-button", COLOR),

            "@group-background-color":          constant(".k-group", BGCOLOR),
            "@group-border-color":              constant(".k-group", BORDERCOLOR),

            "@content-background-color":        constant(".k-content", BGCOLOR),

            "@select-background-color":         constant(".k-group", BGCOLOR),
            "@select-border-color":             constant(".k-group", BORDERCOLOR),
            "@select-group-background-color":   constant(".k-group", BGCOLOR),
            "@select-hover-background-color":   constant(".k-group", BORDERCOLOR),

            "@hover-background-color":          constant(".k-state-hover", BGCOLOR),
            "@hover-border-color":              constant(".k-state-hover", BORDERCOLOR),
            "@hover-text-color":                constant(".k-state-hover", COLOR),

            "@selected-background-color":       constant(".k-state-selected", BGCOLOR),
            "@selected-border-color":           constant(".k-state-selected", BORDERCOLOR),
            "@selected-text-color":             constant(".k-state-selected", COLOR),

            "@active-background-color":         constant(".k-state-active", BGCOLOR),
            "@active-border-color":             constant(".k-state-active", BORDERCOLOR),
            "@active-text-color":               constant(".k-state-active", COLOR),

            "@error-background-color":          constant(".k-state-error", BGCOLOR),
            "@error-border-color":              constant(".k-state-error", BORDERCOLOR),
            "@error-text-color":                constant(".k-state-error", COLOR),

            "@disabled-text-color":             constant(".k-state-disabled", COLOR),

            "@alt-background-color":            constant(".k-alt", BGCOLOR),
            "@input-background-color":          constant(".k-input", BGCOLOR),
            "@input-text-color":                constant(".k-input", COLOR),
            "@shadow-color":                    constant(".k-popup", "box-shadow"),
            "@shadow-inset-color":              constant(".k-autocomplete .k-input", "box-shadow"),
            "@link-text-color":                 constant(".k-link", COLOR),
            "@tooltip-background-color":        constant(".k-tooltip", BGCOLOR),
            "@tooltip-text-color":              constant(".k-tooltip", COLOR),
            "@border-radius":                   constant(".k-link", "border-radius"),
            "@loading-panel-color":             constant(".k-loading-color", BGCOLOR),
            "@splitbar-background-color":       constant(".k-splitbar", BGCOLOR)
        },
        constantsHierarchy = {
            "Widget": /^@widget.*/,
            "Headers": /^@header.*/,
            "Buttons": /^@button.*/,
            "Groups and content areas": /^@(group|content).*/,
            "Select boxes and pickers": /^@select.*/,
            "Widget states": /^@(hover|selected|active|error|disabled).*/,
            "Misc": /^@(alt|input|shadow|link|tooltip|border|loading|splitbar)/
        };

    window.lessLoaded = function(lessTemplate) {
        new kendo.ThemeBuilder(lessTemplate, new kendo.LessConstants(constants), constantsHierarchy);
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

