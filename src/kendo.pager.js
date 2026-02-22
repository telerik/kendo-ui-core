import "./kendo.data.js";
import "./kendo.dropdownlist.js";
import "./kendo.numerictextbox.js";
import "./kendo.icons.js";

export const __meta__ = {
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
        encode = kendo.htmlEncode,
        template = kendo.template,
        FIRST = "caret-alt-to-left",
        LAST = "caret-alt-to-right",
        PREV = "caret-alt-left",
        NEXT = "caret-alt-right",
        FIRST_CONST = "caret-alt-to-left",
        LAST_CONST = "caret-alt-to-right",
        PREV_CONST = "caret-alt-left",
        NEXT_CONST = "caret-alt-right",
        REFRESH = "arrow-rotate-cw",
        FOCUSABLE = ":kendoFocusable:not([tabindex='-1'])",
        CHANGE = "change",
        NS = ".kendoPager",
        CLICK = "click",
        KEYDOWN = "keydown",
        MOUSEDOWN = "down",
        MAX_VALUE = Number.MAX_VALUE,
        isRtl = false,
        iconTemplate = ({ text, wrapClassName, className, size }) => `<button role="button" title="${text}" aria-label="${text}" class="k-pager-nav k-button k-button-flat k-icon-button ${wrapClassName} ${size}">${kendo.ui.icon($('<span class="k-button-icon"></span>'),className)}</button>`;

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
            that._numericWrap = that.element.find(".k-pager-numbers-wrap");

            if (isRtl) {
                FIRST = LAST_CONST;
                LAST = FIRST_CONST;
                PREV = NEXT_CONST;
                NEXT = PREV_CONST;
                if (that._numericWrap.length) {
                    that._numericWrap.empty();
                }
            } else {
                FIRST = FIRST_CONST;
                LAST = LAST_CONST;
                PREV = PREV_CONST;
                NEXT = NEXT_CONST;
            }

            if (options.size) {
                buttonSize = kendo.getValidCssClass("k-button-", "size", options.size);
                dropDownClasses = kendo.getValidCssClass("k-picker-", "size", options.size);
            }

            if (options.navigatable) {
                that._id = that.element.attr("id") || kendo.guid();
            }
            that._template();

            if (options.previousNext || options.numeric) {

                if (that._numericWrap.length === 0) {
                    that._numericWrap = $("<div class='k-pager-numbers-wrap' />").appendTo(that.element);
                }
            }


            if (options.previousNext) {
                if (!that._numericWrap.find("[class*='-i-" + FIRST + "']").length) {
                    that._numericWrap.append(icon(FIRST, options.messages.first, "k-pager-first", that._id, buttonSize));

                    first(that._numericWrap, page);
                }

                if (!that._numericWrap.find("[class*='-i-" + PREV + "']").length) {
                    that._numericWrap.append(icon(PREV, options.messages.previous, null, that._id, buttonSize));

                    prev(that._numericWrap, page);
                }
            }

            if (options.numeric) {
                if (!that.element.find(".k-pager-input").length) {
                    let pagerInput = that._decoratePagerInput($("<span class='k-pager-input'></span>"), totalPages);
                    that._numericWrap.append(pagerInput);
                    that._initNumericInputTextBox();
                }
                else {
                    that._decoratePagerInput(that.element.find(".k-pager-input"), totalPages);
                    that._initNumericInputTextBox();
                }
                if (!options.input) {
                    if (!that.list) {
                        that.list = that._numericWrap.find(".k-pager-numbers");

                        if (that.list.length === 0) {
                           that.list = $('<div class="k-pager-numbers" />').appendTo(that._numericWrap);
                        }
                    }

                    if (options.dataSource && !options.dataSource.total()) {
                        that.list.empty().append(that.selectTemplate({ text: 0, tabindex: options.navigatalbe ? 0 : -1, navigatable: options.navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) }));
                    }
                    that._pagerInputWrap.hide();

                }
            }

            if (options.previousNext) {
                if (!that._numericWrap.find("[class*='-i-" + NEXT + "']").length) {
                    that._numericWrap.append(icon(NEXT, options.messages.next, null, that._id, buttonSize));

                    next(that._numericWrap, page, totalPages);
                }

                if (!that._numericWrap.find("[class*='-i-" + LAST + "']").length) {
                    that._numericWrap.append(icon(LAST, options.messages.last, "k-pager-last", that._id, buttonSize));

                    last(that._numericWrap, page, totalPages);
                }
            }

            if (options.pageSizes) {
                if (!that.element.find(".k-pager-sizes").length) {
                    var pageSizes = options.pageSizes.length ? options.pageSizes : ["all", 5, 10, 20];
                    var pageItems = $.map(pageSizes, function(size) {
                        if (size.toLowerCase && size.toLowerCase() === "all") {
                            return "<option value='all'>" + encode(options.messages.allPages) + "</option>";
                        }

                        return "<option>" + size + "</option>";
                    });

                    $('<span class="k-pager-sizes"><select></select><span>' + encode(options.messages.itemsPerPage) + "</span></span>")
                        .appendTo(that.element)
                        .find("select").html(pageItems.join("")).end()
                        .appendTo(that.element);
                }

                that.element.find(".k-pager-sizes select").val(that.pageSize());

                if (kendo.ui.DropDownList) {
                   that.element.find(".k-pager-sizes select").show().attr("aria-label", options.messages.pageSizeDropDownLabel).kendoDropDownList({ size: options.size, adaptiveMode: options.adaptiveMode });
                }

                that.element.on(CHANGE + NS, ".k-pager-sizes select", that._change.bind(that));
            }

            if (options.refresh) {
                if (!that.element.find(".k-pager-refresh").length) {
                    that.element.append('<button role="button" href="#" class="k-pager-refresh k-button ' + buttonSize + ' k-button-flat k-icon-button" title="' + options.messages.refresh +
                        '" aria-label="' + options.messages.refresh + '">' + kendo.ui.icon($('<span class="k-button-icon"></span>'),REFRESH) + '</button>');
                }

                that.element.on(CLICK + NS, ".k-pager-refresh", that._refreshClick.bind(that));
            }

            if (options.info) {
                if (!that.element.find(".k-pager-info").length) {
                    that.element.append('<span class="k-pager-info" />');
                }
            }

            that.element
                .on(CLICK + NS , "button", that._click.bind(that))
                .addClass("k-pager");

            if (options.size) {
                that.element.addClass(kendo.getValidCssClass("k-pager-", "size", options.size));
            }

            if (options.responsive) {
                that.element.addClass("k-pager-responsive");
            }

            if (options.autoBind) {
                that.refresh();
            }

            that._resizeHandler = that.resize.bind(that, true);
            $(window).on("resize" + NS, that._resizeHandler);

            that._navigatable();
            that._lastWidth = 1;
            that.resize();

            kendo.notify(that);
        },

        _initNumericInputTextBox: function() {
            let that = this,
                options = that.options;

             that._numericTextBox = that._numericWrap.find(".k-pager-input input").kendoNumericTextBox({
                        spinners: false,
                        size: options.size,
                        min: 1,
                        format: "n0",
                        change: function(e) {
                            let page = this.value();

                            if (page < 1 || page > that.totalPages()) {
                                page = that.page();
                            }

                            setTimeout(function() {
                                that.page(page);
                            },100);
                        }
                    }).data("kendoNumericTextBox");
                    that._numericTextBox.element.on("focus" + NS, () => that._restoreTabIndexes());
                    that._numericTextBox.wrapper.find(".k-input-spinner").remove();
                    that._pagerInputWrap = that.element.find(".k-pager-input");
        },

        _decoratePagerInput: function(pagerInputWrap, totalPages) {
            let that = this,
                options = that.options;

            $(pagerInputWrap).append('<span>' + encode(options.messages.page) + '</span>' +
                    `<input aria-label='${that.options.messages.page}'/>` +
                    '<span>' + encode(kendo.format(options.messages.of, totalPages)) + '</span>');

            return pagerInputWrap;
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);
            that.dataSource.unbind(CHANGE, that._refreshHandler);
            that._refreshHandler = null;
            let pagerInput = that.element.find(".k-pager-input");
            if (pagerInput.length) {
                pagerInput.remove();
            }
            $(window).off("resize" + NS, this._resizeHandler);

            kendo.destroy(that.element);
            that.element = that.list = null;
        },

        events: [
            CHANGE
        ],

        options: {
            name: "Pager",
            adaptiveMode: "none",
            ARIATemplate: ({ page, totalPages }) => `Page navigation, page ${page} of ${totalPages}`,
            selectTemplate: ({ text, title, tabindex, size }) => `<button role="button" aria-current="page" tabindex="${tabindex}" aria-label="${title}" class="k-button ${size} k-button-flat k-button-primary k-selected"><span class="k-button-text">${encode(text)}</span></button>`,
            linkTemplate: ({ ns, idx, text, title, tabindex, size }) => `<button class="k-button ${size} k-button-flat k-button-primary" tabindex="${tabindex}" href="#" data-${ns}page="${idx}" ${title !== "" ? `title="${title}"` : ''}><span class="k-button-text">${encode(text)}</span></button>`,
            numericSelectItemTemplate: ({ idx, selected, text }) => `<option value="${idx}" ${selected ? 'selected="selected"' : '' }>${encode(text)}</option>`,
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
            size: undefined,
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

        _aria: function() {
            this.element.attr({
                "role": "application",
                "aria-roledescription": "pager",
                "aria-keyshortcuts": "Enter ArrowRight ArrowLeft"
            });
        },

        _adaptiveStep: function(step, hide, availableWidth) {
            var that = this;
            var gap = parseInt(this.element.css("gap"));
            switch (step) {
                case 0:
                    return that._toggleButtons(hide, availableWidth);
                case 1:
                    return that._toggleRefresh(hide, availableWidth - gap);
                case 2:
                    return that._togglePagerInfo(hide, availableWidth - gap);
                case 3:
                    return that._toggleInputSizesLabel(hide, availableWidth - gap);
                case 4:
                    return that._togglePageSizesLabel(hide, availableWidth - gap);
                case 5:
                    return that._togglePageSizesDropDown(hide, availableWidth - gap);
                default:
                 break;
              }
        },

        _calculateNeededWidth: function() {
            let sumWidth = 0;
            const gap = parseInt(this.element.css("gap"));
            const leftPadding = parseInt(this.element.css("padding-left"));
            const rightPadding = parseInt(this.element.css("padding-right"));
            this.element.children().each(function() {
                const element = $(this);
                const pagerInfo = element.hasClass("k-pager-info");
                if (pagerInfo) {
                    element.removeClass("k-pager-info");
                }
                sumWidth += element.is(":visible") ? kendo._outerWidth(element) : 0;
                if (pagerInfo) {
                    element.addClass("k-pager-info");
                }
            });
            sumWidth += gap * (this.element.children(":visible").length - 1);
            return sumWidth + leftPadding + rightPadding;
        },

        _resize: function(size) {
            var that = this;
            const currentOuter = size.width;
            const correctionBuffer = 3;
            if (!that.element.is(":visible") || !that._lastWidth || !that.options.responsive) {
                return;
            }

            if (that._lastWidth < currentOuter) {
                for (let i = 5; i >= 0; i--) {
                    const availableWidth = that._calculateNeededWidth();
                    if (currentOuter < availableWidth) {
                        break;
                    }
                    const shouldBreak = that._adaptiveStep(i, false, currentOuter - availableWidth);
                    if (shouldBreak) {
                        break;
                    }
                }
            } else if (that._lastWidth > currentOuter) {
                for (let i = 0; i < 6; i++) {
                    if ((currentOuter - correctionBuffer) > that._calculateNeededWidth()) {
                        break;
                    }
                    that._adaptiveStep(i, true);
                }
            }

            that._lastWidth = currentOuter;
        },

        _toggleButtons: function(hide, availableWidth) {
            if (this.options.input || !this._numericWrap || !this.list || !this._numericTextBox) {
                return;
            }
            const pagerInputWidth = kendo._outerWidth(this._pagerInputWrap, true);

            if (hide) {
                this._pagerInputWrap.show();
                this.list.hide();
            } else if (availableWidth && ((this.list.width() - pagerInputWidth) < availableWidth)) {
                this._pagerInputWrap.hide();
                this.list.show();
            }
        },

        _toggleRefresh: function(hide, availableWidth) {
            if (!this.options.refresh) {
                return;
            }
            const refreshContainer = this.element.find(".k-pager-refresh");

            if (hide) {
                refreshContainer.hide();
            } else if (availableWidth && (kendo._outerWidth(refreshContainer) < availableWidth)) {
                refreshContainer.show();
            } else if (refreshContainer.is(":hidden")) {
                return true;
            }
        },

        _togglePagerInfo: function(hide, availableWidth) {
            if (!this.options.info) {
                return;
            }
            const infoBox = this.element.find(".k-pager-info");
            if (hide) {
                infoBox.hide();
            } else if (availableWidth && (infoBox.width() < availableWidth)) {
                infoBox.show();
            } else if (!infoBox.is(":visible")) {
                return true;
            }
        },

        _toggleInputSizesLabel: function(hide, availableWidth) {
            if (!this._numericTextBox) {
                return;
            }
            const inputElements = this.element.find(".k-pager-input").children();
            const label = inputElements.eq(0);

            if (hide) {
                label.hide();
            } else if (availableWidth && (inputElements.eq(0).width() < availableWidth)) {
                label.show();
            } else if (label.is(":hidden")) {
                return true;
            }
        },

        _togglePageSizesLabel: function(hide, availableWidth) {
            if (!this.options.pageSizes) {
                return;
            }
            const label = this.element.find(".k-pager-sizes").children().eq(1);

            if (hide) {
                label.hide();
            } else if (availableWidth && (label.width() < availableWidth)) {
                label.show();
            } else if (label.is(":hidden")) {
                return true;
            }
        },

        _togglePageSizesDropDown: function(hide, availableWidth) {
            if (!this.options.pageSizes) {
                return;
            }

            const picker = this.element.find(".k-pager-sizes .k-picker");

            if (hide) {
                picker.hide();
            } else if (availableWidth && (kendo._outerWidth(picker) < availableWidth)) {
                picker.show();
            } else if (!picker.is(":visible")) {
                return true;
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

            if (options.numeric && !options.input) {

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
                }

                if (html === "") {
                    html = that.selectTemplate({ text: 0, size: buttonSize, tabindex: navigatable ? 0 : -1, navigatable: navigatable, title: kendo.format(options.messages.pageButtonLabel, 0) });
                }

                that.list.html(html);
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

            if (that._numericTextBox) {
                that._numericTextBox.value(page);
                if ((total > 0) !== !that._numericTextBox.wrapper.hasClass("k-disabled")) {
                    that._numericTextBox.enable(total > 0);
                }
                that._numericTextBox.wrapper.prev().html('<span>' + encode(options.messages.page) + '</span>');
                that._numericTextBox.wrapper.next().html('<span>' + encode(kendo.format(options.messages.of, totalPages)) + '</span>');
            }

            if (options.previousNext) {
                first(that.element, page);

                prev(that.element, page);

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
            if (totalPages) {
                that._lastWidth = kendo._outerWidth(that.element) + 12;
                that.resize(true);
            } else if (that._lastWidth) {
              that._lastWidth = kendo._outerWidth(that.element);
            }
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
                .find("[tabindex='-1']:not(.k-disabled):not(.k-dropdownlist > .k-icon-button)")
                .attr("tabindex", 0);
        },

        _collapsedTotal: function() {
            return this.dataSource.total();
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

            that.element.on(KEYDOWN + NS, that, that._keyDown.bind(that));
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

                if (that.options._isToolbarItem) {
                    that._restoreTabIndexes();
                }

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

        _click: function(e) {
            const that = this,
                target = $(e.currentTarget);

            e.preventDefault();

            if (that.options.navigatable) {
                if (target.attr("title") == that.options.messages.morePages) {
                    that._focusMore = target.parent().index();
                } else if (!target.hasClass("k-pager-refresh") && !target.hasClass("k-pager-nav")) {
                    that._focusSelected = true;
                }
                that._restoreTabIndexes();
            }

            if (!target.is(".k-disabled")) {
                that.page(parseInt(target.attr(kendo.attr("page")), 10));
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
    });

    ui.plugin(Pager);
})(window.kendo.jQuery);
export default kendo;

