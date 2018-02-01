(function(f, define){
    define([ "./kendo.data" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "pager",
    name: "Pager",
    category: "framework",
    depends: [ "data" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy,
        FIRST = ".k-i-arrow-end-left",
        LAST = ".k-i-arrow-end-right",
        PREV = ".k-i-arrow-60-left",
        NEXT = ".k-i-arrow-60-right",
        CHANGE = "change",
        NS = ".kendoPager",
        CLICK = "click",
        KEYDOWN = "keydown",
        DISABLED = "disabled",
        MOUSEDOWN = "down",
        DOCUMENT_ELEMENT = $(document.documentElement),
        MAX_VALUE = Number.MAX_VALUE,
        iconTemplate = kendo.template('<a href="\\#" aria-label="#=text#" title="#=text#" class="k-link k-pager-nav #= wrapClassName #"><span class="k-icon #= className #"></span></a>');

    function button(template, idx, text, numeric, title) {
        return template( {
            idx: idx,
            text: text,
            ns: kendo.ns,
            numeric: numeric,
            title: title || ""
        });
    }

    function icon(className, text, wrapClassName) {
        return iconTemplate({
            className: className.substring(1),
            text: text,
            wrapClassName: wrapClassName || ""
        });
    }

    function update(element, selector, page, disabled) {
       element.find(selector)
              .parent()
              .attr(kendo.attr("page"), page)
              .attr("tabindex", -1)
              .toggleClass("k-state-disabled", disabled);
    }

    function first(element, page) {
        update(element, FIRST, 1, page <= 1);
    }

    function prev(element, page) {
        update(element, PREV, Math.max(1, page - 1), page <= 1);
    }

    function next(element, page, totalPages) {
        update(element, NEXT, Math.min(totalPages, page + 1), page >= totalPages);
    }

    function last(element, page, totalPages) {
        update(element, LAST, totalPages, page >= totalPages);
    }

    var Pager = Widget.extend( {
        init: function(element, options) {
            var that = this, page, totalPages;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            that.dataSource = kendo.data.DataSource.create(options.dataSource);
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);
            that.currentPageTemplate = kendo.template(that.options.currentPageTemplate);

            page = that.page();
            totalPages = that.totalPages();

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource.bind(CHANGE, that._refreshHandler);
            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());
            if (options.previousNext) {
                if (!that.element.find(FIRST).length) {
                    that.element.append(icon(FIRST, options.messages.first, "k-pager-first"));

                    first(that.element, page, totalPages);
                }

                if (!that.element.find(PREV).length) {
                    that.element.append(icon(PREV, options.messages.previous));

                    prev(that.element, page, totalPages);
                }
            }

            if (options.numeric) {
                that.list = that.element.find(".k-pager-numbers");

                if (!that.list.length) {
                   that.list = $('<ul class="k-pager-numbers k-reset" />').appendTo(that.element);
                }
            }

            if (options.input) {
                if (!that.element.find(".k-pager-input").length) {
                   that.element.append('<span class="k-pager-input k-label">'+
                       options.messages.page +
                       '<input class="k-textbox">' +
                       kendo.format(options.messages.of, totalPages) +
                       '</span>');
                }

                that.element.on(KEYDOWN + NS, ".k-pager-input input", proxy(that._keydown, that));
            }

            if (options.previousNext) {
                if (!that.element.find(NEXT).length) {
                    that.element.append(icon(NEXT, options.messages.next));

                    next(that.element, page, totalPages);
                }

                if (!that.element.find(LAST).length) {
                    that.element.append(icon(LAST, options.messages.last, "k-pager-last"));

                    last(that.element, page, totalPages);
                }
            }

            if (options.pageSizes){
                if (!that.element.find(".k-pager-sizes").length){
                    var pageSizes = options.pageSizes.length ? options.pageSizes : ["all", 5, 10, 20];
                    var pageItems = $.map(pageSizes, function(size) {
                        if (size.toLowerCase && size.toLowerCase() === "all") {
                            return "<option value='all'>" + options.messages.allPages + "</option>";
                        }

                        return "<option>" + size + "</option>";
                    });

                    $('<span class="k-pager-sizes k-label"><select/>' + options.messages.itemsPerPage + "</span>")
                        .appendTo(that.element)
                        .find("select").html(pageItems.join("")).end()
                        .appendTo(that.element);
                }

                that.element.find(".k-pager-sizes select").val(that.pageSize());

                if (kendo.ui.DropDownList) {
                   that.element.find(".k-pager-sizes select").show().kendoDropDownList();
                }

                that.element.on(CHANGE + NS, ".k-pager-sizes select", proxy(that._change, that));
            }

            if (options.refresh) {
                if (!that.element.find(".k-pager-refresh").length) {
                    that.element.append('<a href="#" class="k-pager-refresh k-link" title="' + options.messages.refresh +
                        '" aria-label="' + options.messages.refresh + '"><span class="k-icon k-i-reload"></span></a>');
                }

                that.element.on(CLICK + NS, ".k-pager-refresh", proxy(that._refreshClick, that));
            }

            if (options.info) {
                if (!that.element.find(".k-pager-info").length) {
                    that.element.append('<span class="k-pager-info k-label" />');
                }
            }

            that.element
                .on(CLICK + NS , "a", proxy(that._click, that))
                .addClass("k-pager-wrap k-widget k-floatwrap");

            that.element.on(CLICK + NS , ".k-current-page", proxy(that._toggleActive, that));

            if (options.autoBind) {
                that.refresh();
            }

            kendo.notify(that);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);
            that.dataSource.unbind(CHANGE, that._refreshHandler);
            that._refreshHandler = null;

            kendo.destroy(that.element);
            that.element = that.list = null;
        },

        events: [
            CHANGE
        ],

        options: {
            name: "Pager",
            selectTemplate: '<li><span class="k-state-selected">#=text#</span></li>',
            currentPageTemplate: '<li class="k-current-page"><span class="k-link k-pager-nav">#=text#</span></li>',
            linkTemplate: '<li><a tabindex="-1" href="\\#" class="k-link" data-#=ns#page="#=idx#" #if (title !== "") {# title="#=title#" #}#>#=text#</a></li>',
            buttonCount: 10,
            autoBind: true,
            numeric: true,
            info: true,
            input: false,
            previousNext: true,
            pageSizes: false,
            refresh: false,
            messages: {
                allPages: "All",
                display: "{0} - {1} of {2} items",
                empty: "No items to display",
                page: "Page",
                of: "of {0}",
                itemsPerPage: "items per page",
                first: "Go to the first page",
                previous: "Go to the previous page",
                next: "Go to the next page",
                last: "Go to the last page",
                refresh: "Refresh",
                morePages: "More pages"
            }
        },

        setDataSource: function(dataSource) {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler);
            that.dataSource = that.options.dataSource = dataSource;
            dataSource.bind(CHANGE, that._refreshHandler);

            if (that.options.autoBind) {
                dataSource.fetch();
            }
        },

        refresh: function(e) {
            var that = this,
                idx,
                end,
                start = 1,
                reminder,
                page = that.page(),
                html = "",
                options = that.options,
                pageSize = that.pageSize(),
                total = that.dataSource.total(),
                totalPages = that.totalPages(),
                linkTemplate = that.linkTemplate,
                buttonCount = options.buttonCount;

            DOCUMENT_ELEMENT.unbind(that.downEvent, $.proxy(that._hideList, that));
            if (e && e.action == "itemchange") {
                return;
            }

            if (options.numeric) {

                if (page > buttonCount) {
                    reminder = (page % buttonCount);

                    start = (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
                }

                end = Math.min((start + buttonCount) - 1, totalPages);

                if (start > 1) {
                    html += button(linkTemplate, start - 1, "...", false, options.messages.morePages);
                }

                for (idx = start; idx <= end; idx++) {
                    html += button(idx == page ? that.selectTemplate : linkTemplate, idx, idx, true);
                }

                if (end < totalPages) {
                    html += button(linkTemplate, idx, "...", false, options.messages.morePages);
                }

                if (html === "") {
                    html = that.selectTemplate({ text: 0 });
                }

                html = this.currentPageTemplate({ text: page }) + html;

                that.list.removeClass("k-state-expanded").html(html);
            }

            if (options.info) {
                if (total > 0) {
                    html = kendo.format(options.messages.display,
                        that.dataSource.options.endless ? 1 : Math.min((page - 1) * pageSize + 1, total), // first item in the page
                        Math.min(page * pageSize, total), // last item in the page
                    total);
                } else {
                    html = options.messages.empty;
                }

                that.element.find(".k-pager-info").html(html);
            }

            if (options.input) {
                that.element
                    .find(".k-pager-input")
                    .html(that.options.messages.page +
                        '<input class="k-textbox" aria-label="' + page + '">' +
                        kendo.format(options.messages.of, totalPages))
                    .find("input")
                    .val(page)
                    .attr(DISABLED, total < 1)
                    .toggleClass("k-state-disabled", total < 1);
            }

            if (options.previousNext) {
                first(that.element, page, totalPages);

                prev(that.element, page, totalPages);

                next(that.element, page, totalPages);

                last(that.element, page, totalPages);
            }

            if (options.pageSizes) {
                var hasAll = that.element.find(".k-pager-sizes option[value='all']").length > 0;
                var selectAll = hasAll && (pageSize === this.dataSource.total() || pageSize == MAX_VALUE);
                var text = pageSize;
                if (selectAll) {
                    pageSize = "all";
                    text = options.messages.allPages;
                }

                that.element
                    .find(".k-pager-sizes select")
                    .val(pageSize)
                    .attr("aria-label", pageSize)
                    .filter("[" + kendo.attr("role") + "=dropdownlist]")
                    .kendoDropDownList("value", pageSize)
                    .kendoDropDownList("text", text); // handles custom values
            }
        },

        _keydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                var input = this.element.find(".k-pager-input").find("input"),
                    page = parseInt(input.val(), 10);

                if (isNaN(page) || page < 1 || page > this.totalPages()) {
                    page = this.page();
                }

                input.val(page);

                this.page(page);
            }
        },

        _refreshClick: function(e) {
            e.preventDefault();

            this.dataSource.read();
        },

        _change: function(e) {
            var value = e.currentTarget.value;
            var pageSize = parseInt(value, 10);
            var dataSource = this.dataSource;

            if (!isNaN(pageSize)){
                dataSource.pageSize(pageSize);
            } else if ((value + "").toLowerCase() == "all") {
                dataSource._pageSize = undefined;
                dataSource._take = undefined;
                dataSource.fetch();
            }
        },

        _toggleActive: function() {
            var that = this;

            if (that.list.hasClass("k-state-expanded")) {
                DOCUMENT_ELEMENT.unbind(that.downEvent, $.proxy(that._hideList, that));
            } else {
                DOCUMENT_ELEMENT.bind(that.downEvent, $.proxy(that._hideList, that));
            }
            that.list.toggleClass("k-state-expanded");
        },

        _hideList: function(e) {
             var that = this,
                target = kendo.eventTarget(e);

            if (!$.contains(that.list[0], target)) {
                DOCUMENT_ELEMENT.unbind(that.downEvent, $.proxy(that._hideList, that));
                that.list.removeClass("k-state-expanded");
            }
        },

        _click: function(e) {
            var target = $(e.currentTarget);

            e.preventDefault();

            if (!target.is(".k-state-disabled")) {
                this.page(target.attr(kendo.attr("page")));
            }
        },

        totalPages: function() {
            return Math.ceil((this.dataSource.total() || 0) / (this.pageSize() || 1));
        },

        pageSize: function() {
            return this.dataSource.pageSize() || this.dataSource.total();
        },

        page: function(page) {
            if (page !== undefined) {
                if (this.trigger("pageChange", { index: page })) {
                   return;
                }

                this.dataSource.page(page);

                this.trigger(CHANGE, { index: page });
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
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
