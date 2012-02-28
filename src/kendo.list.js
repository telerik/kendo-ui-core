(function($, undefined) {
    /**
    * @name kendo.ui.List.Description
    *
    * @section Common class for ComboBox, DropDownList and AutoComplete widgets.
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        touch = kendo.support.touch,
        ID = "id",
        LI = "li",
        CLICK = touch ? "touchend" : "click",
        CHANGE = "change",
        CHARACTER = "character",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        LOADING = "k-loading",
        OPEN = "open",
        CLOSE = "close",
        SELECT = "select",
        proxy = $.proxy;

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var List = Widget.extend(/** @lends kendo.ui.List */{
        /**
         * Creates a List instance.
         * @constructs
         * @extends kendo.ui.Widget
         */
        init: function(element, options) {
            var that = this, id, list;

            Widget.fn.init.call(that, element, options);

            that._template();

            that.ul = $('<ul class="k-list k-reset"/>')
                        .css({ overflow: "auto" })
                        .delegate(LI, "mouseenter", function() { $(this).addClass(HOVER); })
                        .delegate(LI, "mouseleave", function() { $(this).removeClass(HOVER); })
                        .delegate(LI, CLICK, proxy(that._click, that));

            that.list = list = $("<div class='k-list-container'/>")
                        .append(that.ul)
                        .mousedown(function(e) {
                            e.preventDefault();
                        });

            id = that.element.attr(ID);
            if (id) {
                list.attr(ID, id + "-list")
            }

            $(document.documentElement).bind("mousedown", proxy(that._mousedown, that));
        },

        items: function() {
            return this.ul[0].children;
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
                textField = element.attr(kendo.attr("text-field")),
                valueField = element.attr(kendo.attr("value-field"));

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

            if (value !== that._old) {
                that._old = value;

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _click: function(e) {
            this._accept($(e.currentTarget));
        },

        _enable: function() {
            var that = this,
                options = that.options;

            if (that.element.prop("disabled")) {
                options.enable = false;
            }

            that.enable(options.enable);
        },

        _focus: function(li) {
            var that = this;

            that._select(li);
            that._blur();
        },

        _height: function(length) {
            if (length) {
                var that = this,
                    list = that.list,
                    visible = that.popup.visible(),
                    height = that.options.height;

                list = list.add(list.parent(".k-animation-container")).show()
                           .height(that.ul[0].scrollHeight > height ? height : "auto");

                if (!visible) {
                    list.hide();
                }
            }
        },

        _popup: function() {
            var that = this,
                list = that.list,
                options = that.options,
                wrapper = that.wrapper,
                computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0,
                computedWidth = computedStyle ? parseFloat(computedStyle.width) : wrapper.outerWidth(),
                width;

            if (computedStyle && ($.browser.mozilla || $.browser.msie)) // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);

            that.popup = new ui.Popup(list, {
                anchor: wrapper,
                open: function(e) {
                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    }
                },
                animation: options.animation
            });

            width = computedWidth - (list.outerWidth() - list.width());

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            });
        },

        _toggleHover: function(e) {
            if (!touch)
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggle: function(open) {
            var that = this;
            open = open !== undefined? open : !that.popup.visible();

            if (!touch && that._focused[0] !== document.activeElement) {
                that._focused.focus();
            }

            that[open ? OPEN : CLOSE]();
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
                hasDataSource = options.dataSource;

            if (that.element.is("select") && that.element[0].length) {
                if (!hasDataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            if (!template) {
                //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
                that.template = kendo.template("<li class='k-item' unselectable='on'>${data" + (options.dataTextField ? "." : "") + options.dataTextField + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
                that.template = function(data) {
                    return "<li class='k-item' unselectable='on'>" + template(data) + "</li>";
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
                var textRange = element.createTextRange();
                textRange.collapse(true);
                textRange.moveStart(CHARACTER, selectionStart);
                textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
                textRange.select();
            } else {
                element.setSelectionRange(selectionStart, selectionEnd);
            }
        },
        inArray: function(node, parentNode) {
            var idx, length, siblings = parentNode.children;

            if (!node || node.parentNode !== parentNode) {
                return -1;
            }

            for (idx = 0, length = siblings.length; idx < length; idx++) {
                if (node === siblings[idx]) {
                    return idx;
                }
            }

            return -1;
        }
    });

    kendo.ui.List = List;

    /**
    * @name kendo.ui.Select.Description
    *
    * @section Common class for ComboBox and DropDownList widgets.
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

        _accessor: function(value, idx) {
            var element = this.element,
                isSelect = element.is(SELECT),
                option, selectedIndex;

            element = element[0];

            if (value === undefined) {
                if (isSelect) {
                    selectedIndex = element.selectedIndex;

                    if (selectedIndex > -1) {
                        option = element.options[selectedIndex];

                        if (option) {
                            value = option.value;
                        }
                    }
                } else {
                    value = element.value;
                }
                return value;
            } else {
                if (isSelect) {
                    element.selectedIndex = idx;
                } else {
                    element.value = value;
                }
            }
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that._arrow.removeClass(LOADING);
        },

        _showBusy: function () {
            var that = this;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function () {
                that._arrow.addClass(LOADING);
            }, 100);
        },

        _data: function() {
            return this.dataSource.view();
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {},
                idx;

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if (element.is(SELECT)) {
                idx = element[0].selectedIndex;
                if (idx > -1) {
                    options.index = idx;
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, proxy(that.refresh, that))
                                   .bind("requestStart", proxy(that._showBusy, that));
        },

        _index: function(value) {
            var that = this,
                idx,
                length,
                data = that._data(),
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
                data = that._data(),
                idx, length;

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                if (li < 0) {
                    return $();
                }

                li = $(that.ul[0].children[li]);
            }

            if (li && li.nodeType) {
                li = $(li);
            }

            return li;
        },

        _move: function(e) {
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
                    that._select(current ? current[0].nextSibling : ul.firstChild);
                    e.preventDefault();
                } else {
                    that._select(current ? current[0].previousSibling : ul.lastChild);
                    e.preventDefault();
                }
                pressed = true;
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (that.popup.visible()) {
                    e.preventDefault();
                }

                that._accept(current);
                pressed = true;
            } else if (key === keys.ESC) {
                that.close();
                pressed = true;
            }

            return pressed;
        },

        _valueOnFetch: function(value) {
            var that = this;

            if (!that.ul[0].firstChild && !that._fetch) {
                that.dataSource.one(CHANGE, function() {
                    that._fetch = true;
                    that.value(value);
                }).fetch();

                return true;
            }

            that._fetch = false;
        },

        _options: function(data) {
            var that = this,
                element = that.element,
                selectedIndex = element[0].selectedIndex,
                value = that.value(),
                length = data.length,
                options = "",
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
                options += option;
            }

            element.html(options);
            element[0].selectedIndex = selectedIndex;
        },

        _reset: function() {
            var that = this,
                element = that.element;

            element.closest("form")
                   .bind("reset", function() {
                       setTimeout(function() {
                            that.value(element[0].value);
                       });
                   });
        }
    });

})(jQuery);
