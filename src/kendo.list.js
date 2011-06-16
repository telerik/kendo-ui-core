(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        CHANGE = "change",
        FOCUSED = "t-state-focused";

    var List = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._template();

            that.ul = $("<ul/>")
                        .css("overflow", "auto")
                        .mousedown(function() {
                            setTimeout(function() {
                                clearTimeout(that._bluring);
                            }, 0);
                        })
                        .delegate("li", "click", $.proxy(that._click, that));
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current.removeClass(FOCUSED).removeClass("t-state-selected");
                }

                if (candidate) {
                    candidate.addClass(FOCUSED);
                    that._scroll(candidate[0]);
                } else {
                    that._selected = candidate;
                }

                that._current = candidate;
            } else {
                return that._current;
            }
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
        },

        _click: function(e) {
            this._accept($(e.currentTarget));
        },

        _change: function() {
            var that = this,
                value = that.value();

            if (value !== that.previous) {
                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);

                that.previous = value;
            }
        },

        _scroll: function (item) {

            if (!item) return;

            var ul = this.ul[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight;

            ul.scrollTop = ulScrollTop > itemOffsetTop
                        ? itemOffsetTop
                        : bottomDistance > (ulScrollTop + ulOffsetHeight)
                        ? bottomDistance - ulOffsetHeight
                        : ulScrollTop;
        },

        _template: function() {
            var that = this,
                options = that.options;

            options.template = options.template || "${" + (options.dataTextField || "data") + "}";

            //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
            that.template = kendo.template("<li class='t-item' unselectable='on'>" + options.template + "</li>");
        }
    });

    kendo.ui.List = List;
})(jQuery);
