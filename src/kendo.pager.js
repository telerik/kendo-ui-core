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
        keys = kendo.keys,
        template = kendo.template,
        FIRST = ".k-i-arrow-end-left",
        LAST = ".k-i-arrow-end-right",
        PREV = ".k-i-arrow-60-left",
        NEXT = ".k-i-arrow-60-right",
        SIZE = "k-pager-md k-pager-sm",
        FOCUSABLE = ":kendoFocusable:not([tabindex='-1'])",
        CHANGE = "change",
        NS = ".kendoPager",
        CLICK = "click",
        KEYDOWN = "keydown",
        DISABLED = "disabled",
        MOUSEDOWN = "down",
        MAX_VALUE = Number.MAX_VALUE,
        isRtl = false,
        iconTemplate = kendo.template('<a href="\\#" title="#=text#" aria-label="#=text#" #if (id !== "") {# aria-describedby="#=id#" #}# class="k-link k-pager-nav #= wrapClassName #"><span class="k-icon #= className #"></span></a>');

    function button(options) {
        return options.template( {
            idx: options.idx,
            text: options.text,
            ns: kendo.ns,
            numeric: options.numeric,
            title: options.title || "",
            tabindex: options.navigatable ? 0 : -1,
            navigatable: options.navigatable
        });
    }

    function selectOption(template, idx, text, selected) {
        return template( {
            idx: idx,
            text: text || idx,
            selected: selected || false
        });
    }

    function icon(className, text, wrapClassName, id) {
        return iconTemplate({
            className: className.substring(1),
            text: text,
            wrapClassName: wrapClassName || "",
            id: id || ""
        });
    }

    function update(element, selector, page, disabled) {
       element.find(selector)
              .parent()
              .attr(kendo.attr("page"), page)
              .attr("tabindex", disabled ? -1 : 0)
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
            var sizeClassName = null;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            that._createDataSource(options);
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);
            that.currentPageTemplate = kendo.template(that.options.currentPageTemplate);
            that.numericSelectItemTemplate = kendo.template(that.options.numericSelectItemTemplate);

            page = that.page();
            totalPages = that.totalPages();

            that._refreshHandler = that.refresh.bind(that);

            that.dataSource.bind(CHANGE, that._refreshHandler);
            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());

            isRtl = kendo.support.isRtl(element);

            if (options.navigatable) {
                that._id = that.element.attr("id") || kendo.guid();
            }
            that._template();

            if (options.previousNext) {
                if (!that.element.find(FIRST).length) {
                    that.element.append(icon(FIRST, options.messages.first, "k-pager-first", that._id));

                    first(that.element, page, totalPages);
                }

                if (!that.element.find(PREV).length) {
                    that.element.append(icon(PREV, options.messages.previous, null, that._id));

                    prev(that.element, page, totalPages);
                }
            }

            if (options.numeric) {
                if (!that._numericWrap) {
                    that._numericWrap = that.element.find(".k-pager-numbers-wrap");

                    if (that._numericWrap.length === 0) {
                        that._numericWrap = $("<div class='k-pager-numbers-wrap' />").appendTo(that.element);
                    }
                }

                if (!that._numericSelect) {
                    that._numericSelect = that._numericWrap.find(".k-dropdown");

                    if (that._numericSelect.length === 0) {
                       that._numericSelect = $("<select class='k-dropdown k-picker k-dropdown-list' />").appendTo(that._numericWrap);
                    }
                }

                if (!that.list) {
                    that.list = that._numericWrap.find(".k-pager-numbers");

                    if (that.list.length === 0) {
                       that.list = $('<ul class="k-pager-numbers" />').appendTo(that._numericWrap);
                    }
                }

                if (options.dataSource && !options.dataSource.total()) {
                    that._numericSelect.empty().append("<option value='0' />");
                    that.list.empty().append(that.selectTemplate({ text: 0, tabindex: options.navigatalbe ? 0 : -1, navigatable: options.navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) }));
                }
            }

            if (options.input) {
                if (!that.element.find(".k-pager-input").length) {
                   that.element.append('<span class="k-pager-input k-label">'+
                       options.messages.page +
                       '<span class="k-textbox k-input k-input-md k-rounded-md k-input-solid"><input class="k-input-inner" /></span>' +
                       kendo.format(options.messages.of, totalPages) +
                       '</span>');
                }

                that.element.on(KEYDOWN + NS, ".k-pager-input input", that._keydown.bind(that));
            }

            if (options.previousNext) {
                if (!that.element.find(NEXT).length) {
                    that.element.append(icon(NEXT, options.messages.next, null, that._id));

                    next(that.element, page, totalPages);
                }

                if (!that.element.find(LAST).length) {
                    that.element.append(icon(LAST, options.messages.last, "k-pager-last", that._id));

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

                    $('<span class="k-pager-sizes k-label"><select></select>' + options.messages.itemsPerPage + "</span>")
                        .appendTo(that.element)
                        .find("select").html(pageItems.join("")).end()
                        .appendTo(that.element);
                }

                that.element.find(".k-pager-sizes select").val(that.pageSize());

                if (kendo.ui.DropDownList) {
                   that.element.find(".k-pager-sizes select").show().attr("aria-label", options.messages.pageSizeDropDownLabel).kendoDropDownList();
                }

                that.element.on(CHANGE + NS, ".k-pager-sizes select", that._change.bind(that));
            }

            if (options.refresh) {
                if (!that.element.find(".k-pager-refresh").length) {
                    that.element.append('<a href="#" class="k-pager-refresh k-link" title="' + options.messages.refresh +
                        '" aria-label="' + options.messages.refresh + '"><span class="k-icon k-i-reload"></span></a>');
                }

                that.element.on(CLICK + NS, ".k-pager-refresh", that._refreshClick.bind(that));
            }

            if (options.info) {
                if (!that.element.find(".k-pager-info").length) {
                    that.element.append('<span class="k-pager-info k-label" />');
                }
            }

            that.element
                .on(CLICK + NS , "a", that._click.bind(that))
                .on(CHANGE + NS , "select.k-dropdown", that._numericSelectChange.bind(that))
                .addClass("k-pager-wrap k-widget k-floatwrap");

            if (options.autoBind) {
                that.refresh();
            }

            that._resizeHandler = that.resize.bind(that, true);
            $(window).on("resize" + NS, that._resizeHandler);

            sizeClassName = that._getWidthSizeClass(that.element.outerWidth());

            if (sizeClassName) {
                that.element.addClass(sizeClassName);
            }

            that._navigatable();

            kendo.notify(that);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);
            that.dataSource.unbind(CHANGE, that._refreshHandler);
            that._refreshHandler = null;
            $(window).off("resize" + NS, this._resizeHandler);

            kendo.destroy(that.element);
            that.element = that.list = null;
        },

        events: [
            CHANGE
        ],

        options: {
            name: "Pager",
            ARIATemplate: "Page navigation, page #=page# of #=totalPages#",
            selectTemplate: '<li><span role="button" tabindex="#=tabindex#" #if (navigatable) {# aria-label="#=title#" #}# class="k-link k-state-selected">#=text#</span></li>',
            currentPageTemplate: '<li class="k-current-page"><span class="k-link k-pager-nav">#=text#</span></li>',
            linkTemplate: '<li><a tabindex="#=tabindex#" href="\\#" class="k-link" data-#=ns#page="#=idx#" #if (title !== "") {# title="#=title#" #}#>#=text#</a></li>',
            numericItemTemplate: '<li><a tabindex="-1" href="\\#" class="k-link" data-#=ns#page="#=idx#" #if (title !== "") {# title="#=title#" #}#>#=text#</a></li>',
            numericSelectItemTemplate: '<option value="#= idx #" #if (selected) {# selected="selected" #}#>#= text #</option>',
            buttonCount: 10,
            autoBind: true,
            numeric: true,
            info: true,
            input: false,
            previousNext: true,
            pageSizes: false,
            refresh: false,
            responsive: true,
            navigatable: false,
            messages: {
                allPages: "All",
                display: "{0} - {1} of {2} items",
                empty: "No items to display",
                page: "Page",
                of: "of {0}",
                itemsPerPage: "items per page",
                pageButtonLabel: "Page {0}",
                pageSizeDropDownLabel: "Page sizes drop down",
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

        _resize: function(size) {
            if (size.width) {
                var sizeClassName = this._getWidthSizeClass(size.width);
                var el = this.element;

                if (!sizeClassName) {
                    el.removeClass(SIZE);
                } else if (!el.hasClass(sizeClassName)) {
                    el.removeClass(SIZE);
                    el.addClass(sizeClassName);
                }
            }
        },

        _createDataSource: function(options) {
            this.dataSource = kendo.data.DataSource.create(options.dataSource);
        },

        refresh: function(e) {
            var that = this,
                idx,
                end,
                start = 1,
                reminder,
                page = that.page(),
                html = "",
                selectHtml = "",
                options = that.options,
                pageSize = that.pageSize(),
                collapsedTotal = that._collapsedTotal(),
                total = that.dataSource._isGroupPaged() ? that.dataSource.groupsTotal(true) : that.dataSource.total(),
                totalPages = that.totalPages(),
                linkTemplate = that.linkTemplate,
                navigatable = options.navigatable,
                numericSelectItemTemplate = that.numericSelectItemTemplate,
                buttonCount = options.buttonCount;

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
                    html += button({
                        template: linkTemplate,
                        navigatable: navigatable,
                        idx: start - 1,
                        text: "...",
                        numeric: false,
                        title: options.messages.morePages
                    });
                    selectHtml += selectOption(numericSelectItemTemplate, start - 1, options.messages.morePages);
                }

                for (idx = start; idx <= end; idx++) {
                    html += button({
                        template: idx == page ? that.selectTemplate : linkTemplate,
                        navigatable: navigatable,
                        idx: idx,
                        text: idx,
                        numeric: true,
                        title: kendo.format(options.messages.pageButtonLabel, idx)
                    });
                    selectHtml += selectOption(numericSelectItemTemplate, idx, idx, idx == page);
                }

                if (end < totalPages) {
                    html += button({
                        template: linkTemplate,
                        navigatable: navigatable,
                        idx: idx,
                        text: "...",
                        numeric: numericSelectItemTemplate,
                        title: options.messages.morePages
                    });
                    selectHtml += selectOption(numericSelectItemTemplate, idx, options.messages.morePages);
                }

                if (html === "") {
                    html = that.selectTemplate({ text: 0, tabindex: navigatable ? 0 : -1, navigatable: navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) });
                    selectHtml = $("<option value='0' />");
                }

                that.list.html(html);
                that._numericSelect.html(selectHtml);
            }

            if (options.info) {
                if (total > 0) {
                    html = kendo.format(options.messages.display,
                        that.dataSource.options.endless ? 1 : Math.min((page - 1) * (that.dataSource.pageSize() || 0) + 1, collapsedTotal), // first item in the page
                        Math.min(page * pageSize, collapsedTotal), // last item in the page
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
                        '<span class="k-textbox k-input k-input-md k-rounded-md k-input-solid"><input class="k-input-inner" aria-label="' + page + '"></span>' +
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

            that._restoreFocus(start, end, totalPages);
            that._excludeChildrenFromTab();
            that._updateAria();
        },

        _excludeChildrenFromTab: function () {
            var activeElement = kendo._activeElement();
            if (this.options.navigatable && (activeElement === this.element[0] || !$.contains(this.element[0], activeElement))) {
                this.element.find(FOCUSABLE).attr("tabindex", -1);
            }
        },

        _restoreFocus: function (start, end, totalPages) {
            var that = this;

            if (!that.options.navigatable) {
                return;
            }

            if (that._focusSelected) {
                that.element.find(".k-state-selected").trigger("focus");
                that._focusSelected = null;
            }

            if (that._focusMore !== null) {
                if (end < totalPages && that._focusMore) {
                    that.list.find("li").last().find("a").trigger("focus");
                }
                if (!that._focusMore && start > 1) {
                    that.list.find("li").first().find("a").trigger("focus");
                }
                that._focusMore = null;
            }
        },

        _restoreTabIndexes: function () {
            this.element
                .find("[tabindex='-1']:not(.k-state-disabled)")
                .attr("tabindex", 0);
        },

        _collapsedTotal: function() {
            return this.dataSource.total();
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
                dataSource._skip = 0;
                dataSource.fetch();
            }
        },

        _template: function() {
            this._ariaTemplate = template(this.options.ARIATemplate).bind(this);
        },

        _updateAria: function () {
            if (!this.options.navigatable) {
                return;
            }
            this.element.attr("aria-label", this._ariaTemplate({ page: this.page(), totalPages: this.totalPages() }));
        },

        _navigatable: function () {
            var that = this;
            var options = that.options;

            if (!options.navigatable) {
                return;
            }

            that.element.attr("role", "application");
            that.element.attr("id", that._id);
            that._template();
            that._updateAria();

            that._tabindex(that.element);

            that.element.on("keydown" + NS, that, that._keyDown.bind(that));
            that.element.on("focusout" + NS, function() { that.element.removeClass("k-state-focused"); });
            that.element.on("focusin" + NS,  function(e) {
                that.element.addClass("k-state-focused");

                if (e.target === that.element[0]) {
                    that.element.find(FOCUSABLE).attr("tabindex", -1);
                } else {
                    that.element.removeClass("k-state-focused");
                }
            });
        },

        _keyDown: function (e) {
            var that = this;
            var target = $(e.target);
            var allFocusable;
            var handled = false;
            var focusedIndex;

            if (target[0] === that.element[0] && e.keyCode == keys.ENTER) {
                that._restoreTabIndexes();
                that.element.find(FOCUSABLE).first().trigger("focus");
                handled = true;
            }

            if (target[0] !== that.element[0] && e.keyCode == keys.ESC) {
                that.element.trigger("focus");
                handled = true;
            }

            if (target[0] === that.element[0] && e.keyCode == keys.HOME) {
                that.page(1);
                handled = true;
            }

            if (target[0] === that.element[0] && e.keyCode == keys.END) {
                that.page(that.totalPages());
                handled = true;
            }

            if (target[0] === that.element[0] && (e.keyCode == (isRtl ? keys.LEFT : keys.RIGHT) || e.keyCode == keys.PAGEDOWN)) {
                that.page(that.page() + 1);
                handled = true;
            }

            if (target[0] === that.element[0] && (e.keyCode == (isRtl ? keys.RIGHT : keys.LEFT) || e.keyCode == keys.PAGEUP)) {
                that.page((that.page() - 1) || 1);
                handled = true;
            }

            if (target[0] !== that.element[0] && e.keyCode== keys.TAB) {
                allFocusable = that.element.find(FOCUSABLE);
                focusedIndex = allFocusable.index(target);

                if (e.shiftKey) {
                    if (focusedIndex - 1 < 0) {
                        allFocusable.last().trigger("focus");
                    } else {
                        allFocusable.eq(focusedIndex - 1).trigger("focus");
                    }
                } else {
                    if (focusedIndex + 1 < allFocusable.length) {
                        allFocusable.eq(focusedIndex +1 ).trigger("focus");
                    } else {
                        allFocusable.first().trigger("focus");
                    }
                }

                handled = true;
            }

            if (handled) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        _numericSelectChange: function(e) {
            var target = e.currentTarget;
            var value = target.value;
            var page = parseInt(value, 10);

            target.blur();

            this.page(page);
        },

        _click: function(e) {
            var target = $(e.currentTarget);

            e.preventDefault();

            if (this.options.navigatable) {
                if (target.attr("title") == this.options.messages.morePages) {
                    this._focusMore = target.parent().index();
                } else if(!target.hasClass("k-pager-refresh") && !target.hasClass("k-pager-nav")) {
                    this._focusSelected = true;
                }
            }

            if (!target.is(".k-state-disabled")) {
                this.page(parseInt(target.attr(kendo.attr("page")), 10));
            }
        },

        totalPages: function() {
            return Math.ceil((this.dataSource.total() || 0) / (this.pageSize() || 1));
        },

        pageSize: function() {
            return this.dataSource.pageSize() || this.dataSource.total();
        },

        page: function(page) {
            if (page) {
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
        },

        _getWidthSizeClass: function(width) {
            var that = this,
                sizes = SIZE.split(" ");

            if (!that.options.responsive) {
                return null;
            } else if (width <= 480) {
                return sizes[1];
            } else if (width <= 600) {
                return sizes[0];
            }
            return null;
        }
    });

    ui.plugin(Pager);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
