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
        Widget = ui.Widget,
        keys = kendo.keys,
        browser = kendo.support.browser,
        ID = "id",
        CHANGE = "change",
        OPEN = "open",
        CLOSE = "close",
        FOCUSED = "k-state-focused",
        HIDE = ' style="display:none"',
        ns = ".kendoMultiSelect",
        styles = ["font-family",
                  "font-size",
                  "font-stretch",
                  "font-style",
                  "font-weight",
                  "letter-spacing",
                  "text-transform",
                  "line-height"];

    var MultiSelect = Widget.extend({

        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.attr("multiple", "multiple");

            that._wrapper();
            that._tagList();
            that._input();
            that._textContainer();

            that.input
                .on("click" + ns, function() {
                    that.list.width(that.wrapper.width());
                    that.open();
                })
                .on("blur" + ns, function() {
                    that.input[0].value = "";
                    if (that._state === "filter") {
                        that._state = "accept";
                    }
                })
                .on("keydown" + ns, $.proxy(that._keydown, that));

            that.wrapper
                .add(that._innerWraper)
                .on("click" + ns, function(e) {
                    if (e.target === e.currentTarget) {
                        that.input.focus().click();
                    }
                });

            that._templates();
            that._dataSource();
            that._accessors();

            that._list();
            that._popup();

            //list selected items
            that._dataItems = [];

            that.element.hide();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        options: {
            name: "MultiSelect",
            autoBind: true,
            delay: 100,
            height: 200,
            ignoreCase: true,
            filter: "startswith",
            dataTextField: "",
            dataValueField: "",
            minLength: 0
        },

        events: [

        ],

        destroy: function() {
            var that = this,
                ns = that.ns;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            /*that.ul.off(ns);
            that.list.off(ns);
            that.tagList.off(ns);*/

            that.popup.destroy();

            /*if (that._form) {
                that._form.off("reset", that._resetHandler);
            }*/
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

        close: function() {
            this.popup.close();
            this.current(null);
        },

        open: function() {
            var that = this,
                popup = that.popup;

            if (!that.ul[0].firstChild || that._state === "accept") {
                that._open = true;
                that._filterSource();
            } else {
                that.current($(first(that.ul[0])));
                popup.open();
            }
        },

        toggle: function(toggle) {
            this[toggle ? OPEN : CLOSE]();
        },

        refresh: function() {
            var that = this,
                length = that._render(that.dataSource.view());

            that._height(length);

            if (that._state !== "filter") {
                that.value(that.options.value); // || that.element.val());
            }

            if (that._open) {
                if (that._state === "accept") {
                    that._state = ""; //TODO: improve this
                }

                that._open = false;
                that.toggle(length);
            }
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

            length = values.length
            if (length) {
                for (idx = 0; idx < length; idx++) {
                    options += that._option(values[idx], true);
                }
            }

            that.ul[0].innerHTML = html;
            that.element.html(options);

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
                    break
                }
            }

            if (selected) {
                values.splice(idx, 1);
            }

            return selected;
        },

        _option: function(dataItem, selected) {
            var option = "<option",
                dataText = this._text(dataItem);
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

        search: function(word) {
            word = typeof word === "string" ? word : this.text();
            var that = this,
                length = word.length,
                options = that.options,
                ignoreCase = options.ignoreCase,
                filter = options.filter,
                field = options.dataTextField;

            clearTimeout(that._typing);

            if (length >= options.minLength) {
                that._state = "filter";
                that._open = true;

                that._filterSource({
                    value: ignoreCase ? word.toLowerCase() : word,
                    field: field,
                    operator: filter,
                    ignoreCase: ignoreCase
                });
            }
        },

        text: function() {
            return this.input.val();
        },

        _search: function() {
            var that = this;

            that._typing = setTimeout(function() {
                var value = that.text();
                if (that._prev !== value) {
                    that._prev = value;
                    that.search(value);
                }
            }, that.options.delay);
        },

        //refactor start
        _popup: function() {
            var that = this,
                input = that.input,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(that.list, $.extend({}, options.popup, {
                anchor: wrapper,
                open: function(e) {
                    that._adjustListWidth();

                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    } else {
                        /*input.attr("aria-expanded", true);
                        that.ul.attr("aria-hidden", false);*/
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    } else {
                        /*input.attr("aria-expanded", false);
                        that.ul.attr("aria-hidden", true);*/
                    }
                },
                animation: options.animation,
                isRtl: kendo.support.isRtl(wrapper)
            }));

            that._touchScroller = kendo.touchScroller(that.popup.element);
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

            if (!list.data("width") && width) {
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
            .data("width", width);

            return true;
        },

        _templates: function() {
            var that = this,
                options = that.options,
                itemTemplate = options.itemTemplate,
                tagTemplate = options.tagTemplate,
                hasDataSource = options.dataSource;

            if (that.element.is("select") && that.element[0].length) {
                if (!hasDataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            if (!itemTemplate) {
                itemTemplate = kendo.template("#:data" + (options.dataTextField ? "." : "") + options.dataTextField + "#", { useWithBlock: false });
            } else {
                itemTemplate = kendo.template(itemTemplate);
            }

            that.itemTemplate = function(data, idx, hide) {
                return '<li tabindex="-1" role="option" data-idx="' + idx + '" unselectable="on" class="k-item"' + (hide ? HIDE : "") + '>' + itemTemplate(data) + '</li>';
            }

            //TODO: use options.tagTemplate if defined
            that.tagTemplate = kendo.template('<li><span class="">#:data' + (options.dataTextField ? "." : "") + options.dataTextField + '#</span><span class="k-icon k-delete">delete</span></li>', { useWithBlock: false });
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler);
                           //.unbind(PROGRESS, that._progressHandler)
                           //.unbind(REQUESTEND, that._requestEndHandler);
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {},
                idx;

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            /*if (element.is(SELECT)) {
                idx = element[0].selectedIndex;
                if (idx > -1) {
                    options.index = idx;
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }*/

            dataSource.select = element;
            dataSource.fields = [{ field: options.dataTextField },
                                 { field: options.dataValueField }];

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = $.proxy(that.refresh, that);
                //that._progressHandler = proxy(that._showBusy, that);
                //that._requestEndHandler = proxy(that._requestEnd, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, that._refreshHandler);
                                   //.bind(PROGRESS, that._progressHandler)
                                   //.bind(REQUESTEND, that._requestEndHandler);
        },

        _input: function() {
            this.input = $('<input class="k-input" style="width: 25px" />')
                            .appendTo(this._innerWraper);
        },

        _textContainer: function() {
            var computedStyles = kendo.getComputedStyles(this.input[0], styles);
            computedStyles.position = "absolute";
            computedStyles.visibility = "hidden";

            this._span = $("<span/>").css(computedStyles).appendTo(this.wrapper);
        },

        _scale: function(character) {
            var that = this,
                wrapperWidth = that.wrapper.width(),
                textWidth;

            that._span.text(that.input.val() + character);
            textWidth = that._span.width() + 25;

            that.input.width(textWidth > wrapperWidth ? wrapperWidth : textWidth);
        },

        current: function(candidate) {
            var that = this;
                id = that._optionID;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current
                        .removeClass(FOCUSED)
                        .removeAttr("aria-selected")
                        .removeAttr(ID);

                    //that._focused
                    //    .removeAttr("aria-activedescendant");
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

        _item: function(item, direction) {
            item = item[direction]();

            if (item[0] && !item.is(":visible")) {
               item = this._item(item, direction);
            }

            return item;
        },

        _keydown: function(e) {
            var that = this,
                ul = that.ul[0],
                key = e.keyCode,
                current = that._current,
                visible = that.popup.visible();

            //that._last = key;

            if (key === keys.DOWN) {
                if (!visible) {
                    that.open();
                    return;
                }

                if (current) {
                    current = sibling(current[0], "nextSibling");
                    if (current) {
                        that.current($(current));
                    }
                }

                e.preventDefault();
            } else if (key === keys.UP) {
                if (visible && current) {
                    that.current($(sibling(current[0], "previousSibling")));

                    if (!that._current[0]) {
                        that.close();
                    }
                }
                e.preventDefault();
            } else if (key === keys.ENTER) {
                if (visible) {
                    that._select(current);
                    that.close();
                }
                e.preventDefault();
            } else if (key === keys.ESC) {
                if (visible) {
                    e.preventDefault();
                }

                that.close();
            } else {
                that._search();
                that._scale(String.fromCharCode(e.keyCode));
            }
        },

        _tagList: function() {
            var that = this;

            that.tagList = $('<ul unselectable="on" class="k-list k-reset"/>')
                                .appendTo(that._innerWraper)
                                .on("click" + ns, ".k-delete", function(e) {
                                    that._unselect($(e.target).closest("li"));
                                    that.close();
                                });
        },

        _removeTag: function(tag) {
            var that = this,
                index = tag.index();

            tag.remove();
            return that._dataItems.splice(index, 1);
        },

        value: function(value) {

            if (value !== undefined) {
                //TODO: check for null

                value = $.isArray(value) ? value : [value];


                //refactor this
                var index,
                    idx = 0,
                    tags = this.tagList.children(),
                    length = tags.length;

                for (; idx < length; idx++) {
                    this._unselect(tags.eq(idx));
                }

                for (idx = 0, length = value.length; idx < length; idx++) {
                    index = this._index(value[idx]);

                    if (index > -1) {
                        this._select(index);
                    }
                }
            } else {
                //TODO return: values of multiselect
                this.element.val(); //jquery loops all options if val() is called
            }
        },

        //copied from combobox
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

        //get index of the dataItem
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

        //select value
        _select: function(li) {
            var that = this, index, dataItem;

            if (!isNaN(li)) {
                index = li;
                $(that.ul[0].children[index]).hide();
            } else {
                index = li.hide().index();
            }

            dataItem = that.dataSource.view()[index];

            //if (dataItem) //TODO: check whether the dataItem exists

            var options = that.element[0].children,
                idx = 0,
                length = options.length,
                value =  that._value(dataItem);

            for (; idx < length; idx ++) {
                if (options[idx].value === value) {
                    options[idx].selected = true;
                    break;
                }
            }

            that.tagList.append($(that.tagTemplate(dataItem)));
            that._dataItems.push(dataItem);

            that.input.val("");

            if (that._state === "filter") {
                that._state = "accept";
            }
        },

        //unselect li element and remove tag
        _unselect: function(tag) {
            var that = this,
                dataItem = that._removeTag(tag),
                value, index;

            if (dataItem) {
                dataItem = dataItem[0]
            }

            value = that._value(dataItem);
            if (value === undefined) { //test this
                value = that._text(dataItem);
            }

            index = that._index(value); //that._value(dataItem));

            if (index !== -1) {
               $(that.ul[0].children[index]).show();
               that.element[0].children[index].selected = false;
            }
        },

        _click: function(e) {
            this._select($(e.currentTarget));
            this.close();
        },

        _list: function() {
            this.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
                        .css({ overflow: kendo.support.kineticScrollNeeded ? "": "auto" })
                        .on("click", "li.k-item", $.proxy(this._click, this));

            this.list = $("<div class='k-list-tags'/>")
                        .append(this.ul);
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

            that.wrapper = wrapper.addClass(element[0].className)
                                  .css("display", "");

            that._innerWraper = $(wrapper[0].firstChild);
        }
    });

    function first(ul) {
        item = ul.firstChild;

        if (item && item.style.display === "none") {
            item = sibling(item, "nextSibling");
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
