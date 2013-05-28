kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is an event calendar.",
    depends: [ "core", "binder", "popup", "calendar"],
    features: [ {
        id: "scheduler-dayview",
        name: "Scheduler Day View",
        description: "Scheduler Day View",
        depends: [ "scheduler.dayview" ]
    } ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = "string",
        Popup = ui.Popup,
        Calendar = ui.Calendar,
        isPlainObject = $.isPlainObject,
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

    var defaultViews = {
        day: kendo.ui.DayView,
        week: kendo.ui.WeekView
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

            freq.setup(rule, start, event.start);

            //TODO: if event.start is in the same day as start then set hour
            start.setHours(event.start.getHours());
            start.setMinutes(event.start.getMinutes());
            start.setSeconds(event.start.getSeconds());
            start.setMilliseconds(event.start.getMilliseconds());

            start = freq.limit(start, end, rule);

            while (+start <= end) {
                events.push(cloneEvent(event, start, durationMS));
                if (count && count === current) {
                    break;
                }

                current++;

                start = freq.next(start, rule);
                start = freq.limit(start, end, rule);
            }

            if (rule.setPositions) {
                events = eventsByPosition(events, rule.setPositions);
            }

            return events;
        },

        frequency: {
            //TODO: FREQ: SECONDLY
            //TODO: FREQ: MINUTELY
            hourly: {
                next: function(start, rule) {
                    //if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start = new Date(start);
                        start.setHours(start.getHours() + rule.interval);
                    //}
                    return start;
                },

                setup: function(rule, start, eventStart) {
                    /*
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
                    }*/
                },
                limit: function(date, end, rule) {
                    return date;
                }
            },
            daily: {
                next: function(start, rule) {
                    if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start = new Date(start);
                        start.setDate(start.getDate() + rule.interval);
                    }
                    return start;
                },

                setup: function(rule, start, eventStart) {
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
                    var monthDayMS, weekDayMS, month, dateMS,
                        allow = allowExpand(rule);

                    end = +end;

                    while (+date <= end) {
                        dateMS = +date;
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
                }
            },
            monthly: {
                next: function(start, rule) {
                    var day;

                    if (!rule.monthDays && !rule.weekDays) {
                        day = start.getDate();
                        start.setMonth(start.getMonth() + 1);

                        while(start.getDate() !== day) {
                            start.setDate(day);
                        }
                    } else if (!rule.hours && !rule.minutes && !rule.seconds) {
                        start.setDate(start.getDate() + 1);
                    }
                    return start;
                },
                limit: function(date, end, rule) {
                    var day, month, dateMS,
                        allow = allowExpand(rule);

                    end = +end;
                    while (+date <= end) {
                        dateMS = +date;
                        if (rule.months && allow) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (rule.monthDays && allow) {
                            date = recurrence._monthDay(date, end, rule);
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

                    if (rule.hours) {
                        rule._hourRules = rule.hours.slice();
                    }

                    if (rule.minutes) {
                        rule._minuteRules = rule.minutes.slice();
                    }

                    if (rule.seconds) {
                        rule._secondRules = rule.seconds.slice();
                    }
                }
            },
            yearly: {
                next: function(start, rule) {
                    var day;

                    if (!rule.hours && !rule.minutes && !rule.seconds) {
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
                    }

                    return start;
                },

                limit: function(date, end, rule) {
                    var day, month, dateMS,
                        allow = allowExpand(rule),
                        weekStart = rule.weekStart,
                        modified;

                    end = +end;

                    while (+date <= end) {
                        dateMS = +date;
                        modified = false;

                        if (allow && rule.months) {
                            day = date.getDate();
                            date = recurrence._month(date, end, rule);
                            month = date.getMonth();

                            if (!rule.monthDays && !rule.weekDays) {
                                date.setDate(day);
                            }
                        }

                        if (allow && rule.weeks && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) { //TODO: Sort weeks
                            while ((+date <= end) && $.inArray(recurrence.weekInYear(date, weekStart), rule.weeks) === -1) {
                                date.setDate(date.getDate() + 7);
                            }

                            //TODO: test this logic when while ends because date > end and we move backward!!!
                            date = recurrence.weekDay(date, weekStart, -1); //TODO: implement prevWeekDay
                        }

                        if (allow && rule.yearDays && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) { //TODO: Sort yearDays
                            while ((+date <= end) && $.inArray(recurrence.dayInYear(date), rule.yearDays) === -1) {
                                date.setDate(date.getDate() + 1);
                            }
                        }

                        if (allow && rule.monthDays) {
                            date = recurrence._monthDay(date, end, rule);
                        }

                        if (allow && rule.weekDays) {
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

                            day = date.getDate();
                            date = recurrence._time(date, end, rule);
                            modified = day !== date.getDate();
                        }

                        if (month !== undefined && month !== date.getMonth()) {
                            date.setDate(date.getDate() + 1);
                        } else if (!modified && +date <= end) {
                            break;
                        }
                    }

                    return date;
                },
                setup: function(rule, start) {
                    if (rule.weekDays && rule._weekDayRules === undefined) {
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
                        //TODO: rename to positions
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

    function eventsByPosition(events, positions) {
        var result = [],
            length = positions.length,
            idx = 0, event;

        for (;idx < length; idx++) {
            event = events[positions[idx] - 1];

            if (event) {
                result.push(event);
            }
        }

        return result;
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
