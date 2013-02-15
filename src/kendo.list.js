kendo_module({
    id: "list",
    name: "List",
    category: "framework",
    depends: [ "data", "popup" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        htmlEncode = kendo.htmlEncode,
        ID = "id",
        LI = "li",
        CHANGE = "change",
        CHARACTER = "character",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        LOADING = "k-loading",
        OPEN = "open",
        CLOSE = "close",
        SELECT = "select",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        WIDTH = "width",
        extend = $.extend,
        proxy = $.proxy,
        browser = kendo.support.browser,
        isIE8 = browser.msie && parseInt(browser.version, 10) < 9,
        quotRegExp = /"/g,
        alternativeNames = {
            "ComboBox": "DropDownList",
            "DropDownList": "ComboBox"
        };

    var List = Widget.extend({
        init: function(element, options) {
            var that = this,
                ns = that.ns,
                id;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            that._template();

            that.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
                        .css({ overflow: kendo.support.kineticScrollNeeded ? "": "auto" })
                        .on("mouseenter" + ns, LI, function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + ns, LI, function() { $(this).removeClass(HOVER); })
                        .on("click" + ns, LI, proxy(that._click, that))
                        .attr({
                            tabIndex: -1,
                            role: "listbox",
                            "aria-hidden": true
                        });

            that.list = $("<div class='k-list-container'/>")
                        .append(that.ul)
                        .on("mousedown" + ns, function(e) {
                            e.preventDefault();
                        });

            id = element.attr(ID);

            if (id) {
                that.list.attr(ID, id + "-list");
                that.ul.attr(ID, id + "_listbox");
                that._optionID = id + "_option_selected";
            }
        },

        _ignoreCase: function() {
            var that = this,
                model = that.dataSource.reader.model,
                field;

            if (model && model.fields) {
                field = model.fields[that.options.dataTextField];

                if (field && field.type && field.type !== "string") {
                    that.options.ignoreCase = false;
                }
            }
        },

        items: function() {
            return this.ul[0].children;
        },

        current: function(candidate) {
            var that = this,
                id = that._optionID;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current
                        .removeClass(FOCUSED)
                        .removeAttr("aria-selected")
                        .removeAttr(ID);

                    that._focused
                        .removeAttr("aria-activedescendant");
                }

                if (candidate) {
                    candidate.addClass(FOCUSED);
                    that._scroll(candidate);

                    if (id) {
                        candidate.attr("id", id);
                        that._focused.attr("aria-activedescendant", id);
                    }
                }

                that._current = candidate;
            } else {
                return that._current;
            }
        },

        destroy: function() {
            var that = this,
                ns = that.ns;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            that.ul.off(ns);
            that.list.off(ns);

            that.popup.destroy();

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        dataItem: function(index) {
            var that = this;

            if (index === undefined) {
                index = that.selectedIndex;
            }

            return that._data()[index];
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

        _aria: function(id) {
            var that = this,
                options = that.options,
                element = that._focused;

            if (options.suggest !== undefined) {
                element.attr("aria-autocomplete", options.suggest ? "both" : "list");
            }

            id = id ? id + " " + that.ul[0].id : that.ul[0].id;

            element.attr("aria-owns", id);

            that.ul.attr("aria-live", !options.filter || options.filter === "none" ? "off" : "polite");
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
        },

        _change: function() {
            var that = this,
                index = that.selectedIndex,
                value = that.value(),
                trigger;

            if (value !== that._old) {
                trigger = true;
            } else if (index !== undefined && index !== that._oldIndex) {
                trigger = true;
            }

            if (trigger) {
                that._old = value;
                that._oldIndex = index;

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _click: function(e) {
            if (!e.isDefaultPrevented()) {
                this._accept($(e.currentTarget));
            }
        },

        _data: function() {
            return this.dataSource.view();
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

            if (that.popup.visible() && li && that.trigger(SELECT, {item: li})) {
                that.close();
                return;
            }

            that._select(li);
            that._triggerCascade();

            that._blur();
        },

        _index: function(value) {
            var that = this,
                idx,
                length,
                data = that._data();

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (that._dataValue(data[idx]) == value) {
                    return idx;
                }
            }

            return -1;
        },

        _dataValue: function(dataItem) {
            var value = this._value(dataItem);

            if (value === undefined) {
                value = this._text(dataItem);
            }

            return value;
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

        _adjustListWidth: function() {
            var list = this.list,
                width = list[0].style.width,
                wrapper = this.wrapper,
                computedStyle, computedWidth;

            if (!list.data(WIDTH) && width) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = computedStyle ? parseFloat(computedStyle.width) : wrapper.outerWidth();

            if (computedStyle && (browser.mozilla || browser.msie)) { // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            width = computedWidth - (list.outerWidth() - list.width());

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data(WIDTH, width);

            return true;
        },

        _popup: function() {
            var that = this,
                list = that.list,
                focused = that._focused,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(list, extend({}, options.popup, {
                anchor: wrapper,
                open: function(e) {
                    that._adjustListWidth();

                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    } else {
                        focused.attr("aria-expanded", true);
                        that.ul.attr("aria-hidden", false);
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    } else {
                        focused.attr("aria-expanded", false);
                        that.ul.attr("aria-hidden", true);
                    }
                },
                animation: options.animation,
                isRtl: kendo.support.isRtl(wrapper)
            }));

            that._touchScroller = kendo.touchScroller(that.popup.element);
        },

        _makeUnselectable: function() {
            if (isIE8) {
                this.list.find("*").attr("unselectable", "on");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggle: function(open) {
            var that = this;
            open = open !== undefined? open : !that.popup.visible();

            if (!kendo.support.mobileOS && that._focused[0] !== document.activeElement) {
                that._focused.focus();
            }

            that[open ? OPEN : CLOSE]();
        },

        _scroll: function (item) {

            if (!item) {
                return;
            }

            if (item[0]) {
                item = item[0];
            }

            var ul = this.ul[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight;

            ul.scrollTop = ulScrollTop > itemOffsetTop ?
                           itemOffsetTop : bottomDistance > (ulScrollTop + ulOffsetHeight) ?
                           bottomDistance - ulOffsetHeight : ulScrollTop;
        },

        _template: function() {
            var that = this,
                options = that.options,
                template = options.template,
                hasDataSource = options.dataSource;

            if (that.element.is(SELECT) && that.element[0].length) {
                if (!hasDataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            if (!template) {
                that.template = kendo.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
                that.template = function(data) {
                    return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + template(data) + "</li>";
                };
            }
        },

       _triggerCascade: function() {
            if (this._old !== this.value()) {
                this.trigger("cascade");
            }
        },

       _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler)
                           .unbind(PROGRESS, that._progressHandler)
                           .unbind(REQUESTEND, that._requestEndHandler);
        }
    });

    extend(List, {
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
            try {
                if (element.createTextRange) {
                        element.focus();
                        var textRange = element.createTextRange();
                        textRange.collapse(true);
                        textRange.moveStart(CHARACTER, selectionStart);
                        textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
                        textRange.select();
                } else {
                    element.setSelectionRange(selectionStart, selectionEnd);
                }
            } catch(e) { /* element is not focused or it is not in the DOM */ }
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

    ui.Select = List.extend({
        init: function(element, options) {
            List.fn.init.call(this, element, options);
            this._initial = this.element.val();
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        close: function() {
            this.popup.close();
        },

        select: function(li) {
            var that = this;

            if (li === undefined) {
                return that.selectedIndex;
            } else {
                that._select(li);
                that._triggerCascade();
                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            }
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
            that._focused.attr("aria-busy", false);
            that._busy = null;
        },

        _showBusy: function () {
            var that = this;

            that._request = true;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function () {
                that._focused.attr("aria-busy", true);
                that._arrow.addClass(LOADING);
            }, 100);
        },

        _requestEnd: function() {
            this._request = false;
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

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._showBusy, that);
                that._requestEndHandler = proxy(that._requestEnd, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, that._refreshHandler)
                                   .bind(PROGRESS, that._progressHandler)
                                   .bind(REQUESTEND, that._requestEndHandler);
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
                methodName = that.popup.visible() ? "_select" : "_accept",
                current = that._current,
                down = key === keys.DOWN,
                pressed;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                } else if (down) {
                    if (!current || (that.selectedIndex === -1 && !that.value())) {
                        current = ul.firstChild;
                    } else {
                        current = current[0].nextSibling;
                    }

                    that[methodName](current);
                } else {
                    that[methodName](current ? current[0].previousSibling : ul.lastChild);
                }
                e.preventDefault();
                pressed = true;
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (that.popup.visible()) {
                    e.preventDefault();
                }

                that._accept(current);
                pressed = true;
            } else if (key === keys.ESC) {
                if (that.popup.visible()) {
                    e.preventDefault();
                }
                that.close();
                pressed = true;
            }

            return pressed;
        },

        _selectItem: function(value) {
            var that = this,
                options = that.options;

            value = that._selectedValue || options.value || that._accessor();

            if (value) {
                that.value(value);
            } else {
                that.select(options.index);
            }
        },

        _fetchItems: function(value) {
            var that = this,
                hasItems = that.ul[0].firstChild;

            //if request is started avoid datasource.fetch
            if (that._request) {
                return true;
            }

            if (!that._fetch && !hasItems) {
                if (that.options.cascadeFrom) {
                    return !hasItems;
                }

                that.dataSource.one(CHANGE, function() {
                    that.value(value);
                    that._fetch = false;
                });

                that._fetch = true;
                that.dataSource.fetch();

                return true;
            }
        },

        _options: function(data, optionLabel) {
            var that = this,
                element = that.element,
                selectedIndex = element[0].selectedIndex,
                length = data.length,
                options = "",
                option,
                dataItem,
                dataText,
                dataValue,
                idx = 0;

            if (optionLabel) {
                options = optionLabel;
                selectedIndex += 1;
                idx = 1;
            }

            for (; idx < length; idx++) {
                option = "<option";
                dataItem = data[idx];
                dataText = that._text(dataItem);
                dataValue = that._value(dataItem);

                if (dataValue !== undefined) {
                    dataValue += "";

                    if (dataValue.indexOf('"') !== -1) {
                        dataValue = dataValue.replace(quotRegExp, "&quot;");
                    }

                    option += ' value="' + dataValue + '"';
                }

                option += ">";

                if (dataText !== undefined) {
                    option += htmlEncode(dataText);
                }

                option += "</option>";
                options += option;
            }

            element.html(options);
            element[0].selectedIndex = selectedIndex;
        },

        _reset: function() {
            var that = this,
                element = that.element,
                form = element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(that._initial);
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _cascade: function() {
            var that = this,
                options = that.options,
                cascade = options.cascadeFrom,
                parent, parentElement,
                select, valueField,
                change;

            if (cascade) {
                that._selectedValue = options.value || that._accessor();

                parentElement = $("#" + cascade);
                parent = parentElement.data("kendo" + options.name);

                if (!parent) {
                    parent = parentElement.data("kendo" + alternativeNames[options.name]);
                }

                if (!parent) {
                    return;
                }

                valueField = parent.options.dataValueField;
                change = function() {
                    var value = that._selectedValue || that.value();
                    if (value) {
                        that.value(value);
                        if (!that.dataSource.view()[0] || that.selectedIndex === -1) {
                            that._clearSelection(parent, true);
                        }
                    } else {
                        that.select(options.index);
                    }

                    that.enable();
                };
                select = function() {
                    var dataItem = parent.dataItem(),
                        filterValue = dataItem ? parent._value(dataItem) : null,
                        expressions, filters;

                    if (filterValue) {
                        expressions = that.dataSource.filter() || {};
                        removeFiltersForField(expressions, valueField);
                        filters = expressions.filters || [];

                        filters.push({
                            field: valueField,
                            operator: "eq",
                            value: filterValue
                        });

                        that.dataSource
                            .one(CHANGE, change)
                            .filter(filters);

                    } else {
                        that.enable(false);
                        that._clearSelection(parent);
                    }

                    that._triggerCascade();
                };

                parent.bind("cascade", function() { select(); });

                //refresh was called
                if (parent._bound) {
                    select();
                } else if (!parent.value()) {
                    that.enable(false);
                }
            }
        }
    });

    function removeFiltersForField(expression, field) {
        if (expression.filters) {
            expression.filters = $.grep(expression.filters, function(filter) {
                removeFiltersForField(filter, field);
                if (filter.filters) {
                    return filter.filters.length;
                } else {
                    return filter.field != field;
                }
            });
        }
    }

    ui.Select.removeFiltersForField = removeFiltersForField;

})(window.kendo.jQuery);
