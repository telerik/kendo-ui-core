(function($, kendo) {

    var proxy = $.proxy,
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
        LessConstants = kendo.Observable.extend({
            init: function(constants) {
                this.constants = constants;
            },
            serialize: function() {
                var result = [],
                    constants = this.constants,
                    constant, props, i, j, len;

                for (j = 0; j < constants.length; j++) {
                    constant = constants[j];

                    for (i = 0, props = constant.properties, len = props.length; i < len; i++) {
                        result.push(constant.prefix + "-" + props[i].property + ": " + props[i].value + ";");
                    }
                }

                return result.join("\n");
            },
            infer: function() {
            }
        }),
        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo, constants) {
                var that = this;

                that.templateInfo = templateInfo;

                that.constants = constants;

                that.render();

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
            _propertyChange: function(e) {
                var that = this,
                    parser = new less.Parser();

                parser.parse(that.constants.serialize() + that.templateInfo.template, function (err, tree) {
                    if (err) {
                        return console.error(err);
                    }

                    that.updateStyleSheet(tree.toCSS());
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
            },
            render: function() {
                var constants = this.constants,
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
                    );

                $(kendo.template(
                    "<div id='kendo-themebuilder'>" +
                        "<ul id='stylable-elements'>" +
                            $.map(constants || [], function(x) {
                                return propertyGroupTemplate($.extend(x, {
                                    propertyTemplate: colorPickerTemplate
                                }));
                            }).join("") +
                        "</ul>" +
                        "<button type='button' class='k-style-apply k-button'>Download</button>" +
                    "</div>"
                )({}))
                    .appendTo(document.body);
            }
        });

    kendo.ui.plugin("ColorPicker", ColorPicker, Component);

    $.extend(kendo, {
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
