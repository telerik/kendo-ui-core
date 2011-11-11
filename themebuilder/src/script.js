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
        bootStyles,

         // TODO: change these to their respective CDN versions during build
        kendoAllLocation = applicationRoot + "../../deploy/kendoUI/js/kendo.all.min.js",
        kendoCommonCssLocation = applicationRoot + "../../deploy/kendoUI/styles/kendo.common.min.css",

        // caution: the variable below is changed during builds. update build/themebuilder.js if you change its name!
        requiredJs = ["less.js", "themebuilder.js", "colorengine.js", "template.js"],
        requiredCss = ["kendo.black.css", "styles.css"];

    // do not initialize twice, just reopen window
    if (typeof kendo != UNDEFINED && kendo.ThemeBuilder) {
        $("#ktb-wrap").data("kendoThemeBuilder").open();
        return;
    }

    if (!bootStyles) {
        bootStyles = doc.createElement("link");
        bootStyles.setAttribute("rel", "stylesheet");
        bootStyles.setAttribute("href", applicationRoot + "bootstrap.css");

        doc.getElementsByTagName("head")[0].appendChild(bootStyles);
    }

    // show error message on pages that we can not work with
    if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
        var messageId = 'ktb-message';

        if (!doc.getElementById(messageId)) {
            var messageWrap = doc.createElement("div");
            messageWrap.id = messageId;
            messageWrap.innerHTML =
                '<p>It seems there are no Kendo widgets on this page, so the Kendo themebuilder will be of no use. Please try running it elsewhere.</p>' +
                '<p><button type="button" onclick="var msg = document.getElementById(\'' + messageId + '\');msg.parentNode.removeChild(msg);return false;">Close</button></p>';
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
                    var icon = $("<div class='k-icon' />")
                            .css("display", "none")
                            .appendTo(document.body),
                        result = icon.css("background-image")
                            .replace(/url\(["']?(.*?)\/sprite\.png["']?\)$/i, "\"$1\"");

                    icon.remove();

                    return result;
                }
            },

            "@texture-url": constant(".k-header", "background-image", [
                "url('" + applicationRoot + "themes/Black/gradient.png')",
                "url('" + applicationRoot + "themes/BlueOpal/gradient.png')",
                "url('" + applicationRoot + "themes/Kendo/gradient.png')"
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

            "@tooltip-background-color":        constant(".k-tooltip", BGCOLOR),
            "@tooltip-border-color":            constant(".k-tooltip", BORDERCOLOR),
            "@tooltip-text-color":              constant(".k-tooltip", COLOR),

            "@alt-background-color":            constant(".k-alt", BGCOLOR),
            "@input-background-color":          constant(".k-input", BGCOLOR),
            "@input-text-color":                constant(".k-input", COLOR),
            "@shadow-color":                    constant(".k-popup", "box-shadow"),
            "@shadow-inset-color":              constant(".k-autocomplete .k-input", "box-shadow"),
            "@link-text-color":                 constant(".k-link", COLOR),
            "@border-radius":                   constant(".k-link", "border-radius"),
            "@loading-panel-color":             constant(".k-loading-color", BGCOLOR),
            "@splitbar-background-color":       constant(".k-splitbar", BGCOLOR)
        },
        constantsHierarchy = {
            "Widgets": {
                "@widget-background-color":  "Background",
                "@widget-border-color":      "Border color",
                "@widget-text-color":        "Text color"
            },
            "Headers and links": {
                "@header-background-color":  "Header background",
                "@header-text-color":        "Header text color",

                "@link-text-color":          "Link text color"
            },
            "Buttons": {
                "@button-background-color": "Background",
                "@button-text-color":       "Text color"
            },
            "Groups and content areas": {
                "@group-background-color":   "Group background",
                "@group-border-color":       "Group border color",
                "@content-background-color": "Content area color"
            },
            "Inputs, pickers, and select boxes": {
                "@select-background-color":       "Background",
                "@select-border-color":           "Border color",
                "@select-group-background-color": "Popup background",
                "@select-hover-background-color": "Item hover state",

                "@input-background-color":        "Input background",
                "@input-text-color":              "Input text color"
            },
            "Widget states": {
                "@hover-background-color":        "Hover background",
                "@hover-border-color":            "Hover border color",
                "@hover-text-color":              "Hover text color",

                "@selected-background-color":     "Selection background",
                "@selected-border-color":         "Selection border color",
                "@selected-text-color":           "Selection text color",

                "@active-background-color":       "Active background",
                "@active-border-color":           "Active border color",
                "@active-text-color":             "Active text color",

                "@error-background-color":        "Error background",
                "@error-border-color":            "Error border color",
                "@error-text-color":              "Error text color",

                "@disabled-text-color":           "Disabled text color"
            },
            "Tooltips": {
                "@tooltip-background-color":  "Background",
                "@tooltip-border-color":      "Border color",
                "@tooltip-text-color":        "Text color",
            },
            "Misc": {
                "@border-radius":             "Border radius",
                "@alt-background-color":      "Alternating color",
                "@shadow-color":              "Shadow color",
                "@shadow-inset-color":        "Inset shadow",
                "@loading-panel-color":       "Loading panel background",
                "@splitbar-background-color": "Splitbar background"
            },
        };

    function createWindow() {
        return $("<div id='ktb-wrap' />").appendTo(document.body);
    }

    function createInterfaceFrame(container) {
            var iframe = $('<iframe />', {
                    id: "ktb-interface",
                    src: 'javascript:"<html></html>"',
                    frameBorder: '0'
                }).appendTo(container || document.body)[0],

            wnd = iframe.contentWindow || iframe,
            doc = wnd.document || iframe.contentDocument;

        function stylesheet(url) {
            return "<link rel='stylesheet' href='" + url + "' />";
        }

        function script(url) {
             return "<script src='" + url + "'></script>";
        }

        doc.open();
        doc.write([
            "<!DOCTYPE html><html><head>",
             "<meta charset='utf-8' />",
             stylesheet(kendoCommonCssLocation),
             $.map(requiredCss, function(styleSheetName) {
                 return stylesheet(applicationRoot + styleSheetName);
             }).join(""),
             "</head><body>",
             script("http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"),
             script(kendoAllLocation),
             $.map(requiredJs, function(scriptName) {
                 return script(applicationRoot + scriptName);
             }).join(""),
             "</body></html>"
        ].join(""));

        doc.close();

        return wnd;
    }

    var iframe = createInterfaceFrame(createWindow());

    iframe.lessLoaded = function(lessTemplate) {
        var kendo = iframe.kendo,
            themeBuilder = new kendo.ThemeBuilder(
                lessTemplate,
                new kendo.LessConstants(constants),
                constantsHierarchy
            );

        $("#ktb-wrap").data("kendoThemeBuilder", themeBuilder);
    };
})();

