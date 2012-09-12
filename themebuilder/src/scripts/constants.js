(function(){
    var context = window.parent,
        kendo = window.kendo,
        constant = function(target, property, values){
            return {
                target: target,
                property: property,
                values: values
            };
        },
        toProtocolRelative = function(url) {
            return url.replace(/^http(s?):\/\//i, "//");
        },
        cdnRoot = (function() {
            var scripts = document.getElementsByTagName("script"),
                script, path, i;

            for (i = 0; i < scripts.length; i++) {
                script = scripts[i];

                if (script.src.indexOf("kendo.all.min") > 0) {
                    break;
                }
            }

            path = script.src.split('?')[0];

            return toProtocolRelative(path.split("/").slice(0,-2).join("/") + "/");
        })(),
        lessTemplate = "",
        BGCOLOR = "background-color",
        BORDERCOLOR = "border-color",
        COLOR = "color",
        constants = {
            "@image-folder": {
                readonly: true,
                infer: function() {
                    var icon = $("<div class='k-icon' />")
                            .css("display", "none")
                            .appendTo(context.document.body),
                        result = icon.css("background-image")
                            .replace(/url\(["']?(.*?)\/sprite\.png["']?\)$/i, "\"$1\""),
                        cdnRootRe = /cdn\.kendostatic\.com/i;

                    icon.remove();

                    result = result.replace(cdnRootRe, "da7xgjtj801h2.cloudfront.net");

                    return toProtocolRelative(result);
                }
            },

            "@texture-url": constant(".k-header", "background-image",
                [ { text: "flat", value: "none" } ].concat(
                    [
                        "highlight", "glass", "brushed-metal", "noise",
                        "dots1", "dots2", "dots3", "dots4", "dots5",
                        "dots6", "dots7", "dots8", "dots9", "dots10",
                        "dots11", "dots12", "dots13", "leather1", "leather2",
                        "stripe1", "stripe2", "stripe3", "stripe4", "stripe5", "stripe6"
                    ].map(function(x) {
                        return { text: x, value: "url('" + cdnRoot + "styles/textures/" + x + ".png')" };
                    }
                )
            )),

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

            "@select-background-color":         constant(".k-widget .k-picker-wrap", BGCOLOR),
            "@select-border-color":             constant(".k-picker-wrap.k-state-hover", BORDERCOLOR),
            "@select-hover-background-color":   constant(".k-picker-wrap.k-state-hover", BGCOLOR),
            "@select-group-background-color":   constant(".k-list-container", BGCOLOR),

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
                value: "@main-border-radius - 1"
            },
            "@inner-border-radius": {
                readonly: true,
                value: "@main-border-radius - 2"
            },
            "@slider-border-radius":            { readonly: true, value: "13px" },
            "@draghandle-border-radius":        { readonly: true, value: "7px" },

            "@alt-background-color":            constant(".k-alt", BGCOLOR),
            "@input-background-color":          constant(".k-input", BGCOLOR),
            "@input-text-color":                constant(".k-autocomplete .k-input", COLOR),
            "@shadow-color":                    constant(".k-popup", "box-shadow"),
            "@shadow-inset-color":              constant(".k-autocomplete .k-input", "box-shadow"),
            "@link-text-color":                 constant("a.k-link", COLOR),
            "@loading-panel-color":             constant(".k-loading-color", BGCOLOR),
            "@splitbar-background-color":       constant(".k-splitbar", BGCOLOR)
        },
        webConstantsHierarchy = {
            "Widgets": {
                "@widget-background-color":       "Background",
                "@widget-border-color":           "Border color",
                "@widget-text-color":             "Text color"
            },
            "Headers and links": {
                "@header-background-color":       "Header background",
                "@header-text-color":             "Header text color",

                "@link-text-color":               "Link text color",

                "@texture-url":                   "Texture"
            },
            "Buttons": {
                "@button-background-color":       "Background",
                "@button-text-color":             "Text color"
            },
            "Groups and content areas": {
                "@group-background-color":        "Group background",
                "@group-border-color":            "Group border color",
                "@content-background-color":      "Content area color"
            },
            "Inputs, pickers, and select boxes": {
                "@input-background-color":        "Input background",

                "@select-background-color":       "Picker background",
                "@select-border-color":           "Border color",
                "@select-group-background-color": "Popup background",
                "@select-hover-background-color": "Popup item hover state",

                "@input-text-color":              "Text color"
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
                "@tooltip-text-color":            "Text color"
            },
            "Validation": {
                "@validation-background-color":   "Background",
                "@validation-border-color":       "Border color",
                "@validation-text-color":         "Text color"
            },
            "Misc": {
                "@main-border-radius":            "Border radius",
                "@alt-background-color":          "Alternating color",
                "@shadow-color":                  "Shadow color",
                "@shadow-inset-color":            "Inset shadow",
                "@loading-panel-color":           "Loading panel background",
                "@splitbar-background-color":     "Splitbar background"
            }
        },
        datavizConstantsHierarchy = {
            "Title": {
                "title.color":                    "Color"
            }
        };

    window.themeBuilder = new kendo.ThemeBuilder({
        template: lessTemplate,
        constants: new kendo.LessConstants(constants),
        webConstantsHierarchy: webConstantsHierarchy,
        datavizConstantsHierarchy: datavizConstantsHierarchy
    });

    if (typeof context.kendoThemeBuilder != "undefined") {
        context.kendoThemeBuilder.open();
    }
})();
