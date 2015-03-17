(function(f, define){
    define([ "./kendo.data", "./kendo.popup" ], f);
})(function(){

var __meta__ = {
    id: "list",
    name: "List",
    category: "framework",
    depends: [ "data", "popup" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        support = kendo.support,
        htmlEncode = kendo.htmlEncode,
        activeElement = kendo._activeElement,
        ObservableArray = kendo.data.ObservableArray,
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
        SELECTED = "selected",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        WIDTH = "width",
        extend = $.extend,
        proxy = $.proxy,
        isArray = $.isArray,
        browser = support.browser,
        isIE8 = browser.msie && browser.version < 9,
        quotRegExp = /"/g,
        alternativeNames = {
            "ComboBox": "DropDownList",
            "DropDownList": "ComboBox"
        };

    var List = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            var that = this,
                ns = that.ns,
                id;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            that._isSelect = element.is(SELECT);

            if (that._isSelect && that.element[0].length) {
                if (!options.dataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            that.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
                        .attr({
                            tabIndex: -1,
                            "aria-hidden": true
                        });

            that.list = $("<div class='k-list-container'/>")
                        .append(that.ul)
                        .on("mousedown" + ns, proxy(that._listMousedown, that));

            id = element.attr(ID);

            if (id) {
                that.list.attr(ID, id + "-list");
                that.ul.attr(ID, id + "_listbox");
            }

            that._header();
            that._accessors();
            that._initValue();
        },

        options: {
            valuePrimitive: false,
            headerTemplate: ""
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (options && options.enable !== undefined) {
                options.enabled = options.enable;
            }
        },

        focus: function() {
            this._focused.focus();
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _listMousedown: function(e) {
            if (!this.filterInput || this.filterInput[0] !== e.target) {
                e.preventDefault();
            }
        },

        _filterSource: function(filter, force) {
            var that = this;
            var options = that.options;
            var dataSource = that.dataSource;
            var expression = extend({}, dataSource.filter() || {});

            var removed = removeFiltersForField(expression, options.dataTextField);

            if ((filter || removed) && that.trigger("filtering", { filter: filter })) {
                return;
            }

            if (filter) {
                expression = expression.filters || [];
                expression.push(filter);
            }

            if (!force) {
                dataSource.filter(expression);
            } else {
                dataSource.read(expression);
            }
        },

        _header: function() {
            var that = this;
            var template = that.options.headerTemplate;
            var header;

            if ($.isFunction(template)) {
                template = template({});
            }

            if (template) {
                that.list.prepend(template);

                header = that.ul.prev();

                that.header = header[0] ? header : null;
                if (that.header) {
                    that.angular("compile", function(){
                        return { elements: that.header };
                    });
                }
            }
        },

        _initValue: function() {
            var that = this,
                value = that.options.value;

            if (value !== null) {
                that.element.val(value);
            } else {
                value = that._accessor();
                that.options.value = value;
            }

            that._old = value;
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

        _focus: function(candidate) {
            return this.listView.focus(candidate);
        },

        current: function(candidate) {
            return this._focus(candidate);
        },

        items: function() {
            return this.ul[0].children;
        },

        destroy: function() {
            var that = this;
            var ns = that.ns;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            that.listView.destroy();
            that.list.off(ns);

            if (that._touchScroller) {
                that._touchScroller.destroy();
            }

            that.popup.destroy();

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        dataItem: function(index) {
            var that = this;

            if (index === undefined) {
                return that.listView.selectedDataItems()[0];
            }

            if (typeof index !== "number") {
                index = $(that.items()).index(index);
            }

            return that.listView.data()[index];
        },

        _accessors: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var getter = kendo.getter;
            var textField = element.attr(kendo.attr("text-field"));
            var valueField = element.attr(kendo.attr("value-field"));

            if (!options.dataTextField && textField) {
                options.dataTextField = textField;
            }

            if (!options.dataValueField && valueField) {
                options.dataValueField = valueField;
            }

            that._text = getter(options.dataTextField);
            that._value = getter(options.dataValueField);
        },

        _aria: function(id) {
            var that = this,
                options = that.options,
                element = that._focused.add(that.filterInput);

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
            var that = this;
            var index = that.selectedIndex;
            var optionValue = that.options.value;
            var value = that.value();
            var trigger;

            if (that._isSelect && !that.listView.isBound() && optionValue) {
                value = optionValue;
            }

            if (value !== that._old) {
                trigger = true;
            } else if (index !== undefined && index !== that._oldIndex) {
                trigger = true;
            }

            if (trigger) {
                that._old = value;
                that._oldIndex = index;

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);

                that.trigger(CHANGE);
            }
        },

        _data: function() {
            return this.dataSource.view();
        },

        _enable: function() {
            var that = this,
                options = that.options,
                disabled = that.element.is("[disabled]");

            if (options.enable !== undefined) {
                options.enabled = options.enable;
            }

            if (!options.enabled || disabled) {
                that.enable(false);
            } else {
                that.readonly(that.element.is("[readonly]"));
            }
        },

        _dataValue: function(dataItem) {
            var value = this._value(dataItem);

            if (value === undefined) {
                value = this._text(dataItem);
            }

            return value;
        },

        _height: function(length) {
            var that = this;
            var list = that.list;
            var height = that.options.height;
            var visible = that.popup.visible();
            var offsetTop;
            var popups;

            if (length) {
                popups = list.add(list.parent(".k-animation-container")).show();

                height = that.ul[0].scrollHeight > height ? height : "auto";

                popups.height(height);

                if (height !== "auto") {
                    offsetTop = that.ul[0].offsetTop;

                    if (offsetTop) {
                        height = list.height() - offsetTop;
                    }
                }

                that.ul.height(height);

                if (!visible) {
                    popups.hide();
                }
            }

            return height;
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

            if (computedStyle && browser.msie) { // getComputedStyle returns different box in IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            if (list.css("box-sizing") !== "border-box") {
                width = computedWidth - (list.outerWidth() - list.width());
            } else {
                width = computedWidth;
            }

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data(WIDTH, width);

            return true;
        },

        _openHandler: function(e) {
            this._adjustListWidth();

            if (this.trigger(OPEN)) {
                e.preventDefault();
            } else {
                this._focused.attr("aria-expanded", true);
                this.ul.attr("aria-hidden", false);
            }
        },

        _closeHandler: function(e) {
            if (this.trigger(CLOSE)) {
                e.preventDefault();
            } else {
                this._focused.attr("aria-expanded", false);
                this.ul.attr("aria-hidden", true);
            }
        },

        _focusItem: function() {
            var listView = this.listView;
            var focusedItem = listView.focus();
            var index = listView.select();

            index = index[index.length - 1];

            if (index === undefined && this.options.highlightFirst && !focusedItem) {
                index = 0;
            }

            if (index !== undefined) {
                listView.focus(index);
            } else {
                listView.scrollToIndex(0);
            }
        },

        _calculateGroupPadding: function(height) {
            var ul = this.ul;
            var li = $(ul[0].firstChild);
            var groupHeader = ul.prev(".k-static-header");
            var padding = 0;

            if (groupHeader[0] && groupHeader[0].style.display !== "none") {
                if (height !== "auto") {
                    padding = kendo.support.scrollbar();
                }

                padding += parseFloat(li.css("border-right-width"), 10) + parseFloat(li.children(".k-group").css("right"), 10);

                groupHeader.css("padding-right", padding);
            }
        },

        //use length of the items in ListView
        _firstOpen: function() {
            var height = this._height(this.listView.data().length);
            this._calculateGroupPadding(height);
        },

        _popup: function() {
            var that = this;

            that.popup = new ui.Popup(that.list, extend({}, that.options.popup, {
                anchor: that.wrapper,
                open: proxy(that._openHandler, that),
                close: proxy(that._closeHandler, that),
                animation: that.options.animation,
                isRtl: support.isRtl(that.wrapper)
            }));

            if (!that.options.virtual) {
                that.popup.one(OPEN, proxy(that._firstOpen, that));
            }

            that._touchScroller = kendo.touchScroller(that.popup.element);
        },

        _makeUnselectable: function() {
            if (isIE8) {
                this.list.find("*").not(".k-textbox").attr("unselectable", "on");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggle: function(open, preventFocus) {
            var that = this;
            var touchEnabled = support.mobileOS && (support.touch || support.MSPointers || support.pointers);

            open = open !== undefined? open : !that.popup.visible();

            if (!preventFocus && !touchEnabled && that._focused[0] !== activeElement()) {
                that._focused.focus();
            }

            that[open ? OPEN : CLOSE]();
        },

        _triggerCascade: function() {
            var that = this;

            if (!that._bound || that._old !== that.value()) {
                that._bound = true;
                that.trigger("cascade", { userTriggered: that._userTriggered });
            }
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(PROGRESS, that._progressHandler)
                           .unbind(REQUESTEND, that._requestEndHandler)
                           .unbind("error", that._errorHandler);
        }
    });

    extend(List, {
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
            this._bound = false;

            this.listView.setDataSource(this.dataSource);

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        close: function() {
            this.popup.close();
        },

        select: function(candidate) {
            var that = this;

            if (candidate === undefined) {
                return that.selectedIndex;
            } else {
                that._select(candidate);

                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            }
        },

        search: function(word) {
            word = typeof word === "string" ? word : this.text();
            var that = this;
            var length = word.length;
            var options = that.options;
            var ignoreCase = options.ignoreCase;
            var filter = options.filter;
            var field = options.dataTextField;

            clearTimeout(that._typing);

            if (!length || length >= options.minLength) {
                that._state = "filter";
                that.listView.filter(true);
                if (filter === "none") {
                    that._filter(word);
                } else {
                    that._open = true;
                    that._filterSource({
                        value: ignoreCase ? word.toLowerCase() : word,
                        field: field,
                        operator: filter,
                        ignoreCase: ignoreCase
                    });
                }
            }
        },

        _accessor: function(value, idx) {
            return this[this._isSelect ? "_accessorSelect" : "_accessorInput"](value, idx);
        },

        _accessorInput: function(value) {
            var element = this.element[0];

            if (value === undefined) {
                return element.value;
            } else {
                element.value = value;
            }
        },

        _accessorSelect: function(value, idx) {
            var element = this.element[0];
            var selectedIndex = element.selectedIndex;
            var option;

            if (value === undefined) {
                option = element.options[selectedIndex];

                if (option) {
                    value = option.value;
                }
                return value || "";
            } else {
                if (selectedIndex > -1) {
                    element.options[selectedIndex].removeAttribute(SELECTED);
                }

                if (idx === undefined) {
                    idx = -1;
                }

                if (idx == -1 && value !== "") {
                    idx = this._custom(value);
                }

                element.selectedIndex = idx;
                option = element.options[idx];
                if (option) {
                   option.setAttribute(SELECTED, SELECTED);
                }
            }
        },

        _custom: function(value) {
            var that = this;
            var element = that.element;
            var custom = that._customOption;
            var idx = element[0].children.length - 1;

            if (!custom) {
                custom = $("<option/>");
                that._customOption = custom;

                element.append(custom);
                idx += 1;
            }

            custom.text(value);
            custom[0].selected = true;

            return idx;
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
                if (that._arrow) { //destroyed after request start
                    that._focused.attr("aria-busy", true);
                    that._arrow.addClass(LOADING);
                }
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

            if (that._isSelect) {
                idx = element[0].selectedIndex;
                if (idx > -1) {
                    options.index = idx;
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }

            if (that.dataSource) {
                that._unbindDataSource();
            } else {
                that._progressHandler = proxy(that._showBusy, that);
                that._requestEndHandler = proxy(that._requestEnd, that);
                that._errorHandler = proxy(that._hideBusy, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(PROGRESS, that._progressHandler)
                                   .bind(REQUESTEND, that._requestEndHandler)
                                   .bind("error", that._errorHandler);
        },

        _firstItem: function() {
            this.listView.first();
        },

        _lastItem: function() {
            this.listView.last();
        },

        _nextItem: function() {
            this.listView.next();
        },

        _prevItem: function() {
            this.listView.prev();
        },

        _move: function(e) {
            var that = this;
            var key = e.keyCode;
            var ul = that.ul[0];
            var down = key === keys.DOWN;
            var dataItem;
            var pressed;
            var current;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                } else {
                    if (!that.listView.isBound()) {
                        if (!that._fetch) {
                            that.dataSource.one(CHANGE, function() {
                                that._move(e);
                                that._fetch = false;
                            });

                            that._fetch = true;
                            that._filterSource();
                        }

                        e.preventDefault();

                        return true; //pressed
                    }

                    current = that._focus();

                    if (!that._fetch) {
                        if (down) {
                            that._nextItem();

                            if (!that._focus()) {
                                that._lastItem();
                            }
                        } else {
                            that._prevItem();

                            if (!that._focus()) {
                                that._firstItem();
                            }
                        }
                    }

                    if (that.trigger(SELECT, { item: that.listView.focus() })) {
                        that._focus(current); //revert focus
                        return;
                    }

                    that._select(that._focus(), true);
                    //that.listView.select(that.listView.focus());

                    if (!that.popup.visible()) {
                        that._blur();
                    }
                }

                e.preventDefault();
                pressed = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                if (that.popup.visible()) {
                    e.preventDefault();
                }

                current = that._focus();
                dataItem = that.dataItem();

                if (!that.popup.visible() && (!dataItem || that.text() !== that._text(dataItem))) {
                    current = null;
                }

                var activeFilter = that.filterInput && that.filterInput[0] === activeElement();

                if (current) {
                    if (that.trigger(SELECT, { item: current })) {
                        return;
                    }

                    that._select(current);
                } else {
                    that._accessor(that.input.val());
                    that.listView.value(that.input.val());
                }

                if (that._focusElement) {
                    that._focusElement(that.wrapper);
                }

                if (activeFilter && key === keys.TAB) {
                    that.wrapper.focusout();
                } else {
                    that._blur();
                }

                that.close();
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

        _fetchData: function() {
            var that = this;
            var hasItems = !!that.dataSource.view().length;

            //if request is started avoid datasource.fetch
            if (that.element[0].disabled || that._request || that.options.cascadeFrom) {
                return;
            }

            if (!that.listView.isBound() && !that._fetch && !hasItems) {
                that._fetch = true;
                that.dataSource.fetch().done(function() {
                    that._fetch = false;
                });
            }
        },

        _options: function(data, optionLabel) {
            var that = this,
                element = that.element,
                length = data.length,
                options = "",
                option,
                dataItem,
                dataText,
                dataValue,
                idx = 0;

            if (optionLabel) {
                options = optionLabel;
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
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                form = formId ? $("#" + formId) : element.closest("form");

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
                parentElement = $("#" + cascade);
                parent = parentElement.data("kendo" + options.name);

                if (!parent) {
                    parent = parentElement.data("kendo" + alternativeNames[options.name]);
                }

                if (!parent) {
                    return;
                }

                options.autoBind = false;
                valueField = options.cascadeFromField || parent.options.dataValueField;

                change = function() {
                    that.dataSource.unbind(CHANGE, change);

                    var value = that.listView.value()[0];
                    if (that._userTriggered) {
                        that._clearSelection(parent, true);
                    } else if (value) {
                        that.value(value);
                        if (!that.dataSource.view()[0] || that.selectedIndex === -1) {
                            that._clearSelection(parent, true);
                        }
                    } else if (that.listView.data().length) {
                        that.select(options.index);
                    }

                    that.enable();
                    that._triggerCascade();
                    that._userTriggered = false;
                };
                select = function() {
                    var dataItem = parent.dataItem(),
                        filterValue = dataItem ? parent._value(dataItem) : null,
                        expressions, filters;

                    if (filterValue || filterValue === 0) {
                        expressions = that.dataSource.filter() || {};
                        removeFiltersForField(expressions, valueField);
                        filters = expressions.filters || [];

                        filters.push({
                            field: valueField,
                            operator: "eq",
                            value: filterValue
                        });

                        var handler = function() {
                            that.unbind("dataBound", handler);
                            change.apply(that, arguments);
                        };

                        that.first("dataBound", handler);

                        that.dataSource.filter(filters);

                    } else {
                        that.enable(false);
                        that._clearSelection(parent);
                        that._triggerCascade();
                        that._userTriggered = false;
                    }
                };

                parent.first("cascade", function(e) {
                    that._userTriggered = e.userTriggered;
                    select();
                });

                //refresh was called
                if (parent.listView.isBound()) {
                    select();
                } else if (!parent.value()) {
                    that.enable(false);
                }
            }
        }
    });

    var STATIC_LIST_NS = ".StaticList";

    var StaticList = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.attr("role", "listbox")
                        .css({ overflow: support.kineticScrollNeeded ? "": "auto" })
                        .on("click" + STATIC_LIST_NS, "li", proxy(this._click, this))
                        .on("mouseenter" + STATIC_LIST_NS, "li", function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + STATIC_LIST_NS, "li", function() { $(this).removeClass(HOVER); });


            this.header = this.element.before('<div class="k-static-header" style="display:none"></div>').prev();

            this.setDataSource(this.options.dataSource);

            this._bound = false;

            this._optionID = kendo.guid();

            this._selectedIndices = [];

            this._view = [];
            this._dataItems = [];
            this._values = [];

            this._getter();
            this._templates();

            this._onScroll = proxy(function() {
                var that = this;
                clearTimeout(that._scrollId);

                that._scrollId = setTimeout(function() {
                    that._renderHeader();
                }, 50);
            }, this);

            this._fixedHeader();

            var value = this.options.value;
            if (value) {
                this._values = $.isArray(value) ? value.slice(0) : [value];
            }
        },

        options: {
            name: "StaticList",
            dataValueField: null,
            selectable: true,
            template: null,
            groupTemplate: null,
            fixedGroupTemplate: null
        },

        events: [
           "click",
           "change",
           "activate",
           "deactivate",
           "dataBinding",
           "dataBound"
        ],

        setDataSource: function(source) {
            var that = this;
            var dataSource = source || {};

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = dataSource.bind(CHANGE, that._refreshHandler);
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (options.dataSource) {
                this.setDataSource(options.dataSource);
            }


            this._fixedHeader();
            this._getter();
            this._templates();
        },

        destroy: function() {
            this.element.off(STATIC_LIST_NS);

            if (this._refreshHandler) {
                this.dataSource.unbind(CHANGE, this._refreshHandler);
            }

            Widget.fn.destroy.call(this);
        },

        scrollToIndex: function(index) {
            var item = this.element[0].children[index];

            if (item) {
                this.scroll(item);
            }
        },

        _offsetHeight: function() {
            var offsetHeight = 0;
            var siblings = this.element.prevAll();

            siblings.each(function() {
                var element = $(this);
                if (element.is(":visible")) {
                    if (element.hasClass("k-list-filter")) {
                        offsetHeight += element.children().height();
                    } else {
                        offsetHeight += element.outerHeight();
                    }
                }
            });

            return offsetHeight;
        },

        scroll: function (item) {
            if (!item) {
                return;
            }

            if (item[0]) {
                item = item[0];
            }

            var ul = this.element[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight,
                touchScroller = this._touchScroller,
                yDimension, offsetHeight;

            if (touchScroller) {
                yDimension = touchScroller.dimensions.y;

                if (yDimension.enabled && itemOffsetTop > yDimension.size) {
                    itemOffsetTop = itemOffsetTop - yDimension.size + itemOffsetHeight + 4;

                    touchScroller.scrollTo(0, -itemOffsetTop);
                }
            } else {
                offsetHeight = this._offsetHeight();
                if (ulScrollTop > (itemOffsetTop - offsetHeight)) {
                    ulScrollTop = (itemOffsetTop - offsetHeight);
                } else if (bottomDistance > (ulScrollTop + ulOffsetHeight + offsetHeight)) {
                    ulScrollTop = (bottomDistance - ulOffsetHeight - offsetHeight);
                }

                ul.scrollTop = ulScrollTop;
           }
        },

        selectedDataItems: function(dataItems) {
            var getter = this._valueGetter;

            if (dataItems === undefined) {
                return this._dataItems.slice();
            }

            this._dataItems = dataItems;

            this._values = $.map(dataItems, function(dataItem) {
                return getter(dataItem);
            });
        },

        next: function() {
            var current = this.focus();

            if (!current) {
                current = 0;
            } else {
                current = current.next();
            }

            this.focus(current);
        },

        prev: function() {
            var current = this.focus();

            if (!current) {
                current = this.element[0].children.length - 1;
            } else {
                current = current.prev();
            }

            this.focus(current);
        },

        first: function() {
            this.focus(this.element[0].children[0]);
        },

        last: function() {
            this.focus(this.element[0].children[this.element[0].children.length - 1]);
        },

        focus: function(candidate) {
            var that = this;
            var id = that._optionID;
            var hasCandidate;

            if (candidate === undefined) {
                return that._current;
            }

            candidate = that._get(candidate);
            candidate = candidate[candidate.length - 1];
            candidate = $(this.element[0].children[candidate]);

            if (that._current) {
                that._current
                    .removeClass(FOCUSED)
                    .removeAttr("aria-selected")
                    .removeAttr(ID);

                that.trigger("deactivate");
            }

            hasCandidate = !!candidate[0];

            if (hasCandidate) {
                candidate.addClass(FOCUSED);
                that.scroll(candidate);

                candidate.attr("id", id);
            }

            that._current = hasCandidate ? candidate : null;
            that.trigger("activate");
        },

        select: function(indices) {
            var selectable = this.options.selectable;
            var singleSelection = selectable !== "multiple" && selectable !== false;

            var added = [];
            var removed = [];
            var result;

            if (indices === undefined) {
                return this._selectedIndices.slice();
            }

            indices = this._get(indices);

            if (indices.length === 1 && indices[0] === -1) {
                indices = [];
            }

            if (singleSelection && $.inArray(indices[indices.length - 1], this._selectedIndices) !== -1) {
                return;
            }

            result = this._deselect(indices);

            removed = result.removed;
            indices = result.indices;

            if (indices.length) {
                if (singleSelection) {
                    indices = [indices[indices.length - 1]];
                }

                added = this._select(indices);
            }

            if (added.length || removed.length) {
                this.trigger("change", {
                    added: added,
                    removed: removed
                });
            }
        },

        value: function(value, silent) {
            var indices;

            if (value === undefined) {
                return this._values.slice();
            }

            if (value === "" || value === null) {
                value = [];
            }

            value = $.isArray(value) || value instanceof ObservableArray ? value.slice(0) : [value];

            this._values = value;

            if (silent) {
                return;
            }

            if (this.isBound()) {
                indices = this._valueIndices(value);

                if (!indices.length) {
                    this.select([]);
                    return;
                }

                this._selectedIndices = [];
                this._dataItems = [];
                this._values = [];

                this.select(indices);
            }
        },

        data: function() {
            var that = this;
            var data = that._view;
            var length = data.length;
            var result = [];
            var idx;

            if (length) {
                for (idx = 0; idx < length; idx++) {
                    result.push(data[idx].item);
                }
            }

            return result;
        },

        clearIndices: function() {
            this._selectedIndices = [];
        },

        filter: function(isFilter) {
            this._isFilter = isFilter;
        },

        _click: function(e) {
            if (!e.isDefaultPrevented()) {
                this.trigger("click", { item: $(e.currentTarget) });
            }
        },

        _dataItemPosition: function(dataItem, values) {
            var value = this._valueGetter(dataItem);
            var index = -1;

            for (var idx = 0; idx < values.length; idx++) {
                if (value == values[idx]) {
                    index = idx;
                    break;
                }
            }

            return index;
        },

        _valueIndices: function(values) {
            var data = this._view;
            var indices = [];
            var idx = 0;
            var index;

            if (!values.length) {
                return [];
            }

            for (; idx < data.length; idx++) {
                index = this._dataItemPosition(data[idx].item, values);

                if (index !== -1) {
                    indices[index] = idx;
                }
            }

            return this._normalizeIndices(indices);
        },

        _getter: function() {
            this._valueGetter = kendo.getter(this.options.dataValueField);
        },

        _deselect: function(indices) {
            var children = this.element[0].children;
            var selectable = this.options.selectable;
            var selectedIndices = this._selectedIndices;
            var dataItems = this._dataItems;
            var values = this._values;
            var removed = [];
            var i = 0;
            var j;

            indices = indices.slice();

            if (selectable === true || !indices.length) {
                for (; i < selectedIndices.length; i++) {
                    $(children[selectedIndices[i]]).removeClass("k-state-selected");

                    removed.push({
                        position: i,
                        dataItem: dataItems[i]
                    });
                }

                this._values = [];
                this._dataItems = [];
                this._selectedIndices = [];
            } else if (selectable === "multiple") {
                var index, selectedIndex;
                var removedIndices = 0;

                for (; i < indices.length; i++) {
                    index = indices[i];

                    if (!$(children[index]).hasClass("k-state-selected")) {
                        continue;
                    }

                    for (j = 0; j < selectedIndices.length; j++) {
                        selectedIndex = selectedIndices[j];

                        if (selectedIndex === index) {
                            $(children[selectedIndex]).removeClass("k-state-selected");

                            removed.push({
                                position: j + removedIndices,
                                dataItem: dataItems.splice(j, 1)[0]
                            });

                            selectedIndices.splice(j, 1);
                            indices.splice(i, 1);
                            values.splice(j, 1);

                            removedIndices += 1;
                            i -= 1;
                            j -= 1;
                            break;
                        }
                    }
                }
            }

            return {
                indices: indices,
                removed: removed
            };
        },

        _select: function(indices) {
            var children = this.element[0].children;
            var data = this._view;
            var dataItem, index;
            var added = [];
            var idx = 0;

            if (indices[indices.length - 1] !== -1) {
                this.focus(indices);
            }

            for (; idx < indices.length; idx++) {
                index = indices[idx];
                dataItem = data[index];

                if (index === -1 || !dataItem) {
                    continue;
                }

                dataItem = dataItem.item;

                this._selectedIndices.push(index);
                this._dataItems.push(dataItem);
                this._values.push(this._valueGetter(dataItem));

                $(children[index]).addClass("k-state-selected").attr("aria-selected", true);

                added.push({
                    dataItem: dataItem
                });
            }

            return added;
        },

        _get: function(candidate) {
            if (typeof candidate === "number") {
                candidate = [candidate];
            } else if (!isArray(candidate)) {
                candidate = $(candidate).data("index");

                if (candidate === undefined) {
                    candidate = -1;
                }

                candidate = [candidate];
            }

            return candidate;
        },

        _template: function() {
            var that = this;
            var options = that.options;
            var template = options.template;

            if (!template) {
                template = kendo.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
                template = function(data) {
                    return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + template(data) + "</li>";
                };
            }

            return template;
        },

        _templates: function() {
            var template;
            var templates = {
                template: this.options.template,
                groupTemplate: this.options.groupTemplate,
                fixedGroupTemplate: this.options.fixedGroupTemplate
            };

            for (var key in templates) {
                template = templates[key];
                if (template && typeof template !== "function") {
                    templates[key] = kendo.template(template);
                }
            }

            this.templates = templates;
        },

        _normalizeIndices: function(indices) {
            var newIndices = [];
            var idx = 0;

            for (; idx < indices.length; idx++) {
                if (indices[idx] !== undefined) {
                    newIndices.push(indices[idx]);
                }
            }

            return newIndices;
        },

        _firstVisibleItem: function() {
            var element = this.element[0];
            var scrollTop = element.scrollTop;
            var itemHeight = $(element.children[0]).height();
            var itemIndex = Math.floor(scrollTop / itemHeight) || 0;
            var item = element.children[itemIndex];
            var forward = item.offsetTop < scrollTop;

            while (item) {
                if (forward) {
                    if (item.offsetTop >= scrollTop || !item.nextSibling) {
                        break;
                    }

                    item = item.nextSibling;
                } else {
                    if (item.offsetTop <= scrollTop || !item.previousSibling) {
                        break;
                    }

                    item = item.previousSibling;
                }
            }

            return this._view[$(item).data("index")];
        },

        _fixedHeader: function() {
            if (this.dataSource.group().length && this.templates.fixedGroupTemplate) {
                this.header.show();
                this.element.scroll(this._onScroll);
            } else {
                this.header.hide();
                this.element.off("scroll", this._onScroll);
            }
        },

        _renderHeader: function() {
            var template = this.templates.fixedGroupTemplate;
            if (!template) {
                return;
            }

            var visibleItem = this._firstVisibleItem();

            if (visibleItem) {
                this.header.html(template(visibleItem.group));
            }
        },

        _renderItem: function(context, values) {
            var item = '<li tabindex="-1" role="option" unselectable="on" class="k-item';

            var dataItem = context.item;
            var found = this._isFilter && this._dataItemPosition(dataItem, values) !== -1;

            if (context.newGroup) {
                item += ' k-first';
            }

            if (found) {
                item += ' k-state-selected';
            }

            item += '"' + (found ? ' aria-selected="true"' : "") + ' data-index="' + context.index + '">';

            item += this.templates.template(dataItem);

            if (context.newGroup) {
                item += '<div class="k-group">' + this.templates.groupTemplate(context.group) + '</div>';
            }

            return item + "</li>";
        },

        _render: function() {
            var html = "";

            var i = 0;
            var idx = 0;
            var context;
            var dataContext = [];
            var view = this.dataSource.view();
            var values = this.value();

            var group, newGroup, j;
            var isGrouped = this.dataSource.group().length;

            if (isGrouped) {
                for (i = 0; i < view.length; i++) {
                    group = view[i];
                    newGroup = true;

                    for (j = 0; j < group.items.length; j++) {
                        context = { item: group.items[j], group: group.value, newGroup: newGroup, index: idx };
                        dataContext[idx] = context;
                        idx += 1;

                        html += this._renderItem(context, values);
                        newGroup = false;
                    }
                }
            } else {
                for (i = 0; i < view.length; i++) {
                    context = { item: view[i], index: i };

                    dataContext[i] = context;

                    html += this._renderItem(context, values);
                }
            }

            this._view = dataContext;

            this.element[0].innerHTML = html;

            if (isGrouped && dataContext.length) {
                this._renderHeader();
            }
        },

        refresh: function() {
            this.trigger("dataBinding");

            this._render();

            this._bound = true;

            this.trigger("dataBound");

            if (!this._isFilter) {
                this.value(this._values);
            }
        },

        isBound: function() {
            return this._bound;
        }
    });

    ui.plugin(StaticList);

    function inArray(node, parentNode) {
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

    function removeFiltersForField(expression, field) {
        var filters;
        var found = false;

        if (expression.filters) {
            filters = $.grep(expression.filters, function(filter) {
                found = removeFiltersForField(filter, field);
                if (filter.filters) {
                    return filter.filters.length;
                } else {
                    return filter.field != field;
                }
            });

            if (!found && expression.filters.length !== filters.length) {
                found = true;
            }

            expression.filters = filters;
        }

        return found;
    }
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
