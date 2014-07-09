(function(f, define){
    define([ "./kendo.menu", "./kendo.window", "./kendo.treeview" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid.filtermenu",
    name: "PivotFilterMenu",
    category: "web",
    description: "The PivotFilterMenu widget allows the user to filter on fields displayed in PivotGrid",
    depends: [ "contextmenu", "window", "treeview" ]
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        POPUP = "kendoPopup",
        MENU = "kendoContextMenu",
        proxy = $.proxy,
        NS = ".kendoPivotFilterMenu",
        Widget = ui.Widget;

    var PivotFilterMenu = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._dataSource();

            this._layout();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotFilterMenu",
            filter: null,
            messages: {
                filter: "Fields Filter",
                include: "Include Fields...",
                title: "Fields to include",
                ok: "Ok",
                cancel: "Cancel"
            }
        },

        _layout: function() {
            var options = this.options;

            this.wrapper = $(kendo.template(MENUTEMPLATE)({
                ns: kendo.ns,
                messages: options.messages
            }));

            this.menu = this.wrapper[MENU]({
                filter: options.filter,
                target: this.element,
                orientation: "vertical",
                showOn: "click",
                closeOnClick: false,
                open: proxy(this._menuOpen, this),
                select: proxy(this._select, this)
            }).data(MENU);

            this._createWindow();
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

            checkedNodeIds(this.treeView.dataSource.view(), checkedNodes);

//            if (checkedNodes.length > 0) {
//                this.dataSource.filter({ value: checkedNodes.join(","), operator: "in", field: this.currentMember });
//            } else {
//                this.dataSource.filter({});
//            }

            var filters = this.dataSource.filter();
            var filter = findFilter(filters, this.currentMember);

            if (!filters) {
                filters = {
                    logic: "and",
                    filters: []
                };
            }

            if (filter) {
                if (checkedNodes.length > 0) {
                    filter.value = checkedNodes.join(",");
                } else {
                    filter = null;
                }
            } else {
                filter = {
                    field: this.currentMember,
                    operator: "in",
                    value: checkedNodes.join(",")
                };
                filters.filters.push(filter);
            }

            this.dataSource.filter(filters);

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
                dataTextField: "name",
                checkboxes: {
                    checkChildren: true
                }
            });
        },

        _menuOpen: function(e) {
            if (!e.event) {
                return;
            }

            var attr = kendo.attr("name");
            this.currentMember = $(e.event.target).closest("[" + attr + "]").attr(attr);
        },

        _select: function(e) {
            var item = $(e.item);

            $(".k-pivot-filter-window").not(this.includeWindow.element).kendoWindow("close");

            if (item.hasClass("k-include-item")) {
                this.includeWindow.open().center();
            }
        },

        _windowOpen: function() {
            if (!this.treeView) {
                this._createTreeView(this.includeWindow.element.find(".k-treeview"));
            }

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

    function findFilter(filter, member) {
        if (!filter) {
            return;
        }

        filter = filter.filters;
        var idx = 0, length = filter.length;

        for ( ; idx < length; idx++) {
            if (filter[idx].operator === "in" && filter[idx].field === member) {
                return filter[idx];
            }
        }

        return;
    }

    function checkNodes(filter, member, nodes) {
        var values, idx = 0, length = nodes.length;
        filter = findFilter(filter, member);

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

        for (idx= 0; idx < length; idx++) {
            if (nodes[idx].checked) {
                checkedNodes.push(nodes[idx].uniqueName);
            }

            if (nodes[idx].hasChildren) {
                checkedNodeIds(nodes[idx].children.view(), checkedNodes);
            }
        }
    }

    var MENUTEMPLATE = '<ul class="k-pivot-filtermenu">'+
                        '<li class="k-item k-include-item">'+
                            '<span class="k-link">'+
                                '<span class="k-sprite k-include"></span>'+
                                '${messages.include}'+
                            '</span>'+
                        '</li>'+
                        '<li class="k-separator"></li>'+
                        '<li class="k-item k-filter-item">'+
                            '<span class="k-link">'+
                                '<span class="k-sprite k-filter"></span>'+
                                '${messages.filter}'+
                            '</span>'+
                            '<ul>'+
                                '<li><div>Filter</div></li>'+
                            '</ul>'+
                        '</li>'+
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

    ui.plugin(PivotFilterMenu);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
