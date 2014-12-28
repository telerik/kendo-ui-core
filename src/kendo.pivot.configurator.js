(function(f, define){
    define([ "./kendo.dom" ], f);
})(function(){

var __meta__ = {
    id: "pivot.configurator",
    name: "PivotConfigurator",
    category: "web",
    depends: [ "dropdownlist", "treeview", "pivot.fieldmenu" ],
    hidden: true
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        ns = ".kendoPivotConfigurator",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        SETTING_CONTAINER_TEMPLATE = kendo.template('<p class="k-reset"><span class="k-icon #=icon#"></span>${name}</p>' +
                '<div class="k-list-container k-reset"/>');

    function addKPI(data) {
        var found;
        var idx = 0;
        var length = data.length;

        for (; idx < length; idx++) {
            if (data[idx].type == 2) {
                found = true;
                break;
            }
        }

        if (found) {
            data.splice(idx + 1, 0, {
                caption: "KPIs",
                defaultHierarchy: "[KPIs]",
                name: "KPIs",
                uniqueName: "[KPIs]"
            });
        }
    }

    function kpiNode(node) {
        return {
            name: node.uniqueName,
            type: node.type
        };
    }

    function normalizeKPIs(data) {
        for (var idx = 0, length = data.length; idx < length; idx++) {
            data[idx].uniqueName = data[idx].name;
            data[idx].type = "kpi";
        }

        return data;
    }

    function settingTargetFromNode(node) {
        var target = $(node).closest(".k-pivot-setting");

        if (target.length) {
            return target.data("kendoPivotSettingTarget");
        }
        return null;
    }

    var PivotConfigurator = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.addClass("k-widget k-fieldselector k-alt k-edit-form-container");

            this._dataSource();

            this._layout();

            this.refresh();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotConfigurator",
            filterable: false,
            sortable: false,
            messages: {
                measures: "Drop Data Fields Here",
                columns: "Drop Column Fields Here",
                rows: "Drop Rows Fields Here",
                measuresLabel: "Measures",
                columnsLabel: "Columns",
                rowsLabel: "Rows",
                fieldsLabel: "Fields"
            }
        },

        _dataSource: function() {
            if (this.dataSource && this._refreshHandler) {
                this.dataSource.unbind("change", this._refreshHandler);
            } else {
                this._refreshHandler = $.proxy(this.refresh, this);
            }

            this.dataSource = kendo.data.PivotDataSource.create(this.options.dataSource);
            this.dataSource.bind("change", this._refreshHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.measures) {
                this.measures.setDataSource(dataSource);
            }

            if (this.rows) {
                this.rows.setDataSource(dataSource);
            }

            if (this.columns) {
                this.columns.setDataSource(dataSource);
            }

            this.refresh();
        },

        _treeViewDataSource: function() {
            var that = this;

            return kendo.data.HierarchicalDataSource.create({
                schema: {
                    model: {
                        id: "uniqueName",
                        hasChildren: function(item) {
                            return !("hierarchyUniqueName" in item) && !("aggregator" in item);
                        }
                    }
                },
                transport: {
                    read: function(options) {
                        var promise;
                        var node;
                        var kpi;

                        if ($.isEmptyObject(options.data)) {
                            promise = that.dataSource.schemaDimensions();

                            promise.done(function(data) {
                                        if (!that.dataSource.cubeBuilder) {
                                            addKPI(data);
                                        }
                                        options.success(data);
                                    })
                                    .fail(options.error);
                        } else {
                            //Hack to get the actual node as the HierarchicalDataSource does not support passing it
                            node = that.treeView.dataSource.get(options.data.uniqueName);

                            if (node.uniqueName === "[KPIs]") {
                                kpi = true;
                                promise = that.dataSource.schemaKPIs();
                                promise.done(function (data) {
                                            options.success(normalizeKPIs(data));
                                       })
                                       .fail(options.error);
                            } else if (node.type == "kpi") {
                                kpi = true;
                                options.success(buildKPImeasures(node));
                            }

                            if (!kpi) {
                                if (node.type == 2) { //measure
                                    promise = that.dataSource.schemaMeasures();
                                } else if (node.dimensionUniqueName) { // hierarchy
                                    promise = that.dataSource.schemaLevels(options.data.uniqueName);
                                } else { // dimension
                                    promise = that.dataSource.schemaHierarchies(options.data.uniqueName);
                                }

                                promise.done(options.success)
                                        .fail(options.error);
                            }
                        }
                    }
                }
            });
        },

        _layout: function() {
            this.form = $('<div class="k-columns k-state-default k-floatwrap"/>').appendTo(this.element);
            this._fields();
            this._targets();
        },

        _fields: function() {
            var container = $('<div class="k-state-default"><p class="k-reset"><span class="k-icon k-i-group"></span>' + this.options.messages.fieldsLabel + '</p></div>').appendTo(this.form);

            var that = this;
            var template = '# if (item.type == 2 || item.uniqueName == "[KPIs]") { #' +
                           '<span class="k-icon k-i-#= (item.type == 2 ? \"sum\" : \"kpi\") #"></span>' +
                           '# } else if (item.type && item.type !== "kpi") { #' +
                           '<span class="k-icon k-i-dimension"></span>' +
                           '# } #' +
                           '#: item.name #';

            this.treeView = $("<div/>").appendTo(container)
                .kendoTreeView({
                    template: template,
                    dataTextField: "name",
                    dragAndDrop: true,
                    autoBind: false,
                    dataSource: this._treeViewDataSource(),
                    dragstart: function(e) {
                        var dataItem = this.dataItem(e.sourceNode);
                        if ((!dataItem.hasChildren && !dataItem.aggregator && !dataItem.measure) || (dataItem.type == 2) || dataItem.uniqueName === "[KPIs]") {
                            e.preventDefault();
                        }
                    },
                    drag: function(e) {
                        var status = "k-denied";

                        var setting = settingTargetFromNode(e.dropTarget);
                        if (setting && setting.validate(this.dataItem(e.sourceNode))) {
                            status = "k-add";
                        }

                        e.setStatusClass(status);
                    },
                    drop: function(e) {
                        e.preventDefault();

                        var setting = settingTargetFromNode(e.dropTarget);
                        var node = this.dataItem(e.sourceNode);
                        var idx, length, measures;
                        var name;

                        if (setting && setting.validate(node)) {
                            name = node.defaultHierarchy || node.uniqueName;

                            if (node.type === "kpi") {
                                measures = buildKPImeasures(node);
                                length = measures.length;
                                name = [];

                                for (idx = 0; idx < length; idx++) {
                                    name.push(kpiNode(measures[idx]));
                                }
                            } else if (node.kpi) {
                                name = [kpiNode(node)];
                            }

                            setting.add(name);
                        }
                    }
                 })
                .data("kendoTreeView");
        },

        _createTarget: function(element, options) {
            var template = '<li class="k-item k-header" data-' + kendo.ns + 'name="${data.name}">${data.name}';
            var sortable = options.sortable;
            var icons = "";

            if (sortable) {
                icons += '#if (data.sortIcon) {#';
                icons += '<span class="k-icon ${data.sortIcon} k-setting-sort"></span>';
                icons += '#}#';
            }

            if (options.filterable || sortable) {
                icons += '<span class="k-icon k-i-arrowhead-s k-setting-fieldmenu"></span>';
            }

            icons += '<span class="k-icon k-si-close k-setting-delete"></span>';
            template += '<span class="k-field-actions">' + icons + '</span></li>';

            return new kendo.ui.PivotSettingTarget(element, $.extend({
                dataSource: this.dataSource,
                hint: function(element) {
                    var wrapper = $('<div class="k-fieldselector"><ul class="k-list k-reset"></ul></div>');

                    wrapper.find(".k-list").append(element.clone());

                    return wrapper;
                },
                template: template,
                emptyTemplate: '<li class="k-item k-empty">${data}</li>'
            }, options));
        },

        _targets: function() {
            var container = $('<div class="k-state-default"/>').appendTo(this.form);

            var columnsContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.columnsLabel, icon: "k-i-vbars" })).appendTo(container);
            var columns = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(columnsContainer.last());

            var rowsContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.rowsLabel, icon: "k-i-hbars" })).appendTo(container);
            var rows = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(rowsContainer.last());

            var measuresContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.measuresLabel, icon: "k-i-sum"})).appendTo(container);
            var measures = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(measuresContainer.last());

            var options = this.options;

            this.columns = this._createTarget(columns, {
                filterable: options.filterable,
                sortable: options.sortable,
                connectWith: rows,
                messages: {
                    empty: options.messages.columns,
                    fieldMenu: options.messages.fieldMenu
                }
            });

            this.rows = this._createTarget(rows, {
                filterable: options.filterable,
                setting: "rows",
                connectWith: columns,
                messages: {
                    empty: this.options.messages.rows,
                    fieldMenu: this.options.messages.fieldMenu
                }
            });

            this.measures = this._createTarget(measures, {
                setting: "measures",
                messages: {
                    empty: options.messages.measures
                }
            });

            columns
                .add(rows)
                .add(measures)
                .on(HOVEREVENTS, ".k-item:not(.k-empty)", this._toggleHover);
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass("k-state-hover", e.type === "mouseenter");
        },

        _resize: function() {
            var element = this.element;
            var height = this.options.height;
            var border, fields;

            if (!height) {
                return;
            }

            if (element.is(":visible")) {
                element.height(height);

                fields = element.children(".k-columns")
                                .children("div.k-state-default");

                border = (element.outerHeight() - element.innerHeight()) / 2;
                height = height - (fields.outerHeight(true) - fields.height()) - border;

                fields.height(height);
            }
        },

        refresh: function() {
            var dataSource = this.dataSource;

            if (dataSource.cubeBuilder || this._cube !== dataSource.cube() || this._catalog !== dataSource.catalog()) {
                this.treeView.dataSource.fetch();
            }

            this._catalog = this.dataSource.catalog();
            this._cube = this.dataSource.cube();

            this._resize();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.dataSource.unbind("change", this._refreshHandler);

            this.form.find(".k-list").off(ns);

            this.rows.destroy();
            this.columns.destroy();
            this.measures.destroy();
            this.treeView.destroy();

            this.element = null;
            this._refreshHandler = null;
        }
    });

    function kpiMeasure(name, measure, type) {
        return {
            hierarchyUniqueName: name,
            uniqueName: measure,
            caption: measure,
            measure: measure,
            name: measure,
            type: type,
            kpi: true
        };
    }

    function buildKPImeasures(node) {
        var name = node.name;
        return [
            kpiMeasure(name, node.value, "value"),
            kpiMeasure(name, node.goal, "goal"),
            kpiMeasure(name, node.status, "status"),
            kpiMeasure(name, node.trend, "trend")
        ];
    }

    ui.plugin(PivotConfigurator);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
