(function(f, define){
    define([ "./kendo.autocomplete", "./kendo.datepicker", "./kendo.numerictextbox", "./kendo.dropdownlist" ], f);
})(function(){

var __meta__ = {
    id: "rowfilter",
    name: "Row filter",
    category: "framework",
    depends: [ "autocomplete" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
        CHANGE = "change",
        NS = ".kendoRowFilter",
        EQ = "Is equal to",
        NEQ = "Is not equal to",
        proxy = $.proxy;

    function findFilterForField(filter, field) {
        var filters = [];
        if ($.isPlainObject(filter)) {
            if (filter.hasOwnProperty("filters")) {
                filters = filter.filters;
            } else if(filter.field == field) {
                return filter;
            }
        }
        if (($.isArray(filter))) {
           filters = filter;
        }

        for (var i = 0; i < filters.length; i++) {
          var result = findFilterForField(filters[i], field);
          if (result) {
             return result;
          }
        }
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

    var RowFilter = Widget.extend( {
        init: function(element, options) {
            var element = $(element),
                    that = this,
                    options,
                    dataSource,
                    viewModel,
                    input = that.input = $("<input/>")
                        .attr(kendo.attr("bind"), "value: value")
                        .appendTo(element);

            Widget.fn.init.call(that, element, options);
            options = that.options;

            if (!(options.acDataSource instanceof DataSource)) {
                that.acDataSource = options.acDataSource = DataSource.create(options.acDataSource);
            }
            dataSource = that.dataSource = options.dataSource;
            //gets the type from the dataSource or sets default to string
            options.type = kendo.getter("options.schema.model.fields['" + options.field + "'].type", true)(dataSource) || "string";


            element.addClass("grid-filter-header");

            that.viewModel = viewModel = kendo.observable({
                operator: options.operator || "eq",
                value: null
            });
            viewModel.bind(CHANGE, proxy(that.updateDsFilter, that));


            if (typeof (options.template) == "function") {
                options.template.call(viewModel, input);
            }

            kendo.bind(element, viewModel);
            that.refreshUI();

            that._refreshHandler = proxy(that.refreshUI, that);

            that.dataSource.bind(CHANGE, that._refreshHandler);

        },

        //CLEAR/RESET filter could be copied from filtermenu.js

        refreshUI: function() {
            var that = this;
            that._bind();
        },

        _bind: function() {
            var that = this,
                filter = findFilterForField(that.dataSource.filter(), this.options.field) || {},
                viewModel = that.viewModel;

            that.manuallyUpdatingVM = true;
            if (filter.operator) {
                viewModel.set("operator", filter.operator);
            }
            viewModel.set("value", filter.value);
            that.manuallyUpdatingVM = false;
        },

        updateDsFilter: function() {
            var that = this,
                model = that.viewModel;

            if (that.manuallyUpdatingVM) {
                return
            }

            var currentFilter = $.extend({}, that.viewModel.toJSON(), { field: that.options.field });

            var expression = {
                logic: "and",
                filters: [currentFilter]
            }
            var mergeResult = that._merge(expression);
            if (mergeResult.filters.length) {
                that.dataSource.filter(mergeResult);
            } else {
                that.dataSource.filter({});
            }
        },

        _merge: function(expression) {
            var that = this,
                logic = expression.logic || "and",
                filters = expression.filters,
                filter,
                result = that.dataSource.filter() || { filters:[], logic: "and" },
                idx,
                length;

            removeFiltersForField(result, that.options.field);

            filters = $.grep(filters, function(filter) {
                return filter.value !== "" && filter.value != null;
            });

            if (filters.length) {
                if (result.filters.length) {
                    expression.filters = filters;

                    if (result.logic !== "and") {
                        result.filters = [ { logic: result.logic, filters: result.filters }];
                        result.logic = "and";
                    }

                    if (filters.length > 1) {
                        result.filters.push(expression);
                    } else {
                        result.filters.push(filters[0]);
                    }
                } else {
                    result.filters = filters;
                    result.logic = logic;
                }
            }

            return result;
        },

        destroy: function() {
            var that = this;

            that.filterModel = null;

            Widget.fn.destroy.call(that);

            kendo.destroy(that.element);
        },

        events: [
            CHANGE
        ],

        options: {
            name: "RowFilter",
            autoBind: true,
            field: "",
            type: "string",
            acDataSource: null,
            operator: "eq",
            template: null,
            operators: {
                string: {
                    eq: EQ,
                    neq: NEQ,
                    startswith: "Starts with",
                    contains: "Contains",
                    doesnotcontain: "Does not contain",
                    endswith: "Ends with"
                },
                number: {
                    eq: EQ,
                    neq: NEQ,
                    gte: "Is greater than or equal to",
                    gt: "Is greater than",
                    lte: "Is less than or equal to",
                    lt: "Is less than"
                },
                date: {
                    eq: EQ,
                    neq: NEQ,
                    gte: "Is after or equal to",
                    gt: "Is after",
                    lte: "Is before or equal to",
                    lt: "Is before"
                },
                enums: {
                    eq: EQ,
                    neq: NEQ
                }
            },
            messages: {
                isTrue: "is true",
                isFalse: "is false",
                filter: "Filter",
                clear: "Clear",
                and: "And",
                or: "Or",
                operator: "Operator",
                value: "Value",
                cancel: "Cancel"
            },
        },

        setDataSource: function(dataSource) {

            this.dataSource.unbind(CHANGE, that._refreshHandler);
            this.dataSource = that.options.dataSource = dataSource;
            dataSource.bind(CHANGE, that._refreshHandler);

            if (that.options.autoBind) {
                dataSource.fetch();
            }
        }
    });

    ui.plugin(RowFilter);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
