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
        daysInLeapYear = [0,31,60,91,121,152,182,213,244,274,305,335,366],
        daysInYear = [0,31,59,90,120,151,181,212,243,273,304,334,365],
        extend = $.extend,
        proxy = $.proxy,
        isArray = $.isArray,
        NS = ".kendoScheduler",
        CLICK = "click",
        CHANGE = "change",
        CANCEL = "cancel",
        REMOVE = "remove",
        SAVE = "save",
        ADD = "add",
        EDIT = "edit",
        DELETECONFIRM = "Are you sure you want to delete this event?",
        COMMANDBUTTONTMPL = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>',
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

    var defaultCommands = {
        update: {
            text: "Update",
            imageClass: "k-update",
            className: "k-scheduler-update",
            iconClass: "k-icon"
        },
        canceledit: {
            text: "Cancel",
            imageClass: "k-cancel",
            className: "k-scheduler-cancel",
            iconClass: "k-icon"
        }
    };

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

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
        return staticDate;
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
        delete options.prefix;

        delete options.remove;
        delete options.edit;

        return options;
    }

    function stringifyAttributes(attributes) {
        var attr,
            result = " ";

        if (attributes) {
            if (typeof attributes === STRING) {
                return attributes;
            }

            for (attr in attributes) {
                result += attr + '="' + attributes[attr] + '"';
            }
        }
        return result;
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
            REMOVE,
            EDIT,
            CANCEL,
            SAVE
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

            that._destroyEditable();

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
            if ((this.editable && this.editable.end()) || !this.editable) {

                this.cancelEvent();

                var dataSource = this.dataSource;
                var event = dataSource._createNewModel();

                if (event instanceof kendo.data.Model) {
                    event.accept(eventInfo);
                } else {
                    event = extend({ title: "" }, event, eventInfo);
                }

                event = this.dataSource.add(event);

                if (event) {
                    var element = this.wrapper.find(".k-appointment[" + kendo.attr("uid") + "=" + event.uid + "]");

                    this.editEvent(element);
                }
            }
       },

       saveEvent: function() {
            var that = this,
                container = that._editContainer,
                model = that._modelForContainer(container),
                editable = that.editable;

            if (container && editable && editable.end() &&
                !that.trigger(SAVE, { container: container, model: model } )) {

                that.dataSource.sync();
            }
        },

        cancelEvent: function() {
            var that = this,
                container = that._editContainer,
                model;

            if (container) {
                model = that._modelForContainer(container);

                that.dataSource.cancelChanges(model);

                //TODO:handle the cancel in UI

                that._destroyEditable();
            }
        },

        editEvent: function(element) {
            var that = this,
                model = that._modelForContainer(element),
                container;

            that.cancelEvent();

            if (model) {
                that._createPopupEditor(model);

                container = that._editContainer;

                container.on(CLICK + NS, "a.k-scheduler-cancel", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (that.trigger(CANCEL, { container: container, event: model })) {
                        return;
                    }

                    that.cancelEvent();
                });

                container.on(CLICK + NS, "a.k-scheduler-update", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.saveEvent();
                });
            }
        },

        _createButton: function(command) {
            var template = command.template || COMMANDBUTTONTMPL,
                commandName = typeof command === STRING ? command : command.name || command.text,
                options = { className: "k-scheduler-" + (commandName || "").replace(/\s/g, ""), text: commandName, imageClass: "", attr: "", iconClass: "" };

            if (!commandName && !(isPlainObject(command) && command.template))  {
                throw new Error("Custom commands should have name specified");
            }

            if (isPlainObject(command)) {
                if (command.className) {
                    command.className += " " + options.className;
                }

                if (commandName === "edit" && isPlainObject(command.text)) {
                    command = extend(true, {}, command);
                    command.text = command.text.edit;
                }

                if (command.attr && isPlainObject(command.attr)) {
                    command.attr = stringifyAttributes(command.attr);
                }

                options = extend(true, options, defaultCommands[commandName], command);
            } else {
                options = extend(true, options, defaultCommands[commandName]);
            }

            return kendo.template(template)(options);
        },

        _createPopupEditor: function(model) {
            var that = this,
                editable = that.options.editable,
                html = '<div ' + kendo.attr("uid") + '="' + model.uid + '"><div class="k-edit-form-container">',
                template = editable.template,
                command = editable.editCommand,
                updateText,
                cancelText,
                attr,
                options = isPlainObject(editable) ? editable.window : {},
                settings = extend({}, kendo.Template, that.options.templateSettings);

           if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }

                html += (kendo.template(template, settings))(model);
            } else {
            }

            if (command) {
                if (isPlainObject(command)) {
                   if (command.text && isPlainObject(command.text)) {
                       updateText = command.text.update;
                       cancelText = command.text.cancel;
                   }

                   if (command.attr) {
                       attr = command.attr;
                   }
                }
            }

            html += that._createButton({ name: "update", text: updateText, attr: attr }) + that._createButton({ name: "canceledit", text: cancelText, attr: attr });

            html += '</div></div>';

            var container = that._editContainer = $(html)
                .appendTo(that.wrapper).eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: "Event",
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger(CANCEL, { container: container, event: model })) {
                                e.preventDefault();
                                return;
                            }
                            that.cancelEvent();
                        }
                    }
                }, options));

            that.editable = that._editContainer
                .kendoEditable({
             //       fields: fields,
                    model: model,
                    clearContainer: false
                }).data("kendoEditable");

            container.data("kendoWindow").center().open();

            that.trigger(EDIT, { container: container, event: model });
        },

        _destroyEditable: function() {
            var that = this;

            var destroy = function() {
                if (that.editable) {
         //           that._detachModelChange();
                    that.editable.destroy();
                    that.editable = null;
                    that._editContainer = null;
                }
            };

            if (that.editable) {
                that._editContainer.data("kendoWindow").bind("deactivate", destroy).close();
            }
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

                if (that._viewEditHandler) {
                    view.unbind(EDIT, that._viewEditHandler);
                }

                that._viewEditHandler = function(e) {
                    that.editEvent(e.container);
                };

                view.bind(EDIT, this._viewEditHandler);
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

            toolbar.on(CLICK + NS, ".k-scheduler-navigation li", function(e) {
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

            toolbar.on(CLICK + NS, ".k-scheduler-views li", function(e) {
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

        refresh: function(e) {
            if (e && e.action === "itemchange" && this.editable) { // skip rebinding if editing is in progress
                return;
            }

            this._destroyEditable();

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

    function createColumns(eventElements, isHorizontal) {
        var columns = [];

        eventElements.each(function() {
            var event = this,
                eventRange = rangeIndex(event),
                column;

            for (var j = 0, columnLength = columns.length; j < columnLength; j++) {
                var endOverlaps = isHorizontal ? eventRange.start > columns[j].end : eventRange.start >= columns[j].end;

                if (eventRange.start < columns[j].start || endOverlaps) {

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
                }).on(CLICK + NS, ".k-appointment a:has(.k-i-close)", function(e) {
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
            if (!this.footer) {
                var html = '<div class="k-header k-scheduler-footer">&nbsp;';
                   // '<ul class="k-reset k-header k-toolbar"> <li>aaa</li></ul>';

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
            min = toInvariantTime(min); //convert the date to 1/2/1980 and sets the time
            max = toInvariantTime(max);

            var that = this,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / that.options.numberOfTimeSlots || 1,
                start = new Date(+min),
                startDay = start.getDate(),
                msStart,
                idx = 0, length,
                html = "";

            length = MS_PER_DAY / msInterval;

            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                length = ((msMax - msMin) / msInterval);
            }

            length = Math.round(length);

            for (; idx < length; idx++) {
                html += action(start, idx % (msMajorInterval/msInterval) === 0);

                setTime(start, msInterval, false);
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
                bottomOffset = 20,
                eventHeight = allDayEvents.length > 1 ? allDayEvents.first()[0].clientHeight : (dateSlot.height() - bottomOffset);

            element
                .css({
                    left: dateSlot.position().left,
                    width: slotWidth * (numberOfSlots + 1)
                });

            element.attr(kendo.attr("start-end-idx"), startIndex + "-" + endIndex);

            var columns = createColumns(allDayEvents, true);

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

 var recurrence = {
        expand: function(event, period) {
            var rule = recurrence.expandEvent(event),
                durationMS = event.end - event.start,
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

            //rule._currentPos = 1;

            freq.setup(rule, start, event.start);
            start = freq.setDate(start, event.start); //FURTHER tests are required. DST and etc
            start = freq.limit(start, end, rule);

            while (+start <= end) {
                //if (freq.position(rule)) {
                    events.push(cloneEvent(event, start, durationMS));
                //}

                if (count && count === current) {
                    break;
                }

                current++;

                start = freq.next(start, rule);
                start = freq.limit(start, end, rule);

                //rule._currentPos += 1;
            }

            return events;
        },

        frequency: {
            //TODO: FREQ: SECONDLY
            //TODO: FREQ: MINUTELY
            //TODO: FREQ: HOURLY
            daily: {
                next: function(start, rule) {
                    if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start = new Date(start);
                        start.setDate(start.getDate() + rule.interval);
                    }
                    return start;
                },

                setup: function(rule, start, eventStart) {
                    var currentHour = eventStart.getHours();

                    if (rule.weekDays) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                },

                limit: function(date, end, rule) {
                    var dateMS = +date,
                        monthDayMS, weekDayMS, month,
                        allow = allowExpand(rule);

                    end = +end;

                    while (+date <= end) {
                        if (rule.months && allow) {
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();
                        }

                        if (rule.monthDays && allow) {
                            date = recurrence._monthDay(date, end, rule);
                            monthDayMS = +date;
                        }

                        if (rule.weekDays && allow) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        weekDayMS = +date;

                        if (rule.hours || rule.minutes || rule.seconds) {
                            if (dateMS !== +date) {
                                if (rule.hours) {
                                    date.setHours(0);
                                }
                                if (rule.minutes) {
                                    date.setMinutes(0);
                                }
                                if (rule.seconds) {
                                    date.setSeconds(0);
                                }
                            }
                            date = recurrence._time(date, end, rule);
                        }

                        if ((month !== undefined && month !== date.getMonth()) ||
                            (monthDayMS && monthDayMS !== weekDayMS)) {

                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }
                    return date;
                },

                /*position: function() {
                    return true;
                },*/

                setDate: function(currentDate, eventDate) {
                    currentDate = new Date(currentDate);
                    currentDate.setHours(eventDate.getHours());
                    currentDate.setMinutes(eventDate.getMinutes());
                    currentDate.setSeconds(eventDate.getSeconds());
                    currentDate.setMilliseconds(eventDate.getMilliseconds());
                    return currentDate;
                }
            },
            weekly: {
                next: function(start, rule) {
                    if (!rule.hours) {
                        start.setDate(start.getDate() + 1);
                    }
                    return start;
                },

                setup: function(rule, start) {
                    if (!rule.weekDays) {
                        rule.weekDays = [{
                            day: start.getDay(),
                            offset: 0
                        }];
                    }

                    if (rule.weekDays) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }

                   // if (rule._setPositions === undefined) {
                   //     rule._setPositions = rule.setPositions.slice(0);
                   // }
                },

                limit: function(date, end, rule) {
                    var dateMS = +date,
                        allow = allowExpand(rule);

                    if (rule.months && allow) {
                        date = recurrence._month(date, end, rule);
                    }

                    if (rule.weekDays && allow) {
                        date = recurrence._weekDay(date, end, rule);
                    }

                    if (rule.hours || rule.minutes || rule.seconds) {
                        if (dateMS !== +date) {
                            if (rule.hours) {
                                date.setHours(0);
                            }
                            if (rule.minutes) {
                                date.setMinutes(0);
                            }
                            if (rule.seconds) {
                                date.setSeconds(0);
                            }
                        }
                        date = recurrence._time(date, end, rule);
                    }

                    return date;
                },

                /*position: function(rule) {
                    var setPositions = rule._setPositions,
                        position;

                    if (setPositions) {
                        position = setPositions.shift();
                        if (!position) {
                            rule._setPositions = setPositions = rule.setPositions.slice(0);
                            position = setPositions.shift(0);

                        }

                        return rule._currentPos === position;
                    }

                    return true;
                },*/

                setDate: function(currentDate, eventDate) {
                    //same as DAILY.setDate
                    currentDate = new Date(currentDate);
                    currentDate.setHours(eventDate.getHours());
                    currentDate.setMinutes(eventDate.getMinutes());
                    currentDate.setSeconds(eventDate.getSeconds());
                    currentDate.setMilliseconds(eventDate.getMilliseconds());
                    return currentDate;
                }

            },
            monthly: {
                next: function(start, rule) {
                    var day;

                    if (rule.monthDays || rule.weekDays) {
                        start.setDate(start.getDate() + 1);
                    } else {
                        day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    }
                    return start;
                },
                limit: function(date, end, rule) {
                    var day, month;

                    end = +end;
                    while (+date <= end) {
                        if (rule.months) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (rule.monthDays) {
                            date = recurrence._monthDay(date, end, rule);
                        }

                        if (rule.weekDays) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        if (month !== undefined && month !== date.getMonth()) {
                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }

                    return date;
                },
                setup: function(rule, start, eventStart) {
                    if (!rule.monthDays && !rule.weekDays) {
                        start.setDate(eventStart.getDate());
                    }

                    if (rule.weekDays && rule._weekDayRules === undefined) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }
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
            },
            yearly: {
                next: function(start, rule) {
                    var day;

                    if (!rule.months && !rule.monthDays && !rule.weekDays && !rule.yearDays && !rule.weeks) {
                        start.setFullYear(start.getFullYear() + 1);
                    } else if (rule.monthDays || rule.weekDays || rule.yearDays || rule.weeks) {
                        start.setDate(start.getDate() + 1);
                    } else {
                        day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    }

                    return start;
                },

                limit: function(date, end, rule) {
                    var day, month,
                        weekStart = rule.weekStart;

                    end = +end;
                    while (+date <= end) {
                        if (rule.months) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (rule.weeks && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) { //TODO: Sort weeks
                            while ((+date <= end) && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) {
                                date.setDate(date.getDate() + 7);
                            }

                            //TODO: test this logic when while ends because date > end and we move backward!!!
                            date = recurrence.weekDay(date, weekStart, -1); //TODO: implement prevWeekDay
                        }

                        if (rule.yearDays && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) { //TODO: Sort yearDays
                            while ((+date <= end) && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) {
                                date.setDate(date.getDate() + 1);
                            }
                        }

                        if (rule.monthDays) {
                            date = recurrence._monthDay(date, end, rule);
                        }

                        if (rule.weekDays) {
                            date = recurrence._weekDay(date, end, rule);
                        }

                        if (month !== undefined && month !== date.getMonth()) {
                            date.setDate(date.getDate() + 1);
                        } else if (+date <= end) {
                            break;
                        }
                    }

                    return date;
                },
                setup: function(rule, start) {
                    if (rule.weekDays && rule._weekDayRules === undefined) {
                        rule._weekDayRules = filterWeekDays(rule.weekDays, start.getDay(), rule.weekStart).slice(0);
                    }
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
        expandEvent: function(e) {
            var instance = e.ruleInstance;

            if (!instance && e.rule) {
                e.ruleInstance = instance = recurrence.parseRule(e.rule);
            }

            return instance;
        },
        parseRule: function (rule) {
            var instance = {},
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
                        instance.freq = value[0].toLowerCase();
                        break;
                    case "UNTIL":
                        instance.until = kendo.parseDate(value[0], DATE_FORMATS);
                        break;
                    case "COUNT":
                        instance.count = parseInt(value[0], 10);
                        break;
                    case "INTERVAL":
                        instance.interval = parseInt(value[0], 10);
                        break;
                    case "BYSECOND":
                        instance.seconds = parseArray(value, { start: 0, end: 60 });
                        break;
                    case "BYMINUTE":
                        instance.minutes = parseArray(value, { start: 0, end: 59 });
                        break;
                    case "BYHOUR":
                        instance.hours = parseArray(value, { start: 0, end: 23 });
                        break;
                    case "BYMONTHDAY":
                        instance.monthDays = parseArray(value, { start: -31, end: 31 });
                        break;
                    case "BYYEARDAY":
                        instance.yearDays = parseArray(value, { start: -366, end: 366 });
                        break;
                    case "BYMONTH":
                        instance.months = parseArray(value, { start: 1, end: 12 });
                        break;
                    case "BYDAY":
                        instance.weekDays = weekDays = parseWeekDayList(value);
                        break;
                    case "BYSETPOS":
                        instance.setPositions = parseArray(value, { start: 1, end: 366 });
                        break;
                    case "BYWEEKNO":
                        instance.weeks = parseArray(value, { start: 1, end: 53 });
                        break;
                    case "WKST":
                        instance.weekStart = weekStart = WEEK_DAYS[value[0]];
                        break;
                }

                if (instance.freq === undefined || (instance.count !== undefined && instance.until)) {
                    return null;
                }

                if (!instance.interval) {
                    instance.interval = 1;
                }

                if (weekStart === undefined) {
                    instance.weekStart = weekStart = kendo.culture().calendar.firstDay;
                }

                if (weekDays) {
                    instance.weekDays = weekDays.sort(predicate);
                }
            }

            return instance;
        },
        dayInYear: function(date) {
            var month = date.getMonth(),
            days = leapYear(date) ? daysInLeapYear[month] : daysInYear[month];

            return days + date.getDate();
        },
        weekInYear: function(date, weekStart){
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var year = date.getFullYear(),
                days;

            if (weekStart !== undefined) {
                date = recurrence.weekDay(date, weekStart, -1);
                date.setDate(date.getDate() + 4);
            } else {
                date.setDate(date.getDate() + (4 - (date.getDay() || 7)));
            }

            days = Math.floor((date.getTime() - new Date(year, 0, 1, -6)) / 86400000);

            return 1 + Math.floor(days / 7);
        },
        weekInMonth: function(date, weekStart) {
            var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

            if (weekStart > firstWeekday) {
                weekStart *= -1;
            }

            firstWeekday = firstWeekday - weekStart;

            return Math.floor((date.getDate() + firstWeekday - 1) / 7) + 1;
        },
        numberOfWeeks: function(date, weekStart) {
            return recurrence.weekInMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0), weekStart);
        },
        isInWeek: function(date, offset, weekStart) {
            var weekInMonth = recurrence.weekInMonth(date, weekStart);
            if (offset > 0) {
                if (offset === weekInMonth) {
                    return true;
                }
            } else {
                if ((recurrence.numberOfWeeks(date, weekStart) + (offset + 1)) === weekInMonth) {
                    return true;
                }
            }
        },
        weekDay: function(date, dayOfWeek, offset) {
            date = new Date(date);
            offset = offset || 1;

            while(date.getDay() !== dayOfWeek) {
                date.setDate(date.getDate() + offset);
            }

            return date;
        },
        _month: function(date, end, rule) {
            var monthNumber = date.getMonth() + 1,
                weekDays = rule.weekDays,
                months = rule.months,
                update;

            end = +end;

            while ($.inArray(monthNumber, months) === -1) {
                date.setFullYear(date.getFullYear(), monthNumber, 1);
                monthNumber = date.getMonth() + 1;
                update = true;

                if (+date > end) {
                    return date;
                }
            }

            //TODO: place code in different place ???
            if (update && weekDays) {
                rule._weekDayRules = filterWeekDays(weekDays, date.getDay(), rule.weekStart).slice(0);
            }

            return date;
        },

        _monthDay: function(date, end, rule) {
            var weekDays = rule.weekDays,
                days = rule.monthDays,
                update;

            while (!inMonthDaysList(date, days)) {
                date.setDate(date.getDate() + 1);
                update = true;
            }

            //TODO: place code in different place ???
            if (update && weekDays) {
                rule._weekDayRules = filterWeekDays(weekDays, date.getDay(), rule.weekStart).slice(0);
            }

            return date;
        },

        _weekDay: function(date, end, rule) {
            var weekDayRule = rule._weekDayRules.shift(),
                weekStart = rule.weekStart,
                day, offset;

            if (!weekDayRule) {
                date = recurrence.weekDay(date, weekStart);
                rule._weekDayRules = rule.weekDays.slice(0);
                weekDayRule = rule._weekDayRules.shift();

                if (rule.interval > 1) {
                    date.setDate(date.getDate() + ((rule.interval - 1) * 7));
                }
            }

            day = weekDayRule.day;
            offset = weekDayRule.offset;

            if (offset) {
                while (!recurrence.isInWeek(date, offset, weekStart)) {
                    if (date.getDay() === weekStart) {
                        date.setDate(date.getDate() + 1);
                    }

                    date = recurrence.weekDay(date, weekStart);

                    if (+date > +end) {
                        break;
                    }
                }
            }

            if (date.getDay() !== day) {
                date = recurrence.weekDay(date, day);
            }

            return date;
        },

        //TODO: refactor
        _time: function(date, end, rule) {
            var hours = date.getHours(),
                minutes, seconds,
                hourRules = rule._hourRules,
                minuteRules = rule._minuteRules,
                secondRules = rule._secondRules,
                hourRule, minuteRule, secondRule,
                ruleChanged,
                modified;

            while (+date < +end) {
                modified = false;

                if (hourRules && allowTimeExpand(minuteRules, rule.minutes)) {
                    hourRule = hourRules.shift();

                    while (hourRule && hourRule < hours) {
                        hourRule = rule._hourRules.shift();
                    };

                    if (!hourRule) {
                        rule._hourRules = rule.hours.slice(0);
                        hourRule = rule._hourRules.shift();

                        date.setDate(date.getDate() + 1);
                        date.setHours(0); //TODO: DST CHECK
                    }

                    if (minuteRules && hourRule !== hours) {
                        date.setMinutes(0);
                    }

                    date.setHours(hourRule);
                }

                if (minuteRules && allowTimeExpand(secondRules, rule.seconds)) {
                    minutes = date.getMinutes();
                    minuteRule = minuteRules.shift();

                    while (minuteRule && minuteRule < minutes) {
                        minuteRule = rule._minuteRules.shift();
                        ruleChanged = true;
                    };

                    if (!minuteRule) {
                        if (!hourRule || ruleChanged) {
                            date.setHours(date.getHours() + 1); //TODO: DST CHECK
                            ruleChanged = false;
                            modified = !!hourRule;
                        }

                        date.setMinutes(0);

                        rule._minuteRules = rule.minutes.slice(0);
                        minuteRule = rule._minuteRules.shift();
                    }

                    if (secondRules && minuteRule !== minutes) {
                        date.setSeconds(0);
                    }

                    date.setMinutes(minuteRule);
                }

                if (secondRules) {
                    seconds = date.getSeconds();
                    secondRule = secondRules.shift();

                    while (secondRule && secondRule < seconds) {
                        secondRule = secondRules.shift();
                        ruleChanged = true;
                    };

                    if (!secondRule) {
                        if (!minuteRule || ruleChanged) {
                            date.setMinutes(date.getMinutes() + 1); //TODO: DST CHECK
                            ruleChanged = false;
                            modified = !!minuteRule;
                        }

                        date.setSeconds(0);

                        rule._secondRules = rule.seconds.slice(0);
                        secondRule = rule._secondRules.shift();
                    }

                    date.setSeconds(secondRule);
                }

                if (!modified) {
                    break;
                }
            }

            return date;
        }
    };

    function allowTimeExpand(currentRules, timeRules) {
        return !currentRules || currentRules.length === 0 || currentRules.length === timeRules.length;
    }

    function allowExpand(rule) {
        return allowTimeExpand(rule._hourRules, rule.hours) &&
            allowTimeExpand(rule._minuteRules, rule.minutes) &&
            allowTimeExpand(rule._secondRules, rule.seconds);
    }

    function cloneEvent(event, start, durationMS) {
        var end = new Date(start.getTime() + durationMS);

        //TODO: DST check

        return extend({}, event, {
           recurrenceID: event.uid,
           start: new Date(start),
           end: end,
           uid: "" //generate uid ???
        });
    }

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

        return list.sort(function(a,b){return a - b});
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

    function inMonthDaysList(date, monthDays) {
        var month = getMonthLength(date),
            length = monthDays.length,
            day = date.getDate(),
            monthDay,
            idx = 0;

        for (; idx < length; idx++) {
            monthDay = monthDays[idx];
            if (monthDay < 0) {
                monthDay = month + monthDay;
            }

            if (day === monthDay) {
                return true;
            }
        }

        return false;
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

    function leapYear(year) {
        year = year.getFullYear();
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    kendo.recurrence = recurrence;

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
