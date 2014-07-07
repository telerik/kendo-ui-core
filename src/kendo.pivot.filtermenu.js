(function(f, define){
    define([ "./kendo.menu" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid.filtermenu",
    name: "PivotFilterMenu",
    category: "web",
    description: "The PivotFilterMenu widget allows the user to filter on fields displayed in PivotGrid",
    depends: [ "contextmenu" ]
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        POPUP = "kendoPopup",
        MENU = "kendoContextMenu",
        Widget = ui.Widget;

    var PivotFilterMenu = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._layout();

            this._dataSource();

            this.refresh();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotFilterMenu",
            filter: null,
            messages: {
                filter: "Filter",
                include: "Include"
            }
        },

        _layout: function() {
            var options = this.options;

            this.wrapper = $(kendo.template(TEMPLATE)({
                ns: kendo.ns,
                messages: options.messages
            }));

            this.menu = this.wrapper[MENU]({
                filter: options.filter,
                target: this.element,
                orientation: "vertical",
                showOn: "click",
                closeOnClick: false
            }).data(MENU);
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

        refresh: function() {
            var dataSource = this.dataSource;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.dataSource.unbind("change", this._refreshHandler);

            this.menu.destroy();

            this.menu = null;
            this.wrapper = null;
            this.element = null;
            this._refreshHandler = null;
        }
    });

    var TEMPLATE = '<ul class="k-pivot-filtermenu">'+
                        '<li class="k-item k-inlcude-item">'+
                            '<span class="k-link">'+
                                '<span class="k-sprite k-include"></span>'+
                                '${messages.include}'+
                            '</span>'+
                            '<ul>'+
                                '<li><div>Include</div></li>'+
                            '</ul>'+
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

    ui.plugin(PivotFilterMenu);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
