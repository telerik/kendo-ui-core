(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        ID = "id",
        LI = "li",
        CHANGE = "change",
        CHARACTER = "character",
        FOCUSED = "t-state-focused",
        HOVER = "t-state-hover",
        LOADING = "t-loading",
        SELECT = "select",
        proxy = $.proxy;

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var List = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._template();

            that.ul = $('<ul class="t-list"/>')
                        .attr(ID, that.element.attr(ID) + "-list")
                        .css("overflow", "auto")
                        .mousedown(function() {
                            setTimeout(function() {
                                clearTimeout(that._bluring);
                            }, 0);
                        })
                        .delegate(LI, "click", proxy(that._click, that))
                        .delegate(LI, "mouseenter", function() { $(this).addClass(HOVER); })
                        .delegate(LI, "mouseleave", function() { $(this).removeClass(HOVER); });

            $(document.documentElement).bind("mousedown", proxy(that._mousedown, that));
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current.removeClass(FOCUSED);
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

        _click: function(e) {
            this._accept($(e.currentTarget));
        },

        _focus: function(li) {
            var that = this;

            that.select(li);
            that._blur();

            if (that._focused[0] !== document.activeElement) {
                that._focused.focus();
            }
        },

        _height: function(length) {
            if (length) {
                var that = this,
                    ul = that.ul,
                    height = that.options.height;

                ul.show()
                  .parent(".t-animation-container").show()
                  .end()
                  .height(ul[0].scrollHeight > height ? height : "auto")
                  .hide()
                  .parent(".t-animation-container")
                  .height(height)
                  .hide();
            }
        },

        _popup: function() {
            var that = this,
                ul = that.ul,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(ul, {
                anchor: wrapper,
                open: options.open,
                close: options.close
            });

            var spacing = (parseInt(ul.css('border-left-width'), 10) || 0) +
                          (parseInt(ul.css('border-right-width'), 10) || 0);

            ul.width(wrapper.innerWidth() - spacing);
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

    $.extend(List, {
        caret: function(element) {
            var caret,
                selection = element.ownerDocument.selection;

            if (selection) {
                caret = Math.abs(selection.createRange().moveStart(CHARACTER, -element.value.length));
            } else {
                caret = element.selectionStart;
            }

            return caret;
        },

        selectText: function (element, selectionStart, selectionEnd) {
            if (element.createTextRange) {
                textRange = element.createTextRange();
                textRange.collapse(true);
                textRange.moveStart(CHARACTER, selectionStart);
                textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
                textRange.select();
            } else {
                element.selectionStart = selectionStart;
                element.selectionEnd = selectionEnd;
            }
        }
    });

    kendo.ui.List = List;

    ui.Select = List.extend({
        init: function(element, options) {
            List.fn.init.call(this, element, options);
        },

        close: function() {
            this.popup.close();
        },

        hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that.arrow.removeClass(LOADING);
        },

        showBusy: function () {
            var that = this;
            that._busy = setTimeout(proxy(function () {
                that.arrow.addClass(LOADING);
            }, this), 100);
        },

        _accessors: function() {
            var that = this,
                element = that.element,
                options = that.options,
                getter = kendo.getter,
                textField = element.attr("data-text-field"),
                valueField = element.attr("data-value-field");

            if (textField) {
                options.dataTextField = textField;
            }

            if (valueField) {
                options.dataValueField = valueField;
            }

            that._text = getter(options.dataTextField);
            that._value = getter(options.dataValueField);
        },

        _dataSource: function() {
            var that = this,
                selected,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if(that.element.is(SELECT)) {
                selected = element.children(":selected");
                if (selected[0]) {
                    options.index = selected.index();
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                        .bind(CHANGE, proxy(that.refresh, that));
        },

        _move: function(li) {
            if (li[0]) {
                this.select(li);
            }
        },

        _options: function(data) {
            var that = this,
                element = that.element,
                value = that.value(),
                length = data.length,
                options = [],
                option,
                dataItem,
                dataText,
                dataValue,
                idx = 0;

            for (; idx < length; idx++) {
                option = "<option";
                dataItem = data[idx];
                dataText = that._text(dataItem);
                dataValue = that._value(dataItem);

                if (dataValue !== undefined) {
                    option += " value=" + dataValue;
                }

                option += ">";

                if (dataText !== undefined) {
                    option += dataText;
                }

                option += "</option>";
                options.push(option);
            }

            element.html(options.join(""));
            element.val(value);
        }
    });

})(jQuery);
