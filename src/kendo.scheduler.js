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
        REMOVE = "remove",
        ADD = "add",
        EDIT = "edit",
        DELETECONFIRM = "Are you sure you want to delete this event?",
        /*FREQUENCY = {
            "SECONDLY": 0,
            "MINUTELY": 1,
            "HOURLY": 2,
            "DAILY": 3,
            "WEEKLY": 4,
            "MONTHLY": 5,
            "YEARLY": 6
        },*/
        WEEK_DAYS = {
            "SU": 0,
            "MO": 1,
            "TU": 2,
            "WE": 3,
            "TH": 4,
            "FR": 5,
            "SA": 6
        },
        DATE_FORMATS = [
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
        ],
        MONTHS = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31],
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
        DAY_VIEW_EVENT_TEMPLATE = kendo.template('<div class="k-appointment" title="${titleAttr}" data-#=ns#uid="#=uid#">' +
                '<dl>' +
                    '<dt>${formattedTime}</dt>' +
                    '<dd>${title}</dd>' +
                '</dl>' +
                '#if (showDelete) {#' +
                    '<a href="\\#" class="k-link" style="display:none"><span class="k-icon k-i-close"></span></a>' +
                '#}#' +
                //'<span class="k-icon k-resize-handle"></span>' +
                '</div>'),
        DAY_VIEW_ALL_DAY_EVENT_TEMPLATE = kendo.template('<div class="k-appointment" title="${titleAttr}" data-#=ns#uid="#=uid#">' +
                '<dl><dd>${title}</dd></dl>' +
                '#if (showDelete) {#' +
                    '<a href="\\#" class="k-link" style="display:none"><span class="k-icon k-i-close"></span></a>' +
                '#}#' +
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

    function isInTimeRange(value, min, max) {
        var msMin = getMilliseconds(min),
            msMax = getMilliseconds(max),
            msValue;

        if (!value || msMin == msMax) {
            return true;
        }

        if (min >= max) {
            max += MS_PER_DAY;
        }

        msValue = getMilliseconds(value);

        if (msMin > msValue) {
            msValue += MS_PER_DAY;
        }

        if (msMax < msMin) {
            msMax += MS_PER_DAY;
        }

        return msValue >= msMin && msValue <= msMax;
    }

    function isInDateRange(value, min, max) {
        var msMin = min.getTime(),
            msMax = max.getTime(),
            msValue;

        if (msMin >= msMax) {
            msMax += MS_PER_DAY;
        }

        msValue = value.getTime();

        return msValue >= msMin && msValue <= msMax;
    }

    function trimOptions(options) {
        delete options.name;
        delete options.remove;
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
            editable: true,
            messages: {
                today: "Today"
            },
            views: []
        },

        events: [
            REMOVE
        ],

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

        _modelForContainer: function(container) {
            container = $(container).closest(".k-appointment");

            var id = container.attr(kendo.attr("uid"));

            return this.dataSource.getByUid(id);
        },

        _showMessage: function(text) {
            return window.confirm(text);
        },

        _confirmation: function() {
            var that = this,
                editable = that.options.editable,
                confirmation = editable === true || typeof editable === STRING ? DELETECONFIRM : editable.confirmation;

            return confirmation !== false && confirmation != null ? that._showMessage(confirmation) : true;
        },

        addEvent: function(eventInfo) {
            var dataSource = this.dataSource;
            var event = dataSource._createNewModel();

            if (event instanceof kendo.data.Model) {
                event.accept(eventInfo);
            } else {
                event = extend({ title: "" }, event, eventInfo);
            }

            this.dataSource.add(event);
        },

        removeEvent: function(element) {
            var model = this._modelForContainer(element);

            if (!this._confirmation()) {
                return;
            }

            if (model && !this.trigger(REMOVE, { element: element, event: model })) {
                if (this.dataSource.remove(model)) {
                    this.dataSource.sync();
                }
            }
        },

        _unbindView: function(view) {
            view.destroy();
        },

        _bindView: function(view) {
            var that = this;

            if (that.options.editable) {
                if (that._viewRemoveHandler) {
                    view.unbind(REMOVE, that._viewRemoveHandler);
                }

                that._viewRemoveHandler = function(e) {
                    that.removeEvent(e.container);
                };

                view.bind(REMOVE, that._viewRemoveHandler);

                if (that._viewAddHandler) {
                    view.unbind(ADD, that._viewAddHandler);
                }

                that._viewAddHandler = function(e) {
                    that.addEvent(e.eventInfo);
                };

                view.bind(ADD, this._viewAddHandler);

            }
        },

        view: function(name) {
            var that = this;

            if (name) {
                if (that._selectedViewName !== name) {
                    that._unbindView(that.views[that._selectedViewName]);
                }

                that._bindView(that.views[name]);

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

            view.renderGrid(this.selectDate());

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
                    { field: "start", operator: "gte", value: view.startDate },
                    { field: "start", operator: "lte", value: view.endDate }
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
            this.view().renderEvents(this.dataSource.view());
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

    function rangeIndex(eventElement) {
        var index = $(eventElement).attr(kendo.attr("start-end-idx")).split("-");
        return {
            start: +index[0],
            end: +index[1]
        };
    }

    function eventsForSlot(elements, slotStart, slotEnd) {
        return elements.filter(function() {
            var event = rangeIndex(this);
            return (event.start >= slotStart && event.start <= slotEnd) || slotStart >= event.start && slotStart <= event.end;
        });
    }

    function createColumns(eventElements) {
        var columns = [];

        eventElements.each(function() {
            var event = this,
                eventRange = rangeIndex(event),
                column;

            for (var j = 0, columnLength = columns.length; j < columnLength; j++) {
                if (!(eventRange.start >= columns[j].start && eventRange.start < columns[j].end) &&
                    !(columns[j].end === eventRange.start && columns[j].end <= eventRange.end)) {

                    column = columns[j];

                    if (column.end < eventRange.end) {
                        column.end = eventRange.end;
                    }

                    break;
                }
            }

            if (!column) {
                column = { start: eventRange.start, end: eventRange.end, events: [] };
                columns.push(column);
            }

            column.events.push(event);
        });

        return columns;
    }

    var MultiDayView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            this._editable();
        },

        options: {
            name: "MultiDayView",
            headerDateFormat: "ddd M/dd",
            eventTimeFormat: "{0:H:mm} - {1:H:mm}",
            timeFormat: "HH:mm",
            selectedDateFormat: "{0:D}",
            titleAttrFormat: "({0}): {1}",
            allDaySlot: true,
            title: "",
            startTime: TODAY,
            endTime: TODAY,
            numberOfTimeSlots: 2,
            majorTick: 60,
            majorTickTimeTemplate: kendo.template("<em>#=kendo.toString(date, format)#</em>"),
            minorTickTimeTemplate: "&nbsp;",
            eventTemplate: DAY_VIEW_EVENT_TEMPLATE,
            allDayEventTemplate: DAY_VIEW_ALL_DAY_EVENT_TEMPLATE,
            editable: true
        },

        events: [REMOVE, ADD, EDIT],

        _editable: function() {
            var that = this;
            if (that.options.editable) {

                that.element.on("mouseover" + NS, ".k-appointment", function() {
                    $(this).find("a:has(.k-i-close)").show();
                }).on("mouseleave" + NS, ".k-appointment", function() {
                    $(this).find("a:has(.k-i-close)").hide();
                }).on("click" + NS, ".k-appointment a:has(.k-i-close)", function(e) {
                    that.trigger(REMOVE, { container: $(this).closest(".k-appointment") });
                    e.preventDefault();
                });

                if (that.options.editable.create !== false) {
                    that.element.on("dblclick", ".k-scheduler-content td", function(e) {
                        var element = $(this);
                        that.trigger(ADD, { eventInfo: that._rangeToDates(element) });
                        e.preventDefault();
                    }).on("dblclick", ".k-scheduler-header-all-day td", function(e) {
                        var element = $(this);
                        that.trigger(ADD, { eventInfo: extend({ isAllDay: true }, that._rangeToDates(element)) });
                        e.preventDefault();
                    });
                }

                if (that.options.editable.update !== false) {
                    that.element.on("dblclick", ".k-appointment", function(e) {
                        that.trigger(EDIT, { container: $(this).closest(".k-appointment") });
                        e.preventDefault();
                    });
                }
            }
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
            return;
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

                that.allDayHeader = $(allDayHtml).addClass("k-scheduler-header-all-day");
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

                    this._touchScroller = touchScroller;

                    wrapper = touchScroller.scrollElement;

                    touchScroller.movable.bind("change", function(e) {
                        that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(-e.sender.x);
                        that.times.scrollTop(-e.sender.y);
                    });
                }

            } else {
                if (this._touchScroller) {
                    wrapper = this._touchScroller.scrollElement;
                }
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

        renderGrid: function(selectedDate) {
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

                if (that._touchScroller) {
                    that._touchScroller.wrapper.remove();
                    that._touchScroller.destroy();
                }

                that.content = null;
                that.times = null;
                that.timesHeader = null;
                that.datesHeader = null;
                that.footer = null;
            }
        },

        _rangeToDates: function(cell) {
            var parentRow = cell.closest("tr"),
                tableRows = parentRow.closest("table").find("tr"),
                maxTimeSlotIndex = tableRows.length - 1,
                dateIndex = parentRow.find("td").index(cell),
                timeIndex = tableRows.index(parentRow),
                slotDate = this._slotIndexDate(dateIndex),
                slotEndDate;

            if (slotDate) {
                slotEndDate = new Date(slotDate);

                setTime(slotDate, this._slotIndexTime(timeIndex));
                setTime(slotEndDate, this._slotIndexTime(Math.min(timeIndex + 1, maxTimeSlotIndex)));

                return {
                    start: slotDate,
                    end: slotEndDate
                };
            }
            return null;
        },

        _slotIndexTime: function(index) {
            var options = this.options,
                startTime = getMilliseconds(options.startTime),
                timeSlotInterval = ((options.majorTick/options.numberOfTimeSlots) * MS_PER_MINUTE);

            return startTime + timeSlotInterval * index;
        },

        _slotIndexDate: function(index) {
            var idx,
                length,
                slots = this._dates || [],
                startTime = getMilliseconds(new Date(+this.options.startTime)),
                endTime = getMilliseconds(new Date(+this.options.endTime)),
                slotStart;

            if (startTime >= endTime) {
                endTime += MS_PER_DAY;
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = new Date(+slots[idx]);
                setTime(slotStart, startTime);

                if (index === idx) {
                    return slotStart;
                }
            }
            return null;
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
                endTime += (MS_PER_DAY - MS_PER_MINUTE);
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

        _positionAllDayEvent: function(element, slots, startIndex, endIndex, slotWidth) {
            if (startIndex < 0) {
                startIndex = 0;
            }

            if (endIndex < 0) {
                endIndex = slots.length - 1;
            }

            var dateSlot = slots.eq(startIndex),
                numberOfSlots = Math.ceil(endIndex - startIndex),
                allDayEvents = this._getCollisionEvents(this.datesHeader.find(".k-appointment"), startIndex, endIndex).add(element),
                top = dateSlot.position().top,
                bottomOffset = 20,//(dateSlot.height() * 0.20),
                eventHeight = allDayEvents.length > 1 ? allDayEvents.first()[0].clientHeight : (dateSlot.height() - bottomOffset);

            element
                .css({
                    left: dateSlot.position().left,
                    width: slotWidth * (numberOfSlots + 1)
                });

            element.attr(kendo.attr("start-end-idx"), startIndex + "-" + endIndex);

            var columns = createColumns(allDayEvents);

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                var columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j]).css({
                        top: top + idx * eventHeight
                    });
                }
            }

            if (columns.length > 1) {
                slots.parent().height((eventHeight * columns.length) + bottomOffset);
            }
        },

        _arrangeColumns: function(element, dateSlotIndex, dateSlot) {
            var columns,
                eventRightOffset = 30,
                columnEvents,
                blockRange = rangeIndex(element),
                eventElements = this.content.children(".k-appointment[" + kendo.attr("slot-idx") + "=" + dateSlotIndex + "]"),
                slotEvents = this._getCollisionEvents(eventElements, blockRange.start, blockRange.end).add(element);

            columns = createColumns(slotEvents);

            var columnWidth = (dateSlot.width() - eventRightOffset) / columns.length;

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j]).css({
                        width: columnWidth,
                        left: dateSlot[0].offsetLeft + idx * columnWidth
                    });
                }
            }
        },

        _positionEvent: function(event, element, slots, dateSlotIndex, slotHeight) {
            var startIndex = Math.max(Math.floor(this._timeSlotIndex(event.start)), 0),
                endIndex = Math.min(Math.ceil(this._timeSlotIndex(event.end)), slots.length),
                bottomOffset = (slotHeight * 0.10),
                timeSlot = slots.eq(Math.floor(startIndex)),
                dateSlot = timeSlot.children().eq(dateSlotIndex);

            element.css({
                    height: slotHeight * (Math.ceil(endIndex - startIndex) || 1) - bottomOffset,
                    top: timeSlot.position().top + this.content[0].scrollTop
                });

            element.attr(kendo.attr("slot-idx"), dateSlotIndex);
            element.attr(kendo.attr("start-end-idx"), startIndex + "-" + endIndex);

            this._arrangeColumns(element, dateSlotIndex, dateSlot);
       },

        _createEventElement: function(event, template) {
            var options = this.options,
                formattedTime = kendo.format(options.eventTimeFormat, event.start, event.end),
                titleAttr = options.titleAttrFormat,
                showDelete = options.editable && options.editable.destroy !== false;

            return $(template(extend({}, {
                ns: kendo.ns,
                formattedTime: formattedTime,
                titleAttr: kendo.format(titleAttr, formattedTime, event.title),
                showDelete: showDelete
            }, event)));
        },

        _isInTimeSlot: function(event) {
            var slotStartTime = this.options.startTime,
                slotEndTime = this.options.endTime;

            return isInTimeRange(event.start, slotStartTime, slotEndTime) ||
                isInTimeRange(event.end, slotStartTime, slotEndTime) ||
                isInTimeRange(slotStartTime, event.start, event.end) ||
                isInTimeRange(slotEndTime, event.start, event.end);
        },

        _isInDateSlot: function(event) {
            var slotStart = this.startDate,
                slotEnd = new Date(this.endDate.getTime() + MS_PER_DAY);

            return isInDateRange(event.start, slotStart, slotEnd) ||
                isInDateRange(event.end, slotStart, slotEnd) ||
                isInDateRange(slotStart, event.start, event.end) ||
                isInDateRange(slotEnd, event.start, event.end);
        },

        _getCollisionEvents: function(elements, start, end) {
            var idx,
                index,
                startIndex,
                endIndex;

            for (idx = elements.length-1; idx >= 0; idx--) {
                index = rangeIndex(elements[idx]);
                startIndex = index.start;
                endIndex = index.end;

                if (startIndex <= start && endIndex >= start) {
                    start = startIndex;
                    if (endIndex > end) {
                        end = endIndex;
                    }
                }
            }

            return eventsForSlot(elements, start, end);
        },

        renderEvents: function(events) {
            var options = this.options,
                eventTemplate = kendo.template(options.eventTemplate),
                allDayEventTemplate = kendo.template(options.allDayEventTemplate),
                timeSlots = this.content.find("tr"),
                allDaySlots = this.allDayHeader ? this.allDayHeader.find("td") : $(),
                allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap"),
                slotHeight = Math.floor(this.content.find(">table:first").innerHeight() / timeSlots.length),
                slotWidth = this.datesHeader.find("table:first th:first").innerWidth(),
                eventTimeFormat = options.eventTimeFormat,
                event,
                idx,
                length;

            this.element.find(".k-appointment").remove();

            events = new kendo.data.Query(events).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                   var dateSlotIndex = this._dateSlotIndex(event.start),
                       endDateSlotIndex = this._dateSlotIndex(event.end),
                       isSameDayEvent = !event.isAllDay && event.end.getTime() - event.start.getTime() < MS_PER_DAY && this._isInTimeSlot(event),
                       container = isSameDayEvent ? this.content : allDayEventContainer,
                       element = this._createEventElement(event, isSameDayEvent ? eventTemplate : allDayEventTemplate);

                   if (isSameDayEvent && !event.isAllDay) {
                       if (dateSlotIndex === -1 && endDateSlotIndex > -1) {
                           dateSlotIndex = endDateSlotIndex;
                       }

                       this._positionEvent(event, element, timeSlots, dateSlotIndex, slotHeight, eventTimeFormat);
                   } else {
                       this._positionAllDayEvent(element, allDaySlots, dateSlotIndex, endDateSlotIndex, slotWidth);
                   }

                   element.appendTo(container);
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
            renderGrid: function(selectedDate) {
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

        return list.sort();
    }

    function parseWeekDayList(list) {
        var idx = 0, length = list.length,
            value, valueLength, day;

        for (; idx < length; idx++) {
            value = list[idx];
            valueLength = value.length;
            day = value.substring(valueLength - 2).toUpperCase();

            day = WEEK_DAYS[day];
            if (day === undefined) {
                return null;
            }

            list[idx] = {
                offset: parseInt(value.substring(0, valueLength - 2), 10) || 0,
                day: day
            };
        }
        return list;
    }

    var recurrence = {
        isInWeek: function(date, offset, weekStart) {
            var weekNumber = recurrence.weekNumber(date, weekStart);
            if (offset > 0) {
                if (offset === weekNumber) {
                    return true;
                }
            } else {
                if ((recurrence.numberOfWeeks(date, weekStart) + offset) === weekNumber) {
                    return true;
                }
            }
        },

        weekNumber: function(date, weekStart) {
            var firstWeekLength = recurrence.firstWeekLength(date, weekStart),
                day = date.getDate(),
                weekNumber;

            if (day <= firstWeekLength) {
                weekNumber = 1;
            } else if (day - 7 < 1) {
                weekNumber = 2;
            } else {
                weekNumber = parseInt((day - firstWeekLength) / 7, 10) + 1;
            }

            return weekNumber;
        },

        firstWeekLength: function(date, weekStart) {
            weekStart = weekStart === 0 ? 7 : weekStart;
            date = new Date(date.getFullYear(), date.getMonth(), 1);

            var firstWeekLength = weekStart - date.getDay();
            if (firstWeekLength < 0) {
                firstWeekLength += 7;
            }

            return firstWeekLength;
        },
        numberOfWeeks: function(date, weekStart) {
            return Math.ceil((getMonthLength(date) - recurrence.firstWeekLength(date, weekStart)) / 7) + 1;
        },

        //TODO: optimize! Set year and month before looping days
        nextWeekDay: function(date, dayOfWeek) {
            date = new Date(date);
            while(date.getDay() !== dayOfWeek) {
                date.setDate(date.getDate() + 1); //increase/decrease... if we need -1MO and so on
            }

            return date;
        },
        expandEvent: function(e) {
            var instance = e.ruleInstance;

            if (!instance && e.rule) {
                e.ruleInstance = instance = recurrence.parseRule(e.rule);
            }

            return instance;
        },

        occurrences: function(event, period) {
            var rule = recurrence.expandEvent(event),
                start = new Date(period.start),
                end = new Date(period.end),
                current = 1,
                events = [],
                count,
                freq;

            if (!rule || +event.start > +end) {
                return events;
            }

            freq = recurrence.frequency[rule.freq];
            count = rule.count;

            if (rule.until && +rule.until < +end) {
                end = new Date(rule.until);
            }

            start = freq.limit(start, end, rule);

            while (+start <= end) {
                events.push({
                    recurrenceID: event.uid,
                    start: freq.setDate(start, event.start),
                    end: freq.setDate(start, event.end)
                });

                if (count && count === current) {
                    break;
                }

                current++;

                start = freq.next(start, end, rule);
                start = freq.limit(start, end, rule);
            }

            return events;
        },

        expand: function(event, period) {
            var rule = recurrence.expandEvent(event),
                start = new Date(period.start),
                end = new Date(period.end),
                current = 1,
                events = [],
                count,
                freq;

            if (!rule || +event.start > +end) {
                return events;
            }

            freq = recurrence.frequency[rule.freq];
            count = rule.count;

            if (rule.until && +rule.until < +end) {
                end = new Date(rule.until);
            }

            start = freq.limit(start, end, rule);

            while (+start <= end) {
                events.push({
                    recurrenceID: event.uid,
                    start: freq.setDate(start, event.start),
                    end: freq.setDate(start, event.end)
                });

                if (count && count === current) {
                    break;
                }

                current++;

                start = freq.next(start, end, rule);
                start = freq.limit(start, end, rule);
            }

            return events;
        },

        frequency: {
            //TODO: FREQ: SECONDLY
            //TODO: FREQ: MINUTELY
            //TODO: FREQ: HOURLY
            DAILY: {
                next: function(start, end, rule) { //TODO: remove it; end is not used!!!
                    start = new Date(start);
                    start.setDate(start.getDate() + rule.interval);
                    return start;
                },

                limit: function(start, end, rule) {
                    var weekDays = rule.weekDays,
                        monthDays = rule.monthDays,
                        months = rule.months,
                        weekDay, idx, length;

                    if (weekDays) {
                        length = weekDays.length;
                    }

                    end = +end;

                    while (+start <= end) {
                        if (months && $.inArray(start.getMonth(), months) === -1) {
                            start.setFullYear(start.getFullYear(), start.getMonth() + 1, 1);
                        } else if (monthDays && checkMonthDays(monthDays, start)) {
                            start.setDate(start.getDate() + 1);
                        } else if (weekDays) {
                            weekDay = start.getDay();
                            for (idx = 0; idx < length; idx++) {
                                if (weekDays[idx].offset) {
                                    if (recurrence.isInWeek(start, weekDays[idx].offset, rule.weekStart) && weekDays[idx].day === weekDay) {
                                        return start;
                                    }
                                } else if (weekDays[idx].day === weekDay) {
                                    return start;
                                }
                            }

                            start.setDate(start.getDate() + 1);
                        } else {
                            return start;
                        }
                    }
                    return start;
                },

                setDate: function(currentDate, eventDate) {
                    currentDate = new Date(currentDate);
                    currentDate.setHours(eventDate.getHours());
                    currentDate.setMinutes(eventDate.getMinutes());
                    currentDate.setSeconds(eventDate.getSeconds());
                    currentDate.setMilliseconds(eventDate.getMilliseconds());
                    return currentDate;
                }
            },
            WEEKLY: {
                occurrences: function(event, period) {
                    var events = [],
                        rule = recurrence.expandEvent(event),
                        start = new Date(period.start),
                        end = new Date(period.end),
                        count = 1,
                        weekDays,
                        visibleWeekDays;

                    if (!rule || +event.start > +end) {
                        return events;
                    }

                    if (rule.until && +rule.until < +end) {
                        end = new Date(rule.until);
                    }

                    //TODO: put all weekdays stuff in next method


                    while(start) {
                        visibleWeekDays = filterWeekDays(weekDays, start.getDay());
                        for (var idx = 0, length = visibleWeekDays.length; idx < length; idx++) {
                            start = this.limit(start, rule);
                            start = recurrence.nextWeekDay(start, visibleWeekDays[idx].day);
                            if (+start >= +end) {
                                return events;
                            }

                            events.push({
                                recurrenceID: event.uid,
                                start: this.setDate(start, event.start),
                                end: this.setDate(start, event.end)
                            });

                            if (rule.count && rule.count === count) {
                                return events;
                            }

                            count++;
                        }

                        start = recurrence.nextWeekDay(start, rule.weekStart);

                        if (rule.interval > 1) {
                            start.setDate(start.getDate() + ((rule.interval - 1) * 7));
                        }
                    }
                },

                limit: function(date, rule) {
                    var months = rule.months,
                        monthNumber = date.getMonth() + 1;

                    if ($.inArray(monthNumber, months) === -1) {
                        return date;
                    }

                    date.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate());
                    return this.limit(date, rule);
                },

                /*normalize: function(rule) {

                }*/

                next: function(start, end, rule) {
                    var weekDays = rule.weekDays,
                        currentWeekDays;

                    //put in rule parser
                    if (!weekDays) {
                        rule.weekDays = weekDays = [{
                            day: start.getDay(),
                            offset: 0
                        }];
                    }

                    currentWeekDays

                    start = new Date(start);
                    start.setDate(start.getDate() + (rule.interval * 7));

                    if (+start > +end) {
                        start = null;
                    }

                    return start;
                },

                setDate: function(currentDate, eventDate) {
                    //same as DAILY.setDate
                    currentDate = new Date(currentDate);
                    currentDate.setHours(eventDate.getHours());
                    currentDate.setMinutes(eventDate.getMinutes());
                    currentDate.setSeconds(eventDate.getSeconds());
                    currentDate.setMilliseconds(eventDate.getMilliseconds());
                    return currentDate;
                }

            }
        },
        parseRule: function (rule) {
            //TODO: rename result to instance
            var result = {},
                property,
                splits, value,
                idx = 0, length,
                weekStart,
                weekDays,
                predicate = function(a, b) {
                    var day1 = a.day,
                        day2 = b.day;

                    if (day1 < weekStart) {
                       day1 += weekStart;
                    }

                    if (day2 < weekStart) {
                        day2 += weekStart;
                    }

                    return day1 - day2;
                };

            if (rule.substring(0, 6) === "RRULE:") {
                rule = rule.substring(6);
            }

            rule = rule.split(";");
            length = rule.length;

            for (; idx < length; idx++) {
                property = rule[idx];
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
                        result.weekDays = weekDays = parseWeekDayList(value);
                        break;
                    case "BYSETPOS":
                        result.setPositions = parseArray(value, { start: 1, end: 366 });
                        break;
                    case "BYWEEKNO":
                        result.weekNumber = parseArray(value, { start: 1, end: 53 });
                        break;
                    case "WKST":
                        result.weekStart = weekStart = WEEK_DAYS[value[0]];
                        break;
                }

                if (result.freq === undefined || (result.count !== undefined && result.until)) {
                    return null;
                }

                if (!result.interval) {
                    result.interval = 1;
                }

                if (weekStart === undefined) {
                    result.weekStart = weekStart = kendo.culture().calendar.firstDay;
                }

                if (weekDays) {
                    result.weekDays = weekDays.sort(predicate);
                }
            }

            return result;
        }
    };

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

    function filterWeekDays(weekDays, currentDay, weekStart) {
        var idx = 0,
            length = weekDays.length,
            result = [],
            weekDay, day;

        if (currentDay < weekStart) {
            currentDay += weekStart;
        }

        for (;idx < length; idx++) {
            weekDay = weekDays[idx];
            day = weekDay.day;

            if (day < weekStart) {
                day += weekStart;
            }

            if (currentDay <= day) {
                result.push(weekDay);
            }
        }

        return result[0] ? result : weekDays;
    }

    function checkMonthDays(monthDays, date) {
        var month = getMonthLength(date),
            day = date.getDate(),
            length = monthDays.length,
            idx = 0,
            monthDay;

        for (; idx < length; idx++) {
            monthDay = monthDays[idx];
            if (monthDay < 0) {
                monthDay = month + monthDay;
            }

            if (day === monthDay) {
                return 0;
            }
        }

        return -1;

    }

    function getMonthLength(date) {
        var month = date.getMonth();

        if (month === 1) {
            if (new Date(date.getFullYear(), 1, 29).getMonth() === 1) {
                return 29;
            }
            return 28;
        }
        return MONTHS[month];
    }

    kendo.recurrence = recurrence;

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
