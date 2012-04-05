(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Groupable = ui.Groupable,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Widget = ui.Widget,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        map = $.map,
        isArray = $.isArray,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isEmptyObject = $.isEmptyObject,
        math = Math,
        REQUESTSTART = "requestStart",
        ERROR = "error",
        ROW_SELECTOR = "tbody>tr:not(.k-grouping-row,.k-detail-row):visible",
        DATA_CELL = ":not(.k-group-cell,.k-hierarchy-cell):visible",
        CELL_SELECTOR =  ROW_SELECTOR + ">td" + DATA_CELL,
        FIRST_CELL_SELECTOR = CELL_SELECTOR + ":first",
        EDIT = "edit",
        SAVE = "save",
        REMOVE = "remove",
        DETAILINIT = "detailInit",
        CHANGE = "change",
        SAVECHANGES = "saveChanges",
        DATABOUND = "dataBound",
        DETAILEXPAND = "detailExpand",
        DETAILCOLLAPSE = "detailCollapse",
        FOCUSED = "k-state-focused",
        FOCUSABLE = "k-focusable",
        SELECTED = "k-state-selected",
        CLICK = "click",
        HEIGHT = "height",
        TABINDEX = "tabIndex",
        FUNCTION = "function",
        STRING = "string",
        DELETECONFIRM = "Are you sure you want to delete this record?",
        formatRegExp = /\}/ig,
        templateHashRegExp = /#/ig,
        COMMANDBUTTONTEMP = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>';

    var VirtualScrollable =  Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            that.dataSource = options.dataSource;
            that.dataSource.bind(CHANGE, proxy(that.refresh, that));
            that.wrap();
        },

        options: {
            name: "VirtualScrollable",
            itemHeight: $.noop
        },

        wrap: function() {
            var that = this,
                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                scrollbar = kendo.support.scrollbar() + 1,
                element = that.element;

            element.css( {
                width: "auto",
                paddingRight: scrollbar,
                overflow: "hidden"
            });
            that.content = element.children().first();
            that.wrapper = that.content.wrap('<div class="k-virtual-scrollable-wrap"/>')
                                .parent()
                                .bind("DOMMouseScroll", proxy(that._wheelScroll, that))
                                .bind("mousewheel", proxy(that._wheelScroll, that));

            if (kendo.support.touch) {
                that.drag = new kendo.Drag(that.wrapper, {
                    global: true,
                    move: function(e) {
                        that.verticalScrollbar.scrollTop(that.verticalScrollbar.scrollTop() - e.y.delta);
                        e.preventDefault();
                    }
                });
            }

            that.verticalScrollbar = $('<div class="k-scrollbar k-scrollbar-vertical" />')
                                        .css({
                                            width: scrollbar
                                        }).appendTo(element)
                                        .bind("scroll", proxy(that._scroll, that));
        },

        _wheelScroll: function(e) {
            var that = this,
                scrollTop = that.verticalScrollbar.scrollTop(),
                originalEvent = e.originalEvent,
                delta;

            e.preventDefault();

            if (originalEvent.wheelDelta) {
                delta = originalEvent.wheelDelta;
            } else if (originalEvent.detail) {
                delta = (-originalEvent.detail) * 10;
            } else if ($.browser.opera) {
                delta = -originalEvent.wheelDelta;
            }
            that.verticalScrollbar.scrollTop(scrollTop + (-delta));
        },

        _scroll: function(e) {
            var that = this,
                scrollTop = e.currentTarget.scrollTop,
                dataSource = that.dataSource,
                rowHeight = that.itemHeight,
                skip = dataSource.skip() || 0,
                start = that._rangeStart || skip,
                height = that.element.innerHeight(),
                isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
                firstItemIndex = math.max(math.floor(scrollTop / rowHeight), 0),
                lastItemIndex = math.max(firstItemIndex + math.floor(height / rowHeight), 0);

            that._scrollTop = scrollTop - (start * rowHeight);
            that._scrollbarTop = scrollTop;

            if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
                that.wrapper[0].scrollTop = that._scrollTop;
            }
        },

        _fetch: function(firstItemIndex, lastItemIndex, scrollingUp) {
            var that = this,
                dataSource = that.dataSource,
                itemHeight = that.itemHeight,
                take = dataSource.take(),
                rangeStart = that._rangeStart || dataSource.skip() || 0,
                currentSkip = math.floor(firstItemIndex / take) * take,
                fetching = false,
                prefetchAt = 0.33;

            if (firstItemIndex < rangeStart) {

                fetching = true;
                rangeStart = math.max(0, lastItemIndex - take);
                that._scrollTop = (firstItemIndex - rangeStart) * itemHeight;
                that._page(rangeStart, take);

            } else if (lastItemIndex >= rangeStart + take && !scrollingUp) {

                fetching = true;
                rangeStart = firstItemIndex;
                that._scrollTop = itemHeight;
                that._page(rangeStart, take);

            } else if (!that._fetching) {

                if (firstItemIndex < (currentSkip + take) - take * prefetchAt && firstItemIndex > take) {
                    dataSource.prefetch(currentSkip - take, take);
                }
                if (lastItemIndex > currentSkip + take * prefetchAt) {
                    dataSource.prefetch(currentSkip + take, take);
                }

            }
            return fetching;
        },

        _page: function(skip, take) {
            var that = this,
                dataSource = that.dataSource;

            clearTimeout(that._timeout);
            that._fetching = true;
            that._rangeStart = skip;

            if (dataSource.inRange(skip, take)) {
                dataSource.range(skip, take);
            } else {
                kendo.ui.progress(that.wrapper.parent(), true);
                that._timeout = setTimeout(function() {
                    dataSource.range(skip, take);
                }, 100);
            }
        },

        refresh: function() {
            var that = this,
                html = "",
                maxHeight = 250000,
                dataSource = that.dataSource,
                rangeStart = that._rangeStart,
                scrollbar = kendo.support.scrollbar(),
                wrapperElement = that.wrapper[0],
                totalHeight,
                idx,
                itemHeight;

            kendo.ui.progress(that.wrapper.parent(), false);
            clearTimeout(that._timeout);

            itemHeight = that.itemHeight = that.options.itemHeight() || 0;

            var addScrollBarHeight = (wrapperElement.scrollWidth > wrapperElement.offsetWidth) ? scrollbar : 0;

            totalHeight = dataSource.total() * itemHeight + addScrollBarHeight;

            for (idx = 0; idx < math.floor(totalHeight / maxHeight); idx++) {
                html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
            }

            if (totalHeight % maxHeight) {
                html += '<div style="width:1px;height:' + (totalHeight % maxHeight) + 'px"></div>';
            }

            that.verticalScrollbar.html(html);
            wrapperElement.scrollTop = that._scrollTop;

            if (that.drag) {
                that.drag.cancel();
            }

            if (rangeStart && !that._fetching) { // we are rebound from outside local range should be reset
                that._rangeStart = dataSource.skip();
            }
            that._fetching = false;
        }
    });

    function groupCells(count) {
        return new Array(count + 1).join('<td class="k-group-cell">&nbsp;</td>');
    }

    var defaultCommands = {
        create: {
            text: "Add new record",
            imageClass: "k-add",
            className: "k-grid-add",
            iconClass: "k-icon"
        },
        cancel: {
            text: "Cancel changes",
            imageClass: "k-cancel",
            className: "k-grid-cancel-changes",
            iconClass: "k-icon"
        },
        save: {
            text: "Save changes",
            imageClass: "k-update",
            className: "k-grid-save-changes",
            iconClass: "k-icon"
        },
        destroy: {
            text: "Delete",
            imageClass: "k-delete",
            className: "k-grid-delete",
            iconClass: "k-icon"
        },
        edit: {
            text: "Edit",
            imageClass: "k-edit",
            className: "k-grid-edit",
            iconClass: "k-icon"
        },
        update: {
            text: "Update",
            imageClass: "k-update",
            className: "k-grid-update",
            iconClass: "k-icon"
        },
        canceledit: {
            text: "Cancel",
            imageClass: "k-cancel",
            className: "k-grid-cancel",
            iconClass: "k-icon"
        }
    };

   var Grid = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            that._element();

            that._columns(that.options.columns);

            that._dataSource();

            that._tbody();

            that._pageable();

            that._groupable();

            that._toolbar();

            that._thead();

            that._templates();

            that._navigatable();

            that._selectable();

            that._details();

            that._editable();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }

            kendo.notify(that);
        },

        events: [
           CHANGE,
           "dataBinding",
           DATABOUND,
           DETAILEXPAND,
           DETAILCOLLAPSE,
           DETAILINIT,
           EDIT,
           SAVE,
           REMOVE,
           SAVECHANGES
        ],

        setDataSource: function(dataSource) {
            var that = this;

            that.options.dataSource = dataSource;

            that._dataSource();

            that._pageable();

            if (that.options.groupable) {
                that._groupable();
            }

            that._thead();

            if (that.options.autoBind) {
                dataSource.fetch();
            }
        },

        options: {
            name: "Grid",
            columns: [],
            toolbar: null,
            autoBind: true,
            filterable: false,
            scrollable: true,
            sortable: false,
            selectable: false,
            navigatable: false,
            pageable: false,
            editable: false,
            groupable: false,
            rowTemplate: "",
            altRowTemplate: "",
            dataSource: {}
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(this, options);

            that._templates();
        },

        items: function() {
            return this.tbody.children(':not(.k-grouping-row,.k-detail-row)');
        },

        _element: function() {
            var that = this,
                table = that.element;

            if (!table.is("table")) {
                table = $("<table />").appendTo(that.element);
            }

            that.table = table.attr("cellspacing", 0);

            that._wrapper();
        },

        cellIndex: function(td) {
            return $(td).parent().find('td:not(.k-group-cell,.k-hierarchy-cell)').index(td);
        },

        _modelForContainer: function(container) {
            if (!container.is("tr") && this._editMode() !== "popup") {
                container = container.closest("tr");
            }

            var id = container.attr(kendo.attr("uid"));

            return this.dataSource.getByUid(id);
        },

        _editable: function() {
            var that = this,
                editable = that.options.editable,
                handler = function () {
                    var target = document.activeElement,
                        cell = that._editContainer;

                    if (cell && !$.contains(cell[0], target) && cell[0] !== target && !$(target).closest(".k-animation-container").length) {
                        if (that.editable.end()) {
                            that.closeCell();
                        }
                    }
                };

            if (editable) {
                var mode = that._editMode();

                if (mode === "incell") {
                    if (editable.update !== false) {
                        that.wrapper.delegate("tr:not(.k-grouping-row) > td:not(.k-hierarchy-cell,.k-detail-cell,.k-group-cell,.k-edit-cell,:has(a.k-grid-delete))", CLICK, function(e) {
                            var td = $(this);

                            if (td.closest("tbody")[0] !== that.tbody[0] || $(e.target).is(":input")) {
                                return;
                            }

                            if (that.editable) {
                                if (that.editable.end()) {
                                    that.closeCell();
                                    that.editCell(td);
                                }
                            } else {
                                that.editCell(td);
                            }

                        });

                        that.wrapper.bind("focusin", function(e) {
                            clearTimeout(that.timer);
                            that.timer = null;
                        });
                        that.wrapper.bind("focusout", function(e) {
                            that.timer = setTimeout(handler, 1);
                        });
                    }
                } else {
                    if (editable.update !== false) {
                        that.wrapper.delegate("tbody>tr:not(.k-detail-row,.k-grouping-row):visible a.k-grid-edit", CLICK, function(e) {
                            e.preventDefault();
                            that.editRow($(this).closest("tr"));
                        });
                    }
                }

                if (editable.destroy !== false) {
                    that.wrapper.delegate("tbody>tr:not(.k-detail-row,.k-grouping-row):visible a.k-grid-delete", CLICK, function(e) {
                        e.preventDefault();
                        that.removeRow($(this).closest("tr"));
                    });
               }
            }
        },

        editCell: function(cell) {
            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell);


            if (model && (!model.editable || model.editable(column.field)) && !column.command && column.field) {

                that._attachModelChange(model);

                that._editContainer = cell;

                that.editable = cell.addClass("k-edit-cell")
                    .kendoEditable({
                        fields: { field: column.field, format: column.format, editor: column.editor },
                        model: model,
                        change: function(e) {
                            if (that.trigger(SAVE, { values: e.values, container: cell, model: model } )) {
                                e.preventDefault();
                            }
                        }
                    }).data("kendoEditable");

                cell.parent().addClass("k-grid-edit-row");

                that.trigger(EDIT, { container: cell, model: model });
            }
        },

        _destroyEditable: function() {
            var that = this;

            if (that.editable) {
                that._detachModelChange();

                that.editable.destroy();
                delete that.editable;

                if (that._editMode() === "popup") {
                    that._editContainer.data("kendoWindow").close();
                }

                that._editContainer = null;
            }
        },

        _attachModelChange: function(model) {
            var that = this;

            that._modelChangeHandler = function(e) {
                that._modelChange({ field: e.field, model: this });
            };

            model.bind("change", that._modelChangeHandler);
        },

        _detachModelChange: function() {
            var that = this,
                container = that._editContainer,
                model = that._modelForContainer(container);

            if (model) {
                model.unbind(CHANGE, that._modelChangeHandler);
            }
        },

        closeCell: function() {
            var that = this,
                cell = that._editContainer.removeClass("k-edit-cell"),
                id = cell.closest("tr").attr(kendo.attr("uid")),
                column = that.columns[that.cellIndex(cell)],
                model = that.dataSource.getByUid(id);

            cell.parent().removeClass("k-grid-edit-row");

            that._destroyEditable(); // editable should be destoryed before content of the container is changed

            that._displayCell(cell, column, model);

            if (cell.hasClass("k-dirty-cell")) {
                $('<span class="k-dirty"/>').prependTo(cell);
            }
        },

        _displayCell: function(cell, column, dataItem) {
            var that = this,
                state = { storage: {}, count: 0 },
                settings = extend({}, kendo.Template, that.options.templateSettings),
                tmpl = kendo.template(that._cellTmpl(column, state), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }

            cell.empty().html(tmpl(dataItem));
        },

        removeRow: function(row) {
            var that = this,
                model,
                mode;

            if (!that._confirmation()) {
                return;
            }

            row = $(row).hide();
            model = that._modelForContainer(row);

            if (model && !that.trigger(REMOVE, { row: row, model: model })) {
                that.dataSource.remove(model);

                mode = that._editMode();

                if (mode === "inline" || mode === "popup") {
                    that.dataSource.sync();
                }
            }
        },

        _editMode: function() {
            var mode = "incell",
                editable = this.options.editable;

            if (editable !== true) {
                mode = editable.mode || editable;
            }

            return mode;
        },

        editRow: function(row) {
            var that = this,
                model = that._modelForContainer(row),
                container;

            that.cancelRow();

            if (model) {

                that._attachModelChange(model);

                if (that._editMode() === "popup") {
                    that._createPopupEditor(model);
                } else {
                    that._createInlineEditor(row, model);
                }

                container = that._editContainer;

                container.delegate("a.k-grid-cancel", CLICK, function(e) {
                    e.preventDefault();
                    that.cancelRow();
                });

                container.delegate("a.k-grid-update", CLICK, function(e) {
                    e.preventDefault();
                    that.saveRow();
                });
            }
        },

        _createPopupEditor: function(model) {
            var that = this,
                html = '<div ' + kendo.attr("uid") + '="' + model.uid + '"><div class="k-edit-form-container">',
                column,
                fields = [],
                idx,
                length,
                tmpl,
                editable = that.options.editable,
                options = isPlainObject(editable) ? editable.window : {},
                settings = extend({}, kendo.Template, that.options.templateSettings);

            if (editable.template) {
                html += (kendo.template(editable.template, settings))(model);
            } else {
                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    column = that.columns[idx];

                    if (!column.command) {
                        html += '<div class="k-edit-label"><label for="' + column.field + '">' + (column.title || column.field || "") + '</label></div>';

                        if ((!model.editable || model.editable(column.field)) && column.field) {
                            fields.push({ field: column.field, format: column.format, editor: column.editor });
                            html += '<div ' + kendo.attr("container-for") + '="' + column.field + '" class="k-edit-field"></div>';
                        } else {
                            var state = { storage: {}, count: 0 };

                            tmpl = kendo.template(that._cellTmpl(column, state), settings);

                            if (state.count > 0) {
                                tmpl = proxy(tmpl, state.storage);
                            }

                            html += '<div class="k-edit-field">' + tmpl(model) + '</div>';
                        }
                    }
                }
            }

            html += that._createButton("update") + that._createButton("canceledit");
            html += '</div></div>';

            var container = that._editContainer = $(html)
                .appendTo(that.wrapper)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: "Edit",
                    visible: false
                }, options));

            var wnd = container.data("kendoWindow");

            wnd.wrapper.delegate(".k-close", "click", function() {
                    that.cancelRow();
                });

            that.editable = that._editContainer
                .kendoEditable({
                    fields: fields,
                    model: model,
                    clearContainer: false
                }).data("kendoEditable");

            wnd.center().open();

            that.trigger(EDIT, { container: container, model: model });
        },

        _createInlineEditor: function(row, model) {
            var that = this,
                column,
                cell,
                fields = [];

            row.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function() {
                cell = $(this);
                column = that.columns[that.cellIndex(cell)];

                if (!column.command && column.field && (!model.editable || model.editable(column.field))) {
                    fields.push({ field: column.field, format: column.format, editor: column.editor });
                    cell.attr("data-container-for", column.field);
                    cell.empty();
                } else if (column.command && hasCommand(column.command, "edit")) {
                    cell.empty();
                    $(that._createButton("update") + that._createButton("canceledit")).appendTo(cell);
                }
            });

            that._editContainer = row;

            that.editable = row
                .addClass("k-grid-edit-row")
                .kendoEditable({
                    fields: fields,
                    model: model,
                    clearContainer: false
                }).data("kendoEditable");

            that.trigger(EDIT, { container: row, model: model });
        },

        cancelRow: function() {
            var that = this,
                container = that._editContainer,
                model;

            if (container) {
                model = that._modelForContainer(container);

                that.dataSource.cancelChanges(model);

                if (that._editMode() !== "popup") {
                    that._displayRow(container);
                }

                that._destroyEditable();
            }
        },

        saveRow: function() {
            var that = this,
                container = that._editContainer,
                model = that._modelForContainer(container),
                editable = that.editable;

            if (container && editable && editable.end() &&
                !that.trigger(SAVE, { container: container, model: model } )) {

                if (that._editMode() !== "popup") {
                    that._displayRow(container);
                }

                that._destroyEditable();
                that.dataSource.sync();
            }
        },

        _displayRow: function(row) {
            var that = this,
                model = that._modelForContainer(row);

            if (model) {
                row.replaceWith($((row.hasClass("k-alt") ? that.altRowTemplate : that.rowTemplate)(model)));
            }
        },

        _showMessage: function(text) {
            return window.confirm(text);
        },

        _confirmation: function() {
            var that = this,
                editable = that.options.editable,
                confirmation = editable === true || typeof editable === STRING ? DELETECONFIRM : editable.confirmation;

            return confirmation !== false && confirmation != null ? that._showMessage(confirmation) : true;
        },

        cancelChanges: function() {
            this.dataSource.cancelChanges();
        },

        saveChanges: function() {
            var that = this;

            if (((that.editable && that.editable.end()) || !that.editable) && !that.trigger(SAVECHANGES)) {
                that.dataSource.sync();
            }
        },

        addRow: function() {
            var that = this,
                index,
                dataSource = that.dataSource;

            if ((that.editable && that.editable.end()) || !that.editable) {
                index = dataSource.indexOf((dataSource.view() || [])[0]);
                if (index < 0) {
                    index = 0;
                }

                var model = dataSource.insert(index, {}),
                    id = model.uid,
                    mode = that._editMode(),
                    row = that.table.find("tr[" + kendo.attr("uid") + "=" + id + "]"),
                    cell = row.children("td:not(.k-group-cell,.k-hierarchy-cell)").first();

                if ((mode === "inline" || mode === "popup") && row.length) {
                    that.editRow(row);
                } else if (cell.length) {
                    that.editCell(cell);
                }
            }
        },

        _toolbar: function() {
            var that = this,
                wrapper = that.wrapper,
                toolbar = that.options.toolbar,
                template;

            if (toolbar) {
                toolbar = isFunction(toolbar) ? toolbar({}) : (typeof toolbar === STRING ? toolbar : that._toolbarTmpl(toolbar).replace(templateHashRegExp, "\\#"));

                template = proxy(kendo.template(toolbar), that);

                $('<div class="k-toolbar k-grid-toolbar" />')
                    .html(template({}))
                    .prependTo(wrapper)
                    .delegate(".k-grid-add", CLICK, function(e) { e.preventDefault(); that.addRow(); })
                    .delegate(".k-grid-cancel-changes", CLICK, function(e) { e.preventDefault(); that.cancelChanges(); })
                    .delegate(".k-grid-save-changes", CLICK, function(e) { e.preventDefault(); that.saveChanges(); });
            }
        },

        _toolbarTmpl: function(commands) {
            var that = this,
                idx,
                length,
                html = "";

            if (isArray(commands)) {
                for (idx = 0, length = commands.length; idx < length; idx++) {
                    html += that._createButton(commands[idx]);
                }
            }
            return html;
        },

        _createButton: function(command) {
            var template = command.template || COMMANDBUTTONTEMP,
                commandName = typeof command === STRING ? command : command.name,
                options = { className: "", text: commandName, imageClass: "", attr: "", iconClass: "" };

            if (isPlainObject(command)) {
                options = extend(true, options, defaultCommands[commandName], command);
            } else {
                options = extend(true, options, defaultCommands[commandName]);
            }

            return kendo.template(template)(options);
        },

        _groupable: function() {
            var that = this,
                wrapper = that.wrapper,
                groupable = that.options.groupable;

            if (!that.groupable) {
                that.table.delegate(".k-grouping-row .k-collapse, .k-grouping-row .k-expand", CLICK, function(e) {
                    var element = $(this),
                    group = element.closest("tr");

                    if(element.hasClass('k-collapse')) {
                        that.collapseGroup(group);
                    } else {
                        that.expandGroup(group);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            if (groupable) {
                if(!wrapper.has("div.k-grouping-header")[0]) {
                    $("<div />").addClass("k-grouping-header").html("&nbsp;").prependTo(wrapper);
                }

                if (that.groupable) {
                    that.groupable.destroy();
                }

                that.groupable = new Groupable(wrapper, {
                    filter: "th:not(.k-group-cell)[" + kendo.attr("field") + "][" + kendo.attr("groupable") + "!=false]",
                    groupContainer: "div.k-grouping-header",
                    dataSource: that.dataSource
                });
            }
        },

        _selectable: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if (selectable) {
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === STRING && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.table, {
                    filter: ">" + (cell ? CELL_SELECTOR : ROW_SELECTOR),
                    multiple: multi,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                if (that.options.navigatable) {
                    that.wrapper.keydown(function(e) {
                        var current = that.current();
                        if (e.keyCode === keys.SPACEBAR && e.target == that.wrapper[0] && !current.hasClass("k-edit-cell")) {
                            e.preventDefault();
                            e.stopPropagation();
                            current = cell ? current : current.parent();

                            if(multi) {
                                if(!e.ctrlKey) {
                                    that.selectable.clear();
                                } else {
                                    if(current.hasClass(SELECTED)) {
                                        current.removeClass(SELECTED);
                                        current = null;
                                    }
                                }
                            } else {
                                that.selectable.clear();
                            }

                            that.selectable.value(current);
                        }
                    });
                }
            }
        },

        clearSelection: function() {
            var that = this;
            that.selectable.clear();
            that.trigger(CHANGE);
        },

        select: function(items) {
            var that = this,
                selectable = that.selectable;

            items = $(items);
            if(items.length) {
                if(!selectable.options.multiple) {
                    selectable.clear();
                    items = items.first();
                }
                selectable.value(items);
                return;
            }

            return selectable.value();
        },

        current: function(element) {
            var that = this,
                current = that._current;

            if (element !== undefined && element.length) {
                if (!current || current[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (current) {
                        current.removeClass(FOCUSED);
                    }
                    that._current = element;
                    that._scrollTo(element.parent()[0]);
                }
            }

            return that._current;
        },

        _scrollTo: function(element) {
            if(!element || !this.options.scrollable) {
                return;
            }

            var elementOffsetTop = element.offsetTop,
                container = this.content[0],
                elementOffsetHeight = element.offsetHeight,
                containerScrollTop = container.scrollTop,
                containerOffsetHeight = container.clientHeight,
                bottomDistance = elementOffsetTop + elementOffsetHeight;

            container.scrollTop = containerScrollTop > elementOffsetTop ?
                                    elementOffsetTop :
                                    (bottomDistance > (containerScrollTop + containerOffsetHeight) ?
                                        (bottomDistance - containerOffsetHeight) : containerScrollTop);
        },

        _navigatable: function() {
            var that = this,
                wrapper = that.wrapper,
                table = that.table.addClass(FOCUSABLE),
                currentProxy = proxy(that.current, that),
                selector = "." + FOCUSABLE + " " + CELL_SELECTOR,
                browser = $.browser,
                clickCallback = function(e) {
                    var currentTarget = $(e.currentTarget);
                    if (currentTarget.closest("tbody")[0] !== that.tbody[0]) {
                        return;
                    }

                    currentProxy(currentTarget);
                    if(!$(e.target).is(":button,a,:input,a>.k-icon,textarea,span.k-icon,.k-input")) {
                        setTimeout(function() { wrapper.focus(); } );
                    }

                    e.stopPropagation();
                };

            if (that.options.navigatable) {
                wrapper.bind({
                    focus: function() {
                        var current = that._current;
                        if(current && current.is(":visible")) {
                            current.addClass(FOCUSED);
                        } else {
                            currentProxy(that.table.find(FIRST_CELL_SELECTOR));
                        }
                    },
                    focusout: function(e) {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                        e.stopPropagation();
                    },
                    keydown: function(e) {
                        var key = e.keyCode,
                            current = that.current(),
                            shiftKey = e.shiftKey,
                            dataSource = that.dataSource,
                            pageable = that.options.pageable,
                            canHandle = !$(e.target).is(":button,a,:input,a>.t-icon"),
                            isInCell = that._editMode() == "incell",
                            currentIndex,
                            cell,
                            handled = false;

                        if (canHandle && keys.UP === key) {
                            currentProxy(current ? current.parent().prevAll(ROW_SELECTOR).last().children(":eq(" + current.index() + "),:eq(0)").last() : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (canHandle && keys.DOWN === key) {
                            currentProxy(current ? current.parent().nextAll(ROW_SELECTOR).first().children(":eq(" + current.index() + "),:eq(0)").last() : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (canHandle && keys.LEFT === key) {
                            currentProxy(current ? current.prevAll(DATA_CELL + ":first") : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (canHandle && keys.RIGHT === key) {
                            currentProxy(current ? current.nextAll(":visible:first") : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (canHandle && pageable && keys.PAGEDOWN == key) {
                            that._current = null;
                            dataSource.page(dataSource.page() + 1);
                            handled = true;
                        } else if (canHandle && pageable && keys.PAGEUP == key) {
                            that._current = null;
                            dataSource.page(dataSource.page() - 1);
                            handled = true;
                        } else if (that.options.editable) {
                            current = current ? current : table.find(FIRST_CELL_SELECTOR);
                            if (keys.ENTER == key || keys.F12 == key) {
                                that._handleEditing(current);
                                handled = true;
                            } else if (keys.TAB == key && isInCell) {
                                cell = shiftKey ? current.prevAll(DATA_CELL + ":first") : current.nextAll(":visible:first");
                                if (!cell.length) {
                                    cell = current.parent()[shiftKey ? "prevAll" : "nextAll"]("tr:not(.k-grouping-row,.k-detail-row):visible")
                                        .children(DATA_CELL + (shiftKey ? ":last" : ":first"));
                                }

                                if (cell.length) {
                                    that._handleEditing(current, cell);
                                    handled = true;
                                }
                            } else if (keys.ESC == key && that._editContainer) {
                                if (that._editContainer.has(current[0]) || current[0] === that._editContainer[0]) {
                                    if (isInCell) {
                                        that.closeCell();
                                    } else {
                                        currentIndex = that.items().index(current.parent());
                                        document.activeElement.blur();
                                        that.cancelRow();
                                        if (currentIndex >= 0) {
                                            that.current(that.items().eq(currentIndex).children().filter(DATA_CELL).first());
                                        }
                                    }

                                    if (browser.msie && parseInt(browser.version, 10) < 9) {
                                        document.body.focus();
                                    }
                                    wrapper.focus();
                                    handled = true;
                                }
                            }
                        }

                        if(handled) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                });

                wrapper.delegate(selector, "mousedown", clickCallback); }
        },

        _handleEditing: function(current, next) {
            var that = this,
                mode = that._editMode(),
                editContainer = that._editContainer,
                idx,
                isEdited;

            if (mode == "incell") {
                isEdited = current.hasClass("k-edit-cell");
            } else {
                isEdited = current.parent().hasClass("k-grid-edit-row");
            }

            if (that.editable) {
                if ($.contains(editContainer[0], document.activeElement)) {
                    document.activeElement.blur();
                }

                if (that.editable.end()) {
                    if (mode == "incell") {
                        that.closeCell();
                    } else {
                        if (current.parent()[0] === editContainer[0]) {
                            idx = that.items().index(current.parent());
                        } else {
                            idx = that.items().index(editContainer);
                        }
                        that.saveRow();
                        that.current(that.items().eq(idx).children().filter(DATA_CELL).first());
                        isEdited = true;
                    }
                } else {
                    if (mode == "incell") {
                        that.current(editContainer);
                    } else {
                        that.current(editContainer.children().filter(DATA_CELL).first());
                    }
                    editContainer.find(":input:visible:first").focus();
                    return;
                }
            }

            if (next) {
                that.current(next);
            }

            that.wrapper.focus();
            if ((!isEdited && !next) || next) {
                if (mode == "incell") {
                    that.editCell(that.current());
                } else {
                    that.editRow(that.current().parent());
                }
            }
        },

        _wrapper: function() {
            var that = this,
                table = that.table,
                height = that.options.height,
                wrapper = that.element;

            if (!wrapper.is("div")) {
               wrapper = wrapper.wrap("<div/>").parent();
            }

            that.wrapper = wrapper.addClass("k-grid k-widget")
                                  .attr(TABINDEX, math.max(table.attr(TABINDEX) || 0, 0));

            table.removeAttr(TABINDEX);

            if (height) {
                that.wrapper.css(HEIGHT, height);
                table.css(HEIGHT, "auto");
            }
        },

        _tbody: function() {
            var that = this,
                table = that.table,
                tbody;

            tbody = table.find(">tbody");

            if (!tbody.length) {
                tbody = $("<tbody/>").appendTo(table);
            }

            that.tbody = tbody;
        },

        _scrollable: function() {
            var that = this,
                header,
                table,
                options = that.options,
                scrollable = options.scrollable,
                scrollbar = kendo.support.scrollbar();

            if (scrollable) {
                header = that.wrapper.children(".k-grid-header");

                if (!header[0]) {
                    header = $('<div class="k-grid-header" />').insertBefore(that.table);
                }

                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                header.css("padding-right", scrollable.virtual ? scrollbar + 1 : scrollbar);
                table = $('<table cellspacing="0" />');
                table.append(that.thead);
                header.empty().append($('<div class="k-grid-header-wrap" />').append(table));

                that.content = that.table.parent();

                if (that.content.is(".k-virtual-scrollable-wrap")) {
                    that.content = that.content.parent();
                }

                if (!that.content.is(".k-grid-content, .k-virtual-scrollable-wrap")) {
                    that.content = that.table.wrap('<div class="k-grid-content" />').parent();

                    if (scrollable !== true && scrollable.virtual) {
                        new VirtualScrollable(that.content, {
                            dataSource: that.dataSource,
                            itemHeight: proxy(that._averageRowHeight, that)
                        });
                    }
                }

                that.scrollables = header.children(".k-grid-header-wrap"); // the footer does not exists here yet!

                if (scrollable.virtual) {
                    that.content.find(">.k-virtual-scrollable-wrap").bind('scroll', function () {
                        that.scrollables.scrollLeft(this.scrollLeft);
                    });
                } else {
                    that.content.bind('scroll', function () {
                        that.scrollables.scrollLeft(this.scrollLeft);
                    });

                    var touchScroller = kendo.touchScroller(that.content);
                    if (touchScroller && touchScroller.movable) {
                        touchScroller.movable.bind("change", function(e) {
                            that.scrollables.scrollLeft(-e.sender.x);
                        });
                    }
                }
            }
        },

        _setContentHeight: function() {
            var that = this,
                options = that.options,
                height = that.wrapper.innerHeight(),
                header = that.wrapper.children(".k-grid-header"),
                scrollbar = kendo.support.scrollbar();

            if (options.scrollable) {

                height -= header.outerHeight();

                if (that.pager) {
                    height -= that.pager.element.outerHeight();
                }

                if(options.groupable) {
                    height -= that.wrapper.children(".k-grouping-header").outerHeight();
                }

                if(options.toolbar) {
                    height -= that.wrapper.children(".k-grid-toolbar").outerHeight();
                }

                if (that.footerTemplate) {
                    height -= that.wrapper.children(".k-grid-footer").outerHeight();
                }

                if (height > scrollbar * 2) { // do not set height if proper scrollbar cannot be displayed
                    that.content.height(height);
                }
            }
        },

        _averageRowHeight: function() {
            var that = this,
                rowHeight = that._rowHeight;

            if (!that._rowHeight) {
                that._rowHeight = rowHeight = that.table.outerHeight() / that.table[0].rows.length;
                that._sum = rowHeight;
                that._measures = 1;
            }

            var currentRowHeight = that.table.outerHeight() / that.table[0].rows.length;

            if (rowHeight !== currentRowHeight) {
                that._measures ++;
                that._sum += currentRowHeight;
                that._rowHeight = that._sum / that._measures;
            }
            return rowHeight;
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                pageable,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (isPlainObject(dataSource)) {
                extend(dataSource, { table: that.table, fields: that.columns });

                pageable = options.pageable;

                if (isPlainObject(pageable) && pageable.pageSize !== undefined) {
                    dataSource.pageSize = pageable.pageSize;
                }
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler)
                                .unbind(REQUESTSTART, that._requestStartHandler)
                                .unbind(ERROR, that._errorHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._requestStartHandler = proxy(that._requestStart, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = DataSource.create(dataSource)
                                .bind(CHANGE, that._refreshHandler)
                                .bind(REQUESTSTART, that._requestStartHandler)
                                .bind(ERROR, that._errorHandler);
        },

        _error: function() {
            this._progress(false);
        },

        _requestStart: function() {
            this._progress(true);
        },

        _modelChange: function(e) {
            var that = this,
                model = e.model,
                row = that.tbody.find("tr[" + kendo.attr("uid") + "=" + model.uid +"]"),
                cell,
                column,
                isAlt = row.hasClass("k-alt"),
                tmp,
                idx,
                length;

            if (row.children(".k-edit-cell").length && !that.options.rowTemplate) {
                row.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function() {
                    cell = $(this);
                    column = that.columns[that.cellIndex(cell)];

                    if (column.field === e.field) {
                        if (!cell.hasClass("k-edit-cell")) {
                            that._displayCell(cell, column, model);
                            $('<span class="k-dirty"/>').prependTo(cell);
                        } else {
                            cell.addClass("k-dirty-cell");
                        }
                    }
                });

            } else if (!row.hasClass("k-grid-edit-row")) {
                tmp = $((isAlt ? that.altRowTemplate : that.rowTemplate)(model));

                row.replaceWith(tmp);

                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    column = that.columns[idx];

                    if (column.field === e.field) {
                        cell = tmp.children(":not(.k-group-cell,.k-hierarchy-cell)").eq(idx);
                        $('<span class="k-dirty"/>').prependTo(cell);
                    }
                }
                that.trigger("itemChange", { item: tmp, data: model, ns: ui });
            }

        },

        _pageable: function() {
            var that = this,
                wrapper,
                pageable = that.options.pageable;

            if (pageable) {
                wrapper = that.wrapper.children("div.k-grid-pager").empty();

                if (!wrapper.length) {
                    wrapper = $('<div class="k-pager-wrap k-grid-pager"/>').appendTo(that.wrapper);
                }

                if (that.pager) {
                    that.pager.destroy();
                }

                if (typeof pageable === "object" && pageable instanceof kendo.ui.Pager) {
                    that.pager = pageable;
                } else {
                    that.pager = new kendo.ui.Pager(wrapper, extend({}, pageable, { dataSource: that.dataSource }));
                }
            }
        },

        _footer: function() {
            var that = this,
                aggregates = that.dataSource.aggregates(),
                html = "",
                footerTemplate = that.footerTemplate,
                options = that.options;

            if (footerTemplate) {
                html = $(that._wrapFooter(footerTemplate(aggregates || {})));

                if (that.footer) {
                    var tmp = html;

                    that.footer.replaceWith(tmp);
                    that.footer = tmp;
                } else {
                    if (options.scrollable) {
                        that.footer = options.pageable ? html.insertBefore(that.wrapper.children("div.k-grid-pager")) : html.appendTo(that.wrapper);
                        that.scrollables = that.scrollables.add(that.footer.children(".k-grid-footer-wrap"));
                    } else {
                        that.footer = html.insertBefore(that.tbody);
                    }
                }
                that._setContentHeight();
            }
        },

        _wrapFooter: function(footerRow) {
            var that = this,
                html = "";

            if (that.options.scrollable) {
                html = $('<div class="k-grid-footer"><div class="k-grid-footer-wrap"><table cellspacing="0"><tbody>' + footerRow + '</tbody></table></div></div>');
                that._appendCols(html.find("table"));
                return html;
            }

            return '<tfoot class="k-grid-footer">' + footerRow + '</tfoot>';
        },

        _filterable: function() {
            var that = this,
                columns = that.columns,
                filterable = that.options.filterable;

            if (filterable) {
                that.thead
                    .find("th:not(.k-hierarchy-cell)")
                    .each(function(index) {
                        if (columns[index].filterable !== false) {
                            $(this).kendoFilterMenu(extend(true, {}, filterable, columns[index].filterable, { dataSource: that.dataSource }));
                        }
                    });
            }
        },

        _sortable: function() {
            var that = this,
                columns = that.columns,
                column,
                sortable = that.options.sortable;

            if (sortable) {
                that.thead
                    .find("th:not(.k-hierarchy-cell)")
                    .each(function(index) {
                        column = columns[index];
                        if (column.sortable !== false && !column.command) {
                            $(this).kendoSortable(extend({}, sortable, { dataSource: that.dataSource }));
                        }
                    });
            }
        },

        _columns: function(columns) {
            var that = this,
                table = that.table,
                encoded,
                cols = table.find("col"),
                dataSource = that.options.dataSource;

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : map(table.find("th"), function(th, idx) {
                th = $(th);
                var sortable = th.attr(kendo.attr("sortable")),
                    filterable = th.attr(kendo.attr("filterable")),
                    type = th.attr(kendo.attr("type")),
                    groupable = th.attr(kendo.attr("groupable")),
                    field = th.attr(kendo.attr("field"));

                if (!field) {
                   field = th.text().replace(/\s|[^A-z0-9]/g, "");
                }

                return {
                    field: field,
                    type: type,
                    sortable: sortable !== "false",
                    filterable: filterable !== "false",
                    groupable: groupable !== "false",
                    template: th.attr(kendo.attr("template")),
                    width: cols.eq(idx).css("width")
                };
            });

            encoded = !(that.table.find("tbody tr").length > 0 && (!dataSource || !dataSource.transport));

            that.columns = map(columns, function(column) {
                column = typeof column === STRING ? { field: column } : column;
                return extend({ encoded: encoded }, column);
            });
        },

        _tmpl: function(rowTemplate, alt) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                idx,
                length = that.columns.length,
                template,
                state = { storage: {}, count: 0 },
                column,
                type,
                hasDetails = that._hasDetails(),
                className = [],
                groups = that.dataSource.group().length;

            if (!rowTemplate) {
                rowTemplate = "<tr";

                if (alt) {
                    className.push("k-alt");
                }

                if (hasDetails) {
                    className.push("k-master-row");
                }

                if (className.length) {
                    rowTemplate += ' class="' + className.join(" ") + '"';
                }

                if (length) { // data item is an object
                    rowTemplate += ' ' + kendo.attr("uid") + '="#=uid#"';
                }

                rowTemplate += ">";

                if (groups > 0) {
                    rowTemplate += groupCells(groups);
                }

                if (hasDetails) {
                    rowTemplate += '<td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#"></a></td>';
                }

                for (idx = 0; idx < length; idx++) {
                    column = that.columns[idx];
                    template = column.template;
                    type = typeof template;

                    rowTemplate += "<td>";
                    rowTemplate += that._cellTmpl(column, state);

                    rowTemplate += "</td>";
                }

                rowTemplate += "</tr>";
            }

            rowTemplate = kendo.template(rowTemplate, settings);

            if (state.count > 0) {
                return proxy(rowTemplate, state.storage);
            }

            return rowTemplate;
        },

        _cellTmpl: function(column, state) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                template = column.template,
                paramName = settings.paramName,
                html = "",
                idx,
                length,
                format = column.format,
                type = typeof template;

            if (column.command) {
                if (isArray(column.command)) {
                    for (idx = 0, length = column.command.length; idx < length; idx++) {
                        html += that._createButton(column.command[idx]);
                    }
                    return html.replace(templateHashRegExp, "\\#");
                }
                return that._createButton(column.command).replace(templateHashRegExp, "\\#");
            }

            if (type === FUNCTION) {
                state.storage["tmpl" + state.count] = template;
                html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                state.count ++;
            } else if (type === STRING) {
                html += template;
            } else {
                html += column.encoded ? "${" : "#=";

                if (format) {
                    html += 'kendo.format(\"' + format.replace(formatRegExp,"\\}") + '\",';
                }

                if (!settings.useWithBlock) {
                    html += paramName + ".";
                }

                html += column.field;

                if (format) {
                    html += ")";
                }

                html += column.encoded ? "}" : "#";
            }
            return html;
        },

        _templates: function() {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                groups = dataSource.group(),
                aggregates = dataSource.aggregate();

            that.rowTemplate = that._tmpl(options.rowTemplate);
            that.altRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, true);

            if (that._hasDetails()) {
                that.detailTemplate = that._detailTmpl(options.detailTemplate || "");
            }

            if (!isEmptyObject(aggregates) ||
                $.grep(that.columns, function(column) { return column.footerTemplate; }).length) {

                that.footerTemplate = that._footerTmpl(aggregates, "footerTemplate", "k-footer-template");
            }

            if (groups.length && $.grep(that.columns, function(column) { return column.groupFooterTemplate; }).length) {
                aggregates = $.map(groups, function(g) { return g.aggregates; });
                that.groupFooterTemplate = that._footerTmpl(aggregates, "groupFooterTemplate", "k-group-footer");
            }
        },

        _footerTmpl: function(aggregates, templateName, rowClass) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                html = "",
                idx,
                length,
                columns = that.columns,
                template,
                type,
                storage = {},
                count = 0,
                scope = {},
                dataSource = that.dataSource,
                groups = dataSource.group().length,
                fieldsMap = {},
                column;

            if (!isEmptyObject(aggregates)) {
                if (isArray(aggregates)) {
                    for (idx = 0, length = aggregates.length; idx < length; idx++) {
                        fieldsMap[aggregates[idx].field] = true;
                    }
                } else {
                    fieldsMap[aggregates.field] = true;
                }
            }

            html += '<tr class="' + rowClass + '">';

            if (groups > 0) {
                html += groupCells(groups);
            }

            if (that._hasDetails()) {
                html += '<td class="k-hierarchy-cell">&nbsp;</td>';
            }

            for (idx = 0, length = that.columns.length; idx < length; idx++) {
                column = columns[idx];
                template = column[templateName];
                type = typeof template;

                html += "<td>";

                if (template) {
                    if (type !== FUNCTION) {
                        scope = fieldsMap[column.field] ? extend({}, settings, { paramName: paramName + "." + column.field }) : {};
                        template = kendo.template(template, scope);
                    }

                    storage["tmpl" + count] = template;
                    html += "#=this.tmpl" + count + "(" + paramName + ")#";
                    count ++;
                } else {
                    html += "&nbsp;";
                }

                html += "</td>";
            }

            html += '</tr>';

            html = kendo.template(html, settings);

            if (count > 0) {
                return proxy(html, storage);
            }

            return html;
        },

        _detailTmpl: function(template) {
            var that = this,
                html = "",
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                templateFunctionStorage = {},
                templateFunctionCount = 0,
                groups = that.dataSource.group().length,
                columns = that.columns.length,
                type = typeof template;

            html += '<tr class="k-detail-row">';
            if (groups > 0) {
                html += groupCells(groups);
            }
            html += '<td class="k-hierarchy-cell"></td><td class="k-detail-cell"' + (columns ? ' colspan="' + columns + '"' : '') + ">";

            if (type === FUNCTION) {
                templateFunctionStorage["tmpl" + templateFunctionCount] = template;
                html += "#=this.tmpl" + templateFunctionCount + "(" + paramName + ")#";
                templateFunctionCount ++;
            } else {
                html += template;
            }

            html += "</td></tr>";

            html = kendo.template(html, settings);

            if (templateFunctionCount > 0) {
                return proxy(html, templateFunctionStorage);
            }

            return html;
        },

        _hasDetails: function() {
            var that = this;

            return that.options.detailTemplate !== undefined  || (that._events[DETAILINIT] || []).length;
        },

        _details: function() {
            var that = this;

            that.table.delegate(".k-hierarchy-cell .k-plus, .k-hierarchy-cell .k-minus", CLICK, function(e) {
                var button = $(this),
                    expanding = button.hasClass("k-plus"),
                    masterRow = button.closest("tr.k-master-row"),
                    detailRow,
                    detailTemplate = that.detailTemplate,
                    data,
                    hasDetails = that._hasDetails();

                button.toggleClass("k-plus", !expanding)
                    .toggleClass("k-minus", expanding);

                if(hasDetails && !masterRow.next().hasClass("k-detail-row")) {
                    data = that.dataItem(masterRow),
                    $(detailTemplate(data)).insertAfter(masterRow);

                    that.trigger(DETAILINIT, { masterRow: masterRow, detailRow: masterRow.next(), data: data, detailCell: masterRow.next().find(".k-detail-cell") });
                }

                detailRow = masterRow.next();

                that.trigger(expanding ? DETAILEXPAND : DETAILCOLLAPSE, { masterRow: masterRow, detailRow: detailRow});
                detailRow.toggle(expanding);

                e.preventDefault();
                return false;
            });
        },

        dataItem: function(tr) {
            return this._data[this.tbody.find('> tr:not(.k-grouping-row,.k-detail-row)').index($(tr))];
        },

        expandRow: function(tr) {
            $(tr).find('> td .k-plus, > td .k-expand').click();
        },

        collapseRow: function(tr) {
            $(tr).find('> td .k-minus, > td .k-collapse').click();
        },

        _thead: function() {
            var that = this,
                columns = that.columns,
                hasDetails = that._hasDetails() && columns.length,
                idx,
                length,
                html = "",
                thead = that.table.find("thead"),
                tr,
                th;

            if (!thead.length) {
                thead = $("<thead/>").insertBefore(that.tbody);
            }

            tr = that.table.find("tr").filter(":has(th)");

            if (!tr.length) {
                tr = thead.children().first();
                if(!tr.length) {
                    tr = $("<tr/>");
                }
            }

            if (!tr.children().length) {
                if (hasDetails) {
                    html += '<th class="k-hierarchy-cell">&nbsp;</th>';
                }

                for (idx = 0, length = columns.length; idx < length; idx++) {
                    th = columns[idx];

                    if (!th.command) {
                        html += "<th " + kendo.attr("field") + "='" + th.field + "' ";
                        if (th.title) {
                            html += kendo.attr("title") + '="' + th.title.replace(/'/g, "\'") + '" ';
                        }

                        if (th.groupable !== undefined) {
                            html += kendo.attr("groupable") + "='" + th.groupable + "' ";
                        }

                        if (th.aggregates) {
                            html += kendo.attr("aggregates") + "='" + th.aggregates + "'";
                        }

                        html += ">" + (th.title || th.field || "") + "</th>";
                    } else {
                        html += "<th>" + (th.title || "") + "</th>";
                    }
                }

                tr.html(html);
            } else if (hasDetails) {
                tr.prepend('<th class="k-hierarchy-cell">&nbsp;</th>');
            }

            tr.find("th").addClass("k-header");

            if(!that.options.scrollable) {
                thead.addClass("k-grid-header");
            }

            tr.appendTo(thead);

            that.thead = thead;

            that._sortable();

            that._filterable();

            that._scrollable();

            that._updateCols();

            that._setContentHeight();
        },

        _updateCols: function() {
            var that = this;

            that._appendCols(that.thead.parent().add(that.table));
        },

        _appendCols: function(table) {
            var that = this,
                colgroup = table.find("colgroup"),
                width,
                cols = map(that.columns, function(column) {
                    width = column.width;
                    if (width && parseInt(width, 10) !== 0) {
                        return kendo.format('<col style="width:{0}"/>', typeof width === STRING? width : width + "px");
                    }

                    return "<col />";
                }),
                groups = that.dataSource.group().length;

            if (that._hasDetails()) {
                cols.splice(0, 0, '<col class="k-hierarchy-col" />');
            }

            if (colgroup.length) {
                colgroup.remove();
            }

            colgroup = $("<colgroup/>").append($(new Array(groups + 1).join('<col class="k-group-col">') + cols.join("")));

            table.prepend(colgroup);
        },

        _autoColumns: function(schema) {
            if (schema && schema.toJSON) {
                var that = this,
                    field;

                schema = schema.toJSON();

                for (field in schema) {
                    that.columns.push({ field: field });
                }

                that._thead();

                that._templates();
            }
        },

        _rowsHtml: function(data) {
            var that = this,
                html = "",
                idx,
                length,
                rowTemplate = that.rowTemplate,
                altRowTemplate = that.altRowTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altRowTemplate(data[idx]);
                } else {
                    html += rowTemplate(data[idx]);
                }

                that._data.push(data[idx]);
            }

            return html;
        },

        _groupRowHtml: function(group, colspan, level) {
            var that = this,
                html = "",
                idx,
                length,
                field = group.field,
                column = $.grep(that.columns, function(column) { return column.field == field; })[0] || { },
                value = column.format ? kendo.format(column.format, group.value) : group.value,
                template = column.groupHeaderTemplate,
                text =  (column.title || field) + ': ' + value,
                data = extend({}, { field: group.field, value: group.value }, group.aggregates[group.field]),
                groupItems = group.items;

            if (template) {
                text  = typeof template === FUNCTION ? template(data) : kendo.template(template)(data);
            }

            html +=  '<tr class="k-grouping-row">' + groupCells(level) +
                      '<td colspan="' + colspan + '">' +
                        '<p class="k-reset">' +
                         '<a class="k-icon k-collapse" href="#"></a>' + text +
                         '</p></td></tr>';

            if(group.hasSubgroups) {
                for(idx = 0, length = groupItems.length; idx < length; idx++) {
                    html += that._groupRowHtml(groupItems[idx], colspan - 1, level + 1);
                }
            } else {
                html += that._rowsHtml(groupItems);
            }

            if (that.groupFooterTemplate) {
                html += that.groupFooterTemplate(group.aggregates);
            }
            return html;
        },

        collapseGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-expand").removeClass("k-collapse").end();
            var level = group.find(".k-group-cell").length;

            group.nextUntil(function() {
                return $(".k-group-cell", this).length <= level;
            }).hide();
        },

        expandGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-collapse").removeClass("k-expand").end();
            var that = this,
                level = group.find(".k-group-cell").length;

            group.nextAll("tr").each(function () {
                var tr = $(this);
                var offset = tr.find(".k-group-cell").length;
                if (offset <= level) {
                    return false;
                }

                if (offset == level + 1 && !tr.hasClass("k-detail-row")) {
                    tr.show();

                    if (tr.hasClass("k-grouping-row") && tr.find(".k-icon").hasClass("k-collapse")) {
                        that.expandGroup(tr);
                    }

                    if (tr.hasClass("k-master-row") && tr.find(".k-icon").hasClass("k-minus")) {
                        tr.next().show();
                    }
                }
            });
        },

        _updateHeader: function(groups) {
            var that = this,
                cells = that.thead.find("th.k-group-cell"),
                length = cells.length;

            if(groups > length) {
                $(new Array(groups - length + 1).join('<th class="k-group-cell k-header">&nbsp;</th>')).prependTo(that.thead.find("tr"));
            } else if(groups < length) {
                length = length - groups;
                $($.grep(cells, function(item, index) { return length > index; } )).remove();
            }
        },

        _firstDataItem: function(data, grouped) {
            if(data && grouped) {
                if(data.hasSubgroups) {
                    data = this._firstDataItem(data.items[0], grouped);
                } else {
                    data = data.items[0];
                }
            }
            return data;
        },

        _progress: function(toggle) {
            var that = this,
                element = that.element.is("table") ? that.element.parent() : (that.content && that.content.length ? that.content : that.element);

            kendo.ui.progress(element, toggle);
        },

        refresh: function(e) {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                tbody,
                placeholder,
                currentIndex,
                current = that.current(),
                groups = (that.dataSource.group() || []).length,
                colspan = groups + that.columns.length;

            if (e && e.action === "itemchange" && that.editable) { // skip rebinding if editing is in progress
                return;
            }

            that.trigger("dataBinding");

            if (current && current.hasClass("k-state-focused")) {
                currentIndex = that.items().index(current.parent());
            }

            that._destroyEditable();

            that._progress(false);

            that._data = [];

            if (!that.columns.length) {
                that._autoColumns(that._firstDataItem(data[0], groups));
                colspan = groups + that.columns.length;
            }

            that._group = groups > 0 || that._group;

            if(that._group) {
                that._templates();
                that._updateCols();
                that._updateHeader(groups);
                that._group = groups > 0;
            }

            if(groups > 0) {

                if (that.detailTemplate) {
                    colspan++;
                }

                for (idx = 0, length = data.length; idx < length; idx++) {
                    html += that._groupRowHtml(data[idx], colspan, 0);
                }
            } else {
                html += that._rowsHtml(data);
            }

            if (tbodySupportsInnerHtml) {
                that.tbody[0].innerHTML = html;
            } else {
                placeholder = document.createElement("div");
                placeholder.innerHTML = "<table><tbody>" + html + "</tbody></table>";
                tbody = placeholder.firstChild.firstChild;
                that.table[0].replaceChild(tbody, that.tbody[0]);
                that.tbody = $(tbody);
            }

            that._footer();

            if (currentIndex >= 0) {
                that.current(that.items().eq(currentIndex).children().filter(DATA_CELL).first());
            }

            that.trigger(DATABOUND);
       }
   });

   function hasCommand(commands, name) {
       var idx, length, command;

       if (typeof commands === STRING) {
           return commands === name;
       }

       if (isArray(commands)) {
           for (idx = 0, length = commands.length; idx < length; idx++) {
               command = commands[idx];

               if ((typeof command === STRING && command === name) || (command.name === name)) {
                   return true;
               }
           }
       }
       return false;
   }

   ui.plugin(Grid);
   ui.plugin(VirtualScrollable);
})(jQuery);
