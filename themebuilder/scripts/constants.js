(function(){
    var context = window.parent,
        kendo = window.kendo,
        constant = function(property, target, values){
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
        webConstants = {
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

            "@texture-url": constant("background-image", ".k-header",
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

            "@widget-background-color":         constant(BGCOLOR, ".k-widget"),
            "@widget-gradient":                 { readonly: true, value: "none" },
            "@widget-border-color":             constant(BORDERCOLOR, ".k-widget"),
            "@widget-text-color":               constant(COLOR, ".k-widget"),

            "@header-background-color":         constant(BGCOLOR, ".k-header"),
            "@header-text-color":               constant(COLOR, ".k-header"),

            "@button-background-color":         constant(BGCOLOR, ".k-button"),
            "@button-text-color":               constant(COLOR, ".k-button"),

            "@group-background-color":          constant(BGCOLOR, ".k-group"),
            "@group-border-color":              constant(BORDERCOLOR, ".k-group"),

            "@content-background-color":        constant(BGCOLOR, ".k-content"),

            "@select-background-color":         constant(BGCOLOR, ".k-widget .k-picker-wrap"),
            "@select-border-color":             constant(BORDERCOLOR, ".k-picker-wrap.k-state-hover"),
            "@select-hover-background-color":   constant(BGCOLOR, ".k-picker-wrap.k-state-hover"),
            "@select-group-background-color":   constant(BGCOLOR, ".k-list-container"),

            "@hover-background-color":          constant(BGCOLOR, ".k-state-hover"),
            "@hover-border-color":              constant(BORDERCOLOR, ".k-state-hover"),
            "@hover-text-color":                constant(COLOR, ".k-state-hover"),
            "@hover-gradient":                  { readonly: true, value: "none" },

            "@selected-background-color":       constant(BGCOLOR, ".k-state-selected"),
            "@selected-border-color":           constant(BORDERCOLOR, ".k-state-selected"),
            "@selected-text-color":             constant(COLOR, ".k-state-selected"),
            "@selected-gradient":               { readonly: true, value: "none" },

            "@active-background-color":         constant(BGCOLOR, ".k-state-active"),
            "@active-border-color":             constant(BORDERCOLOR, ".k-state-active"),
            "@active-text-color":               constant(COLOR, ".k-state-active"),
            "@active-gradient":                 { readonly: true, value: "none" },

            "@error-background-color":          constant(BGCOLOR, ".k-state-error"),
            "@error-border-color":              constant(BORDERCOLOR, ".k-state-error"),
            "@error-text-color":                constant(COLOR, ".k-state-error"),

            "@disabled-text-color":             constant(COLOR, ".k-state-disabled"),

            "@validation-background-color":     constant(BGCOLOR, ".k-tooltip-validation"),
            "@validation-border-color":         constant(BORDERCOLOR, ".k-tooltip-validation"),
            "@validation-text-color":           constant(COLOR, ".k-tooltip-validation"),

            "@tooltip-background-color":        constant(BGCOLOR, ".k-tooltip"),
            "@tooltip-border-color":            constant(BORDERCOLOR, ".k-tooltip"),
            "@tooltip-text-color":              constant(COLOR, ".k-tooltip"),

            "@main-border-radius":                constant("border-radius", ".k-button"),
            "@list-border-radius":                { readonly: true, value: "@main-border-radius - 1" },
            "@inner-border-radius":               { readonly: true, value: "@main-border-radius - 2" },
            "@slider-border-radius":              { readonly: true, value: "13px" },
            "@draghandle-border-radius":          { readonly: true, value: "7px" },
            "@draghandle-border-color":           { readonly: true, value: "@widget-border-color" },
            "@draghandle-background-color":       { readonly: true, value: "@widget-background-color" },
            "@draghandle-shadow":                 { readonly: true, value: "none" },
            "@draghandle-hover-border-color":     { readonly: true, value: "@hover-border-color" },
            "@draghandle-hover-background-color": { readonly: true, value: "@hover-background-color" },
            "@draghandle-hover-shadow":           { readonly: true, value: "none" },

            "@default-icon-opacity":            { readonly: true, value: "0.8" },

            "@alt-background-color":            constant(BGCOLOR, ".k-alt"),
            "@input-background-color":          constant(BGCOLOR, ".k-input"),
            "@input-text-color":                constant(COLOR, ".k-autocomplete .k-input"),
            "@shadow-color":                    constant("box-shadow", ".k-popup"),
            "@shadow-inset-color":              constant("box-shadow", ".k-autocomplete .k-input"),
            "@link-text-color":                 constant(COLOR, "a.k-link"),
            "@loading-panel-color":             constant(BGCOLOR, ".k-loading-color"),
            "@splitbar-background-color":       constant(BGCOLOR, ".k-splitbar")
        },
        datavizConstants = {
            "chart.title.color":                          constant(COLOR),
            "chart.legend.labels.color":                  constant(COLOR),
            "chart.chartArea.background":                 constant(COLOR),
            "chart.seriesDefaults.labels.color":          constant(COLOR),
            "chart.axisDefaults.line.color":              constant(COLOR),
            "chart.axisDefaults.labels.color":            constant(COLOR),
            "chart.axisDefaults.minorGridLines.color":    constant(COLOR),
            "chart.axisDefaults.majorGridLines.color":    constant(COLOR),
            "chart.axisDefaults.title.color":             constant(COLOR),
            "chart.seriesColors[0]":                      constant(COLOR),
            "chart.seriesColors[1]":                      constant(COLOR),
            "chart.seriesColors[2]":                      constant(COLOR),
            "chart.seriesColors[3]":                      constant(COLOR),
            "chart.seriesColors[4]":                      constant(COLOR),
            "chart.seriesColors[5]":                      constant(COLOR),
            "chart.tooltip.background":                   constant(COLOR),
            "chart.tooltip.color":                        constant(COLOR),
            "chart.tooltip.opacity":                      constant("opacity"),
            "gauge.pointer.color":                        constant(COLOR),
            "gauge.scale.rangePlaceholderColor":          constant(COLOR),
            "gauge.scale.labels.color":                   constant(COLOR),
            "gauge.scale.minorTicks.color":               constant(COLOR),
            "gauge.scale.majorTicks.color":               constant(COLOR),
            "gauge.scale.line.color":                     constant(COLOR)
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
            "Title, legend & charting area": {
                "chart.title.color":                       "Title color",
                "chart.legend.labels.color":               "Legend text color",
                "chart.chartArea.background":              "Charting area"
            },

            "Axes": {
                "chart.seriesDefaults.labels.color":       "Series text color",
                "chart.axisDefaults.line.color":           "Axis line color",
                "chart.axisDefaults.labels.color":         "Axis labels color",
                "chart.axisDefaults.minorGridLines.color": "Minor grid lines color",
                "chart.axisDefaults.majorGridLines.color": "Major grid lines color",
                "chart.axisDefaults.title.color":          "Axis title color"
            },

            "Tooltip": {
                "chart.tooltip.background":                "Tooltip background",
                "chart.tooltip.color":                     "Tooltip text",
                "chart.tooltip.opacity":                   "Tooltip opacity"
            },

            "Series colors": {
                "chart.seriesColors[0]":                   "Color #1",
                "chart.seriesColors[1]":                   "Color #2",
                "chart.seriesColors[2]":                   "Color #3",
                "chart.seriesColors[3]":                   "Color #4",
                "chart.seriesColors[4]":                   "Color #5",
                "chart.seriesColors[5]":                   "Color #6"
            },

            "Gauge": {
                "gauge.pointer.color":                     "Pointer color",
                "gauge.scale.rangePlaceholderColor":       "Range placeholder color",
                "gauge.scale.labels.color":                "Scale labels text color",
                "gauge.scale.minorTicks.color":            "Minor ticks color",
                "gauge.scale.majorTicks.color":            "Major ticks color",
                "gauge.scale.line.color":                  "Scale line color"
            }
        };

    window.themeBuilder = new kendo.ThemeBuilder({
        webConstants: new kendo.LessTheme({
            constants: webConstants,
            template: lessTemplate
        }),
        datavizConstants: new kendo.JsonConstants({
            constants: datavizConstants
        }),
        webConstantsHierarchy: webConstantsHierarchy,
        datavizConstantsHierarchy: datavizConstantsHierarchy
    });

    if (typeof context.kendoThemeBuilder != "undefined") {
        context.kendoThemeBuilder.open();
    }
})();
