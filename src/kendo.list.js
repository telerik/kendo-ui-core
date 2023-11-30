import "./kendo.data.js";
import "./kendo.popup.js";
import "./kendo.label.js";
import "./kendo.icons.js";
import "./kendo.actionsheet.js";

var __meta__ = {
    id: "list",
    name: "List",
    category: "framework",
    depends: [ "data", "popup", "label", "icons", "actionsheet" ],
    hidden: true
};


(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        outerHeight = kendo._outerHeight,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        Widget = ui.Widget,
        keys = kendo.keys,
        support = kendo.support,
        htmlEncode = kendo.htmlEncode,
        activeElement = kendo._activeElement,
        outerWidth = kendo._outerWidth,
        ObservableArray = kendo.data.ObservableArray,
        ID = "id",
        CHANGE = "change",
        FOCUSED = "k-focus",
        HOVER = "k-hover",
        KSELECTED = "k-selected",
        LOADING = "k-i-loading k-input-loading-icon",
        LIST = "k-list",
        TABLE = "k-table",
        DATA_TABLE = "k-data-table",
        TABLE_MD = "k-table-md",
        LIST_UL = "k-list-ul",
        TABLE_LIST = "k-table-list",
        FIXED_GROUP_HEADER = ".k-list-group-sticky-header",
        GROUP_LABEL = ".k-list-item-group-label",
        ITEMSELECTOR = ".k-list-item",
        ITEMSELECTORTABLE = ".k-table-row",
        OPEN = "open",
        CLOSE = "close",
        CASCADE = "cascade",
        SELECT = "select",
        CLICK = "click",
        MOUSELEAVE = "mouseleave",
        MOUSEENTER = "mouseenter",
        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",
        DATA_BINDING = "dataBinding",
        DATA_BOUND = "dataBound",
        SELECTED_ITEM_CHANGE = "selectedItemChange",
        SELECTED = "selected",
        REQUESTSTART = "requestStart",
        REQUESTEND = "requestEnd",
        BLUR = "blur",
        FOCUS = "focus",
        FOCUSOUT = "focusout",
        extend = $.extend,
        isArray = Array.isArray,
        browser = support.browser,
        HIDDENCLASS = "k-hidden",
        WIDTH = "width",
        TEXT = "text",
        VALUE = "value",
        isIE = browser.msie,
        quotRegExp = /"/g,
        alternativeNames = {
            "ComboBox": [ "DropDownList", "MultiColumnComboBox" ],
            "DropDownList": [ "ComboBox", "MultiColumnComboBox" ],
            "MultiColumnComboBox": [ "ComboBox", "DropDownList" ]
        },

        UL_EL = '<ul unselectable="on"/>',
        LIST_EL = "<div class='k-list'/>",
        NO_DATA_EL = '<div class="k-no-data"></div>',
        LIST_FOOTER_EL = '<div class="k-list-footer"></div>',
        TABLE_FOOTER_EL = '<div class="k-table-footer">' +
                '<span class="k-table-td"></span>' +
            '</div>',
        MOUSEDOWN = "mousedown",
        LIST_SUFFIX = "-list",
        LISTBOX_SUFFIX = "_listbox",
        ARIA_LABELLEDBY = "aria-labelledby",
        ARIA_LABEL = "aria-label",
        ARIA_ACTIVEDESCENDANT = "aria-activedescendant",
        ARIA_AUTOCOMPLETE = "aria-autocomplete",
        ARIA_CONTROLS = "aria-controls",
        ARIA_LIVE = "aria-live",
        ARIA_EXPANDED = "aria-expanded",
        ARIA_HIDDEN = "aria-hidden",
        ARIA_BUSY = "aria-busy",
        ARIA_MULTISELECTABLE = "aria-multiselectable",
        ARIA_SELECTED = "aria-selected",
        GROUP_ROW_SEL = ".k-table-group-row",
        ACTIONSHEET_TITLEBAR = ".k-actionsheet-titlebar";

    var List = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            var that = this,
                id;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            that._isSelect = element.is(SELECT);

            if (that._isSelect && that.element[0].length) {
                if (!options.dataSource) {
                    options.dataTextField = options.dataTextField || TEXT;
                    options.dataValueField = options.dataValueField || VALUE;
                }
            }

            if (options.adaptiveMode === "auto") {
                that.largeMQL = kendo.mediaQuery("large");
                that.mediumMQL = kendo.mediaQuery("medium");
                that.smallMQL = kendo.mediaQuery("small");
            }

            that._listSize = kendo.cssProperties.getValidClass({
                widget: "List",
                propName: "size",
                value: options.size
            });

            that._filterHeader();

            that.ul = $(UL_EL).attr({
                tabIndex: -1,
                "aria-hidden": true
            });

            that.list = $(LIST_EL)
                .addClass(that._listSize)
                .append(that.ul);

            id = element.attr(ID);

            if (!id) {
                id = kendo.guid();
            }

            that.list.attr(ID, id + LIST_SUFFIX);
            that.ul.attr(ID, id + LISTBOX_SUFFIX);

            if (options.columns && options.columns.length) {
                that.list.removeClass(LIST).addClass(DATA_TABLE);
                that.list.removeClass(that._listSize).addClass(TABLE_MD);

                that.ul.removeClass(LIST_UL).addClass(TABLE);

                that._columnsHeader();
            }

            that._header();
            that._noData();
            that._footer();
            that._accessors();
            that._initValue();
        },

        options: {
            valuePrimitive: false,
            footerTemplate: "",
            headerTemplate: "",
            noDataTemplate: true,
            size: "medium",
            messages: {
                "noData": "No data found.",
                "clear": "clear"
            },
            adaptiveMode: "none"
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (options && options.enable !== undefined) {
                options.enabled = options.enable;
            }

            if (options.columns && options.columns.length) {
                this._columnsHeader();
            }

            this._header();
            this._noData();
            this._footer();

            this._renderFooter();
            this._renderNoData();

            if (options.label && this._inputLabel) {
                this.label.setOptions(options.label);
            } else if (options.label === false) {
                this.label._unwrapFloating();
                this._inputLabel.remove();
                delete this._inputLabel;
            } else if (options.label) {
                this._label();
            }
        },

        focus: function() {
            this._focused.trigger(FOCUS);
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });

            if (this.label && this.label.floatingLabel) {
                this.label.floatingLabel.readonly(readonly === undefined ? true : readonly);
            }
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });

            if (this.label && this.label.floatingLabel) {
                this.label.floatingLabel.enable(enable = enable === undefined ? true : enable);
            }
        },

        _label: function() {
            var that = this;
            var options = that.options;
            var labelOptions = $.isPlainObject(options.label) ? options.label : {
                content: options.label
            };

            that.label = new kendo.ui.Label(null, $.extend({}, labelOptions, {
                widget: that,
                floatCheck: that._floatCheck.bind(that)
            }));

            that._inputLabel = that.label.element;
        },

        _floatCheck: function() {
            if (this.listView) {
                var hasValue = this.value() || (this.text ? this.text() : false);
                return !hasValue && !this.popup.visible();
            }

            return true;
        },

        _refreshFloatingLabel: function() {
            var that = this;

            if (that.label && that.label.floatingLabel) {
                that.label.floatingLabel.refresh();
            }
        },

        _header: function() {
            var list = this;
            var header = $(list.header);
            var template = list.options.headerTemplate;

            kendo.destroy(header);
            header.remove();

            if (!template) {
                list.header = null;
                return;
            }

            var headerTemplate = typeof template !== "function" ? kendo.template(template) : template;
            header = $(headerTemplate({}));

            list.header = header[0] ? header : null;

            if (list.list.parent.length > 0) {
                list.list.before(header);
            }
        },

        _filterHeader: function() {
            this.filterTemplate = '<div class="k-list-filter">' +
                '<span class="k-searchbox k-input k-input-md k-rounded-md k-input-solid" type="text" autocomplete="off">' +
                    kendo.ui.icon({ icon: "search", iconClass: "k-input-icon" }) +
                '</span>' +
            '</div>';

            this.actionSheetFilterTemplate = `<div class="k-actionsheet-titlebar-group k-actionsheet-filter">${this.filterTemplate}</div>`;

            if (this._isFilterEnabled()) {
                this.filterInput = $('<input class="k-input-inner" type="text" />')
                    .attr({
                        placeholder: this.element.attr("placeholder"),
                        title: this.options.filterTitle || this.element.attr("title"),
                        role: "searchbox",
                        "aria-label": this.options.filterTitle,
                        "aria-haspopup": "listbox",
                        "aria-autocomplete": "list"
                    });
            }
        },

        _columnsHeader: function() {
            var list = this;
            var $header;
            var columnsHeader = $(list.columnsHeader);

            kendo.destroy(columnsHeader);
            columnsHeader.remove();

            var header = "<div class='k-table-header'><div class='k-table-header-wrap'><table class='k-table' role='presentation'>";
            var colGroup = "<colgroup>";
            var row = "<tr class='k-table-row'>";

            for (var idx = 0; idx < this.options.columns.length; idx++) {
                var currentColumn = this.options.columns[idx];
                var title = currentColumn.title || currentColumn.field || "";
                var titleFunc = () => title;
                var template = currentColumn.headerTemplate || titleFunc;
                var columnsHeaderTemplate = typeof template !== "function" ? kendo.template(template) : template;
                var currentWidth = currentColumn.width;
                var currentWidthInt = parseInt(currentWidth, 10);
                var widthStyle = '';

                if (currentWidth && !isNaN(currentWidthInt)) {
                    widthStyle += `${kendo.attr('style-width')}="${currentWidthInt}${percentageUnitsRegex.test(currentWidth) ? "%" : "px"}"`;
                }

                colGroup += "<col " + widthStyle + "/>";

                row += "<th class='k-table-th'>";
                row += columnsHeaderTemplate(currentColumn);
                row += "</th>";
            }

            colGroup += "</colgroup>";
            row += "</tr>";
            header += colGroup;
            header += "<thead class='k-table-thead'>";
            header += row;
            header += "</thead></table></div></div>";

            $header = $(header);
            kendo.applyStylesFromKendoAttributes($header, ["width"]);

            list.columnsHeader = columnsHeader = $header;
            list.list.prepend(columnsHeader);
        },

        _noData: function() {
            var list = this;
            var noData = $(list.noData);
            var template = list.options.noDataTemplate === true ? () => htmlEncode(list.options.messages.noData) : list.options.noDataTemplate;

            kendo.destroy(noData);
            noData.remove();

            if (!template) {
                list.noData = null;
                return;
            }

            list.noData = $(NO_DATA_EL).hide().appendTo(list.list);
            list.noDataTemplate = typeof template !== "function" ? kendo.template(template) : template;
        },

        _footer: function() {
            var list = this;
            var footer = $(list.footer);
            var template = list.options.footerTemplate;
            var footerEl = this.options.columns && this.options.columns.length ? TABLE_FOOTER_EL : LIST_FOOTER_EL;

            kendo.destroy(footer);
            footer.remove();

            if (!template) {
                list.footer = null;
                return;
            }

            list.footer = $(footerEl).appendTo(list.list);
            list.footerTemplate = typeof template !== "function" ? kendo.template(template) : template;
        },

        _listOptions: function(options) {
            var that = this;
            var currentOptions = that.options;
            var virtual = currentOptions.virtual;
            var changeEventOption = { change: that._listChange.bind(that) };
            var listBoundHandler = that._listBound.bind(that);
            var focusedElm = that._focused;
            var inputId = that.element.attr("id");
            var labelElm = $("label[for=\"" + that.element.attr("id") + "\"]");
            var labelledBy = focusedElm.attr(ARIA_LABELLEDBY);

            if (!labelledBy && labelElm.length) {
                labelledBy = labelElm.attr("id") || that._generateLabelId(labelElm, inputId || kendo.guid());
            }

            virtual = typeof virtual === "object" ? virtual : {};

            options = $.extend({
                autoBind: false,
                selectable: true,
                dataSource: that.dataSource,
                click: that._click.bind(that),
                activate: that._activateItem.bind(that),
                columns: currentOptions.columns,
                deactivate: that._deactivateItem.bind(that),
                dataBinding: function() {
                    that.trigger(DATA_BINDING);
                },
                dataBound: listBoundHandler,
                height: currentOptions.height,
                dataValueField: currentOptions.dataValueField,
                dataTextField: currentOptions.dataTextField,
                groupTemplate: currentOptions.groupTemplate,
                fixedGroupTemplate: currentOptions.fixedGroupTemplate,
                template: currentOptions.template,
                ariaLabel: focusedElm.attr(ARIA_LABEL),
                ariaLabelledBy: labelledBy,
                listSize: that._listSize
            }, options, virtual, changeEventOption);

            if (!options.template) {
                options.template = (data) => htmlEncode(kendo.getter(options.dataTextField)(data));
            }

            return options;
        },

        _initList: function(opts) {
            var that = this;
            var skipValueUpdate = opts && opts.skipValueUpdate;
            var listOptions = that._listOptions({
                selectedItemChange: that._listChange.bind(that)
            });

            if (!that.options.virtual) {
                that.listView = new kendo.ui.StaticList(that.ul, listOptions);
            } else {
                that.listView = new kendo.ui.VirtualList(that.ul, Object.assign(listOptions, {
                    height: that._hasActionSheet() ? 362 : that.options.height, // Hardcoded virtual list height for action sheet untill better solution is found
                }));
                that.list.addClass("k-virtual-list");
            }

            that.listView.bind("listBound", that._listBound.bind(that));

            if (!skipValueUpdate) {
                that._setListValue();
            }
        },

        _setListValue: function(value) {
            value = value || this.options.value;

            if (value !== undefined) {
                this.listView.value(value)
                    .done(this._updateSelectionState.bind(this));
            }
        },

        _updateSelectionState: $.noop,

        _listMousedown: function(e) {
            if (!this.filterInput || this.filterInput[0] !== e.target) {
                e.preventDefault();
            }
        },

        _isFilterEnabled: function() {
            var filter = this.options.filter;
            return filter && filter !== "none";
        },

        _hideClear: function() {
            var list = this;

            if (list._clear) {
                list._clear.addClass(HIDDENCLASS);
            }
        },

        _showClear: function() {
            if (this._clear) {
                this._clear.removeClass(HIDDENCLASS);
            }
        },

        _clearValue: function() {
            this._clearText();
            this._accessor("");
            this.listView.value([]);

            if (this._isSelect) {
                this._customOption = undefined;
            }

            if (this._isFilterEnabled() && !this.options.enforceMinLength) {
                this._filter({ word: "", open: false });

                if (this.options.highlightFirst) {
                    this.listView.focus(0);
                }
            }
            this._change();
        },

        _clearText: function() {
            this.text("");
        },

        _clearFilter: function() {
            if (!this.options.virtual) {
                this.listView.bound(false);
            }

            this._filterSource();
        },

        _filterSource: function(filter, force) {
            var that = this;
            var options = that.options;
            var isMultiColumnFiltering = options.filterFields && filter && filter.logic && filter.filters && filter.filters.length;
            var dataSource = that.dataSource;
            var expression = extend({}, dataSource.filter() || {});
            var resetPageSettings = filter || (expression.filters && expression.filters.length && !filter);

            var removed = removeFiltersForField(expression, options.dataTextField);

            this._clearFilterExpressions(expression);

            if ((filter || removed) && that.trigger("filtering", { filter: filter })) {
                return $.Deferred().reject().promise();
            }

            var newExpression = {
                filters: [],
                logic: "and"
            };

            if (isMultiColumnFiltering) {
                newExpression.filters.push(filter);
            } else {
                this._pushFilterExpression(newExpression, filter);
            }

            if (isValidFilterExpr(expression)) {
                if (newExpression.logic === expression.logic) {
                    newExpression.filters = newExpression.filters.concat(expression.filters);
                } else {
                    newExpression.filters.push(expression);
                }
            }

            if (that._cascading) {
                this.listView.setDSFilter(newExpression);
            }

            var dataSourceState = extend({}, {
                page: resetPageSettings ? 1 : dataSource.page(),
                pageSize: resetPageSettings ? dataSource.options.pageSize : dataSource.pageSize(),
                sort: dataSource.sort(),
                filter: dataSource.filter(),
                group: dataSource.group(),
                aggregate: dataSource.aggregate()
            }, { filter: newExpression });

            return dataSource[force ? "read" : "query"](dataSource._mergeState(dataSourceState));
        },

        _pushFilterExpression: function(newExpression, filter) {
            if (isValidFilterExpr(filter) && filter.value !== "") {
                newExpression.filters.push(filter);
            }
        },

        _clearFilterExpressions: function(expression) {
            if (!expression.filters) {
                return;
            }

            var filtersToRemove;

            for (var i = 0; i < expression.filters.length; i++) {
                if ("fromFilter" in expression.filters[i]) {
                    filtersToRemove = i;
                }
            }

            if (!isNaN(filtersToRemove)) {
                expression.filters.splice(filtersToRemove, 1);
            }
        },

        _renderNoData: function() {
            var list = this;
            var noData = list.noData;

            if (!noData) {
                return;
            }

            noData.html(list.noDataTemplate({ instance: list }));
        },

        _toggleNoData: function(show) {
            $(this.noData).toggle(show);
        },

        _toggleHeader: function(show) {
            var groupHeader = this.listView.content.prev(FIXED_GROUP_HEADER);
            groupHeader.toggle(show);
        },

        _renderFooter: function() {
            var list = this,
                footer = list.footer ? this.options.columns && this.options.columns.length ? list.footer.children().first() : list.footer : null;

            if (!footer) {
                return;
            }

            footer.html(list.footerTemplate({ instance: list }));
        },

        _allowOpening: function() {
            return this.options.noDataTemplate || this.dataSource.flatView().length;
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

        _filter: function(options) {
            var that = this;
            var widgetOptions = that.options;
            var word = options.word;
            var filterFields = widgetOptions.filterFields;
            var field = widgetOptions.dataTextField;
            var expression;

            if (filterFields && filterFields.length) {
                expression = {
                    logic: "or",
                    filters: [],
                    fromFilter: true
                };
                for (var i = 0; i < filterFields.length; i++) {
                    this._pushFilterExpression(expression, that._buildExpression(word, filterFields[i]));
                }
            } else {
                expression = that._buildExpression(word, field);
            }

            that._open = options.open;
            that._filterSource(expression);
        },

        _buildExpression: function(value, field) {
            var that = this;
            var widgetOptions = that.options;
            var ignoreCase = widgetOptions.ignoreCase;
            var accentFoldingFiltering = that.dataSource.options.accentFoldingFiltering;

            return {
                value: ignoreCase ? (accentFoldingFiltering ? value.toLocaleLowerCase(accentFoldingFiltering) : value.toLowerCase()) : value,
                field: field,
                operator: widgetOptions.filter,
                ignoreCase: ignoreCase
            };
        },

        _clearButton: function() {
            var list = this;
            var clearTitle = list.options.messages.clear;

            if (!list._clear) {
                list._clear = $(`<span unselectable="on" class="k-clear-value" title="${clearTitle}">${kendo.ui.icon("x")}</span>`).attr({
                    "role": "button",
                    "tabIndex": -1
                });
            }

            if (!list.options.clearButton) {
                list._clear.remove();
            }
            this._hideClear();
        },

        search: function(word) {
            var options = this.options;

            word = typeof word === "string" ? word : this._inputValue();

            clearTimeout(this._typingTimeout);

            if ((!options.enforceMinLength && !word.length) || word.length >= options.minLength) {
                this._state = "filter";
                if (this.listView) {
                    this.listView._emptySearch = !kendo.trim(word).length;
                }

                if (!this._isFilterEnabled()) {
                    this._searchByWord(word);
                } else {
                    this._filter({ word: word, open: true });
                }
            }
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

            if (that.largeMQL || that.mediumMQL || that.smallMQL) {
                that.largeMQL.destroy();
                that.mediumMQL.destroy();
                that.smallMQL.destroy();
            }

            that.listView.destroy();
            that.list.off(ns);

            that.popup.destroy();

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }

            if (that.label) {
                that.label.destroy();
            }
        },

        dataItem: function(index) {
            var that = this;

            if (index === undefined) {
                return that.listView.selectedDataItems()[0];
            }

            if (typeof index !== "number") {
                if (that.options.virtual) {
                    return that.dataSource.getByUid($(index).data("uid"));
                }

                index = $(that.items()).index(index);
            }

            return that.dataSource.flatView()[index];
        },

        _activateItem: function() {
            var current = this.listView.focus();
            if (current && this.popup.visible()) {
                this._focused.add(this.filterInput).attr(ARIA_ACTIVEDESCENDANT, current.attr("id"));
            }
        },

        _deactivateItem: function() {
            this._focused.add(this.filterInput).removeAttr(ARIA_ACTIVEDESCENDANT);
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
                element = that._focused,
                autocomplete;

            if (options.suggest !== undefined) {
                if (options.filter === "none") {
                    if (options.suggest === true) {
                        autocomplete = "inline";
                    } else {
                        autocomplete = "none";
                    }
                } else {
                    if (options.suggest === true) {
                        autocomplete = "both";
                    } else {
                        autocomplete = "list";
                    }
                }

                element.attr(ARIA_AUTOCOMPLETE, autocomplete);
            }

            id = id ? id + " " + that.ul[0].id : that.ul[0].id;

            element.attr({
                "aria-controls": id
            });

            if (that.filterInput && that.filterInput.length > 0) {
                that.filterInput.attr(ARIA_CONTROLS, id);
            }

            that.ul.attr(ARIA_LIVE, !that._isFilterEnabled() ? "off" : "polite");

            that._ariaLabel(that._focused);
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
            that._userTriggered = false;
        },

        _isValueChanged: function(value) {
            return value !== unifyType(this._old, typeof value);
        },

        _change: function() {
            var that = this;
            var index = that.selectedIndex;
            var optionValue = that.options.value;
            var value = that.value();
            var trigger;

            if (that._isSelect && !that.listView.bound() && optionValue) {
                value = optionValue;
            }

            if (that._isValueChanged(value)) {
                trigger = true;
            } else if (that._valueBeforeCascade !== undefined && that._valueBeforeCascade !== unifyType(that._old, typeof that._valueBeforeCascade) && that._userTriggered) {
                trigger = true;
            } else if (index !== undefined && index !== that._oldIndex && !that.listView.isFiltered()) {
                trigger = true;
            }

            if (trigger) {

                if (that._old === null || that._old === "" || value === "") {
                    that._valueBeforeCascade = that._old = value;
                } else {
                    if (that.dataItem()) {
                        that._valueBeforeCascade = that._old = that.options.dataValueField ? that.dataItem()[that.options.dataValueField] : that.dataItem();
                    } else {
                        that._valueBeforeCascade = that._old = null;
                    }
                }
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
            var siblings = this.listView.content.parent().prevAll(":visible");

            siblings.each(function() {
                var element = $(this);

                offsetHeight += outerHeight(element, true);
            });

            return offsetHeight;
        },

        _height: function(length) {
            var that = this;
            var list = that.list;
            var height = that.options.height;
            var visible = that.popup.visible();
            var isMccb = this.options.columns && this.options.columns.length;
            var offsetTop, popups;

            if (length || that.options.noDataTemplate) {
                // Check where animation container stays
                popups = list.parent().add(list.closest(".k-animation-container").add(list.closest(".k-child-animation-container"))).show();

                if (!list.parent().is(":visible")) {
                    popups.hide();
                    return;
                }

                height = that.listView.content[0].scrollHeight > height ? height : "auto";

                popups.height(height);

                if (height !== "auto") {
                    offsetTop = that._offsetHeight();

                    height = height - offsetTop;

                    if (isMccb) {
                        height = height - (outerHeight($(that.footer)) || 0) - (outerHeight($(that.columnsHeader)) || 0);
                    }
                }

                if (isMccb) {
                    that.listView.content.outerHeight(height);
                } else {
                    that.listView.content.parent().outerHeight(height);
                }

                if (!visible) {
                    list.parent().hide();
                }
            }

            return height;
        },

        _openHandler: function(e) {
            var current;

            this._adjustListWidth();

            if (this.trigger(OPEN)) {
                e.preventDefault();
            } else {
                this._focused.attr(ARIA_EXPANDED, true);
                this.ul.attr(ARIA_HIDDEN, false);

                current = this.listView.focus();
                if (current) {
                    this._focused.add(this.filterInput).attr(ARIA_ACTIVEDESCENDANT, current.attr("id"));
                }
            }
        },

        _adjustListWidth: function() {
            var that = this,
                list = that.list.parent(),
                width = list[0].style.width,
                wrapper = that.wrapper,
                computedStyle, computedWidth;

            if ((!list.data(WIDTH) && width) || that._hasActionSheet()) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = parseFloat(computedStyle && computedStyle.width) || outerWidth(wrapper);

            if (computedStyle && browser.msie) { // getComputedStyle returns different box in IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            if (list.css("box-sizing") !== "border-box") {
                width = computedWidth - (outerWidth(list) - list.width());
            } else {
                width = computedWidth;
            }

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: that.options.autoWidth ? "auto" : width,
                minWidth: width,
                whiteSpace: that.options.autoWidth ? "nowrap" : "normal"
            })
            .data(WIDTH, width);

            return true;
        },

        _closeHandler: function(e) {
            if (e.closeButton) {
                this._onCloseButtonPressed();
            }


            if (this.trigger(CLOSE)) {
                e.preventDefault();
            } else {
                this._focused.attr(ARIA_EXPANDED, false);
                this.ul.attr(ARIA_HIDDEN, true);
                this._focused.add(this.filterInput).removeAttr(ARIA_ACTIVEDESCENDANT);
            }
        },

        _focusItem: function() {
            var listView = this.listView;
            var noFocusedItem = !listView.focus();
            var index = last(listView.select());

            if (index === undefined && this.options.highlightFirst && noFocusedItem) {
                index = 0;
            }

            if (index !== undefined) {
                listView.focus(index);
            } else if (noFocusedItem) {
                listView.scrollToIndex(0);
            }
        },

        _calculateGroupPadding: function(height) {
            var li = this.ul.children(".k-first").first();
            var groupHeader = this.listView.content.prev(FIXED_GROUP_HEADER);
            var padding = 0;
            var direction = 'right';

            if (groupHeader[0] && groupHeader[0].style.display !== "none") {
                if (height !== "auto") {
                    padding = kendo.support.scrollbar();
                }

                if (this.element.parents('.k-rtl').length) {
                    direction = 'left';
                }

                padding += parseFloat(li.css("border-" + direction + "-width"), 10) + parseFloat(li.children(GROUP_LABEL).css("padding-" + direction), 10);
                groupHeader.css("padding-" + direction, padding);
            }
        },

        _calculatePopupHeight: function(force) {
            var height = this._height(this.dataSource.flatView().length || force);
            this._calculateGroupPadding(height);
            this._calculateColumnsHeaderPadding(height);
        },

        _calculateColumnsHeaderPadding: function(height) {
            if (this.options.columns && this.options.columns.length) {
                var list = this;
                var isRtl = support.isRtl(list.wrapper);
                var scrollbar = kendo.support.scrollbar();

                list.columnsHeader.css((isRtl ? "padding-left" : "padding-right"), height !== "auto" ? scrollbar : 0);
            }
        },

        _refreshScroll: function() {
            var listView = this.listView;
            var enableYScroll = listView.element.height() > listView.content.height();

            if (this.options.autoWidth) {
                listView.content.css({
                    overflowX: "hidden",
                    overflowY: enableYScroll ? "scroll" : "auto"
                });
            }
        },

        _hasActionSheet: function() {
            return this.options.adaptiveMode === "auto" && (this.mediumMQL.mediaQueryList.matches
                    || this.smallMQL.mediaQueryList.matches);
        },

        _resizePopup: function(force) {
            if (this.options.virtual
                    || this._hasActionSheet()) {
                return;
            }

            if (!this.popup.element.is(":visible")) {
                this.popup.one("open", (function(force) {
                    return (function(e) {
                        if (!e.isDefaultPrevented()) {
                            this._calculatePopupHeight(force);
                        }
                    }).bind(this);
                }).call(this, force));

                this.popup.one(ACTIVATE, this._refreshScroll.bind(this));
            } else {
                this._calculatePopupHeight(force);
            }
        },

        _popup: function() {
            var list = this;

            list.list.wrap("<div>");

            if (list.options.adaptiveMode === "auto") {
                list.largeMQL.onEnter(list._createPopup.bind(list));
                list.mediumMQL.onEnter(list._createActionSheet.bind(list));
                list.smallMQL
                    .onEnter(() => {
                        if (!list.popup) {
                            list._createActionSheet();
                        }

                        list.popup.fullscreen(true);
                    });
            } else {
                list._createPopup();
            }
        },

        _addFilterHeader: function() {
            var list = this;

            if (list._isFilterEnabled()) {
                list._filterHeader();

                if (list.options.adaptiveMode === "auto" && (list.mediumMQL.mediaQueryList.matches || list.smallMQL.mediaQueryList.matches)) {
                    list.popup.element
                        .find(ACTIONSHEET_TITLEBAR)
                        .append($(list.actionSheetFilterTemplate))
                        .find(".k-searchbox")
                        .append(list.filterInput);
                    list._enable();
                } else if (list.options.popupFilter) {
                    list.list
                        .parent()
                        .prepend($(list.filterTemplate))
                        .find(".k-searchbox")
                        .append(list.filterInput);
                }

                list._enable();
            }
        },

        _createPopup: function() {
            var list = this;

            if (list.popup) {
                list._cachedFilterValue = list.filterInput ? list.filterInput.val() : null;
                list.popup.destroy();
                list._removeFilterHeader();
                list._removeStaticHeader();
            }

            list.popup = new ui.Popup(list.list.parent().addClass("k-list-container"), extend({}, list.options.popup, {
                anchor: list.wrapper,
                open: list._openHandler.bind(list),
                close: list._closeHandler.bind(list),
                animation: list.options.animation,
                isRtl: support.isRtl(list.wrapper),
                autosize: list.options.autoWidth,
                activate: () => {
                    this._refreshFloatingLabel();
                },
                deactivate: () => {
                    this._refreshFloatingLabel();
                }
            }));

            list._postCreatePopup();
        },

        _onActionSheetCreate: $.noop,
        _onCloseButtonPressed: $.noop,

        _createActionSheet: function() {
            var list = this;

            if (list.popup) {
                list._cachedFilterValue = list.filterInput ? list.filterInput.val() : null;
                list.popup.destroy();
                list._removeFilterHeader();
                list._removeStaticHeader();
                list.list.parent().css({
                    width: "",
                    height: "",
                    minWidth: ""
                });
            }

            list.popup = new ui.ActionSheet(list.list.parent(), {
                headerTemplate: (options) =>
                `<div class="k-text-center k-actionsheet-titlebar" >` +
                        '<div class="k-actionsheet-titlebar-group k-hbox">' +
                            `<div  class="k-actionsheet-title">` +
                                (list.options.label ? `<div class="k-text-center">${list.options.label}</div>` : '') +
                                (list.options.placeholder ? `<div class="k-actionsheet-subtitle k-text-center">${list.options.placeholder || ""}</div>` : "") +
                            '</div>' +
                            (options.closeButton ?
                            '<div class="k-actionsheet-actions">' +
                                kendo.html.renderButton(`<button tabindex="-1" ${kendo.attr("ref-actionsheet-close-button")}></button>`, { icon: "x", fillMode: "flat", size: "large" }) +
                            '</div>'
                            : "") +
                        '</div>' +
                '</div>',
                open: list._openHandler.bind(list),
                close: list._closeHandler.bind(list),
                focusOnActivate: false,
                adaptive: true,
                appendTo: (list.options.popup && list.options.popup.appendTo) || document.body,
                closeButton: true,
                fullscreen: list.smallMQL.mediaQueryList.matches,
                activate: () => {
                    this._refreshFloatingLabel();
                },
                deactivate: () => {
                    this._refreshFloatingLabel();
                },
                popup: extend({}, list.options.popup, {
                    autosize: list.options.autoWidth
                })
            });

            list._postCreatePopup();
            list._onActionSheetCreate();
        },

        _removeFilterHeader: function() {
            if (this.filterInput) {
                this.filterInput
                    .off(this.ns)
                    .closest(".k-list-filter")
                    .remove();

                this.filterInput = null;
            }
        },

        _removeStaticHeader: function() {
            this.listView.header.remove();
        },

        _postCreatePopup: function() {
            var list = this;
            var listViewValue;

            list._addFilterHeader();

            if (list.filterInput && list._cachedFilterValue) {
                list.filterInput.val(list._cachedFilterValue);
            }

            list.popup.element.prepend(list.header)
                .on(MOUSEDOWN + this.ns, this._listMousedown.bind(this));

            if (list.listView) {
                listViewValue = list.listView.value();

                if (list.listView._clean) {
                    list.listView._clean();
                }

                // Dirty hack to clean MultiSelect taglist
                if (list.tagList && list.options.virtual) {
                    list.tagList.empty();
                }

                list.listView.destroy();
                list._initList({ skipValueUpdate: true });
                list.listView.value(listViewValue);
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === MOUSEENTER);
        },

        _toggle: function(open, preventFocus) {
            var that = this;
            var touchEnabled = support.mobileOS && (support.touch || support.MSPointers || support.pointers);

            open = open !== undefined ? open : !that.popup.visible();

            if (!preventFocus && !touchEnabled && that._focused[0] !== activeElement()) {
                that._prevent = true;
                that._focused.trigger(FOCUS);
                that._prevent = false;
            }

            that[open ? OPEN : CLOSE]();
        },

        _triggerCascade: function() {
            var that = this;

            if (!that._cascadeTriggered || that.value() !== unifyType(that._cascadedValue, typeof that.value())) {
                that._cascadedValue = that.value();
                that._cascadeTriggered = true;
                that.trigger(CASCADE, { userTriggered: that._userTriggered });
            }
        },

        _triggerChange: function() {
            if (this._valueBeforeCascade !== this.value()) {
                this.trigger(CHANGE);
            }
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(REQUESTSTART, that._requestStartHandler)
                           .unbind(REQUESTEND, that._requestEndHandler)
                           .unbind("error", that._errorHandler);
        },

        requireValueMapper: function(options, value) {
            var hasValue = (options.value instanceof Array ? options.value.length : options.value) || (value instanceof Array ? value.length : value);
            if (hasValue && options.virtual && typeof options.virtual.valueMapper !== "function") {
                throw new Error("ValueMapper is not provided while the value is being set. See http://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization#the-valuemapper-function");
            }
        }
    });

    function unifyType(value, type) {
        if (value !== undefined && value !== "" && value !== null) {
            if (type === "boolean") {
                if (typeof value !== "boolean") {
                    value = value.toString().toLowerCase() === "true";
                }
                value = Boolean(value);
            } else if (type === "number") {
                value = Number(value);
            } else if (type === "string") {
                value = value.toString();
            }
        }

        return value;
    }

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
        },
        unifyType: unifyType
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

            if (that.listView.bound()) {
                that._initialIndex = null;
                that.listView._current = null;
            }

            that.listView.setDataSource(that.dataSource);

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }

            parent = that._parentWidget();

            if (parent) {
                that._cascadeSelect(parent);
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
                return that._select(candidate).done(function() {
                    that._cascadeValue = that._old = that._accessor();
                    that._oldIndex = that.selectedIndex;

                    that._refreshFloatingLabel();
                });
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
            var hasValue;

            if (value === undefined) {
                return getSelectedOption(element).value || "";
            }

            getSelectedOption(element).selected = false;

            if (idx === undefined) {
                idx = -1;
            }

            hasValue = (value !== null && value !== "");

            if (hasValue && idx == -1) {
                this._custom(value);
            } else {
                if (value) {
                    element.value = value;
                } else {
                    element.selectedIndex = idx;
                }
            }
        },

        _syncValueAndText: function() {
            return true;
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
            custom[0].selected = true;
        },

        _hideBusy: function() {
            var that = this;
            clearTimeout(that._busy);
            that._arrowIcon.removeClass(LOADING);
            that._arrowIcon.find("svg").show();
            that._focused.attr(ARIA_BUSY, false);
            that._busy = null;
            that._showClear();
        },

        _showBusy: function(e) {
            var that = this;

            if (e.isDefaultPrevented()) {
                return;
            }

            that._request = true;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function() {
                if (that._arrowIcon) { //destroyed after request start
                    that._focused.attr(ARIA_BUSY, true);
                    that._arrowIcon.addClass(LOADING);
                    that._arrowIcon.find("svg").hide();
                    that._hideClear();
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

            dataSource = Array.isArray(dataSource) ? { data: dataSource } : dataSource;

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
                that._requestStartHandler = that._showBusy.bind(that);
                that._requestEndHandler = that._requestEnd.bind(that);
                that._errorHandler = that._hideBusy.bind(that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(REQUESTSTART, that._requestStartHandler)
                                   .bind(REQUESTEND, that._requestEndHandler)
                                   .bind("error", that._errorHandler);
        },

        _firstItem: function() {
            this.listView.focusFirst();
        },

        _lastItem: function() {
            this.listView.focusLast();
        },

        _nextItem: function() {
            return this.listView.focusNext();
        },

        _prevItem: function() {
            return this.listView.focusPrev();
        },

        _getNormalizedDataItem: function(candidate) {
            var that = this,
                listView = that.listView,
                isIndex = typeof candidate === "number",
                hasOptionLabel = that.optionLabel && that.optionLabel.length,
                index;

            if (isIndex) {
                index = hasOptionLabel ? --candidate : candidate;
            } else {
                index = listView.getElementIndex(candidate);
            }

            return listView.dataItemByIndex(index);
        },

        _getNormalizedSelectCandidate: function(candidate) {
            var that = this,
                hasOptionLabel = that.optionLabel && that.optionLabel.length,
                isIndex = typeof candidate === "number",
                normalizedCandidate = candidate;

            if (hasOptionLabel && isIndex) {
                normalizedCandidate++;
            }

            return normalizedCandidate;
        },

        _move: function(e) {
            var that = this;
            var listView = that.listView;
            var key = e.keyCode;
            var down = key === keys.DOWN;
            var isVirtual = that.options.virtual;
            var dataItem;
            var pressed;
            var current;
            var moveIndex;
            var selectCandidate;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                } else {
                    if (!listView.bound() && !that.ul[0].firstChild) {
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

                    if (!that._fetch && (!current || current.hasClass(KSELECTED))) {
                        if (down) {
                            moveIndex = that._nextItem();

                            if ((isVirtual && moveIndex <= 0) || (!that._focus() && !moveIndex) ) {
                                that._lastItem();
                            }
                        } else {
                            moveIndex = that._prevItem();

                            if ((isVirtual && moveIndex >= listView.dataSource.total() - 1) || (!that._focus() && !moveIndex)) {
                                that._firstItem();
                            }
                        }
                    }

                    selectCandidate = that._getNormalizedSelectCandidate(that._get(that._focus()) || moveIndex || 0);

                    that._select(selectCandidate, true).done(function() {
                        var done = function() {
                            if (!that.popup.visible()) {
                                that._blur();
                            }

                            if (that._cascadedValue === null) {
                                that._cascadedValue = that.value();
                            } else {
                                that._cascadedValue = that.dataItem() ? that.dataItem()[that.options.dataValueField] || that.dataItem() : null;
                            }
                        };

                        if (that.trigger(SELECT, { dataItem: that._getNormalizedDataItem(selectCandidate), item: that._focus() })) {
                            that._select(current).done(done);
                        } else {
                            done();
                        }
                    });
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
                var selection;

                if (current) {
                    dataItem = listView.dataItemByIndex(listView.getElementIndex(current));
                    var shouldTrigger = true;

                    if (dataItem) {
                        shouldTrigger = that._value(dataItem) !== List.unifyType(that.value(), typeof that._value(dataItem));
                    }

                    if (shouldTrigger && that.trigger(SELECT, { dataItem: dataItem, item: current })) {
                        return;
                    }

                    selection = that._select(current);
                } else if (that.input) {
                    if (that._syncValueAndText() || that._isSelect) {
                        that._accessor(that.input.val());
                    }
                    that.listView.value(that.input.val());
                }

                if (that._focusElement) {
                    that._focusElement(that.wrapper);
                }

                if (activeFilter && key === keys.TAB) {
                    that.wrapper.focusout();
                } else {
                    if (selection && typeof selection.done === "function") {
                        selection.done(function() {
                            that._blur();
                        });
                    } else {
                        that._blur();
                    }
                }

                that.close();
                pressed = true;
            } else if (key === keys.ESC) {
                if (that.popup.visible()) {
                    e.preventDefault();
                }
                that.close();
                pressed = true;
            } else if (that.popup.visible() && (key === keys.PAGEDOWN || key === keys.PAGEUP)) {
                e.preventDefault();

                var direction = key === keys.PAGEDOWN ? 1 : -1;
                listView.scrollWith(direction * listView.screenHeight());

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

            if (!that.listView.bound() && !that._fetch && !hasItems) {
                that._fetch = true;
                that.dataSource.fetch().done(function() {
                    that._fetch = false;
                });
            }
        },

        _options: function(data, optionLabel, value) {
            var that = this,
                element = that.element,
                htmlElement = element[0],
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
                htmlElement.value = value;
                if (htmlElement.value && !value) {
                    htmlElement.selectedIndex = -1;
                }
            }

            if (htmlElement.selectedIndex !== -1) {
                option = getSelectedOption(htmlElement);

                if (option) {
                    option.setAttribute(SELECTED, SELECTED);
                }
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

            if (!this.options.cascadeFrom) {
                return;
            }

            var parentElement = $("#" + this.options.cascadeFrom);
            var parent = parentElement.data("kendo" + name);

            if (!parent) {
                for (var i = 0; i < alternativeNames[name].length; i += 1) {
                    parent = parentElement.data("kendo" + alternativeNames[name][i]);

                    if (!!parent) {
                        break;
                    }
                }
            }

            return parent;
        },

        _cascade: function() {
            var that = this;
            var options = that.options;
            var cascade = options.cascadeFrom;
            var parent;

            if (cascade) {
                parent = that._parentWidget();

                if (!parent) {
                    return;
                }

                that._cascadeHandlerProxy = that._cascadeHandler.bind(that);
                that._cascadeFilterRequests = [];

                options.autoBind = false;

                parent.bind("set", function() { //will cascade
                    that.one("set", function(e) { //get your value
                        that._selectedValue = e.value || that._accessor();
                    });
                });

                parent.first(CASCADE, that._cascadeHandlerProxy);

                //refresh was called
                if (parent.listView.bound()) {
                    that._toggleCascadeOnFocus();
                    that._cascadeSelect(parent);
                } else {
                    parent.one(DATA_BOUND, function() {
                        that._toggleCascadeOnFocus();
                        if (parent.popup.visible()) {
                            parent._focused.trigger(FOCUS);
                        }
                    });

                    if (!parent.value()) {
                        that.enable(false);
                    }
                }
            }
        },

        _toggleCascadeOnFocus: function() {
            var that = this;
            var parent = that._parentWidget();
            var focusout = isIE && parent instanceof ui.DropDownList ? BLUR : FOCUSOUT;

            parent._focused.add(parent.filterInput).on(FOCUS, function() {
                parent.unbind(CASCADE, that._cascadeHandlerProxy);
                parent.unbind(CHANGE, that._cascadeHandlerProxy);
                parent.first(CHANGE, that._cascadeHandlerProxy);
            });

            parent._focused.add(parent.filterInput).on(focusout, function() {
                parent.unbind(CHANGE, that._cascadeHandlerProxy);
                parent.unbind(CASCADE, that._cascadeHandlerProxy);
                parent.first(CASCADE, that._cascadeHandlerProxy);
            });
        },

        _cascadeHandler: function(e) {
            var parent = this._parentWidget();
            var valueBeforeCascade = this.value();

            this._userTriggered = e.userTriggered || parent._userTriggered;

            if (this.listView.bound()) {
                this._clearSelection(parent, true);
            }

            this._cascadeSelect(parent, valueBeforeCascade);
        },

        _cascadeChange: function(parent) {
            var that = this;
            var value = that._accessor() || that._selectedValue;

            if (!that._cascadeFilterRequests.length) {
                that._selectedValue = null;
            }

            if (that._userTriggered) {
                that._clearSelection(parent, true);
            } else if (value) {
                if (value !== unifyType(that.listView.value()[0], typeof value)) {
                    that.value(value);
                }

                if (!that.dataSource.view()[0] || that.selectedIndex === -1) {
                    that._clearSelection(parent, true);
                }
            } else if (that.dataSource.flatView().length) {
                that.select(that.options.index);
            }

            that.enable();
            that._triggerCascade();
            that._triggerChange();
            that._userTriggered = false;
        },

        _cascadeSelect: function(parent, valueBeforeCascade) {
            var that = this;
            var dataItem = parent.dataItem();
            var filterValue = dataItem ? dataItem[that.options.cascadeFromParentField] || parent._value(dataItem) : null;
            var valueField = that.options.cascadeFromField || parent.options.dataValueField;
            var expressions;

            // Applicable only when parent is ComboBox or MultiColumnComboBox
            if (parent.options.cascadeOnCustomValue &&
                filterValue === null &&
                (!that.options.cascadeFromParentField || that.options.cascadeFromParentField === parent.options.dataValueField)) {
                    filterValue = parent.value();
            }

            that._valueBeforeCascade = valueBeforeCascade !== undefined ? valueBeforeCascade : that.value();

            if (filterValue || filterValue === 0) {
                expressions = that.dataSource.filter() || {};
                removeFiltersForField(expressions, valueField);

                var handler = function() {
                    var currentHandler = that._cascadeFilterRequests.shift();
                    if (currentHandler) {
                        that.unbind('dataBound', currentHandler);
                    }

                    currentHandler = that._cascadeFilterRequests[0];
                    if (currentHandler) {
                        that.first('dataBound', currentHandler);
                    }

                    that._cascadeChange(parent);
                };

                that._cascadeFilterRequests.push(handler);

                if (that._cascadeFilterRequests.length === 1) {
                    that.first('dataBound', handler);
                }

                that._cascading = true;
                that._filterSource({
                    field: valueField,
                    operator: "eq",
                    value: filterValue
                });
                that._cascading = false;
            } else {
                that.enable(false);
                that._clearSelection(parent);
                that._triggerCascade();
                that._triggerChange();
                that._userTriggered = false;
            }

            that._refreshFloatingLabel();
        }
    });

    var STATIC_LIST_NS = ".StaticList";

    var StaticList = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.attr("role", (options.aria && options.aria.role) || 'listbox')
                        .on(CLICK + STATIC_LIST_NS, "li", this._click.bind(this))
                        .on(MOUSEENTER + STATIC_LIST_NS, "li", function() { $(this).addClass(HOVER); })
                        .on(MOUSELEAVE + STATIC_LIST_NS, "li", function() { $(this).removeClass(HOVER); });

            if (options && options.ariaLabel) {
                this.element.attr(ARIA_LABEL, options.ariaLabel);
            } else if (options && options.ariaLabelledBy) {
                this.element.attr(ARIA_LABELLEDBY, options.ariaLabelledBy);
            }

            if (support.touch) {
                this._touchHandlers();
            }

            if (this.options.selectable === "multiple") {
                this.element.attr(ARIA_MULTISELECTABLE, true);
            }

            if (this.options.columns && this.options.columns.length) {
                var thead = this.element.parent().find('.k-table-thead');
                var row = $('<tr class="k-table-group-row">' +
                    '<th class="k-table-th" colspan="' + this.options.columns.length + '"></th>' +
                '</tr>');

                thead.append(row);

                this.header = row.find(".k-table-th");

                this.content = this.element.wrap("<div class='k-table-body k-table-scroller' unselectable='on'></div>").parent();

                this.element.addClass(TABLE_LIST);
            } else {
                this.content = this.element.wrap("<div class='k-list-content k-list-scroller' unselectable='on'></div>").parent();
                this.header = this.content.before($('<div class="k-list-group-sticky-header"></div>').hide()).prev();
                this.element.addClass(LIST_UL);
            }

            this.bound(false);

            this._optionID = kendo.guid();

            this._selectedIndices = [];

            this._view = [];
            this._dataItems = [];
            this._values = [];

            var value = this.options.value;

            if (value) {
                this._values = Array.isArray(value) ? value.slice(0) : [value];
            }

            this._getter();
            this._templates();

            this.setDataSource(this.options.dataSource);

            this._createOnScrollProxy();
        },

        options: {
            name: "StaticList",
            dataValueField: null,
            valuePrimitive: false,
            selectable: true,
            template: null,
            groupTemplate: null,
            fixedGroupTemplate: null,
            ariaLabel: null,
            ariaLabelledBy: null
        },

        events: [
           CLICK,
            CHANGE,
           ACTIVATE,
           DEACTIVATE,
           DATA_BINDING,
           DATA_BOUND,
           SELECTED_ITEM_CHANGE
        ],

        setDataSource: function(source) {
            var that = this;
            var dataSource = source || {};
            var value;

            dataSource = Array.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);

                value = that.value();

                that.value([]);
                that.bound(false);

                that.value(value);
            } else {
                that._refreshHandler = that.refresh.bind(that);
            }

            that.setDSFilter(dataSource.filter());

            that.dataSource = dataSource.bind(CHANGE, that._refreshHandler);
            that._fixedHeader();
        },

        _touchHandlers: function() {
            var that = this,
                itemSelector = this.options.columns && this.options.columns.length ? ITEMSELECTORTABLE : ITEMSELECTOR,
                startY, endY,
                tapPosition = function(event) {
                    return (event.originalEvent || event).changedTouches[0].pageY;
                };

            that.element.on("touchstart" + STATIC_LIST_NS, function(e) {
                startY = tapPosition(e);
            });

            that.element.on("touchend" + STATIC_LIST_NS, function(e) {
                if (e.isDefaultPrevented()) {
                    return;
                }

                endY = tapPosition(e);

                if (Math.abs(endY - startY) < 10) {
                    that._touchTriggered = true;
                    that._triggerClick($(e.target).closest(itemSelector).get(0));
                }
            });
        },

        skip: function() {
            return this.dataSource.skip();
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            this._getter();
            this._templates();
            this._render();

            if (this.label && options.label) {
                this.label.setOptions(options.label);
            } else if (this.label && options.label === false) {
                this.label._unwrapFloating();
                this._inputLabel.remove();
                delete this._inputLabel;
            }
        },

        destroy: function() {
            this.element.off(STATIC_LIST_NS);

            if (this._refreshHandler) {
                this.dataSource.unbind(CHANGE, this._refreshHandler);
            }

            clearTimeout(this._scrollId);

            Widget.fn.destroy.call(this);
        },

        dataItemByIndex: function(index) {
            return this.dataSource.flatView()[index];
        },

        screenHeight: function() {
            return this.content[0].clientHeight;
        },

        scrollToIndex: function(index) {
            var item = this.element[0].children[index];

            if (item) {
                this.scroll(item);
            }
        },

        scrollWith: function(value) {
            this.content.scrollTop(this.content.scrollTop() + value);
        },

        scroll: function(item) {
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
                bottomDistance = itemOffsetTop + itemOffsetHeight;

                if (contentScrollTop > itemOffsetTop) {
                    contentScrollTop = itemOffsetTop;
                } else if (bottomDistance > (contentScrollTop + contentOffsetHeight)) {
                    contentScrollTop = (bottomDistance - contentOffsetHeight);
                }

                content.scrollTop = contentScrollTop;
        },

        selectedDataItems: function(dataItems) {
            if (dataItems === undefined) {
                return this._dataItems.slice();
            }

            this._dataItems = dataItems;
            this._values = this._getValues(dataItems);
        },

        _getValues: function(dataItems) {
            var getter = this._valueGetter;

            return $.map(dataItems, function(dataItem) {
                return getter(dataItem);
            });
        },

        focusNext: function() {
            var current = this.focus();

            if (!current) {
                current = 0;
            } else {
                current = current.next();
            }

            this.focus(current);
        },

        focusPrev: function() {
            var current = this.focus();

            if (!current) {
                current = this.element[0].children.length - 1;
            } else {
                current = current.prev();
            }

            this.focus(current);
        },

        focusFirst: function() {
            this.focus(this.element[0].children[0]);
        },

        focusLast: function() {
            this.focus(last(this.element[0].children));
        },

        focus: function(candidate) {
            var that = this;
            var id = that._optionID;
            var hasCandidate;

            if (candidate === undefined) {
                return that._current;
            }

            candidate = last(that._get(candidate));
            candidate = $(this.element[0].children[candidate]);

            if (that._current) {
                that._current
                    .removeClass(FOCUSED)
                    .removeAttr(ID);

                that.trigger(DEACTIVATE);
            }

            hasCandidate = !!candidate[0];

            if (hasCandidate) {
                candidate.addClass(FOCUSED);
                that.scroll(candidate);

                candidate.attr("id", id);
            }

            that._current = hasCandidate ? candidate : null;
            that.trigger(ACTIVATE);
        },

        focusIndex: function() {
            return this.focus() ? this.focus().index() : undefined;
        },

        skipUpdate: function(skipUpdate) {
            this._skipUpdate = skipUpdate;
        },

        select: function(indices) {
            var that = this;
            var selectable = that.options.selectable;
            var singleSelection = selectable !== "multiple" && selectable !== false;
            var selectedIndices = that._selectedIndices;
            var uiSelectedIndices = [this.element.find(".k-selected").index()];

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

            var deferred = $.Deferred().resolve();
            var filtered = that.isFiltered();

            if (filtered && !singleSelection && that._deselectFiltered(indices)) {
                return deferred;
            }

            if (singleSelection && !filtered &&
                $.inArray(last(indices), selectedIndices) !== -1 && $.inArray(last(indices), uiSelectedIndices) !== -1) {

                if (that._dataItems.length && that._view.length) {
                    that._dataItems = [that._view[selectedIndices[0]].item];
                }

                return deferred;
            }

            result = that._deselect(indices);

            removed = result.removed;
            indices = result.indices;

            if (indices.length) {
                if (singleSelection) {
                    indices = [last(indices)];
                }

                added = that._select(indices);
            }

            if (added.length || removed.length) {
                that._valueComparer = null;
                that.trigger(CHANGE, {
                    added: added,
                    removed: removed
                });
            }

            return deferred;
        },

        removeAt: function(position) {
            this._selectedIndices.splice(position, 1);
            this._values.splice(position, 1);
            this._valueComparer = null;

            return {
                position: position,
                dataItem: this._dataItems.splice(position, 1)[0]
            };
        },

        setValue: function(value) {
            value = Array.isArray(value) || value instanceof ObservableArray ? value.slice(0) : [value];

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

            if (that.bound()) {
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

        items: function() {
            return this.element.children(ITEMSELECTOR);
        },

        _click: function(e) {
            if (this._touchTriggered)
            {
                this._touchTriggered = false;
                return;
            }

            if (!e.isDefaultPrevented()) {
                this._triggerClick(e.currentTarget);
            }
        },

        _createOnScrollProxy: function() {
            var onScrollProxy = function() {
                var that = this;
                clearTimeout(that._scrollId);

                that._scrollId = setTimeout(function() {
                    that._renderHeader();
                }, 50);
            };

            this._onScroll = onScrollProxy.bind(this);
        },

        _triggerClick: function(item) {
            if (!this.trigger(CLICK, { item: $(item) })) {
                this.select(item);
            }
        },

        _valueExpr: function(type, values) {
            var that = this;
            var idx = 0;
            var comparer;
            var normalized = [];

            if (!that._valueComparer || that._valueType !== type) {
                that._valueType = type;

                for (; idx < values.length; idx++) {
                    normalized.push(unifyType(values[idx], type));
                }

                comparer = (current, values) => {
                    for (var idx = 0; idx < normalized.length; idx++) {
                        if (current === values[idx]) {
                            return idx;
                        }
                    }
                    return -1;
                };

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
                    $(children[selectedIndices[i]]).removeClass(KSELECTED).attr(ARIA_SELECTED, false);

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

                    if (!$(children[index]).hasClass(KSELECTED)) {
                        continue;
                    }

                    for (j = 0; j < selectedIndices.length; j++) {
                        selectedIndex = selectedIndices[j];

                        if (selectedIndex === index) {
                            $(children[selectedIndex]).removeClass(KSELECTED).attr(ARIA_SELECTED, false);
                            var dataItem = this._view[index].item;
                            var position = this._dataItemPosition(dataItem, this._values);

                            removed.push({
                                position: position,
                                dataItem: dataItem
                            });

                            dataItems.splice(j, 1);
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
                    $(children[index]).removeClass(KSELECTED);
                }
            }

            if (removed.length) {
                this.trigger(CHANGE, {
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

            if (last(indices) !== -1) {
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

                $(children[index]).addClass(KSELECTED).attr(ARIA_SELECTED, true);

                added.push({
                    dataItem: dataItem
                });
            }

            return added;
        },

        getElementIndex: function(element) {
            return $(element).data("offset-index");
        },

        _get: function(candidate) {
            if (typeof candidate === "number") {
                candidate = [candidate];
            } else if (!isArray(candidate)) {
                candidate = this.getElementIndex(candidate);
                candidate = [candidate !== undefined ? candidate : -1];
            }

            return candidate;
        },

        _templates: function() {
            var template;
            var options = this.options;
            var templates = {
                template: options.template,
                groupTemplate: options.groupTemplate,
                fixedGroupTemplate: options.fixedGroupTemplate
            };

            if (options.columns) {
                options.columns.forEach((column, i) => {
                    var templateText = column.field ? column.field.toString() : TEXT;
                    var templateFunc = data => htmlEncode(kendo.getter(templateText)(data));

                    templates["column" + i] = column.template || templateFunc;
                });
            }

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
                if (this.header.closest(GROUP_ROW_SEL).length) {
                    this.header.closest(GROUP_ROW_SEL).show();
                } else {
                    this.header.show();
                }

                this.content.scroll(this._onScroll);
            } else {
                if (this.header.closest(GROUP_ROW_SEL).length) {
                    this.header.closest(GROUP_ROW_SEL).hide();
                } else {
                    this.header.hide();
                }

                this.content.off("scroll", this._onScroll);
            }
        },

        _renderHeader: function() {
            var template = this.templates.fixedGroupTemplate;
            if (!template) {
                return;
            }

            var visibleItem = this._firstVisibleItem();

            if (visibleItem && visibleItem.group.toString().length) {
                this.header.html(template(visibleItem.group));
            }
        },

        _renderItem: function(context) {
            var item = `<li tabindex="-1" role="${(this.options.aria && this.options.aria.itemRole) || 'option'}" unselectable="on" `;

            var dataItem = context.item;
            var notFirstItem = context.index !== 0;
            var selected = context.selected;
            var isGrouped = this.isGrouped();
            var hasColumns = this.options.columns && this.options.columns.length;
            var altRow = context.index % 2 === 1 ? " k-table-alt-row" : "";

            if (hasColumns) {
                item += ('class="k-table-row' + altRow);
            } else {
                item += 'class="k-list-item';
            }

            if (notFirstItem && context.newGroup) {
                item += ' k-first';
            }

            if (context.isLastGroupedItem && hasColumns) {
                item += ' k-last';
            }

            if (selected) {
                item += ' k-selected';
            }

            item += '" aria-selected="' + (selected ? "true" : "false") + '" data-offset-index="' + context.index + '">';
            if (hasColumns) {
                item += this._renderColumns(dataItem);
            } else {
                item += '<span class="k-list-item-text">';
                item += this.templates.template(dataItem);
                item += '</span>';
            }

            if (notFirstItem && context.newGroup) {
                if (hasColumns) {
                    item += '<span class="k-table-td k-table-group-td"><span>' + this.templates.groupTemplate(context.group) + '</span></span>';
                } else {
                    item += '<div class="k-list-item-group-label">' + this.templates.groupTemplate(context.group) + '</div>';
                }
            } else if (isGrouped && hasColumns) {
                item += '<span class="k-table-td k-table-spacer-td"></span>';
            }

            return item + "</li>";
        },

        _renderColumns: function(dataItem) {
            var item = "";

            for (var i = 0; i < this.options.columns.length; i++) {
                var currentWidth = this.options.columns[i].width;
                var currentWidthInt = parseInt(currentWidth, 10);
                var widthStyle = '';

                if (currentWidth && !isNaN(currentWidthInt)) {
                    widthStyle += `${kendo.attr('style-width')}="${currentWidthInt}${percentageUnitsRegex.test(currentWidth) ? "%" : "px"}"`;
                }

                item += "<span class='k-table-td' " + widthStyle + ">";
                item += this.templates["column" + i](dataItem);
                item += "</span>";
            }

            return item;
        },

        _render: function() {
            var html = "";
            var cspCompliantHtml;
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
                            isLastGroupedItem: j === group.items.length - 1,
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

            cspCompliantHtml = $(html);
            kendo.applyStylesFromKendoAttributes(cspCompliantHtml, ["width", "background-color"]);

            this.element.empty().append(cspCompliantHtml);

            if (isGrouped && dataContext.length) {
                this._renderHeader();
            }
        },

        _selected: function(dataItem, values) {
            var select = !this.isFiltered() || this.options.selectable === "multiple";
            return select && this._dataItemPosition(dataItem, values) !== -1;
        },

        setDSFilter: function(filter) {
            this._lastDSFilter = extend({}, filter);
        },

        isFiltered: function() {
            if (!this._lastDSFilter) {
                this.setDSFilter(this.dataSource.filter());
            }

            return !kendo.data.Query.compareFilters(this.dataSource.filter(), this._lastDSFilter);
        },

        refresh: function(e) {
            var that = this;
            var action = e && e.action;
            var skipUpdateOnBind = that.options.skipUpdateOnBind;
            var isItemChange = action === "itemchange";
            var result;

            that.trigger(DATA_BINDING);

            that._fixedHeader();

            that._render();

            that.bound(true);

            if (isItemChange || action === "remove") {
                result = mapChangedItems(that._dataItems, e.items);

                if (result.changed.length) {
                    if (isItemChange) {
                        that.trigger(SELECTED_ITEM_CHANGE, {
                            items: result.changed
                        });
                    } else {
                        that.value(that._getValues(result.unchanged));
                    }
                }
            } else if (that.isFiltered() || that._skipUpdate || that._emptySearch) {
                that.focus(0);
                if (that._skipUpdate) {
                    that._skipUpdate = false;
                    that._selectedIndices = that._valueIndices(that._values, that._selectedIndices);
                }
            } else if (!skipUpdateOnBind && (!action || action === "add")) {
                that.value(that._values);
            }

            if (that._valueDeferred) {
                that._valueDeferred.resolve();
            }

            that.trigger(DATA_BOUND);
        },

        bound: function(bound) {
            if (bound === undefined) {
                return this._bound;
            }

            this._bound = bound;
        },

        isGrouped: function() {
            return (this.dataSource.group() || []).length;
        }
    });

    ui.plugin(StaticList);

    function last(list) {
        return list[list.length - 1];
    }

    function getSelectedOption(select) {
        var index = select.selectedIndex;
        return index > -1 ? select.options[index] : {};
    }

    function mapChangedItems(selected, itemsToMatch) {
        var itemsLength = itemsToMatch.length;
        var selectedLength = selected.length;
        var dataItem;
        var found;
        var i, j;

        var changed = [];
        var unchanged = [];

        if (selectedLength) {
            for (i = 0; i < selectedLength; i++) {
                dataItem = selected[i];
                found = false;

                for (j = 0; j < itemsLength; j++) {
                    if (dataItem === itemsToMatch[j]) {
                        found = true;
                        changed.push({ index: i, item: dataItem });
                        break;
                    }
                }

                if (!found) {
                    unchanged.push(dataItem);
                }
            }
        }

        return {
            changed: changed,
            unchanged: unchanged
        };
    }

    function isValidFilterExpr(expression) {
        if (!expression || $.isEmptyObject(expression)) {
            return false;
        }

        if (expression.filters && !expression.filters.length) {
            return false;
        }

        return true;
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

    kendo.cssProperties.registerPrefix("List", "k-list-");

})(window.kendo.jQuery);
export default kendo;

