(function(f, define){
    define([ "./kendo.autcomplete", "./kendo.datepicker", "./kendo.numerictextbox", "./kendo.dropdownlist" ], f);
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
                return filter.value;
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

            if (!(options.dataSource instanceof DataSource)) {
                options.dataSource = DataSource.create(options.dataSource);
            }
            dataSource = that.dataSource = options.dataSource;
            //gets the type from the dataSource or sets default to string
            that.options.type = kendo.getter("options.schema.model.fields['" + options.field + "'].type", true)(dataSource) || "string";


            element.addClass("grid-filter-header");

            that.viewModel = viewModel = kendo.observable({
                operator: options.operator || that._defaultOperatorForType(options.type),
                value: null
            });

            kendo.bind(element, viewModel);

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource.bind("change", that._refreshHandler);

            that.refresh();
        },

        _defaultOperatorForType: function(type) {
            //TODO
            return "eq";
        },

        refresh: function() {
            var that = this;
            that._bind()
        },

        _bind: function() {
            var that = this,
                filter = that.dataSource.filter(),
                viewModel = that.viewModel,
                valueFromFilter = findFilterForField(filter, this.options.field);

            viewModel.set("value", valueFromFilter);
            viewModel.set("operator", that.options.operator);
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
