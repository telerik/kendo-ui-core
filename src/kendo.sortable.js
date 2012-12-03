(function($, undefined) {
    var kendo = window.kendo,
        proxy = $.proxy,
        DIR = "dir",
        ASC = "asc",
        SINGLE = "single",
        FIELD = "field",
        DESC = "desc",
        NS = ".kendoSortable",
        TLINK = ".k-link",
        ARIASORT = "aria-sort",
        Widget = kendo.ui.Widget;

    var Sortable = Widget.extend({
        init: function(element, options) {
            var that = this, link;

            Widget.fn.init.call(that, element, options);

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource = that.options.dataSource.bind("change", that._refreshHandler);

            link = that.element.find(TLINK);

            if (!link[0]) {
                link = that.element.wrapInner('<a class="k-link" href="#"/>').find(TLINK);
            }

            that.link = link;

            that.element.on("click" + NS, proxy(that._click, that));
        },

        options: {
            name: "Sortable",
            mode: SINGLE,
            allowUnsort: true
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            that.dataSource.unbind("change", that._refreshHandler);
        },

        refresh: function() {
            var that = this,
                sort = that.dataSource.sort() || [],
                idx,
                length,
                descriptor,
                dir,
                element = that.element,
                field = element.attr(kendo.attr(FIELD));

            element.removeAttr(kendo.attr(DIR));
            element.removeAttr(ARIASORT);

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               if (field == descriptor.field) {
                   element.attr(kendo.attr(DIR), descriptor.dir);
               }
            }

            dir = element.attr(kendo.attr(DIR));

            element.find(".k-i-arrow-n,.k-i-arrow-s").remove();

            if (dir === ASC) {
                $('<span class="k-icon k-i-arrow-n" />').appendTo(that.link);
                element.attr(ARIASORT, "ascending");
            } else if (dir === DESC) {
                $('<span class="k-icon k-i-arrow-s" />').appendTo(that.link);
                element.attr(ARIASORT, "descending");
            }
        },

        _click: function(e) {
            var that = this,
                element = that.element,
                field = element.attr(kendo.attr(FIELD)),
                dir = element.attr(kendo.attr(DIR)),
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

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);
