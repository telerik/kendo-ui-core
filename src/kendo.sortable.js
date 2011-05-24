(function($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component;

    var Sortable = Component.extend({
        init: function(elements, options) {
            var that = this;

            Component.fn.init.apply(that, arguments);
            that.mode = that.options.mode;
            that.allowUnsort = that.options.allowUnsort;
            that.dataSource = that.options.dataSource;
            that.dataSource.bind("change", $.proxy(that.refresh, that));
            that.element.click($.proxy(that._click, that));
        },

        options: {
            mode: "single",
            allowUnsort: true
        },

        refresh: function() {
            var sort = this.dataSource.sort() || [],
                idx,
                length,
                descriptor,
                dir,
                element = this.element,
                field = element.data("field");

            element.removeData("dir");

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               if (field == descriptor.field) {
                   element.data("dir", descriptor.dir);
               }
            }

            dir = element.data("dir");

            element.children(".t-arrow-up,.t-arrow-down").remove();

            if (dir === "asc") {
                $('<span class="t-icon t-arrow-up" />').appendTo(element);
            } else if (dir === "desc") {
                $('<span class="t-icon t-arrow-down" />').appendTo(element);
            }
        },

        _click: function(e) {
            var currentTarget = $(e.currentTarget),
                field = currentTarget.data("field"),
                dir = currentTarget.data("dir"),
                sort = this.dataSource.sort(),
                idx,
                length;

            if (dir === "asc") {
                dir = "desc";
            } else if (dir === "desc" && this.allowUnsort) {
                dir = undefined;
            } else {
                dir = "asc";
            }

            if (this.mode === "single") {
                sort = [ { field: field, dir: dir } ];
            } else if (this.mode === "multi") {
                if (dir === undefined) {
                    for (idx = 0, length = sort.length; idx < length; idx++) {
                        if (sort[idx].field === field) {
                            sort.splice(idx, 1);
                            break;
                        }
                    }
                } else {
                    sort.push({ field: field, dir: dir });
                }
            }

            e.preventDefault();

            this.dataSource.sort(sort);
        }
    });

    kendo.ui.plugin("Sortable", Sortable);
})(jQuery, window);
