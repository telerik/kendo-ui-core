(function($, undefined) {
    var kendo = window.kendo,
        proxy = $.proxy,
        DIR = "dir",
        ASC = "asc",
        SINGLE = "single",
        FIELD = "field",
        DESC = "desc",
        TLINK = ".k-link",
        Component = kendo.ui.Component;

    var Sortable = Component.extend({
        init: function(element, options) {
            var that = this, link;

            Component.fn.init.call(that, element, options);

            that.dataSource = that.options.dataSource.bind("change", proxy(that.refresh, that));
            link = that.element.find(TLINK);

            if (!link[0]) {
                link = that.element.wrapInner('<a class="k-link" href="#"/>').find(TLINK);
            }

            that.link = link;
            that.element.click(proxy(that._click, that));
        },

        options: {
            mode: SINGLE,
            allowUnsort: true
        },

        refresh: function() {
            var that = this,
                sort = that.dataSource.sort() || [],
                idx,
                length,
                descriptor,
                dir,
                element = that.element,
                field = element.data(FIELD);

            element.removeData(DIR);

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               if (field == descriptor.field) {
                   element.data(DIR, descriptor.dir);
               }
            }

            dir = element.data(DIR);

            element.find(".k-arrow-up,.k-arrow-down").remove();

            if (dir === ASC) {
                $('<span class="k-icon k-arrow-up" />').appendTo(that.link);
            } else if (dir === DESC) {
                $('<span class="k-icon k-arrow-down" />').appendTo(that.link);
            }
        },

        _click: function(e) {
            var that = this,
                element = that.element,
                field = element.data(FIELD),
                dir = element.data(DIR),
                options = that.options,
                sort = that.dataSource.sort() || [],
                idx,
                length;

            if (dir === ASC) {
                dir = DESC;
            } else if (dir === DESC && options.allowUnsort) {
                dir = undefined;
            } else {
                dir = ASC;
            }

            if (options.mode === SINGLE) {
                sort = [ { field: field, dir: dir } ];
            } else if (options.mode === "multiple") {
                for (idx = 0, length = sort.length; idx < length; idx++) {
                    if (sort[idx].field === field) {
                        sort.splice(idx, 1);
                        break;
                    }
                }
                sort.push({ field: field, dir: dir });
            }

            e.preventDefault();

            that.dataSource.sort(sort);
        }
    });

    kendo.ui.plugin("Sortable", Sortable);
})(jQuery);
