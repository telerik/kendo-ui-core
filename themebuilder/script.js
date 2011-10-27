// bootstrapper file for Kendo ThemeBuilder
(function() {
    var doc = document,
        UNDEFINED = "undefined",
        head = doc.getElementsByTagName("head")[0],
        applicationRoot = (function() {
            var scripts = document.getElementsByTagName("script"),
                path = scripts[scripts.length-1].src.split('?')[0];

            return path.split("/").slice(0,-1).join("/") + "/";
        })(),

        // caution: the variable below is changed during builds. update build/themebuilder.js if you change its name!
        requiredFiles = ["less.js", "themebuilder.js", "colorengine.js", "template.js"];

    // do not initialize twice, just reopen window
    if (typeof kendo != UNDEFINED && kendo.ThemeBuilder) {
        $("#k-tb-wrap > .k-window").data("kendoThemeBuilder").open();
        return;
    }

    function getScript(url, callback) {
        var script = doc.createElement("script");
        script.onload = callback;
        script.src = url;

        head.appendChild(script);
    }

    // show error message on pages that we can not work with
    if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
        var messageId = 'kendoThemeBuilderMessage',
            styles = 'position:absolute;top:50%;margin-top:-1.6em;left:50%;margin-left:-16em;z-index:9999999;font:12px sans-serif;text-align:center;width:32em;padding:1em;border:1px solid #2a2a2a;background:#f2f2f2;color:#ef652a;-moz-box-shadow: 1px 1px 7px 1px #666;-webkit-box-shadow: 1px 1px 7px 1px #666;box-shadow: 1px 1px 7px 1px #666;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;';

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
                    var icon = $("<div class='k-icon' />").css("display", "none").appendTo(document.body);

                    return icon.css("background-image").replace(/url\(["']?(.*?)sprite\.png["']?\)$/i, "\"$1\"");
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
            "@select-hover-background-color":   constant(".k-group", BGCOLOR),

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
            "Select boxes and pickers": /^@select-.*/,
            "Widget states": /^@(hover|selected|active|error|disabled).*/,
            "Misc": /^@(alt|input|shadow|link|tooltip|border|loading|splitbar)/
        };

    window.lessLoaded = function(lessTemplate) {
        new kendo.ThemeBuilder(lessTemplate, new kendo.LessConstants(constants), constantsHierarchy);
    };

    $("<link rel='stylesheet' href='" + applicationRoot + "themebuilder.css' />").appendTo("head");

    (function loadFileFromQueue() {
        if (requiredFiles.length) {
            getScript(applicationRoot + requiredFiles.shift(), loadFileFromQueue);
        }
    })();
})();

