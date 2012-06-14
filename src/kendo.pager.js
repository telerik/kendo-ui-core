(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy;

    function button(template, idx, text, numeric) {
        return template( {
            idx: idx,
            text: text,
            ns: kendo.ns,
            numeric: numeric
        });
    }

    var Pager = Widget.extend( {
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            that.dataSource = options.dataSource;
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource.bind("change", that._refreshHandler);

            that.list = that.element.children(".k-pager");

            if (!that.list.length) {
               that.list = $('<ul class="k-pager k-reset k-numeric" />').appendTo(that.element);
            }

            if (options.info) {
                that.info = that.element.children(".k-pager-info");

                if (!that.info.length) {
                   that.info = $('<span class="k-pager-info" />').appendTo(that.element);
                }
            }

            that._clickHandler = proxy(that._click, that);

            that.element.delegate("a", "click", that._clickHandler);

            if (options.autoBind) {
                that.refresh();
            }
        },

        destroy: function() {
            var that = this;

            that.element.undelegate("a", "click", that._clickHandler);
            that.dataSource.unbind("change", that._refreshHandler);
        },

        events: [
            "change"
        ],

        options: {
            name: "Pager",
            selectTemplate: '<li><span class="k-state-active">#=text#</span></li>',
            linkTemplate: '<li><a href="\\#" class="k-link" data-#=ns#page="#=idx#">#=text#</a></li>',
            buttonCount: 10,
            autoBind: true,
            info: true,
            messages: {
                display: "Displaying items {0} - {1} of {2}",
                empty: "No items to display"
            }
        },

        refresh: function() {
            var that = this,
                idx,
                end,
                start = 1,
                html = "",
                reminder,
                page = that.page(),
                pageSize = that.pageSize(),
                total = that.dataSource.total(),
                totalPages = that.totalPages(),
                linkTemplate = that.linkTemplate,
                buttonCount = that.options.buttonCount;

            if (page > buttonCount) {
                reminder = (page % buttonCount);

                start = (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
            }

            end = Math.min((start + buttonCount) - 1, totalPages);

            if (start > 1) {
                html += button(linkTemplate, start - 1, "...", false);
            }

            for (idx = start; idx <= end; idx++) {
                html += button(idx == page ? that.selectTemplate : linkTemplate, idx, idx, true);
            }

            if (end < totalPages) {
                html += button(linkTemplate, idx, "...", false);
            }

            if (html === "") {
                html = that.selectTemplate({ text: 1 });
            }

            that.list.empty().append(html);

            if (that.options.info) {
                if (total > 0) {
                    html = kendo.format(that.options.messages.display,
                        (page - 1) * pageSize + 1, // first item in the page
                        Math.min(page * pageSize, total), // last item in the page
                    total);
                } else {
                    html = that.options.messages.empty;
                }

                that.info.html(html);
            }
        },

        _click: function(e) {
            var page = $(e.currentTarget).attr(kendo.attr("page"));
            e.preventDefault();

            this.dataSource.page(page);

            this.trigger("change", { index: page });
        },

        totalPages: function() {
            return Math.ceil((this.dataSource.total() || 0) / this.pageSize());
        },

        pageSize: function() {
            return this.dataSource.pageSize() || this.dataSource.total();
        },

        page: function() {
            return this.dataSource.page() || 1;
        }
    });

    ui.plugin(Pager);
})(jQuery);
