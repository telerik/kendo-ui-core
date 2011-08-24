(function($, kendo) {

    var properties = {
            bgColor: { property: "background-color", label: "Background" },
            color: { property: "color", label: "Text color" }
        },
        stylableProperties = {
            widget: {
                title: "Widget",
                primitive: "t-widget",
                properties: [ properties.bgColor, properties.color ]
            },
            header: {
                title: "Headers",
                primitive: "t-header",
                properties: [ properties.bgColor, properties.color ]
            },
            link: {
                title: "Links",
                primitive: "t-link",
                properties: [ properties.bgColor, properties.color ]
            },
            content: {
                title: "Content & Template Containers",
                primitive: "t-content",
                properties: [ properties.bgColor ]
            },
            group: {
                title: "Item groups",
                primitive: "t-group",
                properties: [ properties.bgColor ]
            },
            hover: {
                title: "Hover state",
                primitive: "t-state-hover",
                properties: [ properties.bgColor, properties.color ]
            }
        },
        colorPickerTemplate = kendo.template(
            "<# var id = primitive + \"-\" + property.property; #>" +
            "<label for='<#= id #>'><#= property.label #></label> <input id='<#= id #>' />"
        ),
        propertyGroupTemplate = kendo.template(
            "<li><#= title #>" +
                "<div class='styling-options'>" +
                    "<# for (var i = 0, len = properties.length; i < len; i++) { #>" +
                        "<#= propertyTemplate({ property: properties[i], primitive: primitive }) #>" +
                    "<# } #>" +
                "</div>" +
            "</li>"
        ),
        themeBuilderTemplate = kendo.template(
            "<div id='kendo-themebuilder'>" +
                "<ul id='stylable-elements'>" +
                    $.map(stylableProperties, function(x) {
                        return propertyGroupTemplate($.extend(x, {
                            propertyTemplate: colorPickerTemplate
                        }));
                    }).join("") +
                "</ul>" +
                "<button type='button' class='t-style-apply t-button'>Download</button>" +
            "</div>"
        ),
        ThemeBuilder = kendo.Observable.extend({
            init: function() {
                var that = this;

                $(themeBuilderTemplate({})).appendTo(document.body);

                that.content = $("#kendo-themebuilder")
                                    .kendoWindow({
                                        title: "Kendo ThemeBuilder",
                                        draggable: true,
                                        resizable: true,
                                        width: 300,
                                        minWidth: 300,
                                        maxWidth: 300
                                    });

                that.element = that.content.closest(".t-window")
                                    .attr("id", "kendo-themebuilder-wrapper")
                                    .css({
                                        top: 20,
                                        left: $(window).width() - 330
                                    })
                                    .data("kendoThemeBuilder", that);

                $("#stylable-elements").kendoPanelBar();
            },
            open: function() {
                this.content.data("kendoWindow").open();
            },
            // TODO: test this
            updateStyleSheet: function(cssText) {
                var doc = document,
                    style = doc.createElement("style");

                doc.getElementsByTagName("head")[0].appendChild(style);

                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                } else {
                    style.appendChild(doc.createTextNode(cssText));
                }
            }
        });

    $.extend(kendo, {
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
