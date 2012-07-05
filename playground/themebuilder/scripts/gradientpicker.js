(function($, undefined) {

    var ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy,
        extend = $.extend,

        GradientPicker = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;

                that.popup = new ui.Popup("<div class='k-colorpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center"
                });

                element
                    .bind({
                        click: function(e) {
                            e.preventDefault();
                            that._toggle();
                        }
                    });

                that.gradient = new Gradient(element.css("background"));


            },
            options: {
                name: "GradientPicker"
            },

            _toggle: function(open) {
                var that = this, color;
                open = open !== undefined? open : !that.popup.visible();

                that.popup[open ? "open" : "close"]();
            }
        });

    kendo.ui.plugin(GradientPicker);

})(jQuery);
