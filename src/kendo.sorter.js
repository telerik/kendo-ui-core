(function($, window) {
    var kendo = window.kendo
        Component = kendo.ui.Component;

    function Sorter(elements, options) {
        var that = this;

        Component.apply(that, arguments);

        that.elements = $(elements);
        that.dataSource = that.options.dataSource;
        that.dataSource.bind("change", $.proxy(that.refresh, that));
        $(elements).click($.proxy(that._click, that));
    }

    Sorter.prototype = {
        refresh: function() {
            var sort = this.dataSource.sort(),
                idx,
                length,
                descriptor;

            this.elements.each(function() {
                $(this).removeData("dir");
            });

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               this.elements.each(function() {
                    var element = $(this);
                    if (element.data("field") == descriptor.field) {
                        element.data("dir", descriptor.dir);
                    }
               });
            }
        },

        _click: function(e) {
            e.preventDefault();

            var currentTarget = $(e.currentTarget),
                field = currentTarget.data("field"),
                dir = currentTarget.data("dir");

            if (dir === "asc") {
                dir = "desc";
            } else if (dir === "desc") {
                dir = undefined;
            } else {
                dir = "asc";
            }

            this.dataSource.sort( { field: field, dir: dir } );
        }
    }

    kendo.ui.plugin("Sorter", Sorter, Component);
})(jQuery, window);
