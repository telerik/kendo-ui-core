(function($, kendo) {

    // TODO: split into multiple templates (color picker w/ label, etc.)
    var template = kendo.template(
            "<div id='kendo-themebuilder'>" +
                "<ul id='stylable-elements'>" +
                    "<li>Widget" +
                        "<div><div class='styling-options'>" +
                            "<label for='widget-bc'>Border color</label> <input id='widget-bc' />" +
                            "<label for='widget-bgc'>Background color</label> <input id='widget-bgc' />" +
                            "<label for='widget-c'>Text color</label> <input id='widget-c' />" +
                        "</div></div></li>" +
                    "<li>Headers" +
                        "<div><div class='styling-options'>" +
                            "<label for='header-bgc'>Background color</label> <input id='header-bgc' />" +
                            "<label for='header-c'>Text color</label> <input id='header-c' />" +
                        "</div></div></li>" +
                    "<li>Links" +
                        "<div><div class='styling-options'>" +
                        "<label for='link-c'>Text color</label> <input id='link-c' />" +
                        "</div></div></li>" +
                    "<li>Content &amp; Template Holders" +
                        "<div><div class='styling-options'>" +
                        "<label for='content-bgc'>Background color</label> <input id='content-bgc' />" +
                        "</div></div></li>" +
                    "<li>Item Group Holders" +
                        "<div><div class='styling-options'>" +
                        "<label for='group-bgc'>Background color</label> <input id='group-bgc' />" +
                        "</div></div></li>" +
                "</ul>" +
                "<button type='button' class='t-style-apply t-button'>Apply</button>" +
            "</div>"
        ),
        ThemeBuilder = kendo.Observable.extend({
            init: function() {
                var that = this;

                $(template({})).appendTo(document.body);

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
