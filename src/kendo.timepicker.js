(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        DIV = "<div/>",
        LI = "li",
        HOVER = "k-state-hover",
        MOUSEDOWN = "mousedown",
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        SELECTED = "k-state-selected",
        proxy = $.proxy,
        TODAY = new Date(),
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0);

    TODAY = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 0, 0, 0);

    var TimeView = function(options) {
        var that = this, list;

        that.options = options;

        options.format = options.format || kendo.culture().calendar.patterns["t"];

        that.ul = $('<ul class="k-list k-reset"/>')
                    .css({ overflow: "auto" })
                    .bind(MOUSEDOWN, options.clearBlurTimeout)
                    .delegate(LI, "click", proxy(that.click, that))
                    .delegate(LI, "mouseenter", function() { $(this).addClass(HOVER); })
                    .delegate(LI, "mouseleave", function() { $(this).removeClass(HOVER); });

        list = $("<div class='k-list-container'/>").append(that.ul);

        that.popup = new ui.Popup(list, options);

        that.template = kendo.template('<li class="k-item" unselectable="on">#=data#</li>', { useWithBlock: false });

        that._value = options.value || TODAY;
    }

    TimeView.prototype = {
        click: function(e) {
            this.select($(e.currentTarget));
        },

        _change: function (value) {
            var change = this.options.change;
            if (change) {
                change(value);
            }
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                candidate = $(candidate);

                if (that._current) {
                    that._current.removeClass(SELECTED);
                }

                if (candidate) {
                    candidate.addClass(SELECTED);
                    that.scroll(candidate[0]);
                }

                that._current = candidate;

                //call _change here
            } else {
                return that._current;
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild) {
                that.refresh();
            }

            that.popup.open();
        },

        move: function(e) {
            var that = this,
                key = e.keyCode,
                ul = that.ul[0],
                current = that._current,
                down = key === keys.DOWN,
                pressed;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                } else if (down) {
                    that.select(current ? current[0].nextSibling : ul.firstChild);
                    e.preventDefault();
                } else {
                    that.select(current ? current[0].previousSibling : ul.lastChild);
                    e.preventDefault();
                }
                pressed = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                //that._change(current ? current.text() : "");
                that._change(current.text());
                pressed = true;
            } else if (key === keys.ESC) {
                that.close();
                pressed = true;
            }

            return pressed;
        },

        refresh: function() {
            var that = this,
                options = that.options,
                format = options.format,
                min = options.min,
                max = options.max,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                msInterval = options.interval * MS_PER_MINUTE,
                toString = kendo.toString,
                template = that.template,
                start = new Date(min),
                length = MS_PER_DAY / msInterval,
                idx = 0, length,
                html = "";

            if (msMin != msMax) {
                length = Math.abs(msMin - msMax) / msInterval + 1
            }

            for (; idx < length; idx++) {
                if (idx) {
                    setTime(start, msInterval);
                }

                if (msMax && getMilliseconds(start) > msMax) {
                    start = new Date(max);
                }

                html += template(toString(start, format));
            }

            that.ul[0].innerHTML = html;
        },

        scroll: function(item) {
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

        select: function(li) {
            var that = this,
                current = that._current;

            if (typeof li === "string") {
                if (!current || current.text() !== li) {
                    li = $.grep(that.ul[0].childNodes, function(node) {
                        return (node.textContent || node.innerText) == li;
                    })[0];
                } else {
                    li = current;
                }
            }

            that.current(li);
        }
    };

    function setTime(date, time) {
        var tzOffsetBefore = date.getTimezoneOffset(),
        resultDATE = new Date(date.getTime() + time),
        tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

        date.setTime(resultDATE.getTime() + tzOffsetDiff * MS_PER_MINUTE);
    }

    function getMilliseconds(date) {
        return date.getHours() * 60 * MS_PER_MINUTE + date.getMinutes() * MS_PER_MINUTE + date.getSeconds() * 1000 + date.getMilliseconds();
    }

    kendo.TimeView = TimeView;

    var TimePicker = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._icon();

            that.element.addClass("k-input");
        },
        options: {
            name: "TimePicker",
            min: TODAY,
            max: TODAY,
            value: null,
            interval: 30
        },
        _icon: function() {
            var that = this,
                element = that.element,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select"><span class="k-icon k-icon-clock">select</span></span>').insertAfter(element);
            }

            that._icon = icon;
        },
        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-timepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(DIV).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                width: "100%",
                height: "auto"
            });

            that.wrapper = wrapper.addClass("k-widget k-timepicker k-header");
        }
    });

    ui.plugin(TimePicker);

})(jQuery);
