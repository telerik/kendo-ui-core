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
        CHANGE = "change",
        ns = ".kendoMultiSelect";

    var MultiSelect = Widget.extend({

        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.attr("multiple", "multiple");

            that._wrapper();
            that._tagList();
            that._input();

            that.input
                .on("click" + ns, function() {
                    that.list.width(that.wrapper.width());
                    that.open();
                })
                .on("blur" + ns, function() {
                    this.value = "";

                    //TODO should be implemented correctly
                    //if (that._state === "filter") {
                        that._state = "accept";
                    //}
                })
                .on("keydown" + ns, function(e) {
                    that._search();
                });

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

        close: function() {
            var that = this,
                popup = that.popup;

            popup.close();
        },

        _buildFilters: function(filter) {
            var options = this.options,
                dataItems = this._dataItems,
                ignoreCase = options.ignoreCase,
                field = options.dataTextField,
                length = dataItems.length,
                idx = 0, dataItem, value,
                filters = [];

            for(; idx < length; idx++) {
                dataItem = dataItems[idx];
                value = dataItem[field];

                filters.push({
                    value: ignoreCase ? value.toLowerCase() : value,
                    field: field,
                    operator: "neq",
                    ignoreCase: ignoreCase
                });
            }

            if (filter) {
                filters.push(filter);
            }

            return filters;
        },

        _filterSource: function(filter) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                expression = dataSource.filter() || {}
                filters = that._buildFilters(filter);

            removeFiltersForField(expression, options.dataTextField);

            if (filters[0]) {
                expression = expression.filters || [];
                expression = expression.concat(filters);
            }

            dataSource.filter(expression);
        },

        open: function() {
            var that = this,
                popup = that.popup;

            if (that._state === "accept") {
                //rebind and open
                that._open = true;
                that._filterSource();
            } else {
                popup.open();
            }
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.itemTemplate, data);

            if (that._open) {
                that._state = "";
                that.open()
                that._open = false;
            }

            if (that._state !== "filter") {
                that.value(that.options.value); // || that.element.val());
            }
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

        _popup: function() {
            var that = this,
                list = that.list,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(list, $.extend({}, options.popup, {
                anchor: wrapper,
                isRtl: kendo.support.isRtl(wrapper)
            }));
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
                that.itemTemplate = kendo.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${data' + (options.dataTextField ? "." : "") + options.dataTextField + "}</li>", { useWithBlock: false });
            } else {
                itemTemplate = kendo.template(itemTemplate);
                that.itemTemplate = function(data) {
                    return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + itemTemplate(data) + "</li>";
                };
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

        _tagList: function() {
            var that = this;

            that.tagList = $('<ul unselectable="on" class="k-list k-reset"/>')
                                .appendTo(that._innerWraper)
                                .on("click" + ns, ".k-delete", function(e) {
                                    that._unselect($(e.target).closest("li"));
                                    that.close();
                                });
        },

        _addTag: function(dataItem, index) {
            var that = this,
                tag = $(that.tagTemplate(dataItem));

            that.tagList.append(tag);

            tag.data("index", index);

            //add data item
            that._dataItems.push(dataItem);
        },

        _removeTag: function(tag) {
            var that = this,
                index = tag.index(),
                optionIndex = tag.data("index");

            that._dataItems.splice(index, 1);
            tag.remove();

            return optionIndex;
        },

        value: function(value) {

            if (value !== undefined) {
                //TODO: check for null

                if ($.isArray(value)) {
                    var index, tags = this.tagList.children();

                    for (var idx = 0, length = tags.length; idx < length; idx++) {
                        this._unselect(tags.eq(idx));
                    }

                    for (var idx = 0, length = value.length; idx < length; idx++) {
                        index = this._index(value[idx]);

                        if (index > -1) {
                            this._select(index);
                        }
                    }

                } else {
                    var index = this._index(value),
                        tags = this.tagList.children();

                    for (var idx = 0, length = tags.length; idx < length; idx++) {
                        this._unselect(tags.eq(idx));
                    }

                    if (index > -1) {
                        this._select(index);
                    }
                }
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

        //select li element and create tag
        _select: function(li) {
            var that = this, index, dataItem;

            if (!isNaN(li)) {
                index = li;
                $(that.ul[0].children[index]).hide();
            } else {
                index = li.hide().index();
            }

            dataItem = that.dataSource.view()[index];

            var options = that.element[0].children,
                idx = 0,
                length = options.length,
                value =  kendo.getter(that.options.dataValueField)(dataItem);

            for (; idx < length; idx ++) {
                if (options[idx].value === value) {
                    options[idx].selected = true;
                    break;
                }
            }

            that._addTag(dataItem, idx);

            that.input.val("");
        },

        //unselect li element and remove tag
        _unselect: function(tag) {
            var that = this,
                index = that._removeTag(tag);

            $(that.ul[0].children[index]).show();
            that.element[0].children[index].selected = false;
        },

        _click: function(e) {
            this._select($(e.currentTarget));
            this._state = "accept";
            this.close();
        },

        _list: function() {
            this.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
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
