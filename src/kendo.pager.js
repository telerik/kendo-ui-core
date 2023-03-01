import "./kendo.data.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "pager",
    name: "Pager",
    category: "framework",
    depends: [ "data", "icons" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        template = kendo.template,
        FIRST = "caret-alt-to-left",
        LAST = "caret-alt-to-right",
        PREV = "caret-alt-left",
        NEXT = "caret-alt-right",
        SIZE = "k-pager-mobile-md k-pager-mobile-sm",
        FOCUSABLE = ":kendoFocusable:not([tabindex='-1'])",
        CHANGE = "change",
        NS = ".kendoPager",
        CLICK = "click",
        KEYDOWN = "keydown",
        DISABLED = "disabled",
        MOUSEDOWN = "down",
        MAX_VALUE = Number.MAX_VALUE,
        isRtl = false,
        iconTemplate = ({ text, wrapClassName, className, size }) => `<button role="button" title="${text}" aria-label="${text}" class="k-pager-nav k-button k-button-flat k-button-flat-base k-icon-button ${wrapClassName} ${size}">${kendo.ui.icon(className)}</button>`;

    function button(options) {
        return options.template( {
            idx: options.idx,
            text: options.text,
            ns: kendo.ns,
            numeric: options.numeric,
            size: options.size,
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

    function icon(className, text, wrapClassName, id, size) {
        return iconTemplate({
            className: className,
            text: text,
            wrapClassName: wrapClassName || "",
            id: id || "",
            size: size
        });
    }

    function update(element, className, page, disabled) {
       element.find(`[class*="-i-${className}"]`)
              .parent()
              .attr(kendo.attr("page"), page)
              .attr("tabindex", disabled ? -1 : 0)
              .attr("aria-disabled", disabled)
              .toggleClass("k-disabled", disabled);
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
            var buttonSize = "";
            var dropDownClasses = "";

            Widget.fn.init.call(that, element, options);

            options = that.options;
            that._createDataSource(options);
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);
            that.numericSelectItemTemplate = kendo.template(that.options.numericSelectItemTemplate);

            page = that.page();
            totalPages = that.totalPages();

            that._refreshHandler = that.refresh.bind(that);

            that.dataSource.bind(CHANGE, that._refreshHandler);
            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());

            isRtl = kendo.support.isRtl(element);
            if (options.size) {
                buttonSize = kendo.getValidCssClass("k-button-", "size", options.size);
                dropDownClasses = "k-rounded-md " + kendo.getValidCssClass("k-picker-", "size", options.size);
            }

            if (options.navigatable) {
                that._id = that.element.attr("id") || kendo.guid();
            }
            that._template();

            if (options.previousNext) {
                if (!that.element.find(FIRST).length) {
                    that.element.append(icon(FIRST, options.messages.first, "k-pager-first", that._id, buttonSize));

                    first(that.element, page, totalPages);
                }

                if (!that.element.find(PREV).length) {
                    that.element.append(icon(PREV, options.messages.previous, null, that._id, buttonSize));

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
                       that._numericSelect = $("<select aria-label='" + that.options.messages.numbersSelectLabel + "' class='k-dropdown k-picker k-dropdown-list " + dropDownClasses + "' />").appendTo(that._numericWrap);
                    }
                }

                if (!that.list) {
                    that.list = that._numericWrap.find(".k-pager-numbers");

                    if (that.list.length === 0) {
                       that.list = $('<div class="k-pager-numbers" />').appendTo(that._numericWrap);
                    }
                }

                if (options.dataSource && !options.dataSource.total()) {
                    that._numericSelect.empty().append("<option value='0' />");
                    that.list.empty().append(that.selectTemplate({ text: 0, tabindex: options.navigatalbe ? 0 : -1, navigatable: options.navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) }));
                }
            }

            if (options.input) {
                if (!that.element.find(".k-pager-input").length) {
                   that.element.append('<span class="k-pager-input k-label">' +
                       options.messages.page +
                       '<span class="k-textbox k-input k-input-md k-rounded-md k-input-solid"><input class="k-input-inner" /></span>' +
                       kendo.format(options.messages.of, totalPages) +
                       '</span>');
                }

                that.element.on(KEYDOWN + NS, ".k-pager-input input", that._keydown.bind(that));
            }

            if (options.previousNext) {
                if (!that.element.find(NEXT).length) {
                    that.element.append(icon(NEXT, options.messages.next, null, that._id, buttonSize));

                    next(that.element, page, totalPages);
                }

                if (!that.element.find(LAST).length) {
                    that.element.append(icon(LAST, options.messages.last, "k-pager-last", that._id, buttonSize));

                    last(that.element, page, totalPages);
                }
            }

            if (options.pageSizes) {
                if (!that.element.find(".k-pager-sizes").length) {
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
                   that.element.find(".k-pager-sizes select").show().attr("aria-label", options.messages.pageSizeDropDownLabel).kendoDropDownList({ size: options.size });
                }

                that.element.on(CHANGE + NS, ".k-pager-sizes select", that._change.bind(that));
            }

            if (options.refresh) {
                if (!that.element.find(".k-pager-refresh").length) {
                    that.element.append('<button role="button" href="#" class="k-pager-refresh k-button ' + buttonSize + ' k-button-flat k-button-flat-base k-icon-button" title="' + options.messages.refresh +
                        '" aria-label="' + options.messages.refresh + '">' + kendo.ui.icon("arrow-rotate-cw") + '</button>');
                }

                that.element.on(CLICK + NS, ".k-pager-refresh", that._refreshClick.bind(that));
            }

            if (options.info) {
                if (!that.element.find(".k-pager-info").length) {
                    that.element.append('<span class="k-pager-info k-label" />');
                }
            }

            that.element
                .on(CLICK + NS , "button", that._click.bind(that))
                .on(CHANGE + NS , "select.k-dropdown", that._numericSelectChange.bind(that))
                .addClass("k-pager");

            if (options.autoBind) {
                that.refresh();
            }

            that._resizeHandler = that.resize.bind(that, true);
            $(window).on("resize" + NS, that._resizeHandler);

            sizeClassName = that._getWidthSizeClass(that.element.outerWidth());

            if (sizeClassName) {
                that.element.addClass(sizeClassName);
            }

            if (options.size) {
                that.element.addClass(kendo.getValidCssClass("k-pager-", "size", options.size));
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
            ARIATemplate: ({ page, totalPages }) => `Page navigation, page ${page} of ${totalPages}`,
            selectTemplate: ({ text, title, tabindex, size }) => `<button role="button" aria-current="page" tabindex="${tabindex}" aria-label="${title}" class="k-button ${size} k-button-flat k-button-flat-primary k-selected">${text}</span>`,
            linkTemplate: ({ ns, idx, text, title, tabindex, size }) => `<button class="k-button ${size} k-button-flat k-button-flat-primary" tabindex="${tabindex}" href="#" data-${ns}page="${idx}" ${title !== "" ? `title="${title}"` : ''}>${text}</button>`,
            numericSelectItemTemplate: ({ idx, selected, text }) => `<option value="${idx}" ${selected ? 'selected="selected"' : '' }>${text}</option>`,
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
            size: "medium",
            messages: {
                allPages: "All",
                display: "{0} - {1} of {2} items",
                empty: "No items to display",
                page: "Page",
                of: "of {0}",
                itemsPerPage: "items per page",
                pageButtonLabel: "Page {0}",
                pageSizeDropDownLabel: "Page sizes drop down",
                numbersSelectLabel: "Page select",
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

        _aria: function() {
            this.element.attr({
                "role": "application",
                "aria-roledescription": "pager",
                "aria-keyshortcuts": "Enter ArrowRight ArrowLeft"
            });
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
                buttonSize = options.size ? kendo.getValidCssClass("k-button-", "size", options.size) : "",
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
                        size: buttonSize,
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
                        size: buttonSize,
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
                        size: buttonSize,
                        text: "...",
                        numeric: numericSelectItemTemplate,
                        title: options.messages.morePages
                    });
                    selectHtml += selectOption(numericSelectItemTemplate, idx, options.messages.morePages);
                }

                if (html === "") {
                    html = that.selectTemplate({ text: 0, size: buttonSize, tabindex: navigatable ? 0 : -1, navigatable: navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) });
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
                        '<span class="k-textbox k-input k-input-md k-rounded-md k-input-solid"><input class="k-input-inner" aria-label="' + that.options.messages.page + " " + page + '"></span>' +
                        kendo.format(options.messages.of, totalPages))
                    .find("input")
                    .val(page)
                    .attr(DISABLED, total < 1)
                    .attr("aria-disabled", total < 1)
                    .toggleClass("k-disabled", total < 1);
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
                    .filter("[" + kendo.attr("role") + "=dropdownlist]")
                    .kendoDropDownList("value", pageSize)
                    .kendoDropDownList("text", text); // handles custom values
            }

            that._restoreFocus(start, end, totalPages);
            that._excludeChildrenFromTab();
            that._updateAria();
        },

        _excludeChildrenFromTab: function() {
            var activeElement = kendo._activeElement();
            if (this.options.navigatable && (activeElement === this.element[0] || !$.contains(this.element[0], activeElement))) {
                this.element.find(FOCUSABLE).attr("tabindex", -1);
            }
        },

        _restoreFocus: function(start, end, totalPages) {
            var that = this;

            if (!that.options.navigatable) {
                return;
            }

            if (that._focusSelected) {
                that.element.find(".k-selected").trigger("focus");
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

        _restoreTabIndexes: function() {
            this.element
                .find("[tabindex='-1']:not(.k-disabled)")
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

            if (!isNaN(pageSize)) {
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

        _updateAria: function() {
            if (!this.options.navigatable) {
                return;
            }
            this.element.attr("aria-label", this._ariaTemplate({ page: this.page(), totalPages: this.totalPages() }));
        },

        _navigatable: function() {
            var that = this;
            var options = that.options;

            if (!options.navigatable) {
                return;
            }

            that._aria();
            that.element.attr("id", that._id);
            that._template();
            that._updateAria();

            that._tabindex(that.element);

            that.element.on("keydown" + NS, that, that._keyDown.bind(that));
            that.element.on("focusout" + NS, function() { that.element.removeClass("k-focus"); });
            that.element.on("focusin" + NS, function(e) {
                that.element.addClass("k-focus");

                if (e.target === that.element[0]) {
                    that.element.find(FOCUSABLE).attr("tabindex", -1);
                } else {
                    that.element.removeClass("k-focus");
                }
            });
        },

        _keyDown: function(e) {
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

            if (target[0] !== that.element[0] && e.keyCode == keys.TAB) {
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
                        allFocusable.eq(focusedIndex + 1 ).trigger("focus");
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
                } else if (!target.hasClass("k-pager-refresh") && !target.hasClass("k-pager-nav")) {
                    this._focusSelected = true;
                }
            }

            if (!target.is(".k-disabled")) {
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

