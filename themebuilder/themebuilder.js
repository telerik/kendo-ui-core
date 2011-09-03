(function($, kendo) {

    var properties = {
            bgColor: { property: "background-color", label: "Background" },
            color: { property: "color", label: "Text color" },
            brdColor: { property: "border-color", label: "Border color" },
        },
        stylableProperties = {
            widget: {
                title: "Widget",
                primitive: "k-widget",
                properties: [ properties.bgColor, properties.brdColor, properties.color ]
            },
            header: {
                title: "Headers",
                primitive: "k-header",
                properties: [ properties.bgColor, properties.color ]
            },
            link: {
                title: "Links",
                primitive: "k-link",
                properties: [ properties.bgColor, properties.color ]
            },
            content: {
                title: "Content & Template Containers",
                primitive: "k-content",
                properties: [ properties.bgColor ]
            },
            group: {
                title: "Item groups",
                primitive: "k-group",
                properties: [ properties.bgColor, properties.brdColor, properties.brdColor ]
            },
            hover: {
                title: "Hover state",
                primitive: "k-state-hover",
                properties: [ properties.bgColor, properties.brdColor, properties.color ]
            }
        },
        colorPickerTemplate = kendo.template(
            "<# var id = primitive + \":\" + property.property; #>" +
            "<label for='<#= id #>'><#= property.label #></label> <input id='<#= id #>' class='k-input' />"
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
                "<button type='button' class='k-style-apply k-button'>Download</button>" +
            "</div>"
        ),
        proxy = $.proxy,
        CHANGE = "change",
        Component = kendo.ui.Component,
        ColorPicker = Component.extend({
            init: function(element, options) {
                element = $(element);

                var that = this;

                Component.fn.init.call(that, element, options);

                element.bind(CHANGE, proxy(that._change, that))

                that.bind([ CHANGE ], that.options);
            },
            _change: function(e) {
                this.trigger(CHANGE, {
                    color: $(e.target).val()
                });
            }
        }),
        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo) {
                var that = this;

                $(themeBuilderTemplate({})).appendTo(document.body);

                that.templateInfo = templateInfo;

                that.content = $("#kendo-themebuilder")
                    .kendoWindow({
                        title: "Kendo ThemeBuilder",
                        draggable: true,
                        resizable: true,
                        width: 300,
                        minWidth: 300,
                        maxWidth: 300
                    });

                that.element = that.content.closest(".k-window")
                    .attr("id", "kendo-themebuilder-wrapper")
                    .css({
                        top: 20,
                        left: $(window).width() - 330
                    })
                    .data("kendoThemeBuilder", that);

                $("#stylable-elements")
                    .kendoPanelBar()
                    .find("input").kendoColorPicker({
                        change: proxy(that._propertyChange, that)
                    });
            },
            open: function() {
                this.content.data("kendoWindow").open();
            },
            /// TODO: test this
            _propertyChange: function(e) {
                var parser = new less.Parser();

                parser.parse(this.templateInfo.template, function (err, tree) {
                    if (err) {
                        return console.error(err);
                    }

                    this.updateStyleSheet(tree.toCSS());
                });
            },
            updateStyleSheet: function(cssText) {
                var doc = document,
                    style = $("style[title='themebuilder']")[0];

                if (!style) {
                    style = doc.createElement("style");
                    style.setAttribute("title", "themebuilder");

                    $("head")[0].appendChild(style);
                }

                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                } else {
                    style.appendChild(doc.createTextNode(cssText));
                }
            }
        });

    kendo.ui.plugin("ColorPicker", ColorPicker, Component);

    $.extend(kendo, {
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
