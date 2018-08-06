(function(f, define){
    define([ "./kendo.core", "./kendo.selectable" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "calendar",
    name: "Calendar",
    category: "web",
    description: "The Calendar widget renders a graphical calendar that supports navigation and selection.",
    depends: [ "core", "selectable" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        parse = kendo.parseDate,
        adjustDST = kendo.date.adjustDST,
        weekInYear = kendo.date.weekInYear,
        Selectable = kendo.ui.Selectable,
        extractFormat = kendo._extractFormat,
        template = kendo.template,
        getCulture = kendo.getCulture,
        transitions = kendo.support.transitions,
        transitionOrigin = transitions ? transitions.css + "transform-origin" : "",
        cellTemplate = template('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link" href="\\#" data-#=data.ns#value="#=data.dateString#">#=data.value#</a></td>', { useWithBlock: false }),
        emptyCellTemplate = template('<td role="gridcell">&nbsp;</td>', { useWithBlock: false }),
        weekNumberTemplate = template('<td class="k-alt">#= data.weekNumber #</td>', { useWithBlock: false }),
        browser = kendo.support.browser,
        isIE8 = browser.msie && browser.version < 9,
        outerHeight = kendo._outerHeight,
        outerWidth = kendo._outerWidth,
        ns = ".kendoCalendar",
        CLICK = "click" + ns,
        KEYDOWN_NS = "keydown" + ns,
        ID = "id",
        MIN = "min",
        LEFT = "left",
        SLIDE = "slideIn",
        MONTH = "month",
        CENTURY = "century",
        CHANGE = "change",
        NAVIGATE = "navigate",
        VALUE = "value",
        HOVER = "k-state-hover",
        DISABLED = "k-state-disabled",
        FOCUSED = "k-state-focused",
        OTHERMONTH = "k-other-month",
        OTHERMONTHCLASS = ' class="' + OTHERMONTH + '"',
        TODAY = "k-nav-today",
        CELLSELECTOR = "td:has(.k-link)",
        CELLSELECTORVALID = "td:has(.k-link):not(." + DISABLED + ")",
        WEEKCOLUMNSELECTOR = "td:not(:has(.k-link))",
        SELECTED = "k-state-selected",
        BLUR = "blur" + ns,
        FOCUS = "focus",
        FOCUS_WITH_NS = FOCUS + ns,
        MOUSEENTER = support.touch ? "touchstart" : "mouseenter",
        MOUSEENTER_WITH_NS = support.touch ? "touchstart" + ns : "mouseenter" + ns,
        MOUSELEAVE = support.touch ? "touchend" + ns + " touchmove" + ns : "mouseleave" + ns,
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        PREVARROW = "_prevArrow",
        NEXTARROW = "_nextArrow",
        ARIA_DISABLED = "aria-disabled",
        ARIA_SELECTED = "aria-selected",
        ARIA_LABEL = "aria-label",
        proxy = $.proxy,
        extend = $.extend,
        DATE = Date,
        views = {
            month: 0,
            year: 1,
            decade: 2,
            century: 3
        };

    var Calendar = Widget.extend({
        init: function(element, options) {
            var that = this, value, id;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            options.url = window.unescape(options.url);

            that.options.disableDates = getDisabledExpr(that.options.disableDates);

            that._templates();

            that._selectable();

            that._header();

            that._footer(that.footer);

            id = element
                    .addClass("k-widget k-calendar " + (options.weekNumber ? " k-week-number" : ""))
                    .on(MOUSEENTER_WITH_NS + " " + MOUSELEAVE, CELLSELECTOR, mousetoggle)
                    .on(KEYDOWN_NS, "table.k-content", proxy(that._move, that))
                    .on(CLICK, CELLSELECTOR, function(e) {
                        var link = e.currentTarget.firstChild,
                            value = that._toDateObject(link);

                        if (link.href.indexOf("#") != -1) {
                            e.preventDefault();
                        }

                        if (that._view.name == "month" && that.options.disableDates(value)) {
                            return;
                        }
                        if(that._view.name != "month" || options.selectable == "single") {
                             that._click($(link));
                        }
                    })
                    .on("mouseup" + ns, "table.k-content, .k-footer", function() {
                        that._focusView(that.options.focusOnNav !== false);
                    })
                    .attr(ID);

            if (id) {
                that._cellID = id + "_cell_selected";
            }

            if(that._isMultipleSelection() && that.options.weekNumber) {
                element.on(CLICK, WEEKCOLUMNSELECTOR, function(e) {
                        var first = $(e.currentTarget).closest("tr").find(CELLSELECTORVALID).first(),
                            last = that.selectable._lastActive = $(e.currentTarget).closest("tr").find(CELLSELECTORVALID).last();
                        that.selectable.selectRange(first, last, { event: e});
                        that._current = that._value = that._toDateObject(last.find("a"));
                        that._class(FOCUSED, that._current);
                });
            }

            normalize(options);
            value = parse(options.value, options.format, options.culture);
            that._selectDates = [];

            that._index = views[options.start];

            that._current = new DATE(+restrictValue(value, options.min, options.max));

            that._addClassProxy = function() {
                that._active = true;

                if (that._cell.hasClass(DISABLED)) {
                    var todayString = that._view.toDateString(getToday());
                    that._cell = that._cellByDate(todayString);
                }

                that._cell.addClass(FOCUSED);
            };

            that._removeClassProxy = function() {
                that._active = false;
                that._cell.removeClass(FOCUSED);
            };

            that.value(value);

            if(that._isMultipleSelection() && options.selectDates.length > 0) {
                that.selectDates(options.selectDates);
            }
            kendo.notify(that);
        },

        options: {
            name: "Calendar",
            value: null,
            min: new DATE(1900, 0, 1),
            max: new DATE(2099, 11, 31),
            dates: [],
            disableDates: null,
            url: "",
            culture: "",
            footer : "",
            format : "",
            month : {},
            weekNumber: false,
            selectable: "single",
            selectDates: [],
            start: MONTH,
            depth: MONTH,
            animation: {
                horizontal: {
                    effects: SLIDE,
                    reverse: true,
                    duration: 500,
                    divisor: 2
                },
                vertical: {
                    effects: "zoomIn",
                    duration: 400
                }
            },
            messages: {
                weekColumnHeader: ""
            }
        },

        events: [
            CHANGE,
            NAVIGATE
        ],

        setOptions: function(options) {
            var that = this;

            normalize(options);

            options.disableDates = getDisabledExpr(options.disableDates);

            Widget.fn.setOptions.call(that, options);

            that._templates();

            that._selectable();

            that._footer(that.footer);
            that._index = views[that.options.start];

            that.navigate();
        },

        destroy: function() {
            var that = this,
            today = that._today;

            that.element.off(ns);
            that._title.off(ns);
            that[PREVARROW].off(ns);
            that[NEXTARROW].off(ns);
            that._destroySelectable();
            kendo.destroy(that._table);

            if (today) {
                kendo.destroy(today.off(ns));
            }

            Widget.fn.destroy.call(that);
        },

        current: function() {
            return this._current;
        },

        view: function() {
            return this._view;
        },

        focus: function(table) {
            table = table || this._table;
            this._bindTable(table);
            table.focus();
        },

        min: function(value) {
            return this._option(MIN, value);
        },

        max: function(value) {
            return this._option("max", value);
        },

        navigateToPast: function() {
            this._navigate(PREVARROW, -1);
        },

        navigateToFuture: function() {
            this._navigate(NEXTARROW, 1);
        },

        navigateUp: function() {
            var that = this,
            index = that._index;

            if (that._title.hasClass(DISABLED)) {
                return;
            }

            that.navigate(that._current, ++index);
        },

        navigateDown: function(value) {
            var that = this,
            index = that._index,
            depth = that.options.depth;

            if (!value) {
                return;
            }

            if (index === views[depth]) {
                if (!isEqualDate(that._value, that._current) || !isEqualDate(that._value, value)) {
                    that.value(value);
                    that.trigger(CHANGE);
                }
                return;
            }

            that.navigate(value, --index);
        },

        navigate: function(value, view) {
            view = isNaN(view) ? views[view] : view;

            var that = this,
                options = that.options,
                culture = options.culture,
                min = options.min,
                max = options.max,
                title = that._title,
                from = that._table,
                old = that._oldTable,
                currentValue = that._current,
                future = value && +value > +currentValue,
                vertical = view !== undefined && view !== that._index,
                to, currentView, compare,
                disabled;
            if (!value) {
                value = currentValue;
            }

            that._current = value = new DATE(+restrictValue(value, min, max));

            if (view === undefined) {
                view = that._index;
            } else {
                that._index = view;
            }

            that._view = currentView = calendar.views[view];
            compare = currentView.compare;

            disabled = view === views[CENTURY];
            title.toggleClass(DISABLED, disabled).attr(ARIA_DISABLED, disabled);

            disabled = compare(value, min) < 1;
            that[PREVARROW].toggleClass(DISABLED, disabled).attr(ARIA_DISABLED, disabled);
            if (that[PREVARROW].hasClass(DISABLED)) {
                that[PREVARROW].removeClass(HOVER);
            }

            disabled = compare(value, max) > -1;
            that[NEXTARROW].toggleClass(DISABLED, disabled).attr(ARIA_DISABLED, disabled);
            if (that[NEXTARROW].hasClass(DISABLED)) {
                that[NEXTARROW].removeClass(HOVER);
            }

            if (from && old && old.data("animating")) {
                old.kendoStop(true, true);
                from.kendoStop(true, true);
            }

            that._oldTable = from;

            if (!from || that._changeView) {
                title.html(currentView.title(value, min, max, culture));

                that._table = to = $(currentView.content(extend({
                    min: min,
                    max: max,
                    date: value,
                    url: options.url,
                    dates: options.dates,
                    format: options.format,
                    culture: culture,
                    disableDates: options.disableDates,
                    isWeekColumnVisible: options.weekNumber,
                    messages: options.messages
                }, that[currentView.name])));

                addClassToViewContainer(to, currentView.name);
                makeUnselectable(to);
                var replace = from && from.data("start") === to.data("start");
                that._animate({
                    from: from,
                    to: to,
                    vertical: vertical,
                    future: future,
                    replace: replace
                });

                that.trigger(NAVIGATE);

                that._focus(value);
            }

            if (view === views[options.depth] && that._selectDates.length > 0) {
                that._visualizeSelectedDatesInView();
            }

            if(that.options.selectable === "single") {
                if (view === views[options.depth] && that._value && !that.options.disableDates(that._value)) {
                that._class("k-state-selected", that._value);
                }
            }

            that._class(FOCUSED, value);

            if (!from && that._cell) {
                that._cell.removeClass(FOCUSED);
            }

            that._changeView = true;
        },

        selectDates: function(dates) {
            var that = this,
                validSelectedDates,
                datesUnique;

            if(dates === undefined) {
                return that._selectDates;
            }

            datesUnique = dates
                .map(function (date) { return date.getTime(); })
                .filter(function (date, position, array) {
                    return array.indexOf(date) === position;
                })
                .map(function (time) { return new Date(time); });

            validSelectedDates = $.grep(datesUnique, function(value) {
                if(value) {
                    return +that._validateValue(new Date(value.setHours(0, 0, 0, 0))) === +value;
                }
            });
            that._selectDates = validSelectedDates.length > 0 ? validSelectedDates : (datesUnique.length === 0 ? datesUnique : that._selectDates);
            that._visualizeSelectedDatesInView();
        },

        value: function(value) {
            var that = this,
                old = that._view,
                view = that._view;

            if (value === undefined) {
                return that._value;
            }

            value = that._validateValue(value);
            if(value && that._isMultipleSelection()) {
                var date = new Date(+value);
                date.setHours(0, 0, 0, 0);
                that._selectDates = [date];
                that.selectable._lastActive = null;
            }
            if (old && value === null && that._cell) {
                that._cell.removeClass(SELECTED);
            } else {
                that._changeView = !value || view && view.compare(value, that._current) !== 0;
                that.navigate(value);
            }
        },

        _validateValue: function(value) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max;

            if (value === null) {
                that._current = createDate(that._current.getFullYear(), that._current.getMonth(), that._current.getDate());
            }

            value = parse(value, options.format, options.culture);

            if (value !== null) {
                value = new DATE(+value);

                if (!isInRange(value, min, max)) {
                    value = null;
                }
            }

            if (value === null || !that.options.disableDates(new Date(+value))) {
                that._value = value;
            } else if (that._value === undefined) {
                that._value = null;
            }

            return that._value;
        },

        _visualizeSelectedDatesInView: function() {
            var that = this;

            var selectedDates = {};
            $.each(that._selectDates, function(index, value) {
                selectedDates[kendo.calendar.views[0].toDateString(value)] = value;
            });
            that.selectable.clear();

            var cells = that._table
                .find(CELLSELECTOR)
                .filter(function(index, element) {
                    return selectedDates[$(element.firstChild).attr(kendo.attr(VALUE))];
                });
            if(cells.length > 0) {
                that.selectable._selectElement(cells, true);
            }
        },

        _isMultipleSelection: function() {
            var that = this;
            return that.options.selectable === "multiple";
        },

        _selectable: function() {
            var that = this;
            if(!that._isMultipleSelection()) {
                return;
            }

            var selectable = that.options.selectable,
            selectableOptions = Selectable.parseOptions(selectable);

            if (selectableOptions.multiple) {
                that.element.attr("aria-multiselectable", "true");
            }
            that.selectable = new Selectable(that.wrapper, {
                aria: true,
                //excludes the anchor element
                inputSelectors: "input,textarea,.k-multiselect-wrap,select,button,.k-button>span,.k-button>img,span.k-icon.k-i-arrow-60-down,span.k-icon.k-i-arrow-60-up",
                multiple: selectableOptions.multiple,
                filter: "table.k-month:eq(0) " + CELLSELECTORVALID,
                change: proxy(that._onSelect, that),
                relatedTarget: proxy(that._onRelatedTarget, that)
            });
        },

        _onRelatedTarget: function(target) {
            var that = this;

            if(that.selectable.options.multiple && target.is(CELLSELECTORVALID)) {
                that._current = that._toDateObject(target.find("a"));
                that._class(FOCUSED, that._toDateObject(target.find("a")));
            }

        },

        _onSelect: function(e) {
            var that = this,
                eventArgs = e,
                selectableOptions = Selectable.parseOptions(that.options.selectable);

            if(!selectableOptions.multiple) {
                if($(eventArgs.event.currentTarget).is("td") && !$(eventArgs.event.currentTarget).hasClass("k-state-selected")) {
                    $(eventArgs.event.currentTarget).addClass("k-state-selected");
                }
                else {
                    that._click($(eventArgs.event.currentTarget).find("a"));
                }
                return;
            }

            if(eventArgs.event.ctrlKey || eventArgs.event.metaKey) {
                if($(eventArgs.event.currentTarget).is(CELLSELECTORVALID)) {
                    that._toggleSelection($(eventArgs.event.currentTarget));
                }
                else {
                    that._cellsBySelector(CELLSELECTORVALID).each(function(index, element){
                        var value = that._toDateObject($(element).find("a"));
                        that._deselect(value);
                    });
                    that._addSelectedCellsToArray();
                }
            }
            else if (eventArgs.event.shiftKey) {
                that._rangeSelection(that._cell);
            }
            else if($(eventArgs.event.currentTarget).is(CELLSELECTOR)) {
                that.value(that._toDateObject($(eventArgs.event.currentTarget).find("a")));
            }
            else {
                that._selectDates = [];
                that._addSelectedCellsToArray();
            }
             that.trigger(CHANGE);
        },

        _destroySelectable: function() {
            var that = this;

            if (that.selectable) {
                that.selectable.destroy();
                that.selectable = null;
            }
        },

        //when ctrl key is clicked
        _toggleSelection: function(currentCell) {
            var that = this,
                date = that._toDateObject(currentCell.find("a"));
                if(currentCell.hasClass("k-state-selected")) {
                    that._selectDates.push(date);
                }
                else {
                    that._deselect(date);
                }
        },

        //shift selection
        _rangeSelection: function(toDateCell, startDate) {
            var that = this,
                fromDate  = startDate || that._toDateObject(that.selectable.value().first().find("a")),
                toDate = that._toDateObject(toDateCell.find("a")),
                daysDifference;

            if(that.selectable._lastActive || that._value) {
                fromDate = that.selectable._lastActive? that._toDateObject(that.selectable._lastActive.find("a")): new Date(+that._value);
            } else {
                that.selectable._lastActive = startDate? that._cellByDate(that._view.toDateString(startDate), CELLSELECTORVALID): that.selectable.value().first();
            }

            that._selectDates = [];
            daysDifference = daysBetweenTwoDates(fromDate, toDate);
            addDaysToArray(that._selectDates, daysDifference, fromDate, that.options.disableDates);

            that._visualizeSelectedDatesInView();
        },

        _cellsBySelector: function(selector) {
            var that = this;
            return that._table.find(selector);
        },

        _addSelectedCellsToArray: function() {
            var that = this;
            that.selectable.value().each(function(index, item) {
                var date = that._toDateObject($(item.firstChild));
                if(!that.options.disableDates(date)) {
                    that._selectDates.push(date);
                }
            });
        },

        _deselect: function(date) {
            var that = this;

            var currentDateIndex = that._selectDates.map(Number).indexOf(+date);
            if(currentDateIndex != -1) {
                that._selectDates.splice(currentDateIndex, 1);
            }
        },

        _dateInView: function(date) {
            var that = this,
                firstDateInView = that._toDateObject(that._cellsBySelector(CELLSELECTOR + ":first").find("a")),
                lastDateInView = that._toDateObject(that._cellsBySelector(CELLSELECTOR + ":last").find("a"));

            return +date <= +lastDateInView && +date >= +firstDateInView;
        },



        _move: function(e) {
            var that = this,
                options = that.options,
                key = e.keyCode,
                view = that._view,
                index = that._index,
                min = that.options.min,
                max = that.options.max,
                currentValue = new DATE(+that._current),
                isRtl = kendo.support.isRtl(that.wrapper),
                isDisabled = that.options.disableDates,
                value, prevent, method, temp;

            if (e.target === that._table[0]) {
                that._active = true;
            }

            if (key == keys.RIGHT && !isRtl || key == keys.LEFT && isRtl) {
                value = 1;
                prevent = true;
            } else if (key == keys.LEFT && !isRtl || key == keys.RIGHT && isRtl) {
                value = -1;
                prevent = true;
            } else if (key == keys.UP) {
                value = index === 0 ? -7 : -4;
                prevent = true;
            } else if (key == keys.DOWN) {
                value = index === 0 ? 7 : 4;
                prevent = true;
            }
            else if(key == keys.SPACEBAR) {
                value = 0;
                prevent = true;
            }
            else if (key == keys.HOME || key == keys.END) {
                method = key == keys.HOME ? "first" : "last";
                temp = view[method](currentValue);
                currentValue = new DATE(temp.getFullYear(), temp.getMonth(), temp.getDate(), currentValue.getHours(), currentValue.getMinutes(), currentValue.getSeconds(), currentValue.getMilliseconds());
                currentValue.setFullYear(temp.getFullYear());
                prevent = true;
            }

            if (e.ctrlKey || e.metaKey) {
                if (key == keys.RIGHT && !isRtl || key == keys.LEFT && isRtl) {
                    that.navigateToFuture();
                    prevent = true;
                } else if (key == keys.LEFT && !isRtl || key == keys.RIGHT && isRtl) {
                    that.navigateToPast();
                    prevent = true;
                } else if (key == keys.UP) {
                    that.navigateUp();
                    prevent = true;
                } else if (key == keys.DOWN) {
                    that._click($(that._cell[0].firstChild));
                    prevent = true;
                }
                  else if ((key == keys.ENTER || key == keys.SPACEBAR) && that._isMultipleSelection()) {
                    that._keyboardToggleSelection(e);

                    var focusedDate = that._toDateObject($(that._cell[0]).find("a"));
                    that._class(FOCUSED, focusedDate);

                }
            } else if(e.shiftKey) {
                if (value !== undefined || method) {
                    if (!method) {
                        view.setDate(currentValue, value);
                    }

                    if (isDisabled(currentValue)) {
                        currentValue = that._nextNavigatable(currentValue, value);
                    }

                    min = createDate(min.getFullYear(), min.getMonth(), min.getDate());
                    if (isInRange(currentValue, min, max)) {
                        if(that._isMultipleSelection()) {
                            that._keyboardRangeSelection(e, currentValue);
                        }
                        else {
                            that._focus(restrictValue(currentValue, options.min, options.max));
                        }
                    }
                }
            } else {
                if (key == keys.ENTER || key == keys.SPACEBAR) {
                    if(view.name == "month" && that._isMultipleSelection()) {
                        that.value(that._toDateObject($(that._cell.find("a"))));
                        that.selectable._lastActive = $(that._cell[0]);
                        that.trigger(CHANGE);
                    }
                    else {
                        that._click($(that._cell[0].firstChild));
                    }
                    prevent = true;
                } else if (key == keys.PAGEUP) {
                    prevent = true;
                    that.navigateToPast();
                } else if (key == keys.PAGEDOWN) {
                    prevent = true;
                    that.navigateToFuture();
                }

                if (value || method) {
                    if (!method) {
                        view.setDate(currentValue, value);
                    }

                    if (isDisabled(currentValue)) {
                        currentValue = that._nextNavigatable(currentValue, value);
                    }

                    min = createDate(min.getFullYear(), min.getMonth(), min.getDate());

                    if (isInRange(currentValue, min, max)) {
                        if(that._isMultipleSelection()) {
                            if(!that._dateInView(currentValue)) {
                                that.navigate(currentValue);
                            }
                            else {
                                that._current = currentValue;
                                that._class(FOCUSED, currentValue);
                            }
                        }
                        else {
                            that._focus(restrictValue(currentValue, options.min, options.max));
                        }
                    }
                }
            }

            if (prevent) {
                e.preventDefault();
            }

            return that._current;
        },

        _keyboardRangeSelection: function(event, currentValue) {
            var that = this,
                fromDate,
                daysDifference;

            if(!that._dateInView(currentValue)) {
                that._selectDates = [];

                fromDate = that.selectable._lastActive? that._toDateObject(that.selectable._lastActive.find("a")): currentValue;
                daysDifference = daysBetweenTwoDates(fromDate, new Date(+currentValue));

                addDaysToArray(that._selectDates, daysDifference, fromDate, that.options.disableDates);

                that.navigate(currentValue);
                that._current = currentValue;
                that.selectable._lastActive = that.selectable._lastActive || that._cellByDate(that._view.toDateString(currentValue), CELLSELECTORVALID);
                that.trigger(CHANGE);
                return;
            }
            that.selectable.options.filter = that.wrapper.find("table").length > 1 && +currentValue > +that._current? "table.k-month:eq(1) " + CELLSELECTORVALID: "table.k-month:eq(0) " + CELLSELECTORVALID;
            that._class(FOCUSED, currentValue);
            that._current = currentValue;

            that._rangeSelection(that._cellByDate(that._view.toDateString(currentValue), CELLSELECTORVALID), currentValue);

            that.trigger(CHANGE);

            that.selectable.options.filter = "table.k-month:eq(0) " + CELLSELECTORVALID;
        },

        _keyboardToggleSelection: function(event) {
            var that = this;

            event.currentTarget = that._cell[0];
            that.selectable._lastActive = $(that._cell[0]);

            if ($(that._cell[0]).hasClass(SELECTED)) {
                that.selectable._unselect($(that._cell[0]));
                that.selectable.trigger(CHANGE, { event: event});
            }
            else {
                that.selectable.value($(that._cell[0]), { event: event});
            }
        },

        _nextNavigatable: function(currentValue, value) {
            var that = this,
            disabled = true,
            view = that._view,
            min = that.options.min,
            max = that.options.max,
            isDisabled = that.options.disableDates,
            navigatableDate = new Date(currentValue.getTime());

            view.setDate(navigatableDate, -value);

            while (disabled) {
                view.setDate(currentValue, value);

                if (!isInRange(currentValue, min, max)) {
                    currentValue = navigatableDate;
                    break;
                }
                disabled = isDisabled(currentValue);
            }
            return currentValue;
        },

        _animate: function(options) {
            var that = this,
            from = options.from,
            to = options.to,
            active = that._active;

            if (!from) {
                to.insertAfter(that.element[0].firstChild);
                that._bindTable(to);
            } else if (from.parent().data("animating")) {
                from.off(ns);
                from.parent().kendoStop(true, true).remove();
                from.remove();

                to.insertAfter(that.element[0].firstChild);
                that._focusView(active);
            } else if (!from.is(":visible") || that.options.animation === false || options.replace) {
                to.insertAfter(from);
                from.off(ns).remove();

                that._focusView(active);
            } else {
                that[options.vertical ? "_vertical" : "_horizontal"](from, to, options.future);
            }
        },

        _horizontal: function(from, to, future) {
            var that = this,
                active = that._active,
                horizontal = that.options.animation.horizontal,
                effects = horizontal.effects,
                viewWidth = outerWidth(from);

            if (effects && effects.indexOf(SLIDE) != -1) {
                from.add(to).css({ width: viewWidth });

                from.wrap("<div/>");

                that._focusView(active, from);

                from.parent()
                .css({
                    position: "relative",
                    width: viewWidth * 2,
                    "float": LEFT,
                    "margin-left": future ? 0 : -viewWidth
                });

                to[future ? "insertAfter" : "insertBefore"](from);

                extend(horizontal, {
                    effects: SLIDE + ":" + (future ? "right" : LEFT),
                    complete: function() {
                        from.off(ns).remove();
                        that._oldTable = null;

                        to.unwrap();

                        that._focusView(active);

                    }
                });

                from.parent().kendoStop(true, true).kendoAnimate(horizontal);
            }
        },

        _vertical: function(from, to) {
            var that = this,
                vertical = that.options.animation.vertical,
                effects = vertical.effects,
                active = that._active, //active state before from's blur
                cell, position;

            if (effects && effects.indexOf("zoom") != -1) {
                to.css({
                    position: "absolute",
                    top: outerHeight(from.prev()),
                    left: 0
                }).insertBefore(from);

                if (transitionOrigin) {
                    cell = that._cellByDate(that._view.toDateString(that._current));
                    position = cell.position();
                    position = (position.left + parseInt(cell.width() / 2, 10)) + "px" + " " + (position.top + parseInt(cell.height() / 2, 10) + "px");
                    to.css(transitionOrigin, position);
                }

                from.kendoStop(true, true).kendoAnimate({
                    effects: "fadeOut",
                    duration: 600,
                    complete: function() {
                        from.off(ns).remove();
                        that._oldTable = null;

                        to.css({
                            position: "static",
                            top: 0,
                            left: 0
                        });

                        that._focusView(active);
                    }
                });

                to.kendoStop(true, true).kendoAnimate(vertical);
            }
        },

        _cellByDate: function(value, selector) {
            return this._table.find(selector ? selector : "td:not(." + OTHERMONTH + ")")
            .filter(function() {
                return $(this.firstChild).attr(kendo.attr(VALUE)) === value;
            });
        },

        _class: function(className, date) {
            var that = this,
                id = that._cellID,
                cell = that._cell,
                value = that._view.toDateString(date),
                disabledDate;

            if (cell) {
                cell.removeAttr(ARIA_SELECTED)
                .removeAttr(ARIA_LABEL)
                .removeAttr(ID);
                //.removeClass(className);
            }

            if (date && that._view.name == "month") {
                disabledDate = that.options.disableDates(date);
            }
            that._cellsBySelector(that._isMultipleSelection() ? CELLSELECTOR: "td:not(." + OTHERMONTH + ")").removeClass(className);
            cell = that._cellByDate(value, that.options.selectable == "multiple" ? CELLSELECTOR: "td:not(." + OTHERMONTH + ")")
            .attr(ARIA_SELECTED, true);

            if (className === FOCUSED && !that._active && that.options.focusOnNav !== false || disabledDate) {
                className = "";
            }

            cell.addClass(className);

            if (cell[0]) {
                that._cell = cell;
            }

            if (id) {
                cell.attr(ID, id);
                that._table.removeAttr("aria-activedescendant").attr("aria-activedescendant", id);
            }
        },

        _bindTable: function (table) {
            table
            .on(FOCUS_WITH_NS, this._addClassProxy)
            .on(BLUR, this._removeClassProxy);
        },

        _click: function(link) {
            var that = this,
            options = that.options,
            currentValue = new Date(+that._current),
            value = that._toDateObject(link);

            adjustDST(value, 0);

            if (that._view.name == "month" && that.options.disableDates(value)) {
                value = that._value;
            }

            that._view.setDate(currentValue, value);

            that.navigateDown(restrictValue(currentValue, options.min, options.max));
        },

        _focus: function(value) {
            var that = this,
            view = that._view;

            if (view.compare(value, that._current) !== 0) {
                that.navigate(value);
            } else {
                that._current = value;
                that._class(FOCUSED, value);
            }
        },

        _focusView: function(active, table) {
            if (active) {
                this.focus(table);
            }
        },

        _footer: function(template) {
            var that = this,
            today = getToday(),
            element = that.element,
            footer = element.find(".k-footer");

            if (!template) {
                that._toggle(false);
                footer.hide();
                return;
            }

            if (!footer[0]) {
                footer = $('<div class="k-footer"><a href="#" class="k-link k-nav-today"></a></div>').appendTo(element);
            }

            that._today = footer.show()
            .find(".k-link")
            .html(template(today))
            .attr("title", kendo.toString(today, "D", that.options.culture));

            that._toggle();
        },

        _header: function() {
            var that = this,
            element = that.element,
            links;

            if (!element.find(".k-header")[0]) {
                element.html('<div class="k-header">' +
                    '<a href="#" role="button" class="k-link k-nav-prev" ' + ARIA_LABEL + '="Previous"><span class="k-icon k-i-arrow-60-left"></span></a>' +
                    '<a href="#" role="button" aria-live="assertive" aria-atomic="true" class="k-link k-nav-fast"></a>' +
                    '<a href="#" role="button" class="k-link k-nav-next" ' + ARIA_LABEL + '="Next"><span class="k-icon k-i-arrow-60-right"></span></a>' +
                '</div>');
            }

            links = element.find(".k-link")
            .on(MOUSEENTER_WITH_NS + " " + MOUSELEAVE + " " + FOCUS_WITH_NS + " " + BLUR, mousetoggle)
            .click(false);

            that._title = links.eq(1).on(CLICK, function() { that._active = that.options.focusOnNav !== false; that.navigateUp(); });
            that[PREVARROW] = links.eq(0).on(CLICK, function() { that._active = that.options.focusOnNav !== false; that.navigateToPast(); });
            that[NEXTARROW] = links.eq(2).on(CLICK, function() { that._active = that.options.focusOnNav !== false; that.navigateToFuture(); });
        },

        _navigate: function(arrow, modifier) {
            var that = this,
            index = that._index + 1,
            currentValue = new DATE(+that._current);

            if(that._isMultipleSelection()) {
                var firstDayCurrentMonth = that._table.find("td:not(.k-other-month)").has(".k-link").first();
                currentValue = that._toDateObject(firstDayCurrentMonth.find("a"));
                that._current = new Date(+currentValue);
            }

            arrow = that[arrow];

            if (!arrow.hasClass(DISABLED)) {
                if (index > 3) {
                    currentValue.setFullYear(currentValue.getFullYear() + 100 * modifier);
                } else {
                    calendar.views[index].setDate(currentValue, modifier);
                }

                that.navigate(currentValue);
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options,
                currentValue = that._value || that._current,
                isBigger;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.format, options.culture);

            if (!value) {
                return;
            }

            options[option] = new DATE(+value);

            if (option === MIN) {
                isBigger = value > currentValue;
            } else {
                isBigger = currentValue > value;
            }

            if (isBigger || isEqualMonth(currentValue, value)) {
                if (isBigger) {
                    that._value = null;
                }
                that._changeView = true;
            }

            if (!that._changeView) {
                that._changeView = !!(options.month.content || options.month.empty);
            }

            that.navigate(that._value);

            that._toggle();
        },

        _toggle: function(toggle) {
            var that = this,
                options = that.options,
                isTodayDisabled = that.options.disableDates(getToday()),
                link = that._today;

            if (toggle === undefined) {
                toggle = isInRange(getToday(), options.min, options.max);
            }

            if (link) {
                link.off(CLICK);

                if (toggle && !isTodayDisabled) {
                    link.addClass(TODAY)
                    .removeClass(DISABLED)
                    .on(CLICK, proxy(that._todayClick, that));
                } else {
                    link.removeClass(TODAY)
                    .addClass(DISABLED)
                    .on(CLICK, prevent);
                }
            }
        },

        _todayClick: function(e) {
            var that = this,
            depth = views[that.options.depth],
            disabled = that.options.disableDates,
            today = getToday();

            e.preventDefault();

            if (disabled(today)) {
                return;
            }

            if (that._view.compare(that._current, today) === 0 && that._index == depth) {
                that._changeView = false;
            }

            if(that._isMultipleSelection()) {
                that._selectDates = [today];
                that.selectable._lastActive = null;
            }

            that._value = today;
            that.navigate(today, depth);

            that.trigger(CHANGE);
        },

        _toDateObject: function(link) {
            var value = $(link).attr(kendo.attr(VALUE)).split("/");
            //Safari cannot create correctly date from "1/1/2090"
            value = createDate(value[0], value[1], value[2]);

            return value;
        },

        _templates: function() {
            var that = this,
                options = that.options,
                footer = options.footer,
                month = options.month,
                content = month.content,
                weekNumber = month.weekNumber,
                empty = month.empty,
                footerTemplate = '#= kendo.toString(data,"D","' + options.culture +'") #';

            that.month = {
                content: template('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link#=data.linkClass#" href="#=data.url#" ' + kendo.attr(VALUE) + '="#=data.dateString#" title="#=data.title#">' + (content || "#=data.value#") + '</a></td>', { useWithBlock: !!content }),
                empty: template('<td role="gridcell">' + (empty || "&nbsp;") + "</td>", { useWithBlock: !!empty }),
                weekNumber: template('<td class="k-alt">' + (weekNumber || "#= data.weekNumber #") + "</td>", { useWithBlock: !!weekNumber })
            };

            if (footer && footer !== true) {
                footerTemplate = footer;
            }

            that.footer = footer !== false ? template(footerTemplate, { useWithBlock: false }) : null;
        }
    });

    ui.plugin(Calendar);

    var calendar = {
        firstDayOfMonth: function (date) {
            return createDate(
                date.getFullYear(),
                date.getMonth(),
                1
            );
        },

        firstVisibleDay: function (date, calendarInfo) {
            calendarInfo = calendarInfo || kendo.culture().calendar;

            var firstDay = calendarInfo.firstDay,
            firstVisibleDay = new DATE(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            firstVisibleDay.setFullYear(date.getFullYear());

            while (firstVisibleDay.getDay() != firstDay) {
                calendar.setTime(firstVisibleDay, -1 * MS_PER_DAY);
            }

            return firstVisibleDay;
        },

        setTime: function (date, time) {
            var tzOffsetBefore = date.getTimezoneOffset(),
            resultDATE = new DATE(date.getTime() + time),
            tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

            date.setTime(resultDATE.getTime() + tzOffsetDiff * MS_PER_MINUTE);
        },
        views: [{
            name: MONTH,
            title: function(date, min, max, culture) {
                return getCalendarInfo(culture).months.names[date.getMonth()] + " " + date.getFullYear();
            },
            content: function(options) {
                var that = this,
                idx = 0,
                min = options.min,
                max = options.max,
                date = options.date,
                dates = options.dates,
                format = options.format,
                culture = options.culture,
                navigateUrl = options.url,
                isWeekColumnVisible = options.isWeekColumnVisible,
                hasUrl = navigateUrl && dates[0],
                currentCalendar = getCalendarInfo(culture),
                firstDayIdx = currentCalendar.firstDay,
                days = currentCalendar.days,
                names = shiftArray(days.names, firstDayIdx),
                shortNames = shiftArray(days.namesShort, firstDayIdx),
                start = calendar.firstVisibleDay(date, currentCalendar),
                firstDayOfMonth = that.first(date),
                lastDayOfMonth = that.last(date),
                toDateString = that.toDateString,
                today = getToday(),
                html = '<table tabindex="0" role="grid" class="k-content" cellspacing="0" data-start="' + toDateString(start) + '"><thead><tr role="row">';
                if (isWeekColumnVisible) {
                    html += '<th scope="col" class="k-alt">' + options.messages.weekColumnHeader + '</th>';
                }

                for (; idx < 7; idx++) {
                    html += '<th scope="col" title="' + names[idx] + '">' + shortNames[idx] + '</th>';
                }

                adjustDST(today, 0);
                today = +today;

                return view({
                    cells: 42,
                    perRow: 7,
                    html: html += '</tr></thead><tbody><tr role="row">',
                    start: start,
                    isWeekColumnVisible: isWeekColumnVisible,
                    weekNumber: options.weekNumber,
                    min: createDate(min.getFullYear(), min.getMonth(), min.getDate()),
                    max: createDate(max.getFullYear(), max.getMonth(), max.getDate()),
                    content: options.content,
                    empty: options.empty,
                    setter: that.setDate,
                    disableDates: options.disableDates,
                    build: function(date, idx, disableDates) {
                        var cssClass = [],
                        day = date.getDay(),
                        linkClass = "",
                        url = "#";

                        if (date < firstDayOfMonth || date > lastDayOfMonth) {
                            cssClass.push(OTHERMONTH);
                        }

                        if (disableDates(date)) {
                            cssClass.push(DISABLED);
                        }

                        if (+date === today) {
                            cssClass.push("k-today");
                        }

                        if (day === 0 || day === 6) {
                            cssClass.push("k-weekend");
                        }

                        if (hasUrl && inArray(+date, dates)) {
                            url = navigateUrl.replace("{0}", kendo.toString(date, format, culture));
                            linkClass = " k-action-link";
                        }

                        return {
                            date: date,
                            dates: dates,
                            ns: kendo.ns,
                            title: kendo.toString(date, "D", culture),
                            value: date.getDate(),
                            dateString: toDateString(date),
                            cssClass: cssClass[0] ? ' class="' + cssClass.join(" ") + '"' : "",
                            linkClass: linkClass,
                            url: url
                        };
                    },
                    weekNumberBuild: function(date) {
                        return {
                            weekNumber: weekInYear(date, kendo.culture().calendar.firstDay),
                            currentDate: date
                        };
                    }
                });
            },
            first: function(date) {
                return calendar.firstDayOfMonth(date);
            },
            last: function(date) {
                var last = createDate(date.getFullYear(), date.getMonth() + 1, 0),
                first = calendar.firstDayOfMonth(date),
                timeOffset = Math.abs(last.getTimezoneOffset() - first.getTimezoneOffset());

                if (timeOffset) {
                    last.setHours(first.getHours() + (timeOffset / 60));
                }

                return last;
            },
            compare: function(date1, date2) {
                var result,
                month1 = date1.getMonth(),
                year1 = date1.getFullYear(),
                month2 = date2.getMonth(),
                year2 = date2.getFullYear();

                if (year1 > year2) {
                    result = 1;
                } else if (year1 < year2) {
                    result = -1;
                } else {
                    result = month1 == month2 ? 0 : month1 > month2 ? 1 : -1;
                }

                return result;
            },
            setDate: function(date, value) {
                var hours = date.getHours();
                if (value instanceof DATE) {
                    date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
                } else {
                    calendar.setTime(date, value * MS_PER_DAY);
                }
                adjustDST(date, hours);
            },
            toDateString: function(date) {
                return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
            }
        },
        {
            name: "year",
            title: function(date) {
                return date.getFullYear();
            },
            content: function(options) {
                var namesAbbr = getCalendarInfo(options.culture).months.namesAbbr,
                toDateString = this.toDateString,
                min = options.min,
                max = options.max;

                return view({
                    min: createDate(min.getFullYear(), min.getMonth(), 1),
                    max: createDate(max.getFullYear(), max.getMonth(), 1),
                    start: createDate(options.date.getFullYear(), 0, 1),
                    setter: this.setDate,
                    build: function(date) {
                        return {
                            value: namesAbbr[date.getMonth()],
                            ns: kendo.ns,
                            dateString: toDateString(date),
                            cssClass: ""
                        };
                    }
                });
            },
            first: function(date) {
                return createDate(date.getFullYear(), 0, date.getDate());
            },
            last: function(date) {
                return createDate(date.getFullYear(), 11, date.getDate());
            },
            compare: function(date1, date2){
                return compare(date1, date2);
            },
            setDate: function(date, value) {
                var month,
                hours = date.getHours();

                if (value instanceof DATE) {
                    month = value.getMonth();

                    date.setFullYear(value.getFullYear(), month, date.getDate());

                    if (month !== date.getMonth()) {
                        date.setDate(0);
                    }
                } else {
                    month = date.getMonth() + value;

                    date.setMonth(month);

                    if (month > 11) {
                        month -= 12;
                    }

                    if (month > 0 && date.getMonth() != month) {
                        date.setDate(0);
                    }
                }

                adjustDST(date, hours);
            },
            toDateString: function(date) {
                return date.getFullYear() + "/" + date.getMonth() + "/1";
            }
        },
        {
            name: "decade",
            title: function(date, min, max) {
                return title(date, min, max, 10);
            },
            content: function(options) {
                var year = options.date.getFullYear(),
                toDateString = this.toDateString;

                return view({
                    start: createDate(year - year % 10 - 1, 0, 1),
                    min: createDate(options.min.getFullYear(), 0, 1),
                    max: createDate(options.max.getFullYear(), 0, 1),
                    setter: this.setDate,
                    build: function(date, idx) {
                        return {
                            value: date.getFullYear(),
                            ns: kendo.ns,
                            dateString: toDateString(date),
                            cssClass: idx === 0 || idx == 11 ? OTHERMONTHCLASS : ""
                        };
                    }
                });
            },
            first: function(date) {
                var year = date.getFullYear();
                return createDate(year - year % 10, date.getMonth(), date.getDate());
            },
            last: function(date) {
                var year = date.getFullYear();
                return createDate(year - year % 10 + 9, date.getMonth(), date.getDate());
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 10);
            },
            setDate: function(date, value) {
                setDate(date, value, 1);
            },
            toDateString: function(date) {
                return date.getFullYear() + "/0/1";
            }
        },
        {
            name: CENTURY,
            title: function(date, min, max) {
                return title(date, min, max, 100);
            },
            content: function(options) {
                var year = options.date.getFullYear(),
                min = options.min.getFullYear(),
                max = options.max.getFullYear(),
                toDateString = this.toDateString,
                minYear = min,
                maxYear = max;

                minYear = minYear - minYear % 10;
                maxYear = maxYear - maxYear % 10;

                if (maxYear - minYear < 10) {
                    maxYear = minYear + 9;
                }

                return view({
                    start: createDate(year - year % 100 - 10, 0, 1),
                    min: createDate(minYear, 0, 1),
                    max: createDate(maxYear, 0, 1),
                    setter: this.setDate,
                    build: function(date, idx) {
                        var start = date.getFullYear(),
                        end = start + 9;

                        if (start < min) {
                            start = min;
                        }

                        if (end > max) {
                            end = max;
                        }

                        return {
                            ns: kendo.ns,
                            value: start + " - " + end,
                            dateString: toDateString(date),
                            cssClass: idx === 0 || idx == 11 ? OTHERMONTHCLASS : ""
                        };
                    }
                });
            },
            first: function(date) {
                var year = date.getFullYear();
                return createDate(year - year % 100, date.getMonth(), date.getDate());
            },
            last: function(date) {
                var year = date.getFullYear();
                return createDate(year - year % 100 + 99, date.getMonth(), date.getDate());
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 100);
            },
            setDate: function(date, value) {
                setDate(date, value, 10);
            },
            toDateString: function(date) {
                var year = date.getFullYear();
                return (year - year % 10) + "/0/1";
            }
        }]
    };

    function title(date, min, max, modular) {
        var start = date.getFullYear(),
            minYear = min.getFullYear(),
            maxYear = max.getFullYear(),
            end;

        start = start - start % modular;
        end = start + (modular - 1);

        if (start < minYear) {
            start = minYear;
        }
        if (end > maxYear) {
            end = maxYear;
        }

        return start + "-" + end;
    }

    function view(options) {
        var idx = 0,
            data,
            min = options.min,
            max = options.max,
            start = options.start,
            setter = options.setter,
            build = options.build,
            weekNumberBuild = options.weekNumberBuild,
            length = options.cells || 12,
            isWeekColumnVisible = options.isWeekColumnVisible,
            cellsPerRow = options.perRow || 4,
            weekNumber = options.weekNumber || weekNumberTemplate,
            content = options.content || cellTemplate,
            empty = options.empty || emptyCellTemplate,
            html = options.html || '<table tabindex="0" role="grid" class="k-content k-meta-view" cellspacing="0"><tbody><tr role="row">';
            if(isWeekColumnVisible) {
                html += weekNumber(weekNumberBuild(start));
            }


        for(; idx < length; idx++) {
            if (idx > 0 && idx % cellsPerRow === 0) {
                html += '</tr><tr role="row">';
                if(isWeekColumnVisible) {
                    html += weekNumber(weekNumberBuild(start));
                }
            }

            start = createDate(start.getFullYear(), start.getMonth(), start.getDate());
            adjustDST(start, 0);

            data = build(start, idx, options.disableDates);

            html += isInRange(start, min, max) ? content(data) : empty(data);

            setter(start, 1);
        }

        return html + "</tr></tbody></table>";
    }

    function compare(date1, date2, modifier) {
        var year1 = date1.getFullYear(),
            start  = date2.getFullYear(),
            end = start,
            result = 0;

        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }

        if (year1 > end) {
            result = 1;
        } else if (year1 < start) {
            result = -1;
        }

        return result;
    }

    function getToday() {
        var today = new DATE();
        return new DATE(today.getFullYear(), today.getMonth(), today.getDate());
    }

    function restrictValue (value, min, max) {
        var today = getToday();

        if (value) {
            today = new DATE(+value);
        }

        if (min > today) {
            today = new DATE(+min);
        } else if (max < today) {
            today = new DATE(+max);
        }
        return today;
    }

    function isInRange(date, min, max) {
        return +date >= +min && +date <= +max;
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    function setDate(date, value, multiplier) {
        value = value instanceof DATE ? value.getFullYear() : date.getFullYear() + multiplier * value;
        date.setFullYear(value);
    }

    function daysBetweenTwoDates(startDate, endDate) {
        if(+endDate < +startDate) {
            var temp = +startDate;
            calendar.views[0].setDate(startDate, endDate);
            calendar.views[0].setDate(endDate, new Date(temp));
        }
        var fromDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        var endDateUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        return Math.ceil((+endDateUTC - +fromDateUTC) / kendo.date.MS_PER_DAY);
    }

    function addDaysToArray(array, numberOfDays, fromDate, disableDates) {
        for(var i = 0; i <= numberOfDays; i++) {
            var nextDay = new Date(fromDate.getTime());
            nextDay = new Date(nextDay.setDate(nextDay.getDate() + i));
            if(!disableDates(nextDay)) {
                array.push(nextDay);
            }
        }
    }

    function mousetoggle(e) {
        var disabled = $(this).hasClass("k-state-disabled");

        if (!disabled) {
            $(this).toggleClass(HOVER, MOUSEENTER.indexOf(e.type) > -1 || e.type == FOCUS);
        }
    }

    function prevent (e) {
        e.preventDefault();
    }

    // creates date with full year
    function createDate(year, month, date) { 
        var dateObject = new DATE(year, month, date);
        dateObject.setFullYear(year, month, date);
        return dateObject;
    }

    function getCalendarInfo(culture) {
        return getCulture(culture).calendars.standard;
    }

    function normalize(options) {
        var start = views[options.start],
            depth = views[options.depth],
            culture = getCulture(options.culture);

        options.format = extractFormat(options.format || culture.calendars.standard.patterns.d);

        if (isNaN(start)) {
            start = 0;
            options.start = MONTH;
        }

        if (depth === undefined || depth > start) {
            options.depth = MONTH;
        }

        if (options.dates === null) {
            options.dates = [];
        }
    }

    function makeUnselectable(element) {
        if (isIE8) {
            element.find("*").attr("unselectable", "on");
        }
    }

    function addClassToViewContainer(element, currentView) {
        element.addClass("k-" + currentView);
    }

    function inArray(date, dates) {
        for(var i = 0, length = dates.length; i < length; i++) {
            if (date === +dates[i]) {
                return true;
            }
        }
        return false;
    }

    function isEqualDatePart(value1, value2) {
        if (value1) {
            return value1.getFullYear() === value2.getFullYear() &&
                value1.getMonth() === value2.getMonth() &&
                value1.getDate() === value2.getDate();
        }

        return false;
    }

    function isEqualMonth(value1, value2) {
        if (value1) {
            return value1.getFullYear() === value2.getFullYear() &&
                value1.getMonth() === value2.getMonth();
        }

        return false;
    }


    function getDisabledExpr(option) {
        if (kendo.isFunction(option)) {
            return option;
        }

        if ($.isArray(option)) {
            return createDisabledExpr(option);
        }
        return $.noop;
    }

    function convertDatesArray(dates) {
        var result = [];
        for (var i = 0; i < dates.length; i++) {
            result.push(dates[i].setHours(0, 0, 0, 0));
        }
        return result;
    }

    function createDisabledExpr(dates) {
        var body, callback,
            disabledDates = [],
            days = ["su", "mo", "tu", "we", "th", "fr", "sa"],
            searchExpression = "if (found) {"+
                    " return true " +
                "} else {" +
                    "return false" +
                "}";

        if (dates[0] instanceof DATE) {
            disabledDates = convertDatesArray(dates);
            body = "var found = date && window.kendo.jQuery.inArray(date.setHours(0, 0, 0, 0),["+ disabledDates +"]) > -1;" + searchExpression;
        } else {
            for (var i = 0; i < dates.length; i++) {
                var day = dates[i].slice(0,2).toLowerCase();
                var index = $.inArray(day, days);
                if (index > -1) {
                    disabledDates.push(index);
                }
            }
            body = "var found = date && window.kendo.jQuery.inArray(date.getDay(),["+ disabledDates +"]) > -1;" + searchExpression;
        }

        callback = new Function("date", body); //jshint ignore:line

        return callback;
    }

    function isEqualDate(oldValue, newValue) {
       if (oldValue instanceof Date && newValue instanceof Date) {
           oldValue = oldValue.getTime();
           newValue = newValue.getTime();
       }

       return oldValue === newValue;
    }

    calendar.isEqualDatePart = isEqualDatePart;
    calendar.isEqualDate = isEqualDate;
    calendar.makeUnselectable =  makeUnselectable;
    calendar.restrictValue = restrictValue;
    calendar.isInRange = isInRange;
    calendar.addClassToViewContainer = addClassToViewContainer;
    calendar.normalize = normalize;
    calendar.viewsEnum = views;
    calendar.disabled = getDisabledExpr;

    kendo.calendar = calendar;
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
