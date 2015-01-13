(function(f, define){
    define([ "./kendo.pivotgrid", "./kendo.menu", "./kendo.window", "./kendo.treeview", "./kendo.dropdownlist" ], f);
})(function(){

var __meta__ = {
    id: "pivot.fieldmenu",
    name: "PivotFieldMenu",
    category: "web",
    description: "The PivotFieldMenu widget allows the user to filter on fields displayed in PivotGrid",
    depends: [ "menu", "window", "treeview", "dropdownlist" ],
    advanced: true
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MENU = "kendoContextMenu",
        proxy = $.proxy,
        NS = ".kendoPivotFieldMenu",
        Widget = ui.Widget;

    var PivotFieldMenu = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._dataSource();

            this._layout();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotFieldMenu",
            filter: null,
            filterable: true,
            sortable: true,
            messages: {
                info: "Show items with value that:",
                sortAscending: "Sort Ascending",
                sortDescending: "Sort Descending",
                filterFields: "Fields Filter",
                filter: "Filter",
                include: "Include Fields...",
                title: "Fields to include",
                clear: "Clear",
                ok: "OK",
                cancel: "Cancel",
                operators: {
                    contains: "Contains",
                    doesnotcontain: "Does not contain",
                    startswith: "Starts with",
                    endswith: "Ends with",
                    eq: "Is equal to",
                    neq: "Is not equal to"
                }
            }
        },

        _layout: function() {
            var options = this.options;

            this.wrapper = $(kendo.template(MENUTEMPLATE)({
                ns: kendo.ns,
                filterable: options.filterable,
                sortable: options.sortable,
                messages: options.messages
            }));

            this.menu = this.wrapper[MENU]({
                filter: options.filter,
                target: this.element,
                orientation: "vertical",
                showOn: "click",
                closeOnClick: false,
                open: proxy(this._menuOpen, this),
                select: proxy(this._select, this),
                copyAnchorStyles: false
            }).data(MENU);

            this._createWindow();

            if (options.filterable) {
                this._initFilterForm();
            }
        },

        _initFilterForm: function() {
            var filterForm = this.menu.element.find(".k-filter-item");
            var filterProxy = proxy(this._filter, this);

            this._filterOperator = new kendo.ui.DropDownList(filterForm.find("select"));
            this._filterValue = filterForm.find(".k-textbox");


            filterForm
                .on("submit" + NS, filterProxy)
                .on("click" + NS, ".k-button-filter", filterProxy)
                .on("click" + NS, ".k-button-clear", proxy(this._reset, this));
        },

        _setFilterForm: function(expression) {
            var operator = "";
            var value = "";

            if (expression) {
                operator = expression.operator;
                value = expression.value;
            }

            this._filterOperator.value(operator);
            this._filterValue.val(value);
        },

        _clearFilters: function(member) {
            var filter = this.dataSource.filter() || {};
            var expressions;
            var idx = 0;
            var length;

            filter.filters = filter.filters || [];
            expressions = findFilters(filter, member);

            for (length = expressions.length; idx < length; idx++) {
                filter.filters.splice(filter.filters.indexOf(expressions[idx]), 1);
            }

            return filter;
        },

        _filter: function(e) {
            var that = this;
            var value = that._filterValue.val();

            e.preventDefault();

            if (!value) {
                that.menu.close();
                return;
            }

            var expression = {
                field: that.currentMember,
                operator: that._filterOperator.value(),
                value: value
            };
            var filter = that._clearFilters(that.currentMember);

            filter.filters.push(expression);

            that.dataSource.filter(filter);
            that.menu.close();
        },

        _reset: function(e) {
            var that = this;
            var filter = that._clearFilters(that.currentMember);

            e.preventDefault();

            if (!filter.filters[0]) {
                filter = {};
            }

            that.dataSource.filter(filter);
            that._setFilterForm(null);
            that.menu.close();
        },

        _sort: function(dir) {
            var field = this.currentMember;
            var expressions = (this.dataSource.sort() || []);

            expressions = removeExpr(expressions, field);
            expressions.push({
                field: field,
                dir: dir
            });

            this.dataSource.sort(expressions);
            this.menu.close();
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();
        },

        _dataSource: function() {
            this.dataSource = kendo.data.PivotDataSource.create(this.options.dataSource);
        },

        _createWindow: function() {
            var messages = this.options.messages;

            this.includeWindow = $(kendo.template(WINDOWTEMPLATE)({
                messages: messages
            }))
            .on("click" + NS, ".k-button-ok", proxy(this._applyIncludes, this))
            .on("click" + NS, ".k-button-cancel", proxy(this._closeWindow, this));

            this.includeWindow = new ui.Window(this.includeWindow, {
                title: messages.title,
                visible: false,
                resizable: false,
                open: proxy(this._windowOpen, this)
            });
        },

        _applyIncludes: function(e) {
            var checkedNodes = [];
            var resultExpression;
            var view = this.treeView.dataSource.view();
            var rootChecked = view[0].checked;
            var filter = this.dataSource.filter();
            var existingExpression = findFilters(filter, this.currentMember, "in")[0];

            checkedNodeIds(view, checkedNodes);

            if (existingExpression) {
                if (rootChecked) {
                    filter.filters.splice(filter.filters.indexOf(existingExpression), 1);
                    if (!filter.filters.length) {
                        filter = {};
                    }
                } else {
                    existingExpression.value = checkedNodes.join(",");
                }

                resultExpression = filter;
            }

            if (checkedNodes.length) {
                if (!resultExpression && !rootChecked) {
                    resultExpression = {
                        field: this.currentMember,
                        operator: "in",
                        value: checkedNodes.join(",")
                    };

                    if (filter) {
                        filter.filters.push(resultExpression);
                        resultExpression = filter;
                    }
                }
            }

            if (resultExpression) {
                this.dataSource.filter(resultExpression);
            }

            this._closeWindow(e);
        },

        _closeWindow: function(e) {
            e.preventDefault();

            this.includeWindow.close();
        },

        _treeViewDataSource: function() {
            var that = this;

            return kendo.data.HierarchicalDataSource.create({
                schema: {
                    model: {
                        id: "uniqueName",
                        hasChildren: function(item) {
                            return parseInt(item.childrenCardinality, 10) > 0;
                        }
                    }
                },
                transport: {
                    read: function(options) {
                        var restrictions = {};
                        var node = that.treeView.dataSource.get(options.data.uniqueName);
                        var name = options.data.uniqueName;

                        if (!name) {
                            restrictions.levelUniqueName = that.currentMember + ".[(ALL)]";
                        } else {
                            restrictions.memberUniqueName = node.uniqueName.replace(/\&/g, "&amp;");
                            restrictions.treeOp = 1;
                        }

                        that.dataSource
                            .schemaMembers(restrictions)
                            .done(function (data) {
                                checkNodes(that.dataSource.filter(), that.currentMember, data);

                                options.success(data);
                            })
                            .fail(options.error);
                    }
                }
            });
        },

        _createTreeView: function(element) {
            var that = this;

            that.treeView =  new ui.TreeView(element, {
                autoBind: false,
                dataSource: that._treeViewDataSource(),
                dataTextField: "caption",
                template: "#: data.item.caption || data.item.name #",
                checkboxes: {
                    checkChildren: true
                },
                dataBound: function() {
                    ui.progress(that.includeWindow.element, false);
                }
            });
        },

        _menuOpen: function(e) {
            if (!e.event) {
                return;
            }

            var attr = kendo.attr("name");
            var expression;

            this.currentMember = $(e.event.target).closest("[" + attr + "]").attr(attr);

            if (this.options.filterable) {
                this._setFilterForm(findFilters(this.dataSource.filter(), this.currentMember)[0]);
            }
        },

        _select: function(e) {
            var item = $(e.item);

            $(".k-pivot-filter-window").not(this.includeWindow.element).kendoWindow("close");

            if (item.hasClass("k-include-item")) {
                this.includeWindow.center().open();
            } else if (item.hasClass("k-sort-asc")) {
                this._sort("asc");
            } else if (item.hasClass("k-sort-desc")) {
                this._sort("desc");
            }
        },

        _windowOpen: function() {
            if (!this.treeView) {
                this._createTreeView(this.includeWindow.element.find(".k-treeview"));
            }

            ui.progress(this.includeWindow.element, true);
            this.treeView.dataSource.read();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this.menu) {
                this.menu.destroy();
                this.menu = null;
            }

            if (this.reeeView) {
                this.treeView.destroy();
                this.treeView = null;
            }

            if (this.includeWindow) {
                this.includeWindow.destroy();
                this.includeWindow = null;
            }

            this.wrapper = null;
            this.element = null;
        }
    });

    function removeExpr(expressions, name) {
        var result = [];

        for (var idx = 0, length = expressions.length; idx < length; idx++) {
            if (expressions[idx].field !== name) {
                result.push(expressions[idx]);
            }
        }

        return result;
    }

    function findFilters(filter, member, operator) {
        if (!filter) {
            return [];
        }

        filter = filter.filters;

        var idx = 0;
        var result = [];
        var length = filter.length;
        var filterOperator;

        for ( ; idx < length; idx++) {
            filterOperator = filter[idx].operator;

            if (((!operator && filterOperator !== "in") || (filterOperator === operator)) && filter[idx].field === member) {
                result.push(filter[idx]);
            }
        }

        return result;
    }

    function checkNodes(filter, member, nodes) {
        var values, idx = 0, length = nodes.length;
        filter = findFilters(filter, member, "in")[0];

        if (!filter) {
            for (; idx < length; idx++) {
                nodes[idx].checked = true;
            }
        } else {
            values = filter.value.split(",");
            for (; idx < length; idx++) {
                nodes[idx].checked = $.inArray(nodes[idx].uniqueName, values) >= 0;
            }
        }
    }

    function checkedNodeIds(nodes, checkedNodes) {
        var idx, length = nodes.length;

        for (idx = 0; idx < length; idx++) {
            if (nodes[idx].checked && nodes[idx].level() !== 0) {
                checkedNodes.push(nodes[idx].uniqueName);
            }

            if (nodes[idx].hasChildren) {
                checkedNodeIds(nodes[idx].children.view(), checkedNodes);
            }
        }
    }

    var LABELMENUTEMPLATE =
        '<div class="k-filterable k-content" tabindex="-1" data-role="fieldmenu">' +
            '<form class="k-filter-menu">' +
                '<div>' +
                    '<div class="k-filter-help-text">#=messages.info#</div>'+
                    '<select>'+
                        '#for(var op in messages.operators){#'+
                            '<option value="#=op#">#=messages.operators[op]#</option>' +
                        '#}#'+
                    '</select>'+
                    '<input class="k-textbox" type="text" />'+
                    '<div>'+
                    '<a class="k-button k-primary k-button-filter" href="\\#">#=messages.filter#</a>'+
                    '<a class="k-button k-button-clear" href="\\#">#=messages.clear#</a>'+
                    '</div>'+
                '</div>' +
            '</form>' +
        '</div>';

    var MENUTEMPLATE = '<ul class="k-pivot-fieldmenu">'+
                        '# if (sortable) {#'+
                        '<li class="k-item k-sort-asc">'+
                            '<span class="k-link">'+
                                '<span class="k-icon k-i-sort-asc"></span>'+
                                '${messages.sortAscending}'+
                            '</span>'+
                        '</li>'+
                        '<li class="k-item k-sort-desc">'+
                            '<span class="k-link">'+
                                '<span class="k-icon k-i-sort-desc"></span>'+
                                '${messages.sortDescending}'+
                            '</span>'+
                        '</li>'+
                            '# if (filterable) {#'+
                            '<li class="k-separator"></li>'+
                            '# } #'+
                        '# } #'+
                        '# if (filterable) {#'+
                        '<li class="k-item k-include-item">'+
                            '<span class="k-link">'+
                                '<span class="k-icon k-filter"></span>'+
                                '${messages.include}'+
                            '</span>'+
                        '</li>'+
                        '<li class="k-separator"></li>'+
                        '<li class="k-item k-filter-item">'+
                            '<span class="k-link">'+
                                '<span class="k-icon k-filter"></span>'+
                                '${messages.filterFields}'+
                            '</span>'+
                            '<ul>'+
                                '<li>' + LABELMENUTEMPLATE + '</li>'+
                            '</ul>'+
                        '</li>'+
                        '# } #'+
                    '</ul>';

    var WINDOWTEMPLATE = '<div class="k-popup-edit-form k-pivot-filter-window"><div class="k-edit-form-container">'+
                            '<div class="k-treeview"></div>'+
                            '<div class="k-edit-buttons k-state-default">'+
                            '<a class="k-button k-primary k-button-ok" href="\\#">'+
                                '${messages.ok}'+
                            '</a>'+
                            '<a class="k-button k-button-cancel" href="\\#">'+
                                '${messages.cancel}'+
                            '</a>'+
                        '</div></div>';

    ui.plugin(PivotFieldMenu);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
