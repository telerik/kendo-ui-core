(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        ACTIVE = "km-state-active",
        CHANGE = "change",
        SELECTOR = "li:not(." + ACTIVE +")",
        MOUSEDOWN = touch ? "touchstart" : "mousedown";

    var SegmentedControl = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-radiogroup")
                .delegate(SELECTOR, MOUSEDOWN, $.proxy(that._mousedown, that))
                .find("li").each(that._button);

            that.bind([
                /**
                * Fires when different button is selected
                * @name kendo.mobile.ui.SegmentedControl#change
                * @event
                * @param {Event} e
                *
                * @exampleTitle Handle change event
                * @example
                * <ul id="segmented-control" data-role="segmentedcontrol" />
                *   <li>Option1</li>
                *   <li>Option2</li>
                * </ul>
                *
                * <script>
                *  $("#segmented-control").data("kendoMobileSegmentedControl").bind("change", function(e) {
                *      //handle change event
                *  }
                * </script>
                */
                CHANGE
            ], that.options);

            that.select(that.options.index);
        },

        options: {
            name: "SegmentedControl",
            selector: kendo.roleSelector("segmentedcontrol")
        },

        current: function() {
            return this._current;
        },

        select: function (li) {
            var that = this,
                current = that._current;

            if (li === undefined) {
                return;
            }

            if (typeof li === "number") {
                li = that.element.children().eq(li);
            } else if (li && li.nodeType) {
                li = $(li);
            }

            if (current) {
                current.removeClass(ACTIVE);
            }

            that._current = li.addClass(ACTIVE);
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
            that.trigger(CHANGE);
        }
    });

    ui.plugin(SegmentedControl);
})(jQuery);
