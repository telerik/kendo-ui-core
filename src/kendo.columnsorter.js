(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "columnsorter",
    name: "Column Sorter",
    category: "framework",
    depends: ["core"],
    advanced: true
};

(function ($, undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var DIR = "dir";
    var ASC = "asc";
    var SINGLE = "single";
    var FIELD = "field";
    var DESC = "desc";
    var sorterNS = ".kendoColumnSorter";
    var TLINK = ".k-link";
    var ARIASORT = "aria-sort";
    var proxy = $.proxy;

    var ColumnSorter = Widget.extend({
        init: function (element, options) {

            var that = this, link;

            Widget.fn.init.call(that, element, options);

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource = that.options.dataSource.bind("change", that._refreshHandler);

            link = that.element.find(TLINK);

            if (!link[0]) {
                link = that.element.wrapInner('<a class="k-link" href="#"/>').find(TLINK);
            }

            that.link = link;

            that.element.on("click" + sorterNS, proxy(that._click, that));
        },

        options: {
            name: "ColumnSorter",
            mode: SINGLE,
            allowUnsort: true,
            compare: null,
            filter: ""
        },

        destroy: function () {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(sorterNS);

            that.dataSource.unbind("change", that._refreshHandler);
            that._refreshHandler = that.element = that.link = that.dataSource = null;
        },

        refresh: function () {
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

        _click: function (e) {
            var that = this,
                element = that.element,
                field = element.attr(kendo.attr(FIELD)),
                dir = element.attr(kendo.attr(DIR)),
                options = that.options,
                compare = that.options.compare === null ? undefined : that.options.compare,
                sort = that.dataSource.sort() || [],
                idx,
                length;

            e.preventDefault();

            if (options.filter && !element.is(options.filter)) {
                return;
            }

            if (dir === ASC) {
                dir = DESC;
            } else if (dir === DESC && options.allowUnsort) {
                dir = undefined;
            } else {
                dir = ASC;
            }

            if (options.mode === SINGLE) {
                sort = [{ field: field, dir: dir, compare: compare }];
            } else if (options.mode === "multiple") {
                for (idx = 0, length = sort.length; idx < length; idx++) {
                    if (sort[idx].field === field) {
                        sort.splice(idx, 1);
                        break;
                    }
                }
                sort.push({ field: field, dir: dir, compare: compare });
            }

            this.dataSource.sort(sort);
        }
    });

    ui.plugin(ColumnSorter);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
