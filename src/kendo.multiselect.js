(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = {
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
        NEXT = "nextSibling",
        PREV = "previousSibling",
        HIDE = ' style="display:none"',
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
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
            var that = this, id, data;

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
            data = options.value;

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
            } else if (data) { //TODO: work with VirtualList
                if (!isArray(data)) {
                    data = [data];
                }

                if ($.isPlainObject(data[0]) || !options.dataValueField) {
                    that._retrieveData = true;
                    that.dataSource.data(data);
                    that.value(that._initialValues);
                }
            }

            kendo.notify(that);
        },

        options: {
            name: "MultiSelect",
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
            itemTemplate: "",
            tagTemplate: "",
            placeholder: "",
            height: 200,
            animation: {}
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

        //TODO: Consolidate with ui.Select
        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            this.listView.setDataSource(this.dataSource);

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        setOptions: function(options) {
            List.fn.setOptions.call(this, options);

            this.listView.setOptions(options);

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
            clearTimeout(that._typing);

            that.wrapper.off(ns);
            that.tagList.off(ns);
            that.input.off(ns);

            List.fn.destroy.call(that);
        },

        _initList: function() {
            var that = this;
            var options = this.options;
            var template = options.template || options.itemTemplate || "#:" + kendo.expr(options.dataTextField, "data") + "#";

            var listOptions = {
                autoBind: false,
                selectable: "multiple",
                height: options.height,
                dataSource: this.dataSource,
                dataValueField: options.dataValueField,
                groupTemplate: options.groupTemplate || "#:data#",
                fixedGroupTemplate: options.fixedGroupTemplate || "#:data#",
                template: template,
                activate: function() {
                    var current = this.focus();
                    if (current) {
                        that._focused.add(that.filterInput).attr("aria-activedescendant", current.attr("id"));
                    }

                    that.currentTag(null);
                },
                click: $.proxy(this._click, this),
                change: $.proxy(this._listChange, this),
                deactivate: function() {
                    that._focused.add(that.filterInput).removeAttr("aria-activedescendant");
                },
                dataBinding: function() {
                    that.trigger("dataBinding"); //TODO: make preventable
                    that._angularItems("cleanup");
                },
                listBound: $.proxy(this._listBound, this),
                dataBound: $.proxy(this._listBound, this)
            };

            if (options.virtual) {
                if (typeof options.virtual === "object") {
                    $.extend(listOptions, {
                        listBound: $.proxy(this._listBound, this)
                    }, options.virtual);
                }

                this.listView = new kendo.ui.VirtualList(this.ul, listOptions);
            } else {
                this.listView = new kendo.ui.StaticList(this.ul, listOptions);
            }

            this.listView.value(this._initialValues || this.options.value);
        },

        _listChange: function(e) {
            if (this._state === REBIND) {
                this._state = "";
                e.added = [];
            }

            this._selectValue(e.added, e.removed);
        },

        _wrapperMousedown: function(e) {
            var that = this;
            var notInput = e.target.nodeName.toLowerCase() !== "input";

            if (notInput) {
                e.preventDefault();
            }

            if (e.target.className.indexOf("k-delete") === -1) {
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

            clearTimeout(that._typing);

            that.wrapper.removeClass(FOCUSEDCLASS);

            that._placeholder(!that.listView.selectedDataItems()[0], true);
            that.close();

            if (that._state === FILTER) {
                that._state = ACCEPT;
                that.listView.filter(false);
            }

            that.element.blur();
        },

        _removeTag: function(tag) {
            var that = this;
            var position = tag.index();
            var listView = that.listView;
            var customIndex = that._customOptions[listView.value()[position]];
            var option;

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
            this._removeTag($(e.target).closest(LI));
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
                     .attr(ARIA_DISABLED, false)
                     .attr(ARIA_READONLY, false);

                tagList
                    .on(MOUSEENTER, LI, function() { $(this).addClass(HOVERCLASS); })
                    .on(MOUSELEAVE, LI, function() { $(this).removeClass(HOVERCLASS); })
                    .on(CLICK, ".k-delete", proxy(that._tagListClick, that));
            } else {
                if (disable) {
                    wrapper.addClass(STATEDISABLED);
                } else {
                    wrapper.removeClass(STATEDISABLED);
                }

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable)
                     .attr(ARIA_READONLY, readonly);
            }
        },

        _close: function() {
            var that = this;
            if (that.options.autoClose) {
                that.close();
            } else {
                that.popup._position();
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this;

            if (that._request) {
                that._retrieveData = false;
            }

            if (that._retrieveData || !that.listView.isBound() || that._state === ACCEPT) {
                that._open = true;
                that._state = REBIND;
                that._retrieveData = false;
                that.listView.filter(false);

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
            var data = this.dataSource.flatView();
            var length = data.length;

            that._angularItems("compile");

            that._render(data);

            that._calculateGroupPadding(that._height(length));

            if (that._open) {
                that._open = false;
                that.toggle(length);
            }

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that.options.highlightFirst) {
                that.listView.first();
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._makeUnselectable();

            that._hideBusy();
            that.trigger("dataBound");
        },

        search: function(word) {
            var that = this;
            var options = that.options;
            var ignoreCase = options.ignoreCase;
            var filter = options.filter;
            var field = options.dataTextField;
            var inputValue = that.input.val();
            var expression;
            var length;

            if (options.placeholder === inputValue) {
                inputValue = "";
            }

            clearTimeout(that._typing);

            word = typeof word === "string" ? word : inputValue;

            length = word.length;

            if (!length || length >= options.minLength) {
                that.listView.filter(true);
                that._state = FILTER;
                that._open = true;

                expression = {
                    value: ignoreCase ? word.toLowerCase() : word,
                    field: field,
                    operator: filter,
                    ignoreCase: ignoreCase
                };

                that._filterSource(expression, that._retrieveData);
                that._retrieveData = false;
            }
        },

        value: function(value) {
            var that = this;
            var oldValue = that.listView.value().slice();
            var maxSelectedItems = that.options.maxSelectedItems;
            var idx;

            if (value === undefined) {
                return oldValue;
            }

            value = that._normalizeValues(value);

            if (maxSelectedItems !== null && value.length > maxSelectedItems) {
                value = value.slice(0, maxSelectedItems);
            }

            that.listView.value(value);

            that._old = value;

            that._fetchData();
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

            if (isEmptyArray) {
                return;
            }

            if (!that._fetch && !hasItems) {
                that._fetch = true;
                that.dataSource.fetch().done(function() {
                    that._fetch = false;
                });
            }
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
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(PROGRESS, that._progressHandler);
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
                        this.listView.first();
                    }
                    return;
                }

                if (current) {
                    this.listView.next();
                    if (!this.listView.focus()) {
                        this.listView.last();
                    }
                } else {
                    this.listView.first();
                }
            } else if (key === keys.UP) {
                if (visible) {
                    if (current) {
                        this.listView.prev();
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
                    this.listView.first();
                } else if (!hasValue) {
                    tag = that.tagList[0].firstChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if (key === keys.END) {
                if (visible) {
                    this.listView.last();
                } else if (!hasValue) {
                    tag = that.tagList[0].lastChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if ((key === keys.DELETE || key === keys.BACKSPACE) && !hasValue) {
                if (key === keys.BACKSPACE && !tag) {
                    tag = $(that.tagList[0].lastChild);
                }

                if (tag && tag[0]) {
                    that._removeTag(tag);
                }
            } else {
                clearTimeout(that._typing);
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

        _option: function(dataItem, selected) {
            var option = "<option",
                dataText = this._text(dataItem),
                dataValue = this._value(dataItem);

            if (dataValue !== undefined) {
                dataValue += "";

                if (dataValue.indexOf('"') !== -1) {
                    dataValue = dataValue.replace(quotRegExp, "&quot;");
                }

                option += ' value="' + dataValue + '"';
            }

            if (selected) {
                option += ' selected="selected"';
            }

            option += ">";

            if (dataText !== undefined) {
                option += kendo.htmlEncode(dataText);
            }

            return option += "</option>";
        },

        _render: function(data) {
            var values = this.listView.value().slice(0);
            var length = data.length;
            var options = "";
            var dataItem;
            var idx = 0;
            var value;

            var custom = {};
            var optionsMap = {};

            for (; idx < length; idx++) {
                dataItem = data[idx];
                optionsMap[this._value(dataItem)] = idx;
                options += this._option(dataItem, this._selected(dataItem, values));
            }

            if (values.length) {
                for (idx = 0; idx < values.length; idx++) {
                    value = values[idx];
                    custom[value] = idx + length;
                    optionsMap[value] = idx + length;
                    options += this._option(value, true);
                }
            }

            this._customOptions = custom;
            this._optionsMap = optionsMap;

            this.element.html(options);
        },

        _selected: function(dataItem, values) {
            var that = this;
            var value = that._value(dataItem);
            var selected = false;
            var idx = 0;

            if (value === undefined) {
                value = that._text(dataItem);
            }

            for (; idx < values.length; idx++) {
                if (value === values[idx]) {
                    selected = true;
                    break;
                }
            }

            if (selected) {
                values.splice(idx, 1);
            }

            return selected;
        },

        _search: function() {
            var that = this;

            that._typing = setTimeout(function() {
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

        _selectValue: function(added, removed) {
            var tagList = this.tagList;
            var getter = this._value;
            var removedItem;
            var addedItem;
            var idx;

            for (idx = removed.length - 1; idx > -1; idx--) {
                removedItem = removed[idx];

                tagList[0].removeChild(tagList[0].children[removedItem.position]);

                this._setOption(getter(removedItem.dataItem), false);
            }

            for (idx = 0; idx < added.length; idx++) {
                addedItem = added[idx];

                tagList.append(this.tagTemplate(addedItem.dataItem));

                this._setOption(getter(addedItem.dataItem), true);
            }

            this._placeholder();
        },

        _select: function(candidate) {
            var that = this;
            var idx;

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
                that.listView.filter(false);
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

            if (that.element[0].length && !hasDataSource) {
                options.dataTextField = options.dataTextField || "text";
                options.dataValueField = options.dataValueField || "value";
            }

            tagTemplate = tagTemplate ? kendo.template(tagTemplate) : kendo.template("#:" + kendo.expr(options.dataTextField, "data") + "#", { useWithBlock: false });

            that.tagTemplate = function(data) {
                return '<li class="k-button" unselectable="on"><span unselectable="on">' + tagTemplate(data) + '</span><span unselectable="on" class="k-icon k-delete">delete</span></li>';
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

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
