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

            if (options.input) {
                that.input = that.element.children(".k-pager-input");

                if (!that.input.length) {
                   that.input = $('<span class="k-pager-input">'+
                       options.messages.page +
                       '<input class="k-textbox">' +
                       kendo.format(options.messages.of, that.totalPages()) +
                       '</span>').appendTo(that.element);
                }

                that._keydownHandler = proxy(that._keydown, that);
                that.input.on("keydown", "input", that._keydownHandler);
            }

            if (options.info) {
                that.info = that.element.children(".k-pager-info");

                if (!that.info.length) {
                   that.info = $('<span class="k-pager-info" />').appendTo(that.element);
                }

                that.info.addClass("k-label");
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

            if (that.input) {
                that.input.off("keydown", "input", that._keydownHandler);
            }

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
                empty: "No items to display",
                page: "Page",
                of: "of {0}"
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
                html = that.selectTemplate({ text: 0 });
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

            if (that.options.input) {
                that.input
                    .html(that.options.messages.page +
                        '<input class="k-textbox">' +
                        kendo.format(that.options.messages.of, totalPages))
                    .find("input")
                    .val(page)
                    .attr("disabled", total < 1)
                    .toggleClass("k-state-disabled", total < 1);
            }
        },

        _keydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                var input = this.input.find("input"),
                    page = parseInt(input.val(), 10);

                if (isNaN(page) || page < 1 || page > this.totalPages()) {
                    page = this.page();
                }

                input.val(page);

                this.page(page);
            }
        },

        _click: function(e) {
            var page = $(e.currentTarget).attr(kendo.attr("page"));
            e.preventDefault();

            this.page(page);
        },

        totalPages: function() {
            return Math.ceil((this.dataSource.total() || 0) / this.pageSize());
        },

        pageSize: function() {
            return this.dataSource.pageSize() || this.dataSource.total();
        },

        page: function(page) {
            if (page !== undefined) {
                this.dataSource.page(page);

                this.trigger("change", { index: page });
            } else {
                if (this.dataSource.total() > 0) {
                    return this.dataSource.page();
                } else {
                    return 0;
                }
            }
        }
    });

    ui.plugin(Pager);
})(jQuery);
