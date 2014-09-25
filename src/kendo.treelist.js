(function(f, define){
    define([ "./kendo.dom", "./kendo.data" ], f);
})(function(){

var __meta__ = {
    id: "treelist",
    name: "TreeList",
    category: "web",
    description: "",
    depends: [ "dom", "data" ]
};

(function($, undefined) {
    var data = kendo.data;
    var extend = $.extend;
    var kendoDom = kendo.dom;
    var kendoDomElement = kendoDom.element;
    var kendoTextElement = kendoDom.text;
    var kendoHtmlElement = kendoDom.html;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var DataSource = data.DataSource;
    var ObservableArray = data.ObservableArray;
    var Query = data.Query;
    var Model = data.Model;
    var proxy = $.proxy;
    var map = $.map;
    var grep = $.grep;
    var STRING = "string";
    var CHANGE = "change";
    var ERROR = "error";
    var PROGRESS = "progress";
    var DOT = ".";
    var NS = ".kendoTreeList";
    var CLICK = "click";
    var EDIT = "edit";

    var classNames = {
        wrapper: "k-treelist k-grid k-widget",
        header: "k-header",
        button: "k-button",
        alt: "k-alt",
        editCell: "k-edit-cell",
        group: "k-treelist-group",
        gridHeader: "k-grid-header",
        gridHeaderWrap: "k-grid-header-wrap",
        gridContent: "k-grid-content",
        gridContentWrap: "k-grid-content",
        footerTemplate: "k-footer-template",
        loading: "k-loading",
        refresh: "k-i-refresh",
        retry: "k-request-retry",
        selected: "k-state-selected",
        status: "k-status",
        icon: "k-icon",
        iconCollapse: "k-i-collapse",
        iconExpand: "k-i-expand",
        iconHidden: "k-i-none",
        iconPlaceHolder: "k-icon k-i-none",
        input: "k-input",
        dropPositions: "k-insert-top k-insert-bottom k-add k-insert-middle",
        dropTop: "k-insert-top",
        dropBottom: "k-insert-bottom",
        dropAdd: "k-add",
        dropMiddle: "k-insert-middle",
        dropDenied: "k-denied",
        dragStatus: "k-drag-status",
        dragClue: "k-drag-clue",
        dragClueText: "k-clue-text"
    };

    function findNode(dom, virtual) {
        virtual = [virtual];

        var current = virtual.shift();

        while(current) {

            if (current.node === dom || current.root === dom) {
                return current;
            }

            [].push.apply(virtual, current.children);

            current = virtual.shift();
        }

        return null;
    }

    function empty(element) {
        var parent = element.node.parentNode;

        element.children = [];
        element.remove();
        element.render(parent, null);
    }

    function removeChild(element, index) {
        var children = element.children;

        //children[index].remove();
        children.splice(index, 1);
    }

    var TreeListModel = Model.define({
        id: "id",

        fields: {
            id: { type: "number" },
            parentId: { type: "number", defaultValue: null }
        },

        init: function(value) {
            Model.fn.init.call(this, value);

            this._loaded = false;
        },

        loaded: function(value) {
            if (value !== undefined) {
                this._loaded = value;
            } else {
                return this._loaded;
            }
        },

        shouldSerialize: function(field) {
            return Model.fn.shouldSerialize.call(this, field) && field !== "_loaded" && field != "_error";
        }
    });

    var TreeListDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    modelBase: TreeListModel,
                    model: TreeListModel
                }
            }, options));
        },

        _readData: function(data) {
            return this.data().toJSON().concat(DataSource.fn._readData.call(this, data));
        },

        _filterCallback: function(query) {
            var result = [];
            var data = query.toArray();
            var map = {};
            var i, parent, item;

            for (i = 0; i < data.length; i++) {
                item = data[i];

                while (item) {
                    map[item.id] = true;

                    if (!map[item.parentId]) {
                        map[item.parentId] = true;
                        item = this.parentNode(item);

                        if (item) {
                            result.push(item);
                        }
                    } else {
                        break;
                    }
                }
            }

            return new Query(data.concat(result));
        },

        _subtree: function(map, id) {
            var result = (id ? map[id] : map[null]) || [];

            for (var i = 0, len = result.length; i < len; i++) {
                result = result.concat(this._subtree(map, result[i].id));
            }

            return result;
        },

        _calculateAggregates: function (data, options) {
            options = options || {};

            var result = {};
            var item, subtree, i, id, parentId;
            var filter = options.filter;

            if (filter) {
                data = Query.process(data, {
                    filter: filter,
                    filterCallback: proxy(this._filterCallback, this)
                }).data;
            }

            // build hash id -> children
            var map = {};

            for (i = 0; i < data.length; i++) {
                item = data[i];
                id = item.id;
                parentId = item.parentId;

                map[id] = map[id] || [];
                map[parentId] = map[parentId] || [];
                map[parentId].push(item);
            }

            // calculate aggregates for each subtree
            result[null] = new Query(this._subtree(map, null)).aggregate(options.aggregate);

            for (i = 0; i < data.length; i++) {
                item = data[i];
                subtree = this._subtree(map, item.id);

                result[item.id] = new Query(subtree).aggregate(options.aggregate);
            }

            return result;
        },

        _queryProcess: function(data, options) {
            options = options || {};

            options.filterCallback = proxy(this._filterCallback, this);

            var result = Query.process(data, options);
            var length, hasChildren, i, flag, item;

            data = result.data;

            length = data.length;
            hasChildren = new Array(length);

            for (i = 0; i < length; i++) {
                hasChildren[data[i].parentId] = true;
            }

            for (i = 0; i < length; i++) {
                item = data[i];
                flag = !!hasChildren[item.id];
                item.loaded(flag);
                if (item.hasChildren !== true) {
                    item.hasChildren = flag;
                }
            }

            result.data = data;

            return result;
        },

        _queueRequest: function(options, callback) {
            // allow simultaneous requests (loading multiple items at the same time)
            callback.call(this);
        },

        _modelLoaded: function(id) {
            var model = this.get(id);
            model.loaded(true);
            model.hasChildren = this.childNodes(model).length > 0;
        },

        _modelError: function(id, e) {
            this.get(id)._error = e;
        },

        read: function(data) {
            if (!data || !data.id) {
                this._data.length = 0;
            }

            return DataSource.fn.read.call(this, data);
        },

        load: function(model) {
            var method = "_query";

            if (!model.loaded()) {
                method = "read";
            }

            return this[method]({ id: model.id }).then(
                proxy(this._modelLoaded, this, model.id),
                proxy(this._modelError, this, model.id)
            );
        },

        _byParentId: function(id) {
            var result = [];
            var view = this.view();

            for (var i = 0; i < view.length; i++) {
                if (view[i].parentId == id) {
                    result.push(view[i]);
                }
            }

            return result;
        },

        childNodes: function(model) {
            return this._byParentId(model.id);
        },

        rootNodes: function() {
            var model = this.reader.model;
            return this._byParentId(model.fields.parentId.defaultValue);
        },

        parentNode: function(model) {
            return this.get(model.parentId);
        },

        level: function(model) {
            var result = -1;

            if (!(model instanceof TreeListModel)) {
                model = this.get(model);
            }

            do {
                model = this.parentNode(model);
                result++;
            } while (model);

            return result;
        },

        filter: function(value) {
            var baseFilter = DataSource.fn.filter;

            if (value === undefined) {
                return baseFilter.call(this, value);
            }

            baseFilter.call(this, value);
        }
    });

    TreeListDataSource.create = function(options) {
        if ($.isArray(options)) {
            options = { data: options };
        } else if (options instanceof ObservableArray) {
            options = { data: options.toJSON() };
        }

        return options instanceof TreeListDataSource ? options : new TreeListDataSource(options);
    };

    function createPlaceholders(options) {
        var spans = [];
        var className = options.className;

        for (var i = 0, level = options.level; i < level; i++) {
            spans.push(kendoDomElement("span", { className: className }));
        }

        return spans;
    }

    var TreeList = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._dataSource();
            this._columns();
            this._layout();
            this._sortable();
            //this._selectable();
            this._attachEvents();

            //this._adjustHeight();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }

            //kendo.notify(this);
        },

        _dataSource: function() {
            var dataSource = this.options.dataSource;

            this._refreshHandler = proxy(this.refresh, this);
            this._errorHandler = proxy(this._error, this);
            this._progressHandler = proxy(this._progress, this);

            this.dataSource = TreeListDataSource.create(dataSource);

            this.dataSource.bind(CHANGE, this._refreshHandler);
            this.dataSource.bind(ERROR, this._errorHandler);
            this.dataSource.bind(PROGRESS, this._progressHandler);
        },

        _progress: function() {
            var messages = this.options.messages;

            if (!this.content.find("tr").length) {
                this._showStatus([
                    kendoDomElement("span", {
                        className: classNames.icon + " " + classNames.loading
                    }),
                    kendoTextElement(messages.loading)
                ]);
            }
        },

        _error: function(e) {
            if (!this.dataSource.rootNodes().length) {
                this._render({ error: e });
            }
        },

        refresh: function() {
            this._render();
        },

        _showStatus: function(statusDom) {
            this.contentTree.render([
                kendoDomElement("tr", { className: classNames.status }, [
                    kendoDomElement("td", null, statusDom)
                ])
            ]);
        },

        _adjustHeight: function() {
            //this.content.height(this.element.height() - this.header.parent().outerHeight());
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            var dataSource = this.dataSource;

            dataSource.unbind(CHANGE, this._refreshHandler);
            dataSource.unbind(ERROR, this._errorHandler);
            dataSource.unbind(PROGRESS, this._progressHandler);

            this.content.off(NS);

            this._refreshHandler = this._errorHandler = this._progressHandler = null;
            this.header = this.content = this.element = this._headerTree = this.contentTree = null;
        },

        options: {
            name: "TreeList",
            autoBind: true,
            scrollable: true,
            messages: {
                noRows: "No records to display",
                loading: "Loading...",
                requestFailed: "Request failed.",
                retry: "Retry"
            },
            editable: false
        },

        events: [
            EDIT
        ],

        _toggleChildren: function(e) {
            var icon = $(e.currentTarget);
            var model = this.dataItem(icon);
            var loaded = model.loaded();

            // reset error state
            if (model._error) {
                model.expanded = false;
                model._error = undefined;
            }

            // do not trigger load twice
            if (!loaded && model.expanded) {
                return;
            }

            // toggle expanded state
            model.expanded = !model.expanded;

            if (!loaded) {
                this.dataSource.load(model)
                    .always(proxy(this.refresh, this));
            }

            this.refresh();
        },

        _attachEvents: function() {
            var icons = "." + classNames.iconCollapse +
                ", ." + classNames.iconExpand +
                ", ." + classNames.refresh;
            var retryButton = "." + classNames.retry;
            var dataSource = this.dataSource;

            this.content
                .on(CLICK + NS, icons, proxy(this._toggleChildren, this))
                .on(CLICK + NS, retryButton, proxy(dataSource.fetch, dataSource));
        },

        _columns: function() {
            var columns = this.options.columns || [];

            this.columns = map(columns, function(column) {
                column = (typeof column === "string") ? { field: column } : column;

                return extend({ encoded: true }, column);
            });

            var expandableColumns = grep(this.columns, function(c) {
                return c.expandable;
            });

            if (this.columns.length && !expandableColumns.length) {
                this.columns[0].expandable = true;
            }

            this._columnTemplates();
        },

        _columnTemplates: function() {
            var idx, length, column;
            var columns = this.columns;

            for (idx = 0, length = columns.length; idx < length; idx++) {
                column = columns[idx];
                if (column.template) {
                    column.template = kendo.template(column.template);
                }

                if (column.headerTemplate) {
                    column.headerTemplate = kendo.template(column.headerTemplate);
                }

                if (column.footerTemplate) {
                    column.footerTemplate = kendo.template(column.footerTemplate);
                }
            }
        },

        _layout: function () {
            var element = this.element;

            element.addClass(classNames.wrapper);

            var layout =
                "<div class='#= gridHeader #'>" +
                    "<div class='#= gridHeaderWrap #'>" +
                        "<table role='grid'>" +
                            "<thead role='rowgroup' />" +
                        "</table>" +
                    "</div>" +
                "</div>" +
                "<div class='#= gridContentWrap #'>" +
                    "<table role='treegrid' tabindex='0'>" +
                        "<tbody />" +
                    "</table>" +
                "</div>";

            if (!this.options.scrollable) {
                layout =
                    "<table role='treegrid' tabindex='0'>" +
                        "<thead class='#= gridHeader #' role='rowgroup' />" +
                        "<tbody />" +
                    "</table>";
            }

            element.append(kendo.template(layout)(classNames));

            this.header = element.find(DOT + classNames.gridHeader).find("thead").addBack();
            this._headerTree = new kendoDom.Tree(this.header[0]);
            this._headerTree.render([kendoDomElement("tr", { "role": "row" }, this._ths())]);

            this.content = element.find(DOT + classNames.gridContentWrap).find("tbody");

            if (!this.content.length) {
                this.content = element.find("tbody");
            }

            this.contentTree = new kendoDom.Tree(this.content[0]);
        },

        _render: function(options) {
            options = options || {};

            var colgroup, tbody, table;
            var messages = this.options.messages;
            var data = this.dataSource.rootNodes();
            var aggregates = this.dataSource.aggregates();

            this._absoluteIndex = 0;

            if (options.error) {
                // root-level error message
                this._showStatus([
                    kendoTextElement(messages.requestFailed),
                    kendoDomElement("button", {
                        className: [ classNames.button, classNames.retry ].join(" ")
                    }, [ kendoTextElement(messages.retry) ])
                ]);
            } else if (!data.length) {
                // no rows message
                this._showStatus([
                    kendoTextElement(messages.noRows)
                ]);
            } else {
                // render rows
                this.contentTree.render(this._trs({
                    aggregates: options.aggregates,
                    data: data,
                    level: 0
                }));
            }
        },

        _ths: function() {
            var columns = this.columns;
            var column;
            var title;
            var attr;
            var ths = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];
                attr = {
                    "data-field": column.field,
                    "data-title": column.title,
                    className: classNames.header,
                    "role": "columnheader"
                };

                if (column.headerTemplate) {
                    title = column.headerTemplate({});
                } else {
                    title = column.title || column.field || "";
                }

                ths.push(kendoDomElement("th", attr, [kendoTextElement(title)]));
            }

            return ths;
        },

        _cols: function() {
            var columns = this.columns;
            var style;
            var width;
            var cols = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                width = columns[i].width;

                if (width && parseInt(width, 10) !== 0) {
                    style = { style: { width: typeof width === "string" ? width : width + "px" } };
                } else {
                    style = null;
                }

                cols.push(kendoDomElement("col", style, []));
            }

            return kendoDomElement("colgroup", null, cols);
        },

        _trs: function(options) {
            var model;
            var rows = [];
            var attr;
            var className;
            var level = options.level;
            var data = options.data;
            var aggregates = options.aggregates || {};
            var hasChildren;
            var childNodes;
            var dataSource = this.dataSource;

            for (var i = 0, length = data.length; i < length; i++) {
                className = [];

                model = data[i];

                childNodes = model.loaded() && dataSource.childNodes(model);
                hasChildren = childNodes && childNodes.length;

                attr = {
                    "data-uid": model.uid,
                    "data-level": level,
                    "role": "row"
                };

                if (hasChildren) {
                    attr["aria-expanded"] = model.expanded;
                }

                if (this._absoluteIndex % 2 !== 0) {
                    className.push(classNames.alt);
                }
                this._absoluteIndex++;

                if (hasChildren) {
                    className.push(classNames.group);
                }

                if (model._edit) {
                    className.push("k-grid-edit-row");
                }

                if (className.length) {
                    attr.className = className.join(" ");
                }

                rows.push(this._tds({
                    model: model,
                    attr: attr,
                    level: level
                }, this._td));

                if (model.expanded && hasChildren) {
                    rows = rows.concat(this._trs({
                        parentId: model.id,
                        aggregates: aggregates,
                        data: childNodes,
                        level: level + 1
                    }));
                }
            }

            if (this._hasFooterTemplate()) {
                rows.push(this._tds({
                    model: aggregates[options.parentId || null],
                    attr: { className: classNames.footerTemplate },
                    level: level
                }, this._footerTd));
            }

            return rows;
        },

        _footerTd: function(options) {
            var content = [];
            var column = options.column;
            var template = options.column.footerTemplate || $.noop;
            var aggregates = options.model[column.field] || {};

            if (column.expandable) {
                content = content.concat(createPlaceholders({
                    level: options.level + 1,
                    className: classNames.iconPlaceHolder
                }));
            }

            content.push(kendoTextElement(template(aggregates) || ""));

            return kendoDomElement("td", { "role": "gridcell" }, content);
        },

        _hasFooterTemplate: function() {
            return !!grep(this.columns, function(c) {
                return c.footerTemplate;
            }).length;
        },

        _tds: function(options, renderer) {
            var children = [];
            var columns = this.columns;
            var column;

            for (var i = 0, l = columns.length; i < l; i++) {
                column = columns[i];

                children.push(renderer({
                    model: options.model,
                    column: column,
                    level: options.level
                }));
            }

            return kendoDomElement("tr", options.attr, children);
        },

        _td: function(options) {
            var children = [];
            var model = options.model;
            var column = options.column;
            var value;
            var iconClass;
            var attr = { "role": "gridcell" };

            if (column.template) {
                value = column.template(model);
            } else if (column.field) {
                value = model.get(column.field);
                if (column.format) {
                    value = kendo.format(column.format, value);
                }
            }

            if (typeof value == "undefined") {
                value = "";
            }

            if (model._edit && model.editable(column.field)) {
                attr[kendo.attr("container-for")] = column.field;
            } else {
                if (column.expandable) {
                    children = createPlaceholders({ level: options.level, className: classNames.iconPlaceHolder });
                    iconClass = [classNames.icon];

                    if (model.hasChildren) {
                        iconClass.push(model.expanded ? classNames.iconCollapse : classNames.iconExpand);
                    } else {
                        iconClass.push(classNames.iconHidden);
                    }

                    if (model._error) {
                        iconClass.push(classNames.refresh);
                    } else if (!model.loaded() && model.expanded) {
                        iconClass.push(classNames.loading);
                    }

                    children.push(kendoDomElement("span", { className: iconClass.join(" ") }));
                }

                if (column.encoded) {
                    children.push(kendoTextElement(value));
                } else {
                    children.push(kendoHtmlElement (value));
                }
            }

            return kendoDomElement("td", attr , children);
        },

        _sortable: function() {
            var columns = this.columns;
            var column;
            var sortableInstance;
            var cells = this.header.find("th");
            var cell;

            for (var idx = 0, length = cells.length; idx < length; idx++) {
                column = columns[idx];

                if (column.sortable) {
                    cell = cells.eq(idx);

                    sortableInstance = cell.data("kendoColumnSorter");

                    if (sortableInstance) {
                        sortableInstance.destroy();
                    }

                    cell.attr("data-" + kendo.ns + "field", column.field)
                        .kendoColumnSorter({ dataSource: this.dataSource });
                }
            }
            cells = null;
        },

        _rowClick: function(e) {
           var element = $(e.currentTarget);

           if (!e.ctrlKey) {
               this.select(element);
           } else {
               this.clearSelection();
           }
       },

        _selectable: function() {
            if (this.options.selectable) {
                this.content.on(CLICK + NS, "tr", proxy(this._rowClick, this));
            }
        },

        select: function(value) {
            var element = this.content.find(value);
            var selectedClassName = classNames.selected;

            if (element.length) {
                element
                    .siblings(DOT + selectedClassName)
                    .removeClass(selectedClassName)
                    .attr("aria-selected", false)
                    .end()
                    .addClass(selectedClassName)
                    .attr("aria-selected", true);

                this.trigger(CHANGE);

                return;
            }

            return this.content.find(DOT + selectedClassName);
        },

        clearSelection: function() {
            var selected = this.select();

            if (selected.length) {
                selected.removeClass(classNames.selected);

                this.trigger(CHANGE);
            }
        },

        _setDataSource: function(dataSource) {
            this.dataSource = dataSource;
        },

        dataItem: function(element) {
            var row = $(element).closest("tr");
            var model = this.dataSource.getByUid(row.attr(kendo.attr("uid")));

            return model;
        },

        editRow: function(row) {
            var model;

            if (typeof row === STRING) {
                row = this.content.find(row);
            }

            model = this.dataItem(row);
            model._edit = true;

            this._cancelEditor();

            this._render();

            this._createEditor(model);

            this.trigger(EDIT, {
                container: this.editable.element,
                model: model
            });
        },

        cancelRow: function() {
            this._cancelEditor();

            this._render();
        },

        _cancelEditor: function() {
            var model;
            var editable = this.editable;

            if (editable) {
                model = this.dataItem(editable.element);

                this._destroyEditable();

                this.dataSource.cancelChanges(model);

                model._edit = false;
            }
        },

        _destroyEditable: function() {
            if (!this.editable) {
                return;
            }

            this.editable.destroy();
            this.editable.element.find("[" + kendo.attr("container-for") + "]").empty();
            this.editable = null;
        },

        _createEditor: function(model) {
            var row = this.content.find("[" + kendo.attr("uid") + "=" + model.uid + "]");

            this.editable = new ui.Editable(row, {
                fields: this._editableFields(model),
                target: this,
                clearContainer: false,
                model: model
            });
        },

        _editableFields: function(model) {
            var fields = [];
            var columns = this.columns;
            var idx, length, field, column;

            for (idx = 0, length = columns.length; idx < length; idx++) {
                column = columns[idx];
                field = column.field;

                if (field && model.editable(field)) {
                    fields.push({
                        field: field,
                        format: column.format,
                        editor: column.editor
                    });
                }
            }

            return fields;
        }
    });

    extend(true, kendo.data, {
        TreeListDataSource: TreeListDataSource,
        TreeListModel: TreeListModel
    });

    extend(true, kendo.ui, {
        TreeList: TreeList
    });

    ui.plugin(TreeList);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
