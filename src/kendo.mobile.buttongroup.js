(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        ACTIVE = "km-state-active",
        SELECT = "select",
        SELECTOR = "li:not(." + ACTIVE +")",
        MOUSEDOWN = kendo.support.touch ? "touchstart" : "mousedown";

    var ButtonGroup = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-radiogroup")
                .delegate(SELECTOR, MOUSEDOWN, $.proxy(that._mousedown, that))
                .find("li").each(that._button);

            that.bind([
                /**
                * Fires when different button is selected
                * @name kendo.mobile.ui.ButtonGroup#select
                * @event
                * @param {Event} e
                *
                * @exampleTitle Handle select event
                * @example
                * <ul id="buttongroup" data-role="buttongroup" />
                *   <li>Option1</li>
                *   <li>Option2</li>
                * </ul>
                *
                * <script>
                *  $("#buttongroup").data("kendoMobileButtonGroup").bind("select", function(e) {
                *      //handle select event
                *  }
                * </script>
                */
                SELECT
            ], that.options);

            that.select(that.options.index);
        },

        options: {
            name: "ButtonGroup",
            selector: kendo.roleSelector("buttongroup")
        },

        current: function() {
            return this._current;
        },

        select: function (li) {
            var that = this,
                current = that._current,
                index = -1;

            if (current) {
                current.removeClass(ACTIVE)
            }

            if (li !== undefined) {
                if (typeof li === "number") {
                    index = li;
                    li = that.element.children().eq(li);
                } else if (li && li.nodeType) {
                    li = $(li);
                    index = li.index();
                }

                li.addClass(ACTIVE);
            }

            that._current = li;
            that.selectedIndex = index;
        },

        _button: function() {
            var button = $(this).addClass("km-button"),
                icon = button.data(kendo.ns + "icon"),
                span = button.children("span"),
                image = button.find("img").addClass("km-image");

            if (!span[0]) {
                span = button.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text");

            if (!image[0] && icon) {
                button.prepend($('<span class="km-icon km-' + icon + '"/>'));
            }
        },

        _mousedown: function(e) {
            var that = this;
            that.select(e.currentTarget);
            that.trigger(SELECT);
        }
    });

    ui.plugin(ButtonGroup);
})(jQuery);
