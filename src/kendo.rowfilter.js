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

    var RowFilter = Widget.extend( {
        init: function(element, options) {
            var element = $(element),
                    that = this,
                    options,
                    dataSource,
                    input = that.input = $("<input/>");

            Widget.fn.init.call(that, element, options);
            options = that.options;

            if (!(options.dataSource instanceof DataSource)) {
                options.dataSource = DataSource.create(options.dataSource);
            }
            dataSource = that.dataSource = options.dataSource;
            //gets the type from the dataSource or sets default to string
            that.options.type = kendo.getter("options.schema.model.fields['" + options.field + "'].type", true)(dataSource) || "string";


            element.addClass("grid-filter-header");
            element.append(input);

            kendo.notify(that);
        },

        _refreshHandler: function() {
            
        },

        destroy: function() {
            var that = this;

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
        },

        refresh: function(e) {

        }
    });

    ui.plugin(RowFilter);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
