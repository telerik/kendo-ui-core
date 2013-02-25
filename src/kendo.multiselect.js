kendo_module({
    id: "multiselect",
    name: "MultiSelect",
    category: "web",
    description: "The MultiSelect widget allows the selection from pre-defined values.",
    depends: [ "list" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        keys = kendo.keys,
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
        FOCUSEDCLASS = "k-state-focused",
        HOVERCLASS = "k-state-hover",
        DISABLEDCLASS = "k-state-disabled",
        DISABLEDATTR = "disabled",
        ns = ".kendoMultiSelect",
        CLICK = "click" + ns,
        MOUSEENTER = "mouseenter" + ns,
        MOUSELEAVE = "mouseleave" + ns,
        HOVEREVENTS = MOUSEENTER + " " + MOUSELEAVE,
        quotRegExp = /"/g,
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
            var that = this, id, value;

            that.ns = ns;
            List.fn.init.call(that, element, options);

            that._wrapper();
            that._tagList();
            that._input();
            that._textContainer();
            that._loader();

            that._tabindex(that.input);

            options = that.options;
            element = that.element.attr("multiple", "multiple").hide();

            if (!options.placeholder) {
                options.placeholder = element.data("placeholder");
            }

            that.input
                .on("keydown" + ns, proxy(that._keydown, that))
                .on("paste" + ns, proxy(that._search, that))
                .on("focus" + ns, function() { that._placeholder(false); })
                .on("blur" + ns, function() {
                    that._placeholder();
                    that.close();

                    if (that._state === FILTER) {
                        that._state = ACCEPT;
                    }
                });

            id = element.attr(ID);

            if (id) {
                that._tagID = id + "_tag_active";

                id = id + "_taglist";
                that.tagList.attr(ID, id);
            }

            that._aria(id);
            that._dataSource();
            that._ignoreCase();
            that._accessors();
            that._popup();

            that._values = [];
            that._dataItems = [];

            value = options.value || element.val();
            if (value === null) {
                value = [];
            }
            that._old = that._initialValues = value;
            that._setInitialValues = !!value[0];

            that._reset();
            that._enable();
            that._placeholder();

            if (options.autoBind) {
                that.dataSource.fetch();
            }

            kendo.notify(that);
        },

        options: {
            name: "MultiSelect",
            enable: true,
            autoBind: true,
            highlightFirst: true,
            dataTextField: "",
            dataValueField: "",
            filter: "startswith",
            ignoreCase: true,
            minLength: 0,
            delay: 100,
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

            that.wrapper.off(ns);
            that.tagList.off(ns);
            that.input.off(ns);

            List.fn.destroy.call(that);
        },

        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper.off(ns),
                tagList = that.tagList.off(ns),
                input = that.input.add(that.element);

            if (enable === false) {
                wrapper.addClass(DISABLEDCLASS);
                input.attr(DISABLEDATTR, DISABLEDATTR)
                     .attr(ARIA_DISABLED, true);
            } else {
                input.removeAttr(DISABLEDATTR)
                     .attr(ARIA_DISABLED, false);

                wrapper
                    .removeClass(DISABLEDCLASS)
                    .on(HOVEREVENTS, that._toggleHover)
                    .on("mousedown" + ns, function(e) {
                        e.preventDefault();

                        if (e.target.className.indexOf("k-delete") == -1) {
                            that.open();
                        }

                        if (that.input[0] !== document.activeElement) {
                            that.input.focus();
                        }
                    });

                tagList
                    .on(MOUSEENTER, LI, function() { $(this).addClass(HOVERCLASS); })
                    .on(MOUSELEAVE, LI, function() { $(this).removeClass(HOVERCLASS); })
                    .on(CLICK, ".k-delete", function(e) {
                        that._unselect($(e.target).closest(LI));
                        that._change();
                        that.close();
                    });
            }
        },

        close: function() {
            this.popup.close();
            this.current(null);
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild || that._state === ACCEPT) {
                that._state = "";
                that._open = true;
                that._filterSource();
            } else if (that._visibleItems && that._allowSelection()) {
                that.popup.open();
                that.current(that.options.highlightFirst ? $(first(that.ul[0])) : null);
            }
        },

        toggle: function(toggle) {
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

            if (that.popup.visible() && that.options.highlightFirst) {
                li = $(first(that.ul[0]));
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
                field = options.dataTextField;

            clearTimeout(that._typing);
            word = typeof word === "string" ? word : that.input.val();

            if (word.length >= options.minLength) {
                that._state = FILTER;
                that._open = true;

                that._filterSource({
                    value: ignoreCase ? word.toLowerCase() : word,
                    field: field,
                    operator: filter,
                    ignoreCase: ignoreCase
                });
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
                value = $.isArray(value) ? value : [value];

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

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

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
                form = element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(that._initialValues);
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _filterSource: function(filter) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                expression = dataSource.filter() || {};

            removeFiltersForField(expression, options.dataTextField);

            if (filter) {
                expression = expression.filters || [];
                expression.push(filter);
            }

            dataSource.filter(expression);
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
                    that.close();
                    return;
                }

                that._select(li);
                that._change();
                that.close();
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
                    current = that.ul[0].firstChild;
                }

                if (current) {
                    that.current($(current));
                }
            } else if (key === keys.UP) {
                if (visible) {
                    if (current) {
                        current = sibling(current[0], PREV);
                    } else {
                        current = that.ul[0].lastChild;
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
            } else if (key === keys.ENTER) {
                if (visible) {
                    that._select(current);
                    that._change();
                    that.close();

                    e.preventDefault();
                }
            } else if (key === keys.ESC) {
                if (visible) {
                    e.preventDefault();
                } else {
                    that.currentTag(null);
                }

                that.close();
            } else if (key === keys.HOME) {
                if (visible) {
                    that.current($(first(that.ul[0])));
                } else if (!hasValue) {
                    tag = that.tagList[0].firstChild;

                    if (tag) {
                        that.currentTag($(tag));
                    }
                }
            } else if (key === keys.END) {
                if (visible) {
                    that.current($(last(that.ul[0])));
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
                    that.close();
                }
            } else {
                that._search();
            }
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that._loading.hide();
            that.input.attr("aria-busy", false);
            that._busy = null;
        },

        _showBusy: function () {
            var that = this;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function () {
                that.input.attr("aria-busy", true);
                that._loading.show();
            }, 100);
        },

        _placeholder: function(show) {
            var that = this,
                input = that.input;

            if (show === undefined) {
                show = false;
                if (input[0] !== document.activeElement) {
                    show = !that._dataItems[0];
                }
                that.wrapper.removeClass(FOCUSEDCLASS);
            } else {
                that.wrapper.addClass(FOCUSEDCLASS);
            }

            input.toggleClass("k-readonly", show)
                 .val(show ? that.options.placeholder : "");

            that._scale();
        },

        _scale: function() {
            var that = this,
                wrapperWidth = that.wrapper.width(),
                textWidth = that._span.text(that.input.val()).width() + 25;

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
                    that._scale();
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
                return '<li class="k-button"><span>' + tagTemplate(data) + '</span><span class="k-icon k-delete">delete</span></li>';
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
            this._loading = $('<span class="k-loading" style="display:none"></span>').insertAfter(this.input);
        },

        _textContainer: function() {
            var computedStyles = kendo.getComputedStyles(this.input[0], styles);

            computedStyles.position = "absolute";
            computedStyles.visibility = "hidden";

            this._span = $("<span/>").css(computedStyles).appendTo(this.wrapper);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.k-multiselect");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-multiselect k-header" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;

                $('<div class="k-multiselect-wrap floatWrap" />').insertBefore(element);
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

        return item;
    }

    function last(ul) {
        var item = ul.lastChild;

        if (item && item.style.display === "none") {
            item = sibling(item, PREV);
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

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);
