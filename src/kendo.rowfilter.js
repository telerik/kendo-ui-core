(function(f, define){
    define([ "./kendo.autcomplete", "./kendo.datepicker", "./kendo.numerictextbox", "./kendo.dropdownlist" ], f);
})(function(){

var __meta__ = {
    id: "rowfilter",
    name: "Row filter",
    category: "framework",
    depends: [ "autocomplete" ],
    advanced: true //should I set this?
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
        CHANGE = "change",
        NS = ".kendoRowFilter",
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


            element.addClass("grid-filter-header");
            element.append(input);
            //that.dataSource = kendo.data.DataSource.create(options.dataSource);
            //that.linkTemplate = kendo.template(that.options.linkTemplate);
            //that.selectTemplate = kendo.template(that.options.selectTemplate);

            //that.dataSource.bind(CHANGE, that._refreshHandler);

            //that.element
                //.on(CLICK + NS , "a", proxy(that._click, that))
                //.addClass("k-pager-wrap k-widget");

            kendo.notify(that);
        },

        _refreshHandler: function() {
            
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            //that.element.off(NS);
            //that.dataSource.unbind(CHANGE, that._refreshHandler);
            //that._refreshHandler = null;

            kendo.destroy(that.element);
        },

        events: [
            CHANGE
        ],

        options: {
            name: "RowFilter",
            autoBind: true
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
