(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "multiselect",
    name: "MultiSelect",
    category: "web",
    description: "The MultiSelect widget allows the selection from pre-defined values.",
    depends: [ "list" ],
    features: [ {
        id: "mobile-scroller",
        name: "Mobile scroller",
        description: "Support for kinetic scrolling in mobile device",
        depends: [ "mobile.scroller" ]
    }, {
        id: "virtualization",
        name: "VirtualList",
        description: "Support for virtualization",
        depends: [ "virtuallist" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        keys = kendo.keys,
        activeElement = kendo._activeElement,
        ObservableArray = kendo.data.ObservableArray,
        proxy = $.proxy,
        ID = "id",
        LI = "li",
        ACCEPT = "accept",
        FILTER = "filter",
        REBIND = "rebind",
        OPEN = "open",
        CLOSE = "close",
        CHANGE = "change",
        PROGRESS = "progress",
        SELECT = "select",
        ARIA_DISABLED = "aria-disabled",
        FOCUSEDCLASS = "k-state-focused",
        HIDDENCLASS = "k-loading-hidden",
        HOVERCLASS = "k-state-hover",
        STATEDISABLED = "k-state-disabled",
        DISABLED = "disabled",
        READONLY = "readonly",
        ns = ".kendoMultiSelect",
        CLICK = "click" + ns,
        KEYDOWN = "keydown" + ns,
        MOUSEENTER = "mouseenter" + ns,
        MOUSELEAVE = "mouseleave" + ns,
        HOVEREVENTS = MOUSEENTER + " " + MOUSELEAVE,
        quotRegExp = /"/g,
        isArray = $.isArray,
        styles = ["font-family",
                  "font-size",
                  "font-stretch",
                  "font-style",
                  "font-weight",
                  "letter-spacing",
                  "text-transform",
                  "line-height"];

    var MultiSelect = List.extend({
        init: function(element, options) {
            var that = this, id, disabled;

            that.ns = ns;
            List.fn.init.call(that, element, options);

            that._optionsMap = {};
            that._customOptions = {};

            that._wrapper();
            that._tagList();
            that._input();
            that._textContainer();
            that._loader();

            that._tabindex(that.input);

            element = that.element.attr("multiple", "multiple").hide();
            options = that.options;

            if (!options.placeholder) {
                options.placeholder = element.data("placeholder");
            }

            id = element.attr(ID);

            if (id) {
                that._tagID = id + "_tag_active";

                id = id + "_taglist";
                that.tagList.attr(ID, id);
            }

            that._aria(id);
            that._dataSource();
            that._ignoreCase();
            that._popup();

            that._tagTemplate();
            that._initList();

            that._reset();
            that._enable();
            that._placeholder();

            if (options.autoBind) {
                that.dataSource.fetch();
            } else if (options.value) {
                that._preselect(options.value);
            }

            disabled = $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            }

            kendo.notify(that);
        },

        options: {
            name: "MultiSelect",
            tagMode: "multiple",
            enabled: true,
            autoBind: true,
            autoClose: true,
            highlightFirst: true,
            dataTextField: "",
            dataValueField: "",
            filter: "startswith",
            ignoreCase: true,
            minLength: 0,
            delay: 100,
            value: null,
            maxSelectedItems: null,
            placeholder: "",
            height: 200,
            animation: {},
            virtual: false,
            itemTemplate: "",
            tagTemplate: "",
            groupTemplate: "#:data#",
            fixedGroupTemplate: "#:data#"
        },

        events: [
            OPEN,
            CLOSE,
            CHANGE,
            SELECT,
            "filtering",
            "dataBinding",
            "dataBound"
        ],

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._state = "";
            this._dataSource();

            this.listView.setDataSource(this.dataSource);

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        setOptions: function(options) {
            var listOptions = this._listOptions(options);

            List.fn.setOptions.call(this, options);

            this.listView.setOptions(listOptions);

            this._accessors();
            this._aria(this.tagList.attr(ID));
            this._tagTemplate();
        },

        currentTag: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._currentTag) {
                    that._currentTag
                        .removeClass(FOCUSEDCLASS)
                        .removeAttr(ID);

                    that.input.removeAttr("aria-activedescendant");
                }

                if (candidate) {
                    candidate.addClass(FOCUSEDCLASS).attr(ID, that._tagID);

                    that.input
                        .attr("aria-activedescendant", that._tagID);
                }

                that._currentTag = candidate;
            } else {
                return that._currentTag;
            }
        },

        dataItems: function() {
            return this.listView.selectedDataItems();
        },

        destroy: function() {
            var that = this,
                ns = that.ns;

            clearTimeout(that._busy);
            clearTimeout(that._typingTimeout);

            that.wrapper.off(ns);
            that.tagList.off(ns);
            that.input.off(ns);

            List.fn.destroy.call(that);
        },

        _activateItem: function() {
            List.fn._activateItem.call(this);
            this.currentTag(null);
        },

        _listOptions: function(options) {
            var that = this;
            var listOptions = List.fn._listOptions.call(that, $.extend(options, {
                selectedItemChange: proxy(that._selectedItemChange, that),
                selectable: "multiple"
            }));

            var itemTemplate = this.options.itemTemplate || this.options.template;
            var template = listOptions.itemTemplate || itemTemplate || listOptions.template;

            if (!template) {
                template = "#:" + kendo.expr(listOptions.dataTextField, "data") + "#";
            }

            listOptions.template = template;

            return listOptions;
        },

        _setListValue: function() {
            List.fn._setListValue.call(this, this._initialValues.slice(0));
        },

        _listChange: function(e) {
            var data = this.dataSource.flatView();
            var optionsMap = this._optionsMap;
            var valueGetter = this._value;

            if (this._state === REBIND) {
                this._state = "";
            }

            for (var i = 0; i < e.added.length; i++) {
                if (optionsMap[valueGetter(e.added[i])] === undefined) {
                    this._render(data); //render select element <option> tags if the item does not persist in the current data view
                    break;
                }
            }

            this._selectValue(e.added, e.removed);
        },

        _selectedItemChange: function(e) {
            var items = e.items;
            var context;
            var idx;

            for (idx = 0; idx < items.length; idx++) {
                context = items[idx];
                this.tagList.children().eq(context.index).children("span:first").html(this.tagTextTemplate(context.item));
            }
        },

        _wrapperMousedown: function(e) {
            var that = this;
            var notInput = e.target.nodeName.toLowerCase() !== "input";
            var target = $(e.target);
            var closeButton = target.hasClass("k-select") || target.hasClass("k-icon");

            if (closeButton) {
                closeButton = !target.closest(".k-select").children(".k-i-arrow-s").length;
            }

            if (notInput && !(closeButton && kendo.support.mobileOS)) {
                e.preventDefault();
            }

            if (!closeButton) {
                if (that.input[0] !== activeElement() && notInput) {
                    that.input.focus();
                }

                if (that.options.minLength === 0) {
                    that.open();
                }
            }

        },

        _inputFocus: function() {
            this._placeholder(false);
            this.wrapper.addClass(FOCUSEDCLASS);
        },

        _inputFocusout: function() {
            var that = this;

            clearTimeout(that._typingTimeout);

            that.wrapper.removeClass(FOCUSEDCLASS);

            that._placeholder(!that.listView.selectedDataItems()[0], true);
            that.close();

            if (that._state === FILTER) {
                that._state = ACCEPT;
                that.listView.skipUpdate(true);
            }

            that.element.blur();
        },

        _removeTag: function(tag) {
            var that = this;
            var state = that._state;
            var position = tag.index();
            var listView = that.listView;
            var value = listView.value()[position];
            var customIndex = that._customOptions[value];
            var option;

            if (customIndex === undefined && (state === ACCEPT || state === FILTER)) {
                customIndex = that._optionsMap[value];
            }

            if (customIndex !== undefined) {
                option = that.element[0].children[customIndex];
                option.removeAttribute("selected");
                option.selected = false;

                listView.removeAt(position);
                tag.remove();
            } else {
                listView.select(listView.select()[position]);
            }

            that.currentTag(null);
            that._change();
            that._close();
        },

        _tagListClick: function(e) {
            var target = $(e.currentTarget);

            if (!target.children(".k-i-arrow-s").length) {
                this._removeTag(target.closest(LI));
            }
        },

        _editable: function(options) {
            var that = this,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that.wrapper.off(ns),
                tagList = that.tagList.off(ns),
                input = that.element.add(that.input.off(ns));

            if (!readonly && !disable) {
                wrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover)
                    .on("mousedown" + ns + " touchend" + ns, proxy(that._wrapperMousedown, that));

                that.input.on(KEYDOWN, proxy(that._keydown, that))
                    .on("paste" + ns, proxy(that._search, that))
                    .on("focus" + ns, proxy(that._inputFocus, that))
                    .on("focusout" + ns, proxy(that._inputFocusout, that));

                input.removeAttr(DISABLED)
                     .removeAttr(READONLY)
                     .attr(ARIA_DISABLED, false);

                tagList
                    .on(MOUSEENTER, LI, function() { $(this).addClass(HOVERCLASS); })
                    .on(MOUSELEAVE, LI, function() { $(this).removeClass(HOVERCLASS); })
                    .on(CLICK, "li.k-button .k-select", proxy(that._tagListClick, that));
            } else {
                if (disable) {
                    wrapper.addClass(STATEDISABLED);
                } else {
                    wrapper.removeClass(STATEDISABLED);
                }

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable);
            }
        },

        _close: function() {
            var that = this;
            if (that.options.autoClose) {
                that.close();
            } else {
                that.popup.position();
            }
        },

        _filterSource: function(filter, force) {
            if(!force) {
                force = this._retrieveData;
            }
            this._retrieveData = false;
            List.fn._filterSource.call(this, filter, force);
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this;

            if (that._request) {
                that._retrieveData = false;
            }

            if (that._retrieveData || !that.listView.bound() || that._state === ACCEPT) {
                that._open = true;
                that._state = REBIND;

                that.listView.skipUpdate(true);

                that._filterSource();
            } else if (that._allowSelection()) {
                that.popup.open();
                that._focusItem();
            }
        },

        toggle: function(toggle) {
            toggle = toggle !== undefined ? toggle : !this.popup.visible();

            this[toggle ? OPEN : CLOSE]();
        },

        refresh: function() {
            this.listView.refresh();
        },

        _listBound: function() {
            var that = this;
            var data = that.dataSource.flatView();
            var skip = that.listView.skip();
            var length = data.length;

            that._render(data);

            that._resizePopup();

            if (that._open) {
                that._open = false;
                that.toggle(length);
            }

            that.popup.position();

            if (that.options.highlightFirst && (skip === undefined || skip === 0)) {
                that.listView.focusFirst();
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._hideBusy();
            that._makeUnselectable();

            that.trigger("dataBound");
        },

        search: function(word) {
            var that = this;
            var options = that.options;
            var ignoreCase = options.ignoreCase;
            var field = options.dataTextField;
            var inputValue = that.input.val();
            var expression;
            var length;

            if (options.placeholder === inputValue) {
                inputValue = "";
            }

            clearTimeout(that._typingTimeout);

            word = typeof word === "string" ? word : inputValue;

            length = word.length;

            if (!length || length >= options.minLength) {
                that._state = FILTER;
                that._open = true;

                expression = {
                    value: ignoreCase ? word.toLowerCase() : word,
                    field: field,
                    operator: options.filter,
                    ignoreCase: ignoreCase
                };

                that._filterSource(expression);
            }
        },

        value: function(value) {
            var that = this;
            var listView = that.listView;
            var oldValue = listView.value().slice();
            var maxSelectedItems = that.options.maxSelectedItems;
            var clearFilters = listView.bound() && listView.isFiltered();

            if (value === undefined) {
                return oldValue;
            }

            value = that._normalizeValues(value);

            if (maxSelectedItems !== null && value.length > maxSelectedItems) {
                value = value.slice(0, maxSelectedItems);
            }

            if (clearFilters) {
                that._clearFilter();
            }

            listView.value(value);
            that._old = value;

            if (!clearFilters) {
                that._fetchData();
            }
        },

        _preselect: function(data, value) {
            var that = this;

            if (!isArray(data) && !(data instanceof kendo.data.ObservableArray)) {
                data = [data];
            }

            if ($.isPlainObject(data[0]) || data[0] instanceof kendo.data.ObservableObject || !that.options.dataValueField) {
                that.dataSource.data(data);
                that.value(value || that._initialValues);
                that._retrieveData = true;
            }
        },

        _setOption: function(value, selected) {
            var option = this.element[0].children[this._optionsMap[value]];

            if (option) {
                if (selected) {
                    option.setAttribute("selected", "selected");
                } else {
                    option.removeAttribute("selected");
                }

                option.selected = selected;
            }
        },

        _fetchData: function() {
            var that = this;
            var hasItems = !!that.dataSource.view().length;
            var isEmptyArray = that.listView.value().length === 0;

            if (isEmptyArray || that._request) {
                return;
            }

            if (that._retrieveData || (!that._fetch && !hasItems)) {
                that._fetch = true;
                that._retrieveData = false;
                that.dataSource.read().done(function() {
                    that._fetch = false;
                });
            }
        },

        _isBound: function() {
            return this.listView.bound() && !this._retrieveData;
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {};

            dataSource = isArray(dataSource) ? {data: dataSource} : dataSource;

            dataSource.select = element;
            dataSource.fields = [{ field: options.dataTextField },
                                 { field: options.dataValueField }];

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._progressHandler = proxy(that._showBusy, that);
                that._errorHandler = proxy(that._hideBusy, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(PROGRESS, that._progressHandler)
                                   .bind("error", that._errorHandler);
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(that._initialValues);
                        that._placeholder();
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _initValue: function() {
            var value = this.options.value || this.element.val();

            this._old = this._initialValues = this._normalizeValues(value);
        },

        _normalizeValues: function(value) {
            var that = this;

            if (value === null) {
                value = [];
            } else if (value && $.isPlainObject(value)) {
                value = [that._value(value)];
            } else if (value && $.isPlainObject(value[0])) {
                value = $.map(value, function(dataItem) { return that._value(dataItem); });
            } else if (!isArray(value) && !(value instanceof ObservableArray)) {
                value = [value];
            }

            return value;
        },

        _change: function() {
            var that = this,
                value = that.value();

            if (!compare(value, that._old)) {
                that._old = value.slice();

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _click: function(e) {
            var item = e.item;

            e.preventDefault();

            if (this.trigger(SELECT, { item: item })) {
                this._close();
                return;
            }

            this._select(item);
            this._change();
            this._close();
        },

        _keydown: function(e) {
            var that = this;
            var key = e.keyCode;
            var tag = that._currentTag;
            var current = that.listView.focus();
            var hasValue = that.input.val();
            var isRtl = kendo.support.isRtl(that.wrapper);
            var visible = that.popup.visible();

            if (key === keys.DOWN) {
                e.preventDefault();

                if (!visible) {
                    that.open();

                    if (!current) {
                        this.listView.focusFirst();
                    }
                    return;
                }

                if (current) {
                    this.listView.focusNext();
                    if (!this.listView.focus()) {
                        this.listView.focusLast();
                    }
                } else {
                    this.listView.focusFirst();
                }
            } else if (key === keys.UP) {
                if (visible) {
                    if (current) {
                        this.listView.focusPrev();
                    }

                    if (!this.listView.focus()) {
                        that.close();
                    }
                }
                e.preventDefault();
            } else if ((key === keys.LEFT && !isRtl) || (key === keys.RIGHT && isRtl)) {
                if (!hasValue) {
                    tag = tag ? tag.prev() : $(that.tagList[0].lastChild);
                    if (tag[0]) {
                        that.currentTag(tag);
                    }
                }
            } else if ((key === keys.RIGHT && !isRtl) || (key === keys.LEFT && isRtl)) {
                if (!hasValue && tag) {
                    tag = tag.next();
                    that.currentTag(tag[0] ? tag : null);
                }
            } else if (key === keys.ENTER && visible) {
                if (current) {
                    if (that.trigger(SELECT, {item: current})) {
                        that._close();
                        return;
                    }

                    that._select(current);
                }

                that._change();
                that._close();
                e.preventDefault();
            } else if (key === keys.ESC) {
                if (visible) {
                    e.preventDefault();
                } else {
                    that.currentTag(null);
                }

                that.close();
            } else if (key === keys.HOME) {
                if (visible) {
                    this.listView.focusFirst();
                } else if (!hasValue) {
                    tag = that.tagList[0].firstChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if (key === keys.END) {
                if (visible) {
                    this.listView.focusLast();
                } else if (!hasValue) {
                    tag = that.tagList[0].lastChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if ((key === keys.DELETE || key === keys.BACKSPACE) && !hasValue) {
                if (that.options.tagMode === "single") {
                    that.listView.value([]);
                    that._change();
                    that._close();
                    return;
                }

                if (key === keys.BACKSPACE && !tag) {
                    tag = $(that.tagList[0].lastChild);
                }

                if (tag && tag[0]) {
                    that._removeTag(tag);
                }
            } else {
                clearTimeout(that._typingTimeout);
                setTimeout(function() { that._scale(); });
                that._search();
            }
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that.input.attr("aria-busy", false);
            that._loading.addClass(HIDDENCLASS);
            that._request = false;
            that._busy = null;
        },

        _showBusyHandler: function() {
            this.input.attr("aria-busy", true);
            this._loading.removeClass(HIDDENCLASS);
        },

        _showBusy: function () {
            var that = this;

            that._request = true;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(proxy(that._showBusyHandler, that), 100);
        },

        _placeholder: function(show, skipCaret) {
            var that = this,
                input = that.input,
                active = activeElement();

            if (show === undefined) {
                show = false;
                if (input[0] !== active) {
                    show = !that.listView.selectedDataItems()[0];
                }
            }

            that._prev = "";
            input.toggleClass("k-readonly", show)
                 .val(show ? that.options.placeholder : "");

            if (input[0] === active && !skipCaret) {
                kendo.caret(input[0], 0, 0);
            }

            that._scale();
        },

        _scale: function() {
            var that = this,
                wrapper = that.wrapper,
                wrapperWidth = wrapper.width(),
                span = that._span.text(that.input.val()),
                textWidth;

            if (!wrapper.is(":visible")) {
                span.appendTo(document.documentElement);
                wrapperWidth = textWidth = span.width() + 25;
                span.appendTo(wrapper);
            } else {
                textWidth = span.width() + 25;
            }

            that.input.width(textWidth > wrapperWidth ? wrapperWidth : textWidth);
        },

        _option: function(dataValue, dataText, selected) {
            var option = "<option";

            if (dataValue !== undefined) {
                dataValue += "";

                if (dataValue.indexOf('"') !== -1) {
                    dataValue = dataValue.replace(quotRegExp, "&quot;");
                }

                option += ' value="' + dataValue + '"';
            }

            if (selected) {
                option += ' selected';
            }

            option += ">";

            if (dataText !== undefined) {
                option += kendo.htmlEncode(dataText);
            }

            return option += "</option>";
        },

        _render: function(data) {
            var selectedItems = this.listView.selectedDataItems();
            var values = this.listView.value();
            var length = data.length;
            var selectedIndex;
            var options = "";
            var dataItem;
            var value;
            var idx;

            if (values.length !== selectedItems.length) {
                selectedItems = this._buildSelectedItems(values);
            }

            var custom = {};
            var optionsMap = {};

            for (idx = 0; idx < length; idx++) {
                dataItem = data[idx];
                value = this._value(dataItem);

                selectedIndex = this._selectedItemIndex(value, selectedItems);
                if (selectedIndex !== -1) {
                    selectedItems.splice(selectedIndex, 1);
                }

                optionsMap[value] = idx;
                options += this._option(value, this._text(dataItem), selectedIndex !== -1);
            }

            if (selectedItems.length) {
                for (idx = 0; idx < selectedItems.length; idx++) {
                    dataItem = selectedItems[idx];

                    value = this._value(dataItem);
                    custom[value] = length;
                    optionsMap[value] = length;

                    length += 1;
                    options += this._option(value, this._text(dataItem), true);
                }
            }

            this._customOptions = custom;
            this._optionsMap = optionsMap;

            this.element.html(options);
        },

        _buildSelectedItems: function(values) {
            var valueField = this.options.dataValueField;
            var textField = this.options.dataTextField;
            var result = [];
            var item;

            for (var idx = 0; idx < values.length; idx++) {
                item = {};
                item[valueField] = values[idx];
                item[textField] = values[idx];

                result.push(item);
            }

            return result;
        },

        _selectedItemIndex: function(value, selectedItems) {
            var valueGetter = this._value;
            var idx = 0;

            for (; idx < selectedItems.length; idx++) {
                if (value === valueGetter(selectedItems[idx])) {
                    return idx;
                }
            }

            return -1;
        },

        _search: function() {
            var that = this;

            that._typingTimeout = setTimeout(function() {
                var value = that.input.val();
                if (that._prev !== value) {
                    that._prev = value;
                    that.search(value);
                }
            }, that.options.delay);
        },

        _allowSelection: function() {
            var max = this.options.maxSelectedItems;
            return max === null || max > this.listView.value().length;
        },

        _angularTagItems: function(cmd) {
            var that = this;

            that.angular(cmd, function() {
                return {
                    elements: that.tagList[0].children,
                    data: $.map(that.dataItems(), function(dataItem) {
                        return { dataItem: dataItem };
                    })
                };
            });
        },

        _selectValue: function(added, removed) {
            var that = this;
            var values = that.value();
            var total = that.dataSource.total();
            var tagList = that.tagList;
            var getter = that._value;
            var removedItem;
            var addedItem;
            var idx;

            that._angularTagItems("cleanup");

            if (that.options.tagMode === "multiple") {
                for (idx = removed.length - 1; idx > -1; idx--) {
                    removedItem = removed[idx];

                    tagList[0].removeChild(tagList[0].children[removedItem.position]);

                    that._setOption(getter(removedItem.dataItem), false);
                }

                for (idx = 0; idx < added.length; idx++) {
                    addedItem = added[idx];

                    tagList.append(that.tagTemplate(addedItem.dataItem));

                    that._setOption(getter(addedItem.dataItem), true);
                }
            } else {
                if (!that._maxTotal || that._maxTotal < total) {
                    that._maxTotal = total;
                }

                tagList.html("");

                if (values.length) {
                    tagList.append(that.tagTemplate({
                        values: values,
                        dataItems: that.dataItems(),
                        maxTotal: that._maxTotal,
                        currentTotal: total
                    }));
                }

                for (idx = removed.length - 1; idx > -1; idx--) {
                    that._setOption(getter(removed[idx].dataItem), false);
                }

                for (idx = 0; idx < added.length; idx++) {
                    that._setOption(getter(added[idx].dataItem), true);
                }
            }

            that._angularTagItems("compile");
            that._placeholder();
        },

        _select: function(candidate) {
            var that = this;

            if (that._state === REBIND) {
                that._state = "";
            }

            if (!that._allowSelection()) {
                return;
            }

            this.listView.select(candidate);

            that._placeholder();

            if (that._state === FILTER) {
                that._state = ACCEPT;
                that.listView.skipUpdate(true);
            }
        },

        _input: function() {
            var that = this,
                accessKey = that.element[0].accessKey,
                input = that._innerWrapper.children("input.k-input");

            if (!input[0]) {
                input = $('<input class="k-input" style="width: 25px" />').appendTo(that._innerWrapper);
            }

            that.element.removeAttr("accesskey");
            that._focused = that.input = input.attr({
                "accesskey": accessKey,
                "autocomplete": "off",
                "role": "listbox",
                "aria-expanded": false
            });
        },

        _tagList: function() {
            var that = this,
                tagList = that._innerWrapper.children("ul");

            if (!tagList[0]) {
                tagList = $('<ul role="listbox" unselectable="on" class="k-reset"/>').appendTo(that._innerWrapper);
            }

            that.tagList = tagList;
        },

        _tagTemplate: function() {
            var that = this;
            var options = that.options;
            var tagTemplate = options.tagTemplate;
            var hasDataSource = options.dataSource;
            var isMultiple = options.tagMode === "multiple";
            var defaultTemplate;

            if (that.element[0].length && !hasDataSource) {
                options.dataTextField = options.dataTextField || "text";
                options.dataValueField = options.dataValueField || "value";
            }

            defaultTemplate = isMultiple ? kendo.template("#:" + kendo.expr(options.dataTextField, "data") + "#", { useWithBlock: false }) : kendo.template("#:values.length# item(s) selected");

            that.tagTextTemplate = tagTemplate = tagTemplate ? kendo.template(tagTemplate) : defaultTemplate;

            that.tagTemplate = function(data) {
                return '<li class="k-button" unselectable="on"><span unselectable="on">' +
                        tagTemplate(data) +
                        '</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon ' +
                        (isMultiple ? "k-i-close" : "k-i-arrow-s") + '">' +
                        (isMultiple ? "delete" : "open") +
                        '</span></span></li>';
            };
        },

        _loader: function() {
            this._loading = $('<span class="k-icon k-loading ' + HIDDENCLASS + '"></span>').insertAfter(this.input);
        },

        _textContainer: function() {
            var computedStyles = kendo.getComputedStyles(this.input[0], styles);

            computedStyles.position = "absolute";
            computedStyles.visibility = "hidden";
            computedStyles.top = -3333;
            computedStyles.left = -3333;

            this._span = $("<span/>").css(computedStyles).appendTo(this.wrapper);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.k-multiselect");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-multiselect k-header" unselectable="on" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;
                wrapper[0].title = element[0].title;

                $('<div class="k-multiselect-wrap k-floatwrap" unselectable="on" />').insertBefore(element);
            }

            that.wrapper = wrapper.addClass(element[0].className).css("display", "");
            that._innerWrapper = $(wrapper[0].firstChild);
        }
    });

    function compare(a, b) {
        var length;

        if ((a === null && b !== null) || (a !== null && b === null)) {
            return false;
        }

        length = a.length;
        if (length !== b.length) {
            return false;
        }

        while (length--) {
            if (a[length] !== b[length]) {
                return false;
            }
        }

        return true;
    }

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
