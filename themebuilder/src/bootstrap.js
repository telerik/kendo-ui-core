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

         // TODO: change these to their respective CDN versions during build
        KENDO_ALL_LOCATION = applicationRoot + "../../deploy/kendoui.web-dataviz.commercial/js/kendo.all.min.js",
        KENDO_COMMON_CSS_LOCATION = applicationRoot + "../../deploy/kendoui.web-dataviz.commercial/styles/kendo.common.min.css",
        JQUERY_LOCATION = applicationRoot + "../../deploy/kendoui.web-dataviz.commercial/js/jquery.min.js",

        // caution: the variables below is changed during builds. update build/themebuilder.js if you change them!
        requiredJs = ["scripts/less.js", "scripts/themebuilder.js", "scripts/colorengine.js", "scripts/template.js"],
        requiredCss = ["styles/kendo.black.css", "styles/styles.css"];

    // TODO: move theme definitions to different files
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
                { text: "flat", value: "none" },
                { text: "highlight", value: "url('" + applicationRoot + "styles/textures/highlight.png')" },
                { text: "glass", value: "url('" + applicationRoot + "styles/textures/glass.png')" },
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

            "@validation-background-color":     constant(".k-tooltip-validation", BGCOLOR),
            "@validation-border-color":         constant(".k-tooltip-validation", BORDERCOLOR),
            "@validation-text-color":           constant(".k-tooltip-validation", COLOR),

            "@tooltip-background-color":        constant(".k-tooltip", BGCOLOR),
            "@tooltip-border-color":            constant(".k-tooltip", BORDERCOLOR),
            "@tooltip-text-color":              constant(".k-tooltip", COLOR),

            "@main-border-radius":              constant(".k-button", "border-radius"),
            "@list-border-radius": {
                readonly: true,
                value: "~`Math.max(parseInt('@{main-border-radius}', 10) - 1, 0) + 'px'`"
            },
            "@inner-border-radius": {
                readonly: true,
                value: "~`Math.max(parseInt('@{main-border-radius}', 10) - 2, 0) + 'px'`"
            },
            "@slider-border-radius":            { readonly: true, value: "13px" },
            "@draghandle-border-radius":        { readonly: true, value: "7px" },

            "@alt-background-color":            constant(".k-alt", BGCOLOR),
            "@input-background-color":          constant(".k-input", BGCOLOR),
            "@input-text-color":                constant(".k-input", COLOR),
            "@shadow-color":                    constant(".k-popup", "box-shadow"),
            "@shadow-inset-color":              constant(".k-autocomplete .k-input", "box-shadow"),
            "@link-text-color":                 constant("a.k-link", COLOR),
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

                "@link-text-color":          "Link text color",

                "@texture-url":              "Texture"
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
                "@tooltip-background-color":      "Background",
                "@tooltip-border-color":          "Border color",
                "@tooltip-text-color":            "Text color",
            },
            "Validation": {
                "@validation-background-color":   "Background",
                "@validation-border-color":       "Border color",
                "@validation-text-color":         "Text color",
            },
            "Misc": {
                "@main-border-radius":            "Border radius",
                "@alt-background-color":          "Alternating color",
                "@shadow-color":                  "Shadow color",
                "@shadow-inset-color":            "Inset shadow",
                "@loading-panel-color":           "Loading panel background",
                "@splitbar-background-color":     "Splitbar background"
            }
        };

    var ThemeBuilderInterface = function() {
            var that = this,
                bootStyles = that.bootStyles;

            bootStyles = doc.createElement("link");
            bootStyles.setAttribute("rel", "stylesheet");
            bootStyles.setAttribute("href", applicationRoot + "styles/bootstrap.css");

            doc.getElementsByTagName("head")[0].appendChild(bootStyles);

            if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
                that._initError();
                return;
            }

            that.container = that._createWindow();

            that.container.fadeIn("fast");

            that._createInterfaceFrame();

            that.iframe.lessLoaded = function(lessTemplate) {
                var kendo = that.iframe.kendo,
                    themeBuilder = new kendo.ThemeBuilder(
                        lessTemplate,
                        new kendo.LessConstants(constants),
                        constantsHierarchy
                    );

                that.iframe.onload = that.open();
            };
        };

    ThemeBuilderInterface.prototype = {
        open: function() {
            if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
                this._initError();
                return;
            }

            jQuery(this.container).fadeIn("fast").animate({ height: 480 }, "fast");
        },

        close: function() {
            jQuery(this.container).animate({ height: 0 }, "fast").fadeOut("fast");
        },

        _createWindow: function () {
            var dialog = jQuery("<div id='ktb-wrap'><div id='ktb-close' /></div>")
                        .css({
                            display: "none",
                            height: 0
                        })
                        .find("#ktb-close").click(jQuery.proxy(this.close, this)).end()
                    .appendTo(doc.body),
                start;

            if (kendo.ui && kendo.ui.Draggable) {
                this.draggable = dialog.kendoDraggable({
                    dragstart: function(e) {
                        var initialPosition = dialog.position();

                        start = {
                            left: e.pageX - initialPosition.left,
                            top: e.pageY - initialPosition.top
                        };

                        dialog.append("<div id='ktb-overlay'></div>");
                    },
                    drag: function(e) {
                        dialog.css({
                            left: e.pageX - start.left,
                            top: e.pageY - start.top
                        });
                    },
                    dragend: function(e) {
                        dialog.find("#ktb-overlay").remove();

                        return false;
                    }
                });
            }

            return dialog;
        },

        _createInterfaceFrame: function () {
            var iframe = jQuery('<iframe />', {
                    id: "ktb-interface",
                    src: 'javascript:"<html></html>"',
                    frameBorder: '0'
                }).appendTo(this.container || document.body)[0],
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
                 stylesheet(KENDO_COMMON_CSS_LOCATION),
                 jQuery.map(requiredCss, function(styleSheetName) {
                     return stylesheet(applicationRoot + styleSheetName);
                 }).join(""),
                 "</head><body>",
                 script(JQUERY_LOCATION),
                 script(KENDO_ALL_LOCATION),
                 jQuery.map(requiredJs, function(scriptName) {
                     return script(applicationRoot + scriptName);
                 }).join(""),
                 "</body></html>"
            ].join(""));

            doc.close();

            this.iframe = wnd;
        },

        // Shows error message on pages that we can not work with
        _initError: function() {
            var messageId = "ktb-message",
                messageWrap;

            if (!doc.getElementById(messageId)) {
                messageWrap = doc.createElement("div");
                messageWrap.id = messageId;
                messageWrap.innerHTML =
                    "<p>It seems there are no Kendo widgets on this page, so the Kendo themebuilder will be of no use. Please try running it elsewhere.</p>" +
                    "<p><button type='button' onclick='" +
                        "var msg = document.getElementById(\"" + messageId + "\");" +
                        "msg.parentNode.removeChild(msg);" +
                        "return false;'>Close</button>" +
                    "</p>";

                doc.body.appendChild(messageWrap);
            }
        }
    };

    window.kendoThemeBuilder = new ThemeBuilderInterface();
})();

