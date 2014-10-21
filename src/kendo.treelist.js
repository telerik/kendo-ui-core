(function(f, define){
    define([ "./kendo.dom", "./kendo.data", "./kendo.columnsorter", "./kendo.editable", "./kendo.window", "./kendo.filtermenu", "./kendo.selectable" ], f);
})(function(){

var __meta__ = {
    id: "treelist",
    name: "TreeList",
    category: "web",
    description: "The TreeList widget displays self-referencing data and offers rich support for interacting with data, sorting, filtering, and selection.",
    depends: [ "dom", "data" ],
    features: [ {
        id: "treelist-sorting",
        name: "Sorting",
        description: "Support for column sorting",
        depends: [ "columnsorter" ]
    }, {
        id: "treelist-filtering",
        name: "Filtering",
        description: "Support for record filtering",
        depends: [ "filtermenu" ]
    }, {
        id: "treelist-editing",
        name: "Editing",
        description: "Support for record editing",
        depends: [ "editable", "window" ]
    }, {
        id: "treelist-selection",
        name: "Selection",
        description: "Support for row selection",
        depends: [ "selectable" ]
    } ]
};

(function($, undefined) {
    var data = kendo.data;
    var extend = $.extend;
    var kendoDom = kendo.dom;
    var kendoDomElement = kendoDom.element;
    var kendoTextElement = kendoDom.text;
    var kendoHtmlElement = kendoDom.html;
    var ui = kendo.ui;
    var DataBoundWidget = ui.DataBoundWidget;
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
    var SAVE = "save";
    var REMOVE = "remove";
    var DATABINDING = "dataBinding";
    var DATABOUND = "dataBound";
    var CANCEL = "cancel";

    var classNames = {
        wrapper: "k-treelist k-grid k-widget",
        header: "k-header",
        button: "k-button",
        alt: "k-alt",
        editCell: "k-edit-cell",
        group: "k-treelist-group",
        gridToolbar: "k-grid-toolbar",
        gridHeader: "k-grid-header",
        gridHeaderWrap: "k-grid-header-wrap",
        gridContent: "k-grid-content",
        gridContentWrap: "k-grid-content",
        gridFilter: "k-grid-filter",
        footerTemplate: "k-footer-template",
        loading: "k-loading",
        refresh: "k-i-refresh",
        retry: "k-request-retry",
        selected: "k-state-selected",
        status: "k-status",
        link: "k-link",
        withIcon: "k-with-icon",
        filterable: "k-filterable",
        icon: "k-icon",
        iconFilter: "k-filter",
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

    var defaultCommands = {
        create: {
            imageClass: "k-add",
            className: "k-grid-add",
            methodName: "addRow"
        },
        createchild: {
            imageClass: "k-add",
            className: "k-grid-add",
            methodName: "addRow"
        },
        destroy: {
            imageClass: "k-delete",
            className: "k-grid-delete",
            methodName: "removeRow"
        },
        edit: {
            imageClass: "k-edit",
            className: "k-grid-edit",
            methodName: "editRow"
        },
        update: {
            imageClass: "k-update",
            className: "k-primary k-grid-update",
            methodName: "saveRow"
        },
        canceledit: {
            imageClass: "k-cancel",
            className: "k-grid-cancel",
            methodName: "_cancelEdit"
        }
    };

    var TreeListModel = Model.define({
        id: "id",

        fields: {
            id: { type: "number" },
            parentId: { type: "number", nullable: true }
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
            return Model.fn.shouldSerialize.call(this, field) && field !== "_loaded" && field != "_error" && field != "_edit";
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

        _readData: function(newData) {
            var result = [];
            var data = this.data();
            var i, length;

            for (i = 0, length = data.length; i < length; i++) {
                result.push(data[i]);
            }

            return result.concat(DataSource.fn._readData.call(this, newData));
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
            var result = map[id] || [];
            var defaultParentId = this._defaultParentId();

            for (var i = 0, len = result.length; i < len; i++) {
                if (result[i].id !== defaultParentId) {
                    result = result.concat(this._subtree(map, result[i].id));
                }
            }

            return result;
        },

        // builds hash id -> children
        _childrenMap: function(data) {
            var map = {};
            var i, item, id, parentId;

            data = this._observeView(data);

            for (i = 0; i < data.length; i++) {
                item = data[i];
                id = item.id;
                parentId = item.parentId;

                map[id] = map[id] || [];
                map[parentId] = map[parentId] || [];
                map[parentId].push(item);
            }

            return map;
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

            var map = this._childrenMap(data);

            // calculate aggregates for each subtree
            result[this._defaultParentId()] = new Query(this._subtree(map, this._defaultParentId())).aggregate(options.aggregate);

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

            var defaultParentId = this._defaultParentId();
            var result = Query.process(data, options);
            var map = this._childrenMap(result.data);
            var hasChildren, i, item, children;

            data = map[defaultParentId] || [];

            for (i = 0; i < data.length; i++) {
                item = data[i];

                if (item.id === defaultParentId) {
                    continue;
                }

                children = map[item.id];
                hasChildren = !!(children && children.length);

                if (!item.loaded()) {
                    item.loaded(hasChildren);
                }

                if (item.loaded() || item.hasChildren !== true) {
                    item.hasChildren = hasChildren;
                }

                if (hasChildren) {
                    data.splice.apply(data, [i+1, 0].concat(children));
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

        _byParentId: function(id, defaultId) {
            var result = [];
            var view = this.view();
            var current;

            if (id === defaultId) {
                return [];
            }

            for (var i = 0; i < view.length; i++) {
                current = view[i];

                if (current.parentId == id) {
                    result.push(current);
                }
            }

            return result;
        },

        _defaultParentId: function() {
            return this.reader.model.fn.defaults.parentId;
        },

        childNodes: function(model) {
            return this._byParentId(model.id, this._defaultParentId());
        },

        rootNodes: function() {
            return this._byParentId(this._defaultParentId());
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

    var Editor = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this);

            options = this.options = extend(true, {}, this.options, options);

            this.element = element;

            this.bind(this.events, options);

            this.model = this.options.model;

            this.fields = this._fields(this.options.columns);

            this._initContainer();

            this.createEditable();
        },

        events: [],

        _initContainer: function() {
            this.wrapper = this.element;
        },

        createEditable: function() {
            var options = this.options;

            this.editable = new ui.Editable(this.wrapper, {
                fields: this.fields,
                target: options.target,
                clearContainer: options.clearContainer,
                model: this.model
            });
        },

        _isEditable: function(column) {
            return column.field && this.model.editable(column.field);
        },

        _fields: function(columns) {
            var fields = [];
            var idx, length, column;

            for (idx = 0, length = columns.length; idx < length; idx++) {
                column = columns[idx];

                if (this._isEditable(column)) {
                    fields.push({
                        field: column.field,
                        format: column.format,
                        editor: column.editor
                    });
                }
            }

            return fields;
        },

        end: function() {
            return this.editable.end();
        },

        close: function() {
            this.destroy();
        },

        destroy: function() {
            this.editable.destroy();
            this.editable.element.find("[" + kendo.attr("container-for") + "]").empty();
            this.model = this.wrapper = this.element = this.columns = this.editable = null;
        }
    });

    var PopupEditor = Editor.extend({
        init: function(element, options) {
            Editor.fn.init.call(this, element, options);

            this._attachHandlers();

            this.open();
        },

        events: [
            CANCEL,
            SAVE
        ],

        options: {
            window: {
                modal: true,
                resizable: false,
                draggable: true,
                title: "Edit",
                visible: false
            }
        },

        _initContainer: function() {
            this.wrapper = $('<div class="k-popup-edit-form"/>')
                .attr(kendo.attr("uid"), this.model.uid)
                .append('<div class="k-edit-form-container"/>');

            var formContent = [];

            if (this.options.template) {
                this._appendTemplate(formContent);
                this.fields = [];
            } else {
                this._appendFields(formContent);
            }
            this._appendButtons(formContent);

            new kendoDom.Tree(this.wrapper.children()[0]).render(formContent);

            this.window = new ui.Window(this.wrapper, this.options.window);
        },

        _appendTemplate: function(form) {
            var template = this.options.template;

            if (typeof template === STRING) {
                template = window.unescape(template);
            }

            template = kendo.template(template)(this.model);

            form.push(kendoHtmlElement(template));
        },

        _appendFields: function(form) {
            var idx, length, column;
            var model = this.model;
            var columns = this.options.columns;

            for (idx = 0, length = columns.length; idx < length; idx++) {
                column = columns[idx];

                if (column.command) {
                    continue;
                }

                form.push(kendoHtmlElement('<div class="k-edit-label"><label for="' + column.field + '">' + (column.title || column.field || "") + '</label></div>'));

                if (this._isEditable(column)) {
                    form.push(kendoHtmlElement('<div ' + kendo.attr("container-for") + '="' + column.field +
                                '" class="k-edit-field"></div>'));
                } else {
                    form.push(kendoDomElement("div", {
                            "class": "k-edit-field"
                        },
                        [ this.options.fieldRenderer(column, this.model) ]));
                }
            }
        },

        _appendButtons: function(form) {
            form.push(kendoDomElement("div", {
                "class": "k-edit-buttons k-state-default"
            }, this.options.commandRenderer()));
        },

        _attachHandlers: function() {
            var closeHandler = this._cancelProxy = proxy(this._cancel, this);
            this.wrapper.on(CLICK + NS, ".k-grid-cancel", this._cancelProxy);

            this._saveProxy = proxy(this._save, this);
            this.wrapper.on(CLICK + NS, ".k-grid-update", this._saveProxy);

            this.window.bind("close", function(e) {
                if (e.userTriggered) {
                    closeHandler(e);
                }
            });
        },

        _dettachHandlers: function() {
            this._cancelProxy = null;
            this._saveProxy = null;
            this.wrapper.off(NS);
        },

        _cancel: function(e) {
            this.trigger(CANCEL, e);
        },

        _save: function(e) {
            this.trigger(SAVE);
        },

        open: function() {
            this.window.center().open();
        },

        close: function() {
            this.window.bind("deactivate", proxy(this.destroy, this)).close();
        },

        destroy: function() {
            this.window.destroy();
            this.window = null;
            this._dettachHandlers();

            Editor.fn.destroy.call(this);
        }
    });

    var TreeList = DataBoundWidget.extend({
        init: function(element, options) {
            DataBoundWidget.fn.init.call(this, element, options);

            this._dataSource(this.options.dataSource);

            this._columns();
            this._layout();
            this._sortable();
            this._filterable();
            this._selectable();
            this._attachEvents();
            this._toolbar();

            this._adjustHeight();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }

            kendo.notify(this);
        },

        _progress: function() {
            var messages = this.options.messages;

            if (!this.content.find("tr").length) {
                this._showStatus(
                    kendo.template(
                        "<span class='#= className #' /> #: messages.loading #"
                    )({
                        className: classNames.icon + " " + classNames.loading,
                        messages: messages
                    })
                );
            }
        },

        _error: function(e) {
            if (!this.dataSource.rootNodes().length) {
                this._render({ error: e });
            }
        },

        refresh: function(e) {
            e = e || {};

            if (e.action == "itemchange" && this.editor) {
                return;
            }

            if (this.trigger(DATABINDING)) {
                return;
            }

            this._angularItems("cleanup");

            this._cancelEditor();

            this._render();

            this._angularItems("compile");

            this.trigger(DATABOUND);
        },

        items: function() {
            return this.content.find("tr").filter(function() {
                return !$(this).hasClass(classNames.footerTemplate);
            });
        },

        _showStatus: function(message) {
            var status = this.element.find(".k-status");

            if (!status.length) {
                status = $("<div class='k-status' />").appendTo(this.element);
            }

            this._contentTree.render([]);

            status.html(message);
        },

        _hideStatus: function() {
            this.element.find(".k-status").remove();
        },

        _adjustHeight: function() {
            var element = this.element;
            var contentWrap = element.find(DOT + classNames.gridContentWrap);
            var header = element.find(DOT + classNames.gridHeader);

            element.height(this.options.height);

            // identical code found in grid & splitter :(
            var isHeightSet = function(el) {
                var initialHeight, newHeight;
                if (el[0].style.height) {
                    return true;
                } else {
                    initialHeight = el.height();
                }

                el.height("auto");
                newHeight = el.height();
                el.height("");

                return (initialHeight != newHeight);
            };

            if (isHeightSet(element)) {
                contentWrap.height(element.height() - header.outerHeight());
            }
        },

        destroy: function() {
            DataBoundWidget.fn.destroy.call(this);

            var dataSource = this.dataSource;

            dataSource.unbind(CHANGE, this._refreshHandler);
            dataSource.unbind(ERROR, this._errorHandler);
            dataSource.unbind(PROGRESS, this._progressHandler);

            this._destroyEditor();

            this.element.off(NS);

            this._refreshHandler = this._errorHandler = this._progressHandler = null;
            this.header = this.content = this.element = null;
            this._statusTree = this._headerTree = this._contentTree = null;
        },

        options: {
            name: "TreeList",
            columns: [],
            autoBind: true,
            scrollable: true,
            selectable: false,
            sortable: false,
            toolbar: null,
            height: null,
            messages: {
                noRows: "No records to display",
                loading: "Loading...",
                requestFailed: "Request failed.",
                retry: "Retry",
                commands: {
                    edit: "Edit",
                    update: "Update",
                    canceledit: "Cancel",
                    create: "Add new record",
                    createchild: "Add child record",
                    destroy: "Delete"
                }
            },
            filterable: false,
            editable: false
        },

        events: [
            CHANGE,
            EDIT,
            SAVE,
            REMOVE,
            DATABINDING,
            DATABOUND,
            CANCEL
        ],

        _toggle: function(row, expand) {
            var model = this.dataItem(row);
            var loaded = model.loaded();

            // reset error state
            if (model._error) {
                model.expanded = false;
                model._error = undefined;
            }

            // do not load items that are currently loading
            if (!loaded && model.expanded) {
                return;
            }

            // toggle expanded state
            if (typeof expand == "undefined") {
                expand = !model.expanded;
            }

            model.expanded = expand;

            if (!loaded) {
                this.dataSource.load(model)
                    .always(proxy(this.refresh, this));
            }

            this.refresh();
        },

        expand: function(row) {
            this._toggle(row, true);
        },

        collapse: function(row) {
            this._toggle(row, false);
        },

        _toggleChildren: function(e) {
            var icon = $(e.currentTarget);

            this._toggle(icon);
        },

        _attachEvents: function() {
            var icons = DOT + classNames.iconCollapse +
                ", ." + classNames.iconExpand +
                ", ." + classNames.refresh;
            var retryButton = DOT + classNames.retry;
            var dataSource = this.dataSource;

            this.element
                .on(CLICK + NS, icons, proxy(this._toggleChildren, this))
                .on(CLICK + NS, retryButton, proxy(dataSource.fetch, dataSource))
                .on(CLICK + NS, ".k-button[data-command]", proxy(this._commandClick, this));
        },

        _commandByName: function(name) {
            var columns = this.columns;
            var i, j, commands;

            if (defaultCommands[name]) {
                return defaultCommands[name];
            }

            // command not found in defaultCommands, must be custom
            for (i = 0; i < columns.length; i++) {
                commands = columns[i].command;
                if (commands) {
                    for (j = 0; j < commands.length; j++) {
                        if (commands[j].name == name) {
                            return commands[j];
                        }
                    }
                }
            }
        },

        _commandClick: function(e) {
            var button = $(e.currentTarget);
            var commandName = button.attr("data-command");
            var command = this._commandByName(commandName);
            var row = button.closest("tr");

            row = row.length ? row : undefined;

            if (command) {
                if (command.methodName) {
                    this[command.methodName](row);
                } else if (command.click) {
                    command.click(e);
                }
            }
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
            var colgroup = this._colgroup();
            var layout = "";

            this.wrapper = element.addClass(classNames.wrapper);

            layout =
                "<div class='#= gridHeader #'>" +
                    "<div class='#= gridHeaderWrap #'>" +
                        "<table role='grid'>" +
                            colgroup +
                            "<thead role='rowgroup' />" +
                        "</table>" +
                    "</div>" +
                "</div>" +
                "<div class='#= gridContentWrap #'>" +
                    "<table role='treegrid' tabindex='0'>" +
                        colgroup +
                        "<tbody />" +
                    "</table>" +
                "</div>";

            if (!this.options.scrollable) {
                layout =
                    "<table role='treegrid' tabindex='0'>" +
                        colgroup +
                        "<thead class='#= gridHeader #' role='rowgroup' />" +
                        "<tbody />" +
                    "</table>";
            }

            if (this.options.toolbar) {
                layout = "<div class='#= header # #= gridToolbar #' />" + layout;
            }

            element.append(
                kendo.template(layout)(classNames) +
                "<div class='k-status' />"
            );

            this.toolbar = element.find(DOT + classNames.gridToolbar);

            this.header = element.find(DOT + classNames.gridHeader).find("thead").addBack().filter("thead");
            this._headerTree = new kendoDom.Tree(this.header[0]);
            this._headerTree.render([kendoDomElement("tr", { "role": "row" }, this._ths())]);

            this.content = element.find(DOT + classNames.gridContentWrap).find("tbody");

            if (!this.content.length) {
                this.content = element.find("tbody");
            }

            this._contentTree = new kendoDom.Tree(this.content[0]);

            this._statusTree = new kendoDom.Tree(this.element.children(".k-status")[0]);
        },

        _toolbar: function() {
            var options = this.options.toolbar;

            if (!options) {
                return;
            }

            if ($.isArray(options)) {
                var buttons = this._buildCommands(options);
                new kendoDom.Tree(this.toolbar[0]).render(buttons);
            } else {
                this.toolbar.append(kendo.template(options)({}));
            }
        },

        _render: function(options) {
            options = options || {};

            var messages = this.options.messages;
            var data = this.dataSource.rootNodes();
            var aggregates = this.dataSource.aggregates();

            this._absoluteIndex = 0;

            if (options.error) {
                // root-level error message
                this._showStatus(kendo.template(
                    "#: messages.requestFailed # " +
                    "<button class='#= buttonClass #'>#: messages.retry #</button>"
                )({
                    buttonClass: [ classNames.button, classNames.retry ].join(" "),
                    messages: messages
                }));
            } else if (!data.length) {
                // no rows message
                this._showStatus(kendo.htmlEncode(messages.noRows));
            } else {
                // render rows
                this._hideStatus();
                this._contentTree.render(this._trs({
                    aggregates: options.aggregates,
                    data: data,
                    visible: true,
                    level: 0
                }));
            }
        },

        _ths: function() {
            var columns = this.columns;
            var filterable = this.options.filterable;
            var ths = [];
            var column, title, children, cellClasses;

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];
                children = [];
                cellClasses = [classNames.header];

                if (column.headerTemplate) {
                    title = column.headerTemplate({});
                } else {
                    title = column.title || column.field || "";
                }

                if (column.sortable) {
                    children.push(kendoDomElement("a", { href: "#", className: classNames.link }, [
                        kendoTextElement(title)
                    ]));
                } else {
                    children.push(kendoTextElement(title));
                }

                ths.push(kendoDomElement("th", {
                    "data-field": column.field,
                    "data-title": column.title,
                    className: cellClasses.join(" "),
                    "role": "columnheader"
                }, children));
            }

            return ths;
        },

        _colgroup: function() {
            var columns = this.columns;
            var cols = [];
            var style, width;

            for (var i = 0, length = columns.length; i < length; i++) {
                cols.push("<col ");

                width = columns[i].width;

                if (width && parseInt(width, 10) !== 0) {
                    cols.push("style='width:");
                    cols.push(typeof width === "string" ? width : width + "px");
                    cols.push("'");
                }

                cols.push("/>");
            }

            return "<colgroup>" + cols.join("") + "</colgroup>";
        },

        _trs: function(options) {
            var model;
            var rows = [];
            var attr;
            var className;
            var level = options.level;
            var data = options.data;
            var hasChildren;
            var childNodes;
            var dataSource = this.dataSource;
            var aggregates = dataSource.aggregates() || {};

            for (var i = 0, length = data.length; i < length; i++) {
                className = [];

                model = data[i];

                childNodes = model.loaded() && dataSource.childNodes(model);
                hasChildren = childNodes && childNodes.length;

                attr = {
                    "data-uid": model.uid,
                    "role": "row"
                };

                if (hasChildren) {
                    attr["aria-expanded"] = !!model.expanded;
                }

                if (this._absoluteIndex % 2 !== 0) {
                    className.push(classNames.alt);
                }

                if (options.visible) {
                    this._absoluteIndex++;
                } else {
                    attr.style = { display: "none" };
                }

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
                }, proxy(this._td, this)));

                if (hasChildren) {
                    rows = rows.concat(this._trs({
                        parentId: model.id,
                        aggregates: aggregates,
                        visible: options.visible && !!model.expanded,
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
            var iconClass;
            var attr = { "role": "gridcell" };

            if (model._edit && column.field && model.editable(column.field)) {
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

                if (column.command) {
                    if (model._edit) {
                        children = this._buildCommands(["update", "canceledit"]);
                    } else {
                        children = this._buildCommands(column.command);
                    }
                } else  {
                    children.push(this._cellContent(column, model));
                }
            }

            return kendoDomElement("td", attr, children);
        },

        _cellContent: function(column, model) {
            var value;

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

            if (column.template || !column.encoded) {
                return kendoHtmlElement(value);
            } else {
                return kendoTextElement(value);
            }
        },

        _buildCommands: function(commands) {
            var i, result = [];

            for (i = 0; i < commands.length; i++) {
                result.push(this._button(commands[i]));
            }

            return result;
        },

        _button: function(command) {
            var name = command.name || command;
            var text = this.options.messages.commands[name];
            var icon = [];

            command = extend({} , defaultCommands[name], { text: text }, command);

            if (command.imageClass) {
                icon.push(kendoDomElement("span", {
                    className: [ "k-icon", command.imageClass ].join(" ")
                }));
            }

            return kendoDomElement(
                "button", {
                    "data-command": name,
                    className: [ "k-button", "k-button-icontext", command.className ].join(" ")
                }, icon.concat([ kendoTextElement(command.text) ])
            );
        },

        _sortable: function() {
            var columns = this.columns;
            var column;
            var sortableInstance;
            var cells = this.header.find("th");
            var cell, idx, length;
            var fieldAttr = kendo.attr("field");
            var sortable = this.options.sortable;

            if (!sortable) {
                return;
            }

            for (idx = 0, length = cells.length; idx < length; idx++) {
                column = columns[idx];

                if (column.sortable !== false && !column.command && column.field) {
                    cell = cells.eq(idx);

                    sortableInstance = cell.data("kendoColumnSorter");
                    if (sortableInstance) {
                        sortableInstance.destroy();
                    }

                    cell.attr(fieldAttr, column.field)
                        .kendoColumnSorter(
                            extend({}, sortable, column.sortable, {
                                dataSource: this.dataSource
                            })
                        );
                }
            }
        },

        _filterable: function() {
            var cells = this.header.find("th");
            var filterable = this.options.filterable;
            var idx, length, column;

            if (!filterable) {
                return;
            }

            for (idx = 0, length = cells.length; idx < length; idx++) {
                column = this.columns[idx];

                if (column.command || column.filterable === false) {
                    continue;
                }

                cells.eq(idx).kendoFilterMenu(extend(true, {}, filterable, {
                    dataSource: this.dataSource
                }));
            }
        },

        _change: function() {
            this.trigger(CHANGE);
        },

        _selectable: function() {
            var selectable = this.options.selectable;
            var filter;

            if (selectable) {
                selectable = kendo.ui.Selectable.parseOptions(selectable);

                filter = ">tr:not(.k-footer-template)";

                if (selectable.cell) {
                    filter = filter + ">td";
                }

                this.selectable = new kendo.ui.Selectable(this.content, {
                    filter: filter,
                    aria: true,
                    multiple: selectable.multiple,
                    change: proxy(this._change, this)
                });
            }
        },

        select: function(value) {
            var selectable = this.selectable;

            if (typeof value !== "undefined" && !selectable.options.multiple) {
                selectable.clear();

                value = value.first();
            }

            return selectable.value(value);
        },

        clearSelection: function() {
            var selected = this.select();

            if (selected.length) {
                this.selectable.clear();

                this.trigger(CHANGE);
            }
        },

        _dataSource: function(dataSource) {
            var ds = this.dataSource;

            if (ds) {
                ds.unbind(CHANGE, this._refreshHandler);
                ds.unbind(ERROR, this._errorHandler);
                ds.unbind(PROGRESS, this._progressHandler);
            }

            this._refreshHandler = proxy(this.refresh, this);
            this._errorHandler = proxy(this._error, this);
            this._progressHandler = proxy(this._progress, this);

            ds = this.dataSource = TreeListDataSource.create(dataSource);

            ds.bind(CHANGE, this._refreshHandler);
            ds.bind(ERROR, this._errorHandler);
            ds.bind(PROGRESS, this._progressHandler);
        },

        setDataSource: function(dataSource) {
            this._dataSource(dataSource);

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
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

            if (!model) {
                return;
            }

            if (this._editMode() != "popup") {
                model._edit = true;
            }

            this._cancelEditor();

            this._render();

            this._createEditor(model);

            this.trigger(EDIT, {
                container: this.editor.element,
                model: model
            });
        },

        _cancelEdit: function(e) {
            e = extend(e, {
                container: this.editor.wrapper,
                model: this.editor.model
            });

            if (this.trigger(CANCEL, e)) {
                return;
            }

            this.cancelRow();
        },

        cancelRow: function() {
            this._cancelEditor();

            this._render();
        },

        saveRow: function() {
            var editor = this.editor;
            var args;

            if (!editor) {
                return ;
            }

            args = {
                model: editor.model,
                container: editor.element
            };

            if (editor.end() && !this.trigger(SAVE, args)) {
                this.dataSource.sync();
            }
        },

        addRow: function(parent) {
            var editor = this.editor;
            var index = 0;
            var model = {};

            if (editor && !editor.end()) {
                return;
            }

            if (parent) {
                if (!(parent instanceof TreeListModel)) {
                    parent = this.dataItem(parent);
                }

                model.parentId = parent.id;
                index = this.dataSource.indexOf(parent) + 1;
                parent.set("expanded", true);

                this.dataSource.load(parent).then(proxy(this._insertAt, this, model, index));

                return;
            }

            this._insertAt(model, index);
        },

        _insertAt: function(model, index) {
            model = this.dataSource.insert(index, model);

            var row = this.content.find("[" + kendo.attr("uid") + "=" + model.uid + "]");

            this.editRow(row);
        },

        removeRow: function(row) {
            var model = this.dataItem(row);
            var args = {
                model: model,
                row: row
            };

            if (model && !this.trigger(REMOVE, args)) {
                this.dataSource.remove(model);

                this.dataSource.sync();
            }
        },

        _cancelEditor: function() {
            var model;
            var editor = this.editor;

            if (editor) {
                model = editor.model;

                this._destroyEditor();

                this.dataSource.cancelChanges(model);

                model._edit = false;
            }
        },

        _destroyEditor: function() {
            if (!this.editor) {
                return;
            }

            this.editor.close();
            this.editor = null;
        },

        _createEditor: function(model) {
            var row = this.content.find("[" + kendo.attr("uid") + "=" + model.uid + "]");

            var mode = this._editMode();

            var options = {
                columns: this.columns,
                model: model,
                target: this,
                clearContainer: false,
                template: this.options.editable.template
            };

            if (mode == "inline") {
                this.editor = new Editor(row, options);
            } else {
                extend(options, {
                    window: this.options.editable.window,
                    commandRenderer: proxy(function () {
                        return this._buildCommands(["update", "canceledit"]);
                    }, this),
                    fieldRenderer: this._cellContent,
                    save: proxy(this.saveRow, this),
                    cancel: proxy(this._cancelEdit, this)
                });

                this.editor = new PopupEditor(row, options);
            }
        },

        _editMode: function() {
            var mode = "inline",
                editable = this.options.editable;

            if (editable !== true) {
                if (typeof editable == "string") {
                    mode = editable;
                } else {
                    mode = editable.mode || mode;
                }
            }

            return mode.toLowerCase();
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
