kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is an event calendar.",
    depends: [ "core", "binder", "popup", "calendar" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Class = kendo.Class,
        Widget = ui.Widget,
        FUNCTION = "function",
        STRING = "string",
        Popup = ui.Popup,
        Calendar = ui.Calendar,
        isPlainObject = $.isPlainObject,
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        extend = $.extend,
        proxy = $.proxy,
        isArray = $.isArray,
        NS = ".kendoScheduler",
        CHANGE = "change",
        TODAY = new Date(),
        TOOLBARTEMPLATE = kendo.template('<div class="k-floatwrap k-header k-scheduler-toolbar">' +
            '<ul class="k-reset k-header k-toolbar k-scheduler-navigation">' +
               '<li class="k-state-default k-nav-today"><a href="\\#" class="k-link">${messages.today}</a></li>' +
               '<li class="k-state-default k-nav-prev"><a href="\\#" class="k-link"><span class="k-icon k-i-arrow-w"></span></a></li>' +
               '<li class="k-state-default k-nav-next"><a href="\\#" class="k-link"><span class="k-icon k-i-arrow-e"></span></a></li>' +
               '<li class="k-state-default k-nav-current"><a href="\\#" class="k-link"><span class="k-icon k-i-calendar"></span><span data-#=ns#bind="text: formattedDate"></span></a></li>' +
            '</ul>' +
            '<ul class="k-reset k-header k-toolbar k-scheduler-views">' +
                '#for(var view in views){#' +
                    '<li class="k-state-default k-view-#=view#" data-#=ns#name="#=view#"><a href="\\#" class="k-link">${views[view].title}</a></li>' +
                '#}#'  +
            '</ul>' +
            '</div>'),
        DAY_VIEW_EVENT_TEMPLATE = kendo.template('<div class="k-appointment">' +
                '<dl>' +
                    '<dt>${formattedTime}</dt>' +
                    '<dd>${title}</dd>' +
                '</dl>' +
                //'<a href="#" class="k-link"><span class="k-icon k-i-close"></span></a>' +
                //'<span class="k-icon k-resize-handle"></span>' +
                '</div>'),
        DAY_VIEW_ALL_DAY_EVENT_TEMPLATE = kendo.template('<div class="k-appointment">' +
                '<dl><dd>${title}</dd></dl>' +
                //'<a href="#" class="k-link"><span class="k-icon k-i-close"></span></a>' +
                //'<span class="k-icon k-resize-handle"></span>' +
            '</div>');

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    TODAY = getDate(new Date());

    function setTime(date, time, ignoreDST) {
        var offset = date.getTimezoneOffset(),
            offsetDiff;

        date.setTime(date.getTime() + time);

        if (!ignoreDST) {
            offsetDiff = date.getTimezoneOffset() - offset;
            date.setTime(date.getTime() + offsetDiff * MS_PER_MINUTE);
        }
    }

    function dst() {
        var today = new Date(),
            midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
            noon = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);

        return -1 * (midnight.getTimezoneOffset() - noon.getTimezoneOffset());
    }

    function getMilliseconds(date) {
        return date.getHours() * 60 * MS_PER_MINUTE + date.getMinutes() * MS_PER_MINUTE + date.getSeconds() * 1000 + date.getMilliseconds();
    }

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        return options;
    }

    var Scheduler = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            if (!that.options.views || !that.options.views.length) {
                that.options.views = ["day", "week"];
            }

            that._initModel();

            that._wrapper();

            that._views();

            that._toolbar();

            that._dataSource();

            that.view(that._selectedViewName);

            that._resizeHandler = proxy(that._resize, that);

            $(window).on("resize" + NS, that._resizeHandler);
        },

        options: {
            name: "Scheduler",
            selectDate: TODAY,
            messages: {
                today: "Today"
            },
            views: []
        },

        events: [],

        destroy: function() {
            var that = this,
                element;

            Widget.fn.destroy.call(that);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            }

            if (that.calendar) {
                that.calendar.destroy();
                that.popup.destroy();
            }

            element = that.element
                .add(that.wrapper)
                .add(that.toolbar)
                .add(that.popup);

            element.off(NS);

            $(window).off("resize" + NS, that._resizeHandler);

            kendo.destroy(that.wrapper);
        },

        view: function(name) {
            var that = this;

            if (name) {
                if (that._selectedViewName !== name) {
                    that.views[that._selectedViewName].destroy();
                }

                that._renderView(name);
                that._selectedViewName = name;

                that.toolbar
                    .find(".k-scheduler-views li")
                    .removeClass("k-state-selected")
                    .end()
                    .find(".k-view-" + name)
                    .addClass("k-state-selected");

                that.rebind();

                return;
            }
            return that.views[that._selectedViewName];
        },

        _renderView: function(name) {
            var view = this.views[name];

            view.render(this.selectDate());

            this._model.set("formattedDate", view.dateForTitle());
        },

        _resize: function() {
            this.refresh();
        },

        _views: function() {
            var views = this.options.views,
                view,
                defaultView,
                selected,
                isSettings,
                name,
                idx,
                length;

            this.views = {};

            for (idx = 0, length = views.length; idx < length; idx++) {
                view = views[idx];

                isSettings = isPlainObject(view);
                name = isSettings && view.name ? view.name : view;

                defaultView = defaultViews[name];

                if (defaultView) {
                    view = new defaultView(this.wrapper, trimOptions(extend({}, this.options, isSettings ? view : {})));
                } else {
                    view = new view(this.wrapper, trimOptions(extend({}, this.options)));
                }

                if (view) {
                    this.views[view.name] = view;

                    if (!selected || (view.selected || view.options.selected)) {
                        selected = view.name;
                    }
                } else {
                    throw new Error("There is no such view");
                }
            }

            if (selected) {
                this._selectedViewName = selected; // toolbar is not rendered yet
            }
        },

        rebind: function() {
            var view = this.view();

            this.dataSource.filter({
                logic: "or",
                filters: [
                    { field: "start", operator: "gte", value: view.startDate }
                    //{ field: "start", operator: "lte", value: view.endDate }
                ]
            });
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource
                    .unbind(CHANGE, that._refreshHandler);
                    //.unbind(ERROR, that._errorHandler);
            } else {
                //that._errorHandler = proxy(that._error, that);
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                .bind(CHANGE, that._refreshHandler);
                //.bind(ERROR, that._errorHandler);
        },


        _initModel: function() {
            var that = this;
            that._model = kendo.observable({
               selectedDate: this.options.selectDate,
               formattedDate: ""
           });

           that._model.bind("change", function(e) {
                if (e.field === "selectedDate") {
                    that._renderView(that.view().name);
                    that.rebind();
                }
           });
        },

        _wrapper: function() {
            var that = this,
                height = that.options.height;

            that.wrapper = that.element;
            that.wrapper.addClass("k-widget k-scheduler k-floatwrap");

            if (height) {
                that.wrapper.css("height", height);
            }
        },

        selectDate: function(value) {
            if (value != null) {
                this._model.set("selectedDate", value);
            }
            return getDate(this._model.get("selectedDate"));
        },

        _toolbar: function() {
            var that = this,
                options = that.options,
                toolbar = $(TOOLBARTEMPLATE({
                    messages: options.messages,
                    ns: kendo.ns,
                    views: that.views
                }));

            that.wrapper.append(toolbar);
            that.toolbar = toolbar;

            kendo.bind(that.toolbar, that._model);

            toolbar.on("click" + NS, ".k-scheduler-navigation li", function(e) {
                var li = $(this),
                    date = new Date(that.selectDate());

                e.preventDefault();

                if (li.hasClass("k-nav-today")) {
                    date = new Date();
                } else if (li.hasClass("k-nav-next")) {
                    date = that.view().nextDate();
                } else if (li.hasClass("k-nav-prev")) {
                    date = that.view().previousDate();
                } else if (li.hasClass("k-nav-current")) {
                    that._showCalendar();
                    return; // TODO: Not good - refactor
                }

                that.selectDate(date);

            });

            toolbar.on("click" + NS, ".k-scheduler-views li", function(e) {
                that.view($(this).attr(kendo.attr("name")));
                e.preventDefault();
            });
        },

        _showCalendar: function() {
            var that = this,
                target = that.toolbar.find(".k-nav-current"),
                html = $('<div><div class="k-scheduler-calendar"/></div>');

            if (!that.popup) {
                that.popup = new Popup(html, {
                    anchor: target,
                    activate: function() {
                        if (!that.calendar) {
                            that.calendar = new Calendar(this.element.find(".k-scheduler-calendar"),
                            {
                                change: function() {
                                    that.selectDate(this.value());
                                    that.popup.close();
                                }
                            });
                        }
                        that.calendar.value(that.selectDate());
                    },
                    copyAnchorStyles: false
                });
            }

            that.popup.open();
        },

        refresh: function() {
            this.view().dataBind(this.dataSource.view());
        }
    });

    function executeTemplate(template, options, dataItem) {
        var settings = extend({}, kendo.Template, options.templateSettings),
            type = typeof(template),
            text = "";

        if (type === FUNCTION) {
            text = kendo.template(template, settings)(dataItem || {});
        } else if (type === STRING) {
            text = template;
        }
        return text;
    }

    function createTable(dates, cellAction) {
        var idx,
            length,
            html ='<table class="k-scheduler-table">';

        html += '<colgroup>' + (new Array(dates.length + 1).join('<col />')) + '</colgroup>';
        html += '<tbody><tr>';

        for (idx = 0, length = dates.length; idx < length; idx++) {
            html += cellAction(dates[idx]);
        }

        html += '</tr></tbody></table>';

        return html;
    }

    var MultiDayView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;
        },

        options: {
            name: "MultiDayView",
            headerDateFormat: "ddd M/dd",
            eventTimeFormat: "{0:H:mm} - {1:H:mm}",
            timeFormat: "HH:mm",
            selectedDateFormat: "{0:D}",
            allDaySlot: true,
            title: "",
            startTime: TODAY,
            endTime: TODAY,
            numberOfTimeSlots: 2,
            majorTick: 60,
            majorTickTimeTemplate: kendo.template("<em>#=kendo.toString(date, format)#</em>"),
            minorTickTimeTemplate: "&nbsp;",
            eventTemplate: DAY_VIEW_EVENT_TEMPLATE,
            allDayEventTemplate: DAY_VIEW_ALL_DAY_EVENT_TEMPLATE
        },

        dateForTitle: function() {
            return kendo.format(this.options.selectedDateFormat, this.startDate, this.endDate);
        },

        _header: function(dates) {
            if (!this.timesHeader) {
                this.timesHeader = $('<div class="k-scheduler-times">' +
                        '<table class="k-scheduler-table">' +
                        '<colgroup> <col /> </colgroup>' +
                        '<tbody>' +
                            '<tr><th>&nbsp;</th></tr>' +
                            (this.options.allDaySlot ? '<tr><th>all day</th></tr>' : '') +
                        '</tbody>' +
                    '</table>' +
                '</div>');

                this.element.append(this.timesHeader);
            }

            this._renderDatesHeader(dates);
        },

        _footer: function() {
            if (!this.footer) {
                var html = '<div class="k-floatwrap k-header k-scheduler-footer">&nbsp;';
                //'<ul class="k-reset k-header k-toolbar"></ul>';

                //TODO: Toolbar command

                html += "</div>";

                this.footer = $(html).appendTo(this.element);
            }
        },

        _renderDatesHeader: function(dates) {
            var that = this,
                header = that.element.find(".k-scheduler-header-wrap"),
                html,
                allDayHtml;

            if (!header.length) {
                header = $('<div class="k-scheduler-header-wrap"/>');

                $('<div class="k-scheduler-header k-state-default"/>')
                    .append(header)
                    .appendTo(that.element);
            } else {
                header.empty();
            }

            html = createTable(dates, function(date) {
                var content = '<th';
                content += (getDate(date).getTime() === getDate(TODAY).getTime() ? ' class="k-today"' : "");
                content += '>' + kendo.toString(date, that.options.headerDateFormat) + '</th>';
                return content;
            });

            if (that.options.allDaySlot) {
                allDayHtml = createTable(dates, function(date) {
                    var content = '<td';
                    content += (getDate(date).getTime() === getDate(TODAY).getTime() ? ' class="k-today"' : "");
                    content += '>&nbsp;</td>';
                    return content;
                });
                that.allDayHeader = $(allDayHtml);
            }

            that.datesHeader = header.append(html)
                                    .append(that.allDayHeader)
                                    .parent();
        },

        _forTimeRange: function(min, max, action, after) {
            var that = this,
                offset = dst(),
                ignoreDST = offset < 0,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / that.options.numberOfTimeSlots || 1,
                start = new Date(+min),
                startDay = start.getDate(),
                msStart,
                idx = 0, length,
                html = "";

            if (ignoreDST) {
                length = (MS_PER_DAY + (offset * MS_PER_MINUTE)) / msInterval;
            } else {
                length = MS_PER_DAY / msInterval;
            }

            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                length = ((msMax - msMin) / msInterval);
            }

            length = Math.round(length);

            for (; idx < length; idx++) {
                html += action(start, idx % (msMajorInterval/msInterval) === 0);

                setTime(start, msInterval, ignoreDST);
            }

            if (msMax) {
                msStart = getMilliseconds(start);
                if (startDay < start.getDate()) {
                    msStart += MS_PER_DAY;
                }

                if (msStart > msMax) {
                    start = new Date(+max);
                }
            }

            if (after) {
                html += after(start);
            }

            return html;
        },

        _times: function() {
            var that = this,
                options = that.options,
                start = options.startTime,
                end = options.endTime,
                majorTickTimeTemplate = options.majorTickTimeTemplate,
                minorTickTimeTemplate = options.minorTickTimeTemplate,
                template,
                format = options.timeFormat,
                html = '<div class="k-scheduler-times"><table class="k-scheduler-table"><colgroup><col /></colgroup><tbody>';

            html += this._forTimeRange(start, end, function(date, majorTick) {
                var content = "<tr><th>";

                if (majorTick) {
                   template = majorTickTimeTemplate;
                } else {
                   template = minorTickTimeTemplate;
                }

                content += executeTemplate(template, options, { format: format, date: date });
                content += "</th></tr>";

                return content;
            }, function(date) {
                return '<tr class="k-last"><th>' + executeTemplate(majorTickTimeTemplate, options, { format: format, date: date }) + '</th></tr>';
            });

            html += '</tbody></table></div>';

            this.times = $(html);
            this.element.append(this.times);
        },

        _content: function(dates) {
            var that = this,
                options = that.options,
                start = options.startTime,
                end = options.endTime,
                wrapper = this.element.find(".k-scheduler-content"),
                html = '<table class="k-scheduler-table">';

            if (!wrapper.length) {
                wrapper = $('<div class="k-scheduler-content"/>').appendTo(this.element);

                wrapper.bind("scroll" + NS, function () {
                    that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(this.scrollLeft);
                    that.times.scrollTop(this.scrollTop);
                });

                var touchScroller = kendo.touchScroller(wrapper);
                if (touchScroller && touchScroller.movable) {
                    touchScroller.movable.bind("change", function(e) {
                        that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(-e.sender.x);
                        that.times.scrollTop(-e.sender.y);
                    });
                }

            } else {
                wrapper.empty();
            }

            html += '<colgroup>' + (new Array(dates.length + 1).join('<col />')) + '</colgroup>';
            html += '<tbody>';

            html += this._forTimeRange(start, end, function(date, majorTick) {
                var content = "",
                    idx,
                    length;

                content = '<tr' + (majorTick ? ' class="k-middle-row"' : "") + '>';

                for (idx = 0, length = dates.length; idx < length; idx++) {
                    content += "<td" + (getDate(dates[idx]).getTime() === getDate(TODAY).getTime() ? ' class="k-today"' : "") + ">";
                    content += "&nbsp;</td>";
                }

                content += "</tr>";
                return content;
            });
            html += '</tbody>';
            html += '</table>';

            this.content = wrapper.append(html);
        },

        _setContentHeight: function() {
            var that = this,
                toolbar = that.element.find(">.k-scheduler-toolbar"),
                height = that.element.innerHeight(),
                headerHeight = 0,
                scrollbar = kendo.support.scrollbar();

            if (toolbar.length) {
                height -= toolbar.outerHeight();
            }

            if (that.datesHeader) {
                headerHeight = that.datesHeader.outerHeight();
            }

            if (that.timesHeader && that.timesHeader.outerHeight() > headerHeight) {
                headerHeight = that.timesHeader.outerHeight();
            }

            if (headerHeight) {
                height -= headerHeight;
            }

            if (that.footer) {
                height -= that.footer.outerHeight();
            }

            var isSchedulerHeightSet = function(el) {
                var initialHeight, newHeight;
                if (el[0].style.height) {
                    return true;
                } else {
                    initialHeight = el.height();
                }

                el.height("auto");
                newHeight = el.height();

                if (initialHeight != newHeight) {
                    el.height("");
                    return true;
                }
                el.height("");
                return false;
            };

            if (isSchedulerHeightSet(that.element)) { // set content height only if needed
                if (height > scrollbar * 2) { // do not set height if proper scrollbar cannot be displayed
                    that.content.height(height);
                } else {
                    that.content.height(scrollbar * 2 + 1);
                }
                that.times.height(that.content.height());
            }
        },

        _render: function(dates) {
            dates = dates || [];

            this._dates = dates;

            this.startDate = dates[0];
            this.endDate = dates[(dates.length - 1) || 0];

            this._header(dates);

            if (!(this.times && this.times.length)) {
                this._times();
            }

            this._content(dates);

            this._footer();

            this._setContentHeight();
        },

        nextDate: function() {
            var end = new Date(this.endDate);
            setTime(end, MS_PER_DAY);
            return end;
        },

        previousDate: function() {
            var start = new Date(this.startDate);
            setTime(start, -MS_PER_DAY);
            return start;
        },

        render: function(selectedDate) {
            this._render([selectedDate]);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(this);

            if (that.content) {
                that.content
                    .add(that.times)
                    .add(that.timesHeader)
                    .add(that.datesHeader)
                    .add(that.footer)
                    .remove()
                    .empty();

                that.content = null;
                that.times = null;
                that.timesHeader = null;
                that.datesHeader = null;
                that.footer = null;
            }
        },

        _timeSlotIndex: function(date) {
            var options = this.options,
                eventStartTime = getMilliseconds(date),
                startTime = getMilliseconds(options.startTime),
                timeSlotInterval = ((options.majorTick/options.numberOfTimeSlots) * MS_PER_MINUTE);

            return (eventStartTime - startTime) / (timeSlotInterval);
        },

        _dateSlotIndex: function(date) {
            var idx,
                length,
                slots = this._dates || [],
                startTime = getMilliseconds(new Date(+this.options.startTime)),
                endTime = getMilliseconds(new Date(+this.options.endTime)),
                slotStart,
                slotEnd;

            if (startTime >= endTime) {
                endTime += MS_PER_DAY;
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = new Date(+slots[idx]);
                setTime(slotStart, startTime);
                slotEnd = new Date(+slots[idx]);
                setTime(slotEnd, endTime);

                if (date.getTime() >= slotStart.getTime() && date.getTime() <= slotEnd.getTime()) {
                    return idx;
                }
            }
            return -1;
        },

        _positonAllDayEvent: function(element, slots, startIndex, endIndex, slotWidth) {
            if (startIndex < 0) {
                startIndex = 0;
            }

            if (endIndex < 0) {
                endIndex = slots.length - 1;
            }

            var dateSlot = slots.eq(startIndex),
                numberOfSlots = Math.ceil(endIndex - startIndex);
                //allDayEventOffset = 10;

                element.offset(dateSlot.offset())
                    .css({
                        width: slotWidth * (numberOfSlots + 1)
                        //height: dateSlot.height() - allDayEventOffset
                    });
        },

        _positionEvent: function(event, element, slots, dateSlotIndex, slotHeight) {
            var startIndex = this._timeSlotIndex(event.start),
                endIndex = Math.ceil(this._timeSlotIndex(event.end)),
                eventRightOffset = 30,
                timeSlot = slots.eq(Math.floor(startIndex)),
                dateSlot = slots.children().eq(dateSlotIndex);

            element.offset({
                    top: timeSlot.offset().top,
                    left: dateSlot.offset().left,
                })
                .css({
                    height: slotHeight * (Math.ceil(endIndex - startIndex) || 1),
                    width: dateSlot.width() - eventRightOffset
                });
        },

        _createEventElement: function(event, template) {
            return $(template(extend({}, {
                formattedTime: kendo.format(this.options.eventTimeFormat, event.start, event.end)
            }, event)));
        },

        dataBind: function(events) {
            var eventTemplate = kendo.template(this.options.eventTemplate),
                allDayEventTemplate = kendo.template(this.options.allDayEventTemplate),
                timeSlots = this.content.find("tr"),
                allDaySlots = this.allDayHeader ? this.allDayHeader.find("td") : $(),
                allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap"),
                slotHeight = Math.floor(this.content.find(">table:first").height() / timeSlots.length),
                dateSlotLength = this.datesHeader.find("th").length,
                slotWidth = this.datesHeader.find("table:first th:first").innerWidth(),
                eventTimeFormat = this.options.eventTimeFormat,
                event,
                idx,
                length;

            this.element.find(".k-appointment").remove();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

               var dateSlotIndex = this._dateSlotIndex(event.start),
                   endDateSlotIndex = this._dateSlotIndex(event.end),
                   element,
                   isAllDay = dateSlotIndex !== endDateSlotIndex || (event.start < this.startDate && event.end > this.endDate);

                if (dateSlotIndex > -1 || isAllDay) {
                    element = this._createEventElement(event, isAllDay ? allDayEventTemplate : eventTemplate)
                                    .appendTo(isAllDay ? allDayEventContainer : this.content);

                    if (isAllDay) {
                        this._positonAllDayEvent(element, allDaySlots, dateSlotIndex, endDateSlotIndex, slotWidth);
                    } else {
                        this._positionEvent(event, element, timeSlots, dateSlotIndex, slotHeight, eventTimeFormat);
                    }

                }
            }
        }
    });

    extend(true, kendo.ui, {
       MultiDayView: MultiDayView
    });

    var defaultViews = {
        day: MultiDayView.extend({
            options: {
                title: "Day"
            },
            name: "day"
        }),

        week: MultiDayView.extend({
            options: {
                title: "Week",
                selectedDateFormat: "{0:D} - {1:D}"
            },
            name: "week",
            render: function(selectedDate) {
                var start = new Date(selectedDate),
                    weekDay = selectedDate.getDay(),
                    dates = [],
                    idx, length;

                start.setDate(start.getDate() - weekDay);

                for (idx = 0, length = 7; idx < length; idx++) {
                    dates.push(new Date(+start));
                    setTime(start, MS_PER_DAY, true);
                }

                this._render(dates);
            }
        })
    };

    var RRule = Class.extend({
        init: function(options) {
        }
    });

    var FREQUENCY = {
        "SECONDLY": 0,
        "MINUTELY": 1,
        "HOURLY": 2,
        "DAILY": 3,
        "WEEKLY": 4,
        "MONTHLY": 5,
        "YEARLY": 6
    };

    var WEEK_DAYS = {
        "SU": 0,
        "MO": 1,
        "TU": 2,
        "WE": 3,
        "TH": 4,
        "FR": 5,
        "SA": 6
    };

    var DATE_FORMATS = [
        "yyyy-MM-ddTHH:mm:ss.fffzzz",
        "yyyy-MM-ddTHH:mm:sszzz",
        "yyyy-MM-ddTHH:mm:ss",
        "yyyy-MM-ddTHH:mm",
        "yyyy-MM-ddTHH",
        "yyyy-MM-dd",
        "yyyyMMddTHHmmssfffzzz",
        "yyyyMMddTHHmmsszzz",
        "yyyyMMddTHHmmss",
        "yyyyMMddTHHmm",
        "yyyyMMddTHH",
        "yyyyMMdd"
    ];

    function parseArray(list, range) {
        var idx = 0,
            length = list.length,
            value;

        for (; idx < length; idx++) {
            value = parseInt(list[idx], 10);
            if (isNaN(value) || value < range.start || value > range.end || (value === 0 && range.start < 0)) {
                return null;
            }

            list[idx] = value;
        }

        return list;
    }

    function parseWeekDayList(list) {
        var idx = 0, length = list.length,
            value, valueLength, day;

        for (; idx < length; idx++) {
            value = list[idx];
            valueLength = value.length;
            day = value.substring(valueLength - 2).toUpperCase();

            if (WEEK_DAYS[day] === undefined) {
                return null;
            }

            list[idx] = {
                offset: parseInt(value.substring(0, valueLength - 2), 10) || 1,
                day: day
            };
        }
        return list;
    }

    var rrule_parse = function(rrule) {
        var result = {},
            property,
            splits, value,
            idx = 0, length,
            weekStart;

        if (rrule.substring(0, 6) === "RRULE:") {
            rrule = rrule.substring(6);
        }

        rrule = rrule.split(";");
        length = rrule.length;

        for (; idx < length; idx++) {
            property = rrule[idx];
            splits = property.split("=");
            value = $.trim(splits[1]).split(",");

            switch ($.trim(splits[0]).toUpperCase()) {
                case "FREQ":
                    result.freq = value[0].toUpperCase();
                    break;
                case "UNTIL":
                    result.until = kendo.parseDate(value[0], DATE_FORMATS);
                    break;
                case "COUNT":
                    result.count = parseInt(value[0], 10);
                    break;
                case "INTERVAL":
                    result.interval = parseInt(value[0], 10);
                    break;
                case "BYSECOND":
                    result.seconds = parseArray(value, { start: 0, end: 60 });
                    break;
                case "BYMINUTE":
                    result.minutes = parseArray(value, { start: 0, end: 59 });
                    break;
                case "BYHOUR":
                    result.hours = parseArray(value, { start: 0, end: 23 });
                    break;
                case "BYMONTHDAY":
                    result.monthDays = parseArray(value, { start: -31, end: 31 });
                    break;
                case "BYYEARDAY":
                    result.yearDays = parseArray(value, { start: -366, end: 366 });
                    break;
                case "BYMONTH":
                    result.months = parseArray(value, { start: 1, end: 12 });
                    break;
                case "BYDAY":
                    result.weekDays = parseWeekDayList(value);
                    break;
                case "BYSETPOS":
                    result.setPositions = parseArray(value, { start: 1, end: 366 });
                    break;
                case "BYWEEKNO":
                    result.weekNumber = parseArray(value, { start: 1, end: 53 });
                    break;
                case "WKST":
                    weekStart = value[0];
                    if (WEEK_DAYS[weekStart] === undefined) {
                        weekStart = null;
                    }

                    result.weekStart = weekStart;
                    break;
            }
        }

        return result;
    };

    kendo.rrule_parse = rrule_parse;

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
