(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
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
            var that = this,
                li = $(e.currentTarget),
                current = that._value,
                value;

            that.current(li);

            value = kendo.parseDate(li.text(), that.options.format);

            if (value) {
                value = new Date(current.getFullYear(),
                                 current.getMonth(),
                                 current.getDate(),
                                 value.getHours(),
                                 value.getMinutes(),
                                 value.getSeconds(),
                                 value.getMilliseconds());
            } else {
                value = new Date(current);
            }

            that.value(value);
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
            } else {
                return that._current;
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            this.popup.open();
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

        scroll: function(li) {

        },

        value: function(value) {
            var that = this,
                text = kendo.toString(value, that.options.format),
                li;

            that._value = value;

            li = $.grep(that.ul[0].childNodes, function(node) {
                return (node.textContent || node.innerText) == text;
            })[0];

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

    //timepicker options
    //min, max, value, interval, autoBind???,

    kendo.TimeView = TimeView;

})(jQuery);
