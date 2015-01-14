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

            that._values = [];
            that._dataItems = [];

            that._reset();
            that._enable();
            that._placeholder();

            if (options.autoBind) {
                that.dataSource.fetch();
            } else if (data) {
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

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        setOptions: function(options) {
            List.fn.setOptions.call(this, options);

            this._template();
            this._accessors();
            this._aria(this.tagList.attr(ID));
        },

        current: function(candidate) {
            this.currentTag(null);
            return List.fn.current.call(this, candidate);
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
            return this._dataItems;
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

            that._placeholder(!that._dataItems[0], true);
            that.close();

            if (that._state === FILTER) {
                that._state = ACCEPT;
            }

            that.element.blur();
        },

        _tagListClick: function(e) {
            this._unselect($(e.target).closest(LI));
            this._change();
            this.close();
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
            if (that.options.autoClose || !that._visibleItems) {
                that.close();
            } else {
                that.current(that.options.highlightFirst ? first(that.ul[0]) : null);
                that.popup._position();
            }
        },

        close: function() {
            this.popup.close();
            this.current(null);
        },

        open: function() {
            var that = this;

            if (that._request) {
                that._retrieveData = false;
            }

            if (!that.ul[0].firstChild || that._state === ACCEPT || that._retrieveData) {
                that._state = "";
                that._open = true;
                that._retrieveData = false;
                that._filterSource();
            } else if (that._visibleItems && that._allowSelection()) {
                that.popup.open();
                that.current(that.options.highlightFirst ? first(that.ul[0]) : null);
            }
        },

        toggle: function(toggle) {
            toggle = toggle !== undefined ? toggle : !this.popup.visible();

            this[toggle ? OPEN : CLOSE]();
        },

        refresh: function() {
            var that = this,
                li = null,
                length;

            that.trigger("dataBinding");

            length = that._render(that.dataSource.view());
            that._height(length);

            if (that._setInitialValues) {
                that._setInitialValues = false;
                that.value(that._initialValues);
            }

            if (that._open) {
                that._open = false;
                that.toggle(length);
            }

            if (that.popup.visible()) {
                that.popup._position();

                if (that.options.highlightFirst) {
                    li = first(that.ul[0]);
                }
            }

            that.current(li);

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._makeUnselectable();

            that._hideBusy();
            that.trigger("dataBound");
        },

        search: function(word) {
            var that = this,
                options = that.options,
                ignoreCase = options.ignoreCase,
                filter = options.filter,
                field = options.dataTextField,
                inputValue = that.input.val(),
                expression,
                length;

            if (options.placeholder === inputValue) {
                inputValue = "";
            }

            clearTimeout(that._typing);

            word = typeof word === "string" ? word : inputValue;

            length = word.length;

            if (!length || length >= options.minLength) {
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
            var that = this,
                tags = $(that.tagList[0].children),
                length = tags.length,
                dataItemIndex,
                idx = 0;

            if (value === undefined) {
                return that._values;
            }

            if (that._fetchItems(value)) {
                return;
            }

            for (; idx < length; idx++) {
                that._unselect(tags.eq(idx));
            }

            if (value !== null) {
                value = isArray(value) || value instanceof ObservableArray ? value : [value];

                for (idx = 0, length = value.length; idx < length; idx++) {
                    dataItemIndex = that._index(value[idx]);
                    if (dataItemIndex > -1) {
                        that._select(dataItemIndex);
                    }
                }

                that._old = that._values.slice();
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
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._showBusy, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, that._refreshHandler)
                                   .bind(PROGRESS, that._progressHandler);
        },

        _fetchItems: function(value) {
            var that = this;
            var isEmptyArray = $.isArray(value) && value.length === 0;

            if (isEmptyArray || !value) {
                return;
            }

            if (!that._fetch && !that.ul[0].firstChild) {
                that.dataSource.one(CHANGE, function() {
                    that.value(value);
                    that._fetch = false;
                });

                that._fetch = true;
                that.dataSource.fetch();

                return true;
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
                        that.value(that._initialValues);
                        that._placeholder();
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _initValue: function() {
            var that = this,
                value = that.options.value || that.element.val();

            if (value === null) {
                value = [];
            } else {
                if (!isArray(value)) {
                    value = [value];
                }

                value = that._mapValues(value);
            }

            that._old = that._initialValues = value;
            that._setInitialValues = value[0] !== undefined;
        },

        _mapValues: function(values) {
            var that = this;

            if (values && $.isPlainObject(values[0])) {
                values = $.map(values, function(dataItem) { return that._value(dataItem); });
            }

            return values;
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
            var that = this,
                li = $(e.currentTarget);

            if (!e.isDefaultPrevented()) {
                if (that.trigger(SELECT, {item: li})) {
                    that._close();
                    return;
                }

                that._select(li);
                that._change();
                that._close();
            }
        },

        _item: function(item, direction) {
            item = item[direction]();

            if (item[0] && !item.is(":visible")) {
               item = this._item(item, direction);
            }

            return item;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                tag = that._currentTag,
                current = that._current,
                hasValue = that.input.val(),
                isRtl = kendo.support.isRtl(that.wrapper),
                visible = that.popup.visible();

            if (key === keys.DOWN) {
                e.preventDefault();

                if (!visible) {
                    that.open();
                    return;
                }

                if (current) {
                    current = sibling(current[0], NEXT);
                } else {
                    current = first(that.ul[0]);
                }

                if (current) {
                    that.current($(current));
                }
            } else if (key === keys.UP) {
                if (visible) {
                    if (current) {
                        current = sibling(current[0], PREV);
                    } else {
                        current = last(that.ul[0]);
                    }

                    that.current($(current));

                    if (!that._current[0]) {
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
                    that.current(first(that.ul[0]));
                } else if (!hasValue) {
                    tag = that.tagList[0].firstChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if (key === keys.END) {
                if (visible) {
                    that.current(last(that.ul[0]));
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
                    that._unselect(tag);
                    that._change();
                    that._close();
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
                    show = !that._dataItems[0];
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
            var that = this,
                length = data.length,
                template = that.itemTemplate,
                values = that._dataItems.slice(0),
                visibleItems = 0, idx = 0,
                options = "", html = "",
                dataItem, selected;

            for (; idx < length; idx++) {
                dataItem = data[idx];
                selected = that._selected(values, dataItem);

                html += template(dataItem, idx, selected);
                options += that._option(dataItem, selected);

                if (!selected) {
                    visibleItems += 1;
                }
            }

            length = values.length;
            if (length) {
                for (idx = 0; idx < length; idx++) {
                    options += that._option(values[idx], true);
                }
            }

            that.ul[0].innerHTML = html;
            that.element.html(options);
            that._visibleItems = visibleItems;

            return visibleItems;
        },

        _selected: function(values, dataItem) {
            var that = this,
                textAccessor = that._text,
                valueAccessor = that._value,
                value = valueAccessor(dataItem),
                length = values.length,
                selected = false,
                dataValue,
                idx = 0;

            if (value === undefined) {
                value = textAccessor(dataItem);
            }

            for (; idx < length; idx++) {
                dataItem = values[idx];
                dataValue = valueAccessor(dataItem);

                if (dataValue === undefined) {
                    dataValue = textAccessor(dataItem);
                }

                if (dataValue !== undefined && dataValue === value) {
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
            return max === null || max > this._values.length;
        },

        _select: function(li) {
            var that = this,
                values = that._values,
                dataItem,
                idx;

            if (!that._allowSelection()) {
                return;
            }

            if (!isNaN(li)) {
                idx = li;
                that.ul[0].children[idx].style.display = "none";
            } else {
                idx = li.hide().data("idx");
            }

            that.element[0].children[idx].selected = true;

            dataItem = that.dataSource.view()[idx];

            that.tagList.append(that.tagTemplate(dataItem));
            that._dataItems.push(dataItem);
            values.push(that._dataValue(dataItem));

            that._visibleItems -= 1;
            that.currentTag(null);
            that._placeholder();
            that._height(that._visibleItems);

            if (that._state === FILTER) {
                that._state = ACCEPT;
            }
        },

        _unselect: function(tag) {
            var that = this,
                index = tag.index(),
                dataItem, value,
                options, option, length;

            tag.remove();
            that.currentTag(null);

            that._values.splice(index, 1);
            dataItem = that._dataItems.splice(index, 1)[0];

            value = that._dataValue(dataItem);
            index = that._index(value);

            if (index !== -1) {
               $(that.ul[0].children[index]).show();
               that.element[0].children[index].selected = false;
               that._visibleItems += 1;
               that._height(that._visibleItems);
            } else {
                index = that.dataSource.view().length;
                options = that.element[0].children;
                length = options.length;

                for (; index < length; index++) {
                    option = options[index];
                    if (option.value == value) {
                        option.selected = false;
                        break;
                    }
                }
            }

            that._placeholder();
        },

        _template: function() {
            var that = this,
                options = that.options,
                itemTemplate = options.itemTemplate,
                tagTemplate = options.tagTemplate,
                hasDataSource = options.dataSource,
                textTemplate;

            if (that.element[0].length && !hasDataSource) {
                options.dataTextField = options.dataTextField || "text";
                options.dataValueField = options.dataValueField || "value";
            }

            textTemplate = kendo.template("#:" + kendo.expr(options.dataTextField, "data") + "#", { useWithBlock: false });

            itemTemplate = itemTemplate ? kendo.template(itemTemplate) : textTemplate;
            tagTemplate = tagTemplate ? kendo.template(tagTemplate) : textTemplate;

            that.itemTemplate = function(data, idx, hide) {
                return '<li tabindex="-1" role="option" data-idx="' + idx + '" unselectable="on" class="k-item"' + (hide ? HIDE : "") + '>' + itemTemplate(data) + '</li>';
            };

            that.tagTemplate = function(data) {
                return '<li class="k-button" unselectable="on"><span unselectable="on">' + tagTemplate(data) + '</span><span unselectable="on" class="k-icon k-delete">delete</span></li>';
            };
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

    function first(ul) {
        var item = ul.firstChild;

        if (item && item.style.display === "none") {
            item = sibling(item, NEXT);
        }

        if (item) {
            return $(item);
        }

        return item;
    }

    function last(ul) {
        var item = ul.lastChild;

        if (item && item.style.display === "none") {
            item = sibling(item, PREV);
        }

        if (item) {
            return $(item);
        }

        return item;
    }

    function sibling(item, direction) {
        item = item[direction];

        if (item && item.style.display === "none") {
            item = sibling(item, direction);
        }

        return item;
    }

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
