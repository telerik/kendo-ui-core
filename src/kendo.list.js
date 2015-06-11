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

/*jshint evil: true*/
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
        REQUESTSTART = "requestStart",
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

        _listOptions: function(options) {
            var currentOptions = this.options;

            options = options || {};
            options = {
                height: options.height || currentOptions.height,
                dataValueField: options.dataValueField || currentOptions.dataValueField,
                dataTextField: options.dataTextField || currentOptions.dataTextField,
                groupTemplate: options.groupTemplate || currentOptions.groupTemplate,
                fixedGroupTemplate: options.fixedGroupTemplate || currentOptions.fixedGroupTemplate,
                template: options.template || currentOptions.template
            };

            if (!options.template) {
                options.template = "#:" + kendo.expr(options.dataTextField, "data") + "#";
            }

            return options;
        },

        _initList: function() {
            var that = this;
            var options = that.options;
            var virtual = options.virtual;
            var hasVirtual = !!virtual;
            var value = options.value;

            var listBoundHandler = proxy(that._listBound, that);

            var listOptions = {
                autoBind: false,
                selectable: true,
                dataSource: that.dataSource,
                click: proxy(that._click, that),
                change: proxy(that._listChange, that),
                activate: proxy(that._activateItem, that),
                deactivate: proxy(that._deactivateItem, that),
                dataBinding: function() {
                    that.trigger("dataBinding");
                    that._angularItems("cleanup");
                },
                dataBound: listBoundHandler,
                listBound: listBoundHandler,
                selectedItemChange: proxy(that._listChange, that)
            };

            listOptions = $.extend(that._listOptions(), listOptions, typeof virtual === "object" ? virtual : {});

            if (!hasVirtual) {
                that.listView = new kendo.ui.StaticList(that.ul, listOptions);
            } else {
                that.listView = new kendo.ui.VirtualList(that.ul, listOptions);
            }

            if (value !== undefined) {
                that.listView.value(value).done(function() {
                    var text = options.text;

                    if (!that.listView.filter() && that.input) {
                        if (that.selectedIndex === -1) {
                            if (text === undefined || text === null) {
                                text = value;
                            }

                            that._accessor(value);
                            that.input.val(text);
                        } else if (that._oldIndex === -1) {
                            that._oldIndex = that.selectedIndex;
                        }
                    }
                });
            }
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

        //TODO: refactor
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

            return that.dataSource.flatView()[index];
        },

        _activateItem: function() {
            var current = this.listView.focus();
            if (current) {
                this._focused.add(this.filterInput).attr("aria-activedescendant", current.attr("id"));
            }
        },

        _deactivateItem: function() {
            this._focused.add(this.filterInput).removeAttr("aria-activedescendant");
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

                if (!that._typing) {
                    // trigger the DOM change event so any subscriber gets notified
                    that.element.trigger(CHANGE);
                }

                that.trigger(CHANGE);
            }

            that.typing = false;
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

        _offsetHeight: function() {
            var offsetHeight = 0;
            var siblings = this.listView.content.prevAll(":visible");

            siblings.each(function() {
                var element = $(this);

                if (element.hasClass("k-list-filter")) {
                    offsetHeight += element.children().outerHeight();
                } else {
                    offsetHeight += element.outerHeight();
                }
            });

            return offsetHeight;
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

                height = that.listView.content[0].scrollHeight > height ? height : "auto";

                popups.height(height);

                if (height !== "auto") {
                    offsetTop = that._offsetHeight();

                    if (offsetTop) {
                        height -= offsetTop;
                    }
                }

                that.listView.content.height(height);

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
            var li = this.ul.children(".k-first:first");
            var groupHeader = this.listView.content.prev(".k-group-header");
            var padding = 0;

            if (groupHeader[0] && groupHeader[0].style.display !== "none") {
                if (height !== "auto") {
                    padding = kendo.support.scrollbar();
                }

                padding += parseFloat(li.css("border-right-width"), 10) + parseFloat(li.children(".k-group").css("padding-right"), 10);

                groupHeader.css("padding-right", padding);
            }
        },

        _firstOpen: function() {
            var height = this._height(this.dataSource.flatView().length);
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
                that._prevent = true;
                that._focused.focus();
                that._prevent = false;
            }

            that[open ? OPEN : CLOSE]();
        },

        _triggerCascade: function() {
            var that = this;

            if (!that._cascadeTriggered || that._old !== that.value() || that._oldIndex !== that.selectedIndex) {
                that._cascadeTriggered = true;
                that.trigger("cascade", { userTriggered: that._userTriggered });
            }
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(REQUESTSTART, that._requestStartHandler)
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
            var that = this;
            var parent;

            that.options.dataSource = dataSource;

            that._dataSource();

            that.listView.setDataSource(that.dataSource);

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }

            parent = that._parentWidget();

            if (parent) {
                parent.trigger("cascade");
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

            clearTimeout(that._typingTimeout);

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
                if (value === null) {
                    value = "";
                }
                element.value = value;
            }
        },

        _accessorSelect: function(value, idx) {
            var element = this.element[0];
            var selectedIndex = element.selectedIndex;
            var option;

            if (value === undefined) {
                if (selectedIndex > -1) {
                    option = element.options[selectedIndex];
                }

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

                if (value !== "" && idx == -1) {
                    this._custom(value);
                } else {
                    if (value) {
                        element.value = value;
                    } else {
                        element.selectedIndex = idx;
                    }

                    if (element.selectedIndex > -1) {
                        option = element.options[element.selectedIndex];
                    }

                    if (option) {
                       option.setAttribute(SELECTED, SELECTED);
                    }
                }
            }
        },

        _custom: function(value) {
            var that = this;
            var element = that.element;
            var custom = that._customOption;

            if (!custom) {
                custom = $("<option/>");
                that._customOption = custom;

                element.append(custom);
            }

            custom.text(value);
            custom[0].setAttribute(SELECTED, SELECTED);
            custom[0].selected = true;
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
            this._hideBusy();
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
                that._requestStartHandler = proxy(that._showBusy, that);
                that._requestEndHandler = proxy(that._requestEnd, that);
                that._errorHandler = proxy(that._hideBusy, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(REQUESTSTART, that._requestStartHandler)
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
                                that._fetch = false;
                                that._move(e);
                            });

                            that._fetch = true;
                            that._filterSource();
                        }

                        e.preventDefault();

                        return true; //pressed
                    }

                    current = that._focus();

                    if (!that._fetch && (!current || current.hasClass("k-state-selected"))) {
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
                        that._focus(current);
                        return;
                    }

                    that._select(that._focus(), true);

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
                } else if (that.input) {
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

            if (that._request || that.options.cascadeFrom) {
                return;
            }

            if (!that.listView.isBound() && !that._fetch && !hasItems) {
                that._fetch = true;
                that.dataSource.fetch().done(function() {
                    that._fetch = false;
                });
            }
        },

        _options: function(data, optionLabel, value) {
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

            if (value !== undefined) {
                element[0].value = value;
            }
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

        _parentWidget: function() {
            var name = this.options.name;
            var parentElement = $("#" + this.options.cascadeFrom);
            var parent = parentElement.data("kendo" + name);

            if (!parent) {
                parent = parentElement.data("kendo" + alternativeNames[name]);
            }

            return parent;
        },

        _cascade: function() {
            var that = this,
                options = that.options,
                cascade = options.cascadeFrom,
                select, valueField,
                parent, change;

            if (cascade) {
                parent = that._parentWidget();

                if (!parent) {
                    return;
                }

                options.autoBind = false;
                valueField = options.cascadeFromField || parent.options.dataValueField;

                change = function() {
                    that.dataSource.unbind(CHANGE, change);

                    var value = that._accessor();

                    if (that._userTriggered) {
                        that._clearSelection(parent, true);
                    } else if (value) {
                        if (value !== that.listView.value()[0]) {
                            that.value(value);
                        }

                        if (!that.dataSource.view()[0] || that.selectedIndex === -1) {
                            that._clearSelection(parent, true);
                        }
                    } else if (that.dataSource.flatView().length) {
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
                        .on("click" + STATIC_LIST_NS, "li", proxy(this._click, this))
                        .on("mouseenter" + STATIC_LIST_NS, "li", function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + STATIC_LIST_NS, "li", function() { $(this).removeClass(HOVER); });

            this.content = this.element
                        .wrap("<div unselectable='on'></div>")
                        .parent()
                        .css({
                            "overflow": "auto",
                            "position": "relative"
                        });
            this.header = this.content.before('<div class="k-group-header" style="display:none"></div>').prev();

            this._bound = false;

            this._optionID = kendo.guid();

            this._selectedIndices = [];

            this._view = [];
            this._dataItems = [];
            this._values = [];

            var value = this.options.value;

            if (value) {
                this._values = $.isArray(value) ? value.slice(0) : [value];
            }

            this._getter();
            this._templates();

            this.setDataSource(this.options.dataSource);

            this._onScroll = proxy(function() {
                var that = this;
                clearTimeout(that._scrollId);

                that._scrollId = setTimeout(function() {
                    that._renderHeader();
                }, 50);
            }, this);
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
           "dataBound",
           "selectedItemChange"
        ],

        setDataSource: function(source) {
            var that = this;
            var dataSource = source || {};
            var value;

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);

                value = that.value();

                that.value([]);
                that._bound = false;

                that.value(value);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = dataSource.bind(CHANGE, that._refreshHandler);
            that._fixedHeader();
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            this._getter();
            this._templates();
            this._render();
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

        scroll: function (item) {
            if (!item) {
                return;
            }

            if (item[0]) {
                item = item[0];
            }

            var content = this.content[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                contentScrollTop = content.scrollTop,
                contentOffsetHeight = content.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight,
                yDimension, offsetHeight;

                if (contentScrollTop > itemOffsetTop) {
                    contentScrollTop = itemOffsetTop;
                } else if (bottomDistance > (contentScrollTop + contentOffsetHeight)) {
                    contentScrollTop = (bottomDistance - contentOffsetHeight);
                }

                content.scrollTop = contentScrollTop;
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

        filter: function(filter, skipValueUpdate) {
            if (filter === undefined) {
                return this._filtered;
            }

            this._filtered = filter;
        },

        skipUpdate: function(skipUpdate) {
            this._skipUpdate = skipUpdate;
        },

        select: function(indices) {
            var that = this;
            var selectable = that.options.selectable;
            var singleSelection = selectable !== "multiple" && selectable !== false;
            var selectedIndices = that._selectedIndices;

            var added = [];
            var removed = [];
            var result;

            if (indices === undefined) {
                return selectedIndices.slice();
            }

            indices = that._get(indices);

            if (indices.length === 1 && indices[0] === -1) {
                indices = [];
            }

            if (that._filtered && !singleSelection && that._deselectFiltered(indices)) {
                return;
            }

            if (singleSelection && !that._filtered && $.inArray(indices[indices.length - 1], selectedIndices) !== -1) {
                if (that._dataItems.length && that._view.length) {
                    that._dataItems = [that._view[selectedIndices[0]].item];
                }

                return;
            }

            result = that._deselect(indices);

            removed = result.removed;
            indices = result.indices;

            if (indices.length) {
                if (singleSelection) {
                    indices = [indices[indices.length - 1]];
                }

                added = that._select(indices);
            }

            if (added.length || removed.length) {
                that._valueComparer = null;
                that.trigger("change", {
                    added: added,
                    removed: removed
                });
            }
        },

        removeAt: function(position) {
            this._selectedIndices.splice(position, 1);
            this._values.splice(position, 1);

            return {
                position: position,
                dataItem: this._dataItems.splice(position, 1)[0]
            };
        },

        setValue: function(value) {
            value = $.isArray(value) || value instanceof ObservableArray ? value.slice(0) : [value];

            this._values = value;

            this._valueComparer = null;
        },

        value: function(value) {
            var that = this;
            var deferred = that._valueDeferred;
            var indices;

            if (value === undefined) {
                return that._values.slice();
            }

            that.setValue(value);

            if (!deferred || deferred.state() === "resolved") {
                that._valueDeferred = deferred = $.Deferred();
            }

            if (that.isBound()) {
                indices = that._valueIndices(that._values);

                if (that.options.selectable === "multiple") {
                    that.select(-1);
                }

                that.select(indices);

                deferred.resolve();
            }

            that._skipUpdate = false;

            return deferred;
        },

        _click: function(e) {
            if (!e.isDefaultPrevented()) {
                this.trigger("click", { item: $(e.currentTarget) });
            }
        },

        _valueExpr: function(type, values) {
            var that = this;
            var value;
            var idx = 0;

            var body;
            var comparer;
            var normalized = [];

            if (!that._valueComparer  || that._valueType !== type) {
                that._valueType = type;

                for (; idx < values.length; idx++) {
                    value = values[idx];

                    if (value !== undefined && value !== "" && value !== null) {
                        if (type === "boolean") {
                            value = Boolean(value);
                        } else if (type === "number") {
                            value = Number(value);
                        } else if (type === "string") {
                            value = value.toString();
                        }
                    }

                    normalized.push(value);
                }

                body = "for (var idx = 0; idx < " + normalized.length + "; idx++) {" +
                        " if (current === values[idx]) {" +
                        "   return idx;" +
                        " }" +
                        "} " +
                        "return -1;";

                comparer = new Function(["current", "values"], body);

                that._valueComparer = function(current) {
                    return comparer(current, normalized);
                };
            }

            return that._valueComparer;
        },

        _dataItemPosition: function(dataItem, values) {
            var value = this._valueGetter(dataItem);

            var valueExpr = this._valueExpr(typeof value, values);

            return valueExpr(value);
        },

        _getter: function() {
            this._valueGetter = kendo.getter(this.options.dataValueField);
        },

        _deselect: function(indices) {
            var that = this;
            var children = that.element[0].children;
            var selectable = that.options.selectable;
            var selectedIndices = that._selectedIndices;
            var dataItems = that._dataItems;
            var values = that._values;
            var removed = [];
            var i = 0;
            var j;

            var index, selectedIndex;
            var removedIndices = 0;

            indices = indices.slice();

            if (selectable === true || !indices.length) {
                for (; i < selectedIndices.length; i++) {
                    $(children[selectedIndices[i]]).removeClass("k-state-selected");

                    removed.push({
                        position: i,
                        dataItem: dataItems[i]
                    });
                }

                that._values = [];
                that._dataItems = [];
                that._selectedIndices = [];
            } else if (selectable === "multiple") {
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

        _deselectFiltered: function(indices) {
            var children = this.element[0].children;
            var dataItem, index, position;
            var removed = [];
            var idx = 0;

            for (; idx < indices.length; idx++) {
                index = indices[idx];
                dataItem = this._view[index].item;
                position = this._dataItemPosition(dataItem, this._values);

                if (position > -1) {
                    removed.push(this.removeAt(position));
                    $(children[index]).removeClass("k-state-selected");
                }
            }

            if (removed.length) {
                this.trigger("change", {
                    added: [],
                    removed: removed
                });

                return true;
            }

            return false;
        },

        _select: function(indices) {
            var that = this;
            var children = that.element[0].children;
            var data = that._view;
            var dataItem, index;
            var added = [];
            var idx = 0;

            if (indices[indices.length - 1] !== -1) {
                that.focus(indices);
            }

            for (; idx < indices.length; idx++) {
                index = indices[idx];
                dataItem = data[index];

                if (index === -1 || !dataItem) {
                    continue;
                }

                dataItem = dataItem.item;

                that._selectedIndices.push(index);
                that._dataItems.push(dataItem);
                that._values.push(that._valueGetter(dataItem));

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
                candidate = $(candidate).data("offset-index");

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

        _valueIndices: function(values, indices) {
            var data = this._view;
            var idx = 0;
            var index;

            indices = indices ? indices.slice() : [];

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

        _firstVisibleItem: function() {
            var element = this.element[0];
            var content = this.content[0];
            var scrollTop = content.scrollTop;
            var itemHeight = $(element.children[0]).height();
            var itemIndex = Math.floor(scrollTop / itemHeight) || 0;
            var item = element.children[itemIndex] || element.lastChild;
            var forward = item.offsetTop < scrollTop;

            while (item) {
                if (forward) {
                    if ((item.offsetTop + itemHeight) > scrollTop || !item.nextSibling) {
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

            return this._view[$(item).data("offset-index")];
        },

        _fixedHeader: function() {
            if (this.isGrouped() && this.templates.fixedGroupTemplate) {
                this.header.show();
                this.content.scroll(this._onScroll);
            } else {
                this.header.hide();
                this.content.off("scroll", this._onScroll);
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

        _renderItem: function(context) {
            var item = '<li tabindex="-1" role="option" unselectable="on" class="k-item';

            var dataItem = context.item;
            var notFirstItem = context.index !== 0;
            var selected = context.selected;

            if (notFirstItem && context.newGroup) {
                item += ' k-first';
            }

            if (selected) {
                item += ' k-state-selected';
            }

            item += '"' + (selected ? ' aria-selected="true"' : "") + ' data-offset-index="' + context.index + '">';

            item += this.templates.template(dataItem);

            if (notFirstItem && context.newGroup) {
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
            var isGrouped = this.isGrouped();

            if (isGrouped) {
                for (i = 0; i < view.length; i++) {
                    group = view[i];
                    newGroup = true;

                    for (j = 0; j < group.items.length; j++) {
                        context = {
                            selected: this._selected(group.items[j], values),
                            item: group.items[j],
                            group: group.value,
                            newGroup: newGroup,
                            index: idx };
                        dataContext[idx] = context;
                        idx += 1;

                        html += this._renderItem(context);
                        newGroup = false;
                    }
                }
            } else {
                for (i = 0; i < view.length; i++) {
                    context = { selected: this._selected(view[i], values), item: view[i], index: i };

                    dataContext[i] = context;

                    html += this._renderItem(context);
                }
            }

            this._view = dataContext;

            this.element[0].innerHTML = html;

            if (isGrouped && dataContext.length) {
                this._renderHeader();
            }
        },

        _selected: function(dataItem, values) {
            var select = !this._filtered || this.options.selectable === "multiple";
            return select && this._dataItemPosition(dataItem, values) !== -1;
        },

        refresh: function(e) {
            var that = this;
            var changedItems;
            var action = e && e.action;

            that.trigger("dataBinding");

            that._fixedHeader();

            that._render();

            that._bound = true;

            if (action === "itemchange") {
                changedItems = findChangedItems(that._dataItems, e.items);
                if (changedItems.length) {
                    that.trigger("selectedItemChange", {
                        items: changedItems
                    });
                }
            } else if (that._filtered || that._skipUpdate) {
                that.focus(0);
                if (that._skipUpdate) {
                    that._skipUpdate = false;
                    that._selectedIndices = that._valueIndices(that._values, that._selectedIndices);
                }
            } else if (!action || action === "add") {
                that.value(that._values);
            }

            if (that._valueDeferred) {
                that._valueDeferred.resolve();
            }

            that.trigger("dataBound");
        },

        isBound: function() {
            return this._bound;
        },

        isGrouped: function() {
            return (this.dataSource.group() || []).length;
        }
    });

    ui.plugin(StaticList);

    function findChangedItems(selected, changed) {
        var changedLength = changed.length;
        var result = [];
        var dataItem;
        var i, j;

        for (i = 0; i < selected.length; i++) {
            dataItem = selected[i];

            for (j = 0; j < changedLength; j++) {
                if (dataItem === changed[j]) {
                    result.push({
                        index: i,
                        item: dataItem
                    });
                }
            }
        }

        return result;
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
