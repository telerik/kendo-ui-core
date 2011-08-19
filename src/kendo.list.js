(function($, undefined) {
    /**
    * @name kendo.ui.List.Description
    *
    * @section Common class for ComboBox, DropDownList and AutoComplete components.
    */
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

    var List = Component.extend(/** @lends kendo.ui.List */{
        /**
         * Creates a List instance.
         * @constructs
         * @extends kendo.ui.Component
         */
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
                    parent = ul.parent(".t-animation-container"),
                    height = that.options.height;

                if (that.popup.visible()) {
                    ul.height(ul[0].scrollHeight > height ? height : "auto");
                    parent.height(height);
                } else {
                    ul.show()
                      .height(ul[0].scrollHeight > height ? height : "auto")
                      .hide();

                    parent.show().height(height).hide();
                }
            }
        },

        _popup: function() {
            var that = this,
                ul = that.ul,
                zIndex = "auto",
                borders,
                options = that.options,
                wrapper = that.wrapper;

            //calculate z-index
            wrapper.parents().andSelf().each(function () {
                zIndex = $(this).css("zIndex");
                if (!isNaN(zIndex)) {
                    zIndex = Number(zIndex) + 1;
                    return false;
                }
            });

            that.popup = new ui.Popup(ul, {
                anchor: wrapper,
                open: options.open,
                close: options.close
            });

            borders = (parseInt(ul.css('border-left-width'), 10) || 0) + (parseInt(ul.css('border-right-width'), 10) || 0);

            ul.css({
                width: wrapper.outerWidth() - borders,
                zIndex: zIndex
            });
        },

        _index: function(value) {
            var that = this,
                idx,
                length,
                data = that.dataSource.view(),
                valueFromData;

            for (idx = 0, length = data.length; idx < length; idx++) {
                valueFromData = that._value(data[idx]);

                if (valueFromData === undefined) {
                    valueFromData = that._text(data[idx]);
                }

                if (valueFromData == value) {
                    return idx;
                }
            }

            return -1;
        },

        _get: function(li) {
            var that = this,
                idx,
                data = that.dataSource.view(),
                length;

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            idx = -1;

            if (typeof li === "number") {
                if (li < 0) {
                    return $();
                }

                li = $(that.ul[0].childNodes[li]);
            }

            if (li && li.nodeType) {
                li = $(li);
            }

            return li;
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggle: function(open) {
            open = open !== undefined? open : !this.popup.visible();

            this[open ? "open" : "close"]();
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
                options = that.options,
                template = options.template,
                dataTextField = options.dataTextField || "data";

            if (!template) {
                //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
                that.template = kendo.template("<li class='t-item' unselectable='on'>${" + dataTextField + "}</li>");
            } else {
                template = kendo.template(template);
                that.template = function(data) {
                    return "<li class='t-item' unselectable='on'>" + template(data) + "</li>";
                };
            }
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
                element.setSelectionRange(selectionStart, selectionEnd);
            }
        }
    });

    kendo.ui.List = List;

    /**
    * @name kendo.ui.Select.Description
    *
    * @section Common class for ComboBox and DropDownList components.
    */
    ui.Select = List.extend(/** @lends kendo.ui.Select */{
        /**
         * @extends kendo.ui.List
         * @constructs
         */
        init: function(element, options) {
            List.fn.init.call(this, element, options);
        },

        /**
        * Closes the drop-down list.
        * @example
        * dropdownlist.close();
        *
        * @example
        * combobox.close();
        */
        close: function() {
            this.popup.close();
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that.arrow.removeClass(LOADING);
        },

        _showBusy: function () {
            var that = this;
            that._busy = setTimeout(function () {
                that.arrow.addClass(LOADING);
            }, 100);
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
                                   .bind(CHANGE, proxy(that.refresh, that))
                                   .bind("requestStart", proxy(that._showBusy, that));
        },

        _enable: function() {
            var that = this,
                options = that.options;

            if (that.element.prop("disabled")) {
                options.enable = false;
            }

            that.enable(options.enable);
        },

        _move: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys,
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
                that._accept(current);
                pressed = true;
            } else if (key === keys.ESC) {
                that.close();
                pressed = true;
            }

            return pressed;
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
                idx;

            for (idx = 0; idx < length; idx++) {
                option = "<option";
                dataItem = data[idx];
                dataText = that._text(dataItem);
                dataValue = that._value(dataItem);

                if (dataValue !== undefined) {
                    option += ' value="' + dataValue + '"';
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
