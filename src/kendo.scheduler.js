kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is an event calendar.",
    depends: [ "dropdownlist", "editable", "multiselect", "window", "datepicker", "scheduler.recurrence",
        "scheduler.view" ],
    features: [ {
        id: "scheduler-dayview",
        name: "Scheduler Day View",
        description: "Scheduler Day View",
        depends: [ "scheduler.dayview" ]
    }, {
        id: "scheduler-agendaview",
        name: "Scheduler Agenda View",
        description: "Scheduler Agenda View",
        depends: [ "scheduler.agendaview" ]
    }, {
        id: "scheduler-monthview",
        name: "Scheduler Month View",
        description: "Scheduler Month View",
        depends: [ "scheduler.monthview" ]
    } ]
});

(function($, undefined) {
    var kendo = window.kendo,
        date = kendo.date,
        MS_PER_DAY = date.MS_PER_DAY,
        getDate = date.getDate,
        recurrence = kendo.recurrence,
        keys = kendo.keys,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = "string",
        Popup = ui.Popup,
        Calendar = ui.Calendar,
        DataSource = kendo.data.DataSource,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        proxy = $.proxy,
        toString = Object.prototype.toString,
        isArray = $.isArray,
        NS = ".kendoScheduler",
        CLICK = "click",
        CHANGE = "change",
        CANCEL = "cancel",
        REMOVE = "remove",
        SAVE = "save",
        ADD = "add",
        EDIT = "edit",
        TODAY = getDate(new Date()),
        RECURRENCE_DATE_FORMAT = "yyyyMMddTHHmmssZ",
        DELETECONFIRM = "Are you sure you want to delete this event?",
        DELETERECURRING = "Do you want to delete only this event occurrence or the whole series?",
        EDITRECURRING = "Do you want to edit only this event occurrence or the whole series?",
        COMMANDBUTTONTMPL = '<a class="k-button #=className#" #=attr# href="\\#">#=text#</a>',
        TOOLBARTEMPLATE = kendo.template('<div class="k-floatwrap k-header k-scheduler-toolbar k-secondary">' +
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
        DATERANGEEDITOR = function(container, options) {
            var attr = { name: options.field };

            appendDateCompareValidator(attr, options);

            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' ' + kendo.attr("role") + '="datetimepicker" ' + kendo.attr("bind") + '="value:' + options.field +',invisible:isAllDay" />')
            .attr(attr).appendTo(container);

            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' '  + kendo.attr("role") + '="datepicker" ' + kendo.attr("bind") + '="value:' + options.field +',visible:isAllDay" />')
            .attr(attr).appendTo(container);

            $('<span ' + kendo.attr("bind") + '="text: ' + options.field + 'Timezone"></span>').appendTo(container);

            if (options.field === "end") {
                $('<span ' + kendo.attr("bind") + '="text: startTimezone, invisible: endTimezone"></span>').appendTo(container);
            }

            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        },
        getMilliseconds = kendo.date.getMilliseconds,
        RECURRENCEEDITOR = function(container, options) {
            $('<div ' + kendo.attr("bind") + '="value:' + options.field +'" />')
                .attr({
                    name: options.field
                })
                .appendTo(container)
                .kendoRecurrenceEditor({
                    start: options.model.start,
                    timezone: options.timezone,
                    messages: options.messages
                });
        },
        TIMEZONEPOPUP = function(container, options) {
            $('<a href="#" class="k-button">' + options.messages.timezoneEditorButton + '<a/>').click(options.click).appendTo(container);
        },
        TIMEZONEEDITOR = function(container, options) {
            $('<div ' + kendo.attr("bind") + '="value:' + options.field +'" />')
                .attr({
                    name: options.field
                })
                .toggle(options.visible)
                .appendTo(container)
                .kendoTimezoneEditor();
        };

    function appendDateCompareValidator(attrs, options) {
        var validationRules = options.model.fields[options.field].validation;

        if (validationRules) {
            var dateCompareRule = validationRules.dateCompare;
            if (dateCompareRule && isPlainObject(dateCompareRule) && dateCompareRule.message) {
                attrs[kendo.attr("dateCompare-msg")] = dateCompareRule.message;
            }
        }
    }

    function wrapDataAccess(originalFunction, timezone) {
        return function(data) {
            data = originalFunction(data);

            convertData(data, "apply",  timezone);

            return data || [];
        };
    }

    function wrapDataSerialization(originalFunction, timezone) {
        return function(data) {

            if (data) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof kendo.data.ObservableArray)) {
                    data = [data];
                }
            }

            convertData(data, "remove",  timezone, true);

            data = originalFunction(data);

            return data || [];
        };
    }

    function convertData(data, method, timezone, removeUid) {
        var event,
            idx,
            length;

        data = data || [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            event = data[idx];

            if (removeUid) {
                if (event.startTimezone || event.endTimezone) {
                    if (timezone) {
                        event.start = kendo.timezone.convert(event.start, event.startTimezone || event.endTimezone, timezone);
                        event.end = kendo.timezone.convert(event.end, event.endTimezone || event.startTimezone, timezone);

                        event.start = kendo.timezone[method](event.start, timezone);
                        event.end = kendo.timezone[method](event.end, timezone);
                    } else {
                        event.start = kendo.timezone[method](event.start, event.startTimezone || event.endTimezone);
                        event.end = kendo.timezone[method](event.end, event.endTimezone || event.startTimezone);
                    }

                } else if (timezone) {
                    event.start = kendo.timezone[method](event.start, timezone);
                    event.end = kendo.timezone[method](event.end, timezone);
                }
            } else {
                if (event.startTimezone || event.endTimezone) {
                    event.start = kendo.timezone[method](event.start, event.startTimezone || event.endTimezone);
                    event.end = kendo.timezone[method](event.end, event.endTimezone || event.startTimezone);

                    if (timezone) {
                        event.start = kendo.timezone.convert(event.start, event.startTimezone || event.endTimezone, timezone);
                        event.end = kendo.timezone.convert(event.end, event.endTimezone || event.startTimezone, timezone);
                    }

                } else if (timezone) {
                    event.start = kendo.timezone[method](event.start, timezone);
                    event.end = kendo.timezone[method](event.end, timezone);
                }
            }

            if (removeUid) {
                delete event.uid;
            }
        }
        return data;
    }

    function getOccurrenceByUid(data, uid) {
        var length = data.length,
            idx = 0,
            event;

        for (; idx < length; idx++) {
            event = data[idx];

            if (event.uid === uid) {
                return event;
            }
        }
    }

    function toInvariantDate(date) {
        var invariant = new Date(1980, 0, 1);
        invariant.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return invariant;
    }

    var SchedulerDataReader = kendo.Class.extend({
        init: function(schema, reader) {
            var timezone = schema.timezone;

            this.reader = reader;

            if (reader.model) {
                this.model = reader.model;
            }

            this.timezone = timezone;
            this.data = wrapDataAccess($.proxy(this.data, this), timezone);
            this.serialize = wrapDataSerialization($.proxy(this.serialize, this), timezone);
        },
        errors: function(data) {
            return this.reader.errors(data);
        },
        parse: function(data) {
            return this.reader.parse(data);
        },
        data: function(data) {
            return this.reader.data(data);
        },
        total: function(data) {
            return this.reader.total(data);
        },
        groups: function(data) {
            return this.reader.groups(data);
        },
        aggregates: function(data) {
            return this.reader.aggregates(data);
        },
        serialize: function(data) {
            return this.reader.serialize(data);
        }
    });

    function dateCompareValidator(input) {
        if (input.filter("[name=end]").length) {
            var container = input.closest(".k-scheduler-edit-form");
            var startInput = container.find("[name=start]:visible");
            var endInput = container.find("[name=end]:visible");

            if (endInput.length && startInput.length) {
                var startPicker = kendo.widgetInstance(startInput, kendo.ui);
                var endPicker = kendo.widgetInstance(endInput, kendo.ui);

                if (startPicker && endPicker) {
                    return startPicker.value() <= endPicker.value();
                }
            }
        }
        return true;
    }

    var SchedulerEvent = kendo.data.Model.define({
        init: function(value) {
            var that = this;

            kendo.data.Model.fn.init.call(that, value);
        },

        clone: function(options, updateUid) {
            var uid = this.uid,
                event = new this.constructor($.extend({}, this.toJSON(), options));

            if (!updateUid) {
                event.uid = uid;
            }

            return event;
        },

        expand: function(start, end, zone) {
            return recurrence ? recurrence.expand(this, start, end, zone) : [this];
        },

        update: function(eventInfo) {
            for (var field in eventInfo) {
                this.set(field, eventInfo[field]);
            }

            this.set("startTime", toInvariantDate(this.start));
            this.set("endTime", toInvariantDate(this.end));
        },

        isException: function() {
            return this.id && this.recurrenceId;
        },

        isRecurring: function() {
            return !!(this.recurrenceRule || this.recurrenceId);
        },

        isRecurrenceHead: function() {
            return !!(this.id && this.recurrenceRule);
        },

        toOccurrence: function(options) {
            options = $.extend(options, {
                recurrenceException: null,
                recurrenceRule: null,
                recurrenceId: this.id || this.recurrenceId,
                id: this.defaults.id
            });

            options[this.idField] = this.defaults.id;

            return this.clone(options, true);
        },

        toJSON: function() {
            var obj = kendo.data.Model.fn.toJSON.call(this);
            obj.uid = this.uid;

            return obj;
        },

        set: function(key, value) {
            var isAllDay = this.isAllDay || false;

            kendo.data.Model.fn.set.call(this, key, value);

            if (key == "isAllDay" && value != isAllDay) {
                var start = kendo.date.getDate(this.start);
                var end = new Date(this.end);
                var milliseconds = kendo.date.getMilliseconds(end);

                if (milliseconds === 0 && value) {
                    milliseconds = MS_PER_DAY;
                }

                this.set("start", start);

                if (value === true) {
                    kendo.date.setTime(end, -milliseconds);

                    if (end < start) {
                        end = start;
                    }
                } else {
                    kendo.date.setTime(end, MS_PER_DAY - milliseconds);
                }

                this.set("end", end);
            }
        },
        id: "id",
        fields: {
            id: { type: "number" },
            title: { defaultValue: "", type: "string" },
            start: { type: "date", validation: { required: true } },
            startTimezone: { type: "string" },
            end: { type: "date", validation: { required: true, dateCompare: { value: dateCompareValidator, message: "End date should be greater than or equal to the start date"}} },
            endTimezone: { type: "string" },
            recurrenceRule: { defaultValue: "", type: "string" },
            recurrenceException: { defaultValue: "", type: "string" },
            isAllDay: { type: "boolean", defaultValue: false },
            description: { type: "string" }
        }
    });

    var SchedulerDataSource = DataSource.extend({
        init: function(options) {

            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    modelBase: SchedulerEvent,
                    model: SchedulerEvent
                }
            }, options));

            this.reader = new SchedulerDataReader(this.options.schema, this.reader);
        },

        expand: function(start, end) {
            var data = this.view(),
                filter = {};

            if (start && end) {
                end = new Date(end.getTime() + MS_PER_DAY - 1);

                filter = {
                    logic: "or",
                    filters: [
                        {
                            logic: "and",
                            filters: [
                                { field: "start", operator: "gte", value: start },
                                { field: "end", operator: "gte", value: start },
                                { field: "start", operator: "lte", value: end }
                            ]
                        },
                        {
                            logic: "and",
                            filters: [
                                { field: "start", operator: "lte", value: new Date(start.getTime() + MS_PER_DAY - 1) },
                                { field: "end", operator: "gte", value: start }
                            ]
                        }
                    ]
                };

                data = new kendo.data.Query(expandAll(data, start, end, this.reader.timezone)).filter(filter).toArray();
            }

            return data;
        },

        cancelChanges: function(model) {
            if (model.recurrenceId && !model.id) {
                this._removeExceptionDate(model);
            }

            DataSource.fn.cancelChanges.call(this, model);
        },

        insert: function(index, model) {
            if (!model) {
                return;
            }

            if (!(model instanceof SchedulerEvent)) {
                var eventInfo = model;

                model = this._createNewModel();
                model.accept(eventInfo);
            }

            if (model.isRecurrenceHead() || model.recurrenceId) {
                model = model.recurrenceId ? model : model.toOccurrence();
                this._addExceptionDate(model);
            }

            return DataSource.fn.insert.call(this, index, model);
        },

        remove: function(model) {
            if (model.isRecurrenceHead()) {
                this._removeExceptions(model);
            } else if (model.recurrenceId) {
                this._addExceptionDate(model);
            }

            return DataSource.fn.remove.call(this, model);
        },

        _removeExceptions: function(model) {
            var dataSource = this,
                data = dataSource.data(),
                length = data.length,
                idx = 0, dataItem,
                id = model.id;

            for (; idx < length; idx++) {
                dataItem = data[idx];

                if (dataItem.recurrenceId === id) {
                    DataSource.fn.remove.call(this, dataItem);
                    length -= 1;
                    idx -= 1;
                }
            }

            model.set("recurrenceException", "");
        },

        //TODO: refactor
        _removeExceptionDate: function(model) {
            var origin, exceptionDate, exception,
            zone = model.startTimezone || model.endTimezone || this.reader.timezone,
            start = model.start;

            if (model.recurrenceId) {
                origin = this.get(model.recurrenceId);
                start = kendo.timezone.convert(start, zone || start.getTimezoneOffset(), "Etc/UTC");

                if (origin) {
                    exceptionDate = kendo.toString(start, RECURRENCE_DATE_FORMAT) + ";";
                    exception = origin.recurrenceException.replace(exceptionDate, "");
                    origin.set("recurrenceException", exception);
                }
            }
        },

        //TODO: refactor
        _addExceptionDate: function(model) {
            var origin = this.get(model.recurrenceId),
                zone = model.startTimezone || model.endTimezone || this.reader.timezone,
                exception = origin.recurrenceException || "",
                start = model.start;

            if (!recurrence.isException(exception, start, zone)) {
                start = kendo.timezone.convert(start, zone || start.getTimezoneOffset(), "Etc/UTC");
                exception += kendo.toString(start, RECURRENCE_DATE_FORMAT) + ";";

                origin.set("recurrenceException", exception);
            }
        }
    });

    function expandAll(events, start, end, zone) {
        var length = events.length,
            data = [],
            idx = 0;

        for (; idx < length; idx++) {
            data = data.concat(events[idx].expand(start, end, zone));
        }

        return data;
    }

    SchedulerDataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data;

        dataSource.data = data;

        if (!(dataSource instanceof SchedulerDataSource) && dataSource instanceof kendo.data.DataSource) {
            throw new Error("Incorrect DataSource type. Only SchedulerDataSource instances are supported");
        }

        return dataSource instanceof SchedulerDataSource ? dataSource : new SchedulerDataSource(dataSource);
    };

    extend(true, kendo.data, {
       SchedulerDataSource: SchedulerDataSource,
       SchedulerDataReader: SchedulerDataReader,
       SchedulerEvent: SchedulerEvent
    });

    var defaultCommands = {
        update: {
            text: "Save",
            className: "k-scheduler-update"
        },
        canceledit: {
            text: "Cancel",
            className: "k-scheduler-cancel"
        },
        destroy: {
            text: "Delete",
            imageClass: "k-delete",
            className: "k-grid-delete",
            iconClass: "k-icon"
        }
    };

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        delete options.remove;
        delete options.edit;

        return options;
    }

    function dropDownResourceEditor(resource) {
        return function(container) {
           $(kendo.format('<select data-{0}bind="value:{1}">', kendo.ns, resource.field))
             .appendTo(container)
             .kendoDropDownList({
                 dataTextField: resource.dataTextField,
                 dataValueField: resource.dataValueField,
                 dataSource: resource.dataSource,
                 valuePrimitive: resource.valuePrimitive,
                 optionLabel: "None",
                 template: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField)
             });
       };
    }

    function multiSelectResourceEditor(resource) {
        return function(container) {
           $(kendo.format('<select data-{0}bind="value:{1}">', kendo.ns, resource.field))
             .appendTo(container)
             .kendoMultiSelect({
                 dataTextField: resource.dataTextField,
                 dataValueField: resource.dataValueField,
                 dataSource: resource.dataSource,
                 valuePrimitive: resource.valuePrimitive,
                 itemTemplate: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField),
                 tagTemplate: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField)
             });
       };
    }

    var Scheduler = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            if (!that.options.views || !that.options.views.length) {
                that.options.views = ["day", "week"];
            }

            that.resources = [];

            that._initModel();

            that._wrapper();

            that._views();

            that._toolbar();

            that._dataSource();

            that._resources();

            that._resizeHandler = proxy(that._resize, that);

            that.wrapper.on("mousedown" + NS + " selectstart" + NS, function(e) {
                e.preventDefault();
            });

            if (that.options.editable && that.options.editable.resize !== false) {
                that._resizable();
            }

            if (that.options.editable && that.options.editable.move !== false) {
                that._movable();
            }

            $(window).on("resize" + NS, that._resizeHandler);

            if(that.options.messages && that.options.messages.recurrence) {
                recurrence.options = that.options.messages.recurrence;
            }

            that._selectable();
        },

        _selectable: function() {
            var that = this,
                selectEvent = kendo.support.mobileOS ? "touchend" : "mousedown";

            if (!that.options.selectable) {
                return;
            }

            that._tabindex();

            that.wrapper.on(selectEvent, ".k-scheduler-header-all-day td, .k-scheduler-content td, .k-event", function(e) {
                that._createSelection(e.currentTarget);
                that.wrapper.focus();
            });

            that.wrapper.on("focus" + NS, function() {
                if (!that._selection) {
                    that._createSelection($(".k-scheduler-content").find("td:first"));
                }

                that.view().select(that._selection);
            });

            that.wrapper.on("focusout" + NS, function() {
                that.view().clearSelection();
                that._ctrlKey = that._shiftKey = false;
            });

            that.wrapper.on("keydown" + NS, proxy(that._keydown, that));

            that.wrapper.on("keyup" + NS, function(e) {
                that._ctrlKey = e.ctrlKey;
                that._shiftKey = e.shiftKey;
            });

        },

        _viewByIndex: function(index) {
            var view, views = this.views;

            for (view in views) {
                if (!index) {
                    return view;
                }

                index--;
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                view = that.view(),
                editable = view.options.editable,
                selection = that._selection,
                shiftKey = e.shiftKey,
                start;

            that._ctrlKey = e.ctrlKey;
            that._shiftKey = e.shiftKey;

            if (key === keys.TAB) {
                if (view.moveToEvent(selection, shiftKey)) {
                    view.select(selection);
                    e.preventDefault();
                }
            } else if (editable && key === keys.ENTER) {
                // add/edit event
                if (selection.events.length) {
                    if (editable.update !== false) {
                        that.editEvent(selection.events[0]);
                    }
                } else if (editable.create !== false) {
                    that.addEvent(selection);
                }
            } else if (key === keys.DELETE) {
                that.removeEvent(selection.events[0]);
            } else if (key >= 49 && key <= 57) {
                // switch to view 1-9
                that.view(that._viewByIndex(key - 49));
            } else if (view.move(selection, key, shiftKey)) {
                start = selection.start;

                if (view.isInRange(start)) {
                    view.select(selection);
                } else {
                    that.date(start);
                }

                e.preventDefault();
            }

            that._adjustSelectedDate();
        },

        _createSelection: function(item) {
            var uid, slot, selection;

            if (!this._selection || (!this._ctrlKey && !this._shiftKey)) {
                this._selection = {
                    events: [],
                    groupIndex: 0
                };
            }

            item = $(item);
            selection = this._selection;
            uid = item.attr(kendo.attr("uid"));
            slot = this.view().selectionByElement(item);

            if (slot) {
                selection.groupIndex = slot.groupIndex;
            }

            if (uid) {
                slot = getOccurrenceByUid(this._data, uid);
            }

            if (slot && slot.uid) {
                uid = [slot.uid];
            }

            this._updateSelection(slot, uid);
            this._adjustSelectedDate();
        },

        _updateSelection: function(dataItem, events) {
            var selection = this._selection;

            if (dataItem && selection) {
                if (this._shiftKey && selection.start && selection.end) {
                    var backward = dataItem.end < selection.end,
                        view = this.view();

                    selection.end = new Date(dataItem.end);

                    if (backward && view._timeSlotInterval) {
                        kendo.date.setTime(selection.end, -view._timeSlotInterval());
                    }
                } else {
                    selection.start = new Date(dataItem.start.getTime());
                    selection.end = new Date(dataItem.end.getTime());
                }

                selection.isAllDay = dataItem.isAllDay;
                selection.index = dataItem.index;
                if (this._ctrlKey) {
                    selection.events = selection.events.concat(events || []);
                } else {
                    selection.events = events || [];
                }
            }
        },

        options: {
            name: "Scheduler",
            date: TODAY,
            editable: true,
            autoBind: true,
            timezone: "",
            messages: {
                today: "Today",
                save: "Save",
                cancel: "Cancel",
                destroy: "Delete",
                views: {
                    day: "Day",
                    week: "Week",
                    agenda: "Agenda",
                    month: "Month"
                },
                recurrenceMessages: {
                    deleteWindowTitle: "Delete Recurring Item",
                    deleteWindowOccurrence: "Delete current occurrence",
                    deleteWindowSeries: "Delete the series",
                    editWindowTitle: "Edit Recurring Item",
                    editWindowOccurrence: "Edit current occurrence",
                    editWindowSeries: "Edit the series"
                },
                editor: {
                    title: "Title",
                    start: "Start",
                    end: "End",
                    allDayEvent: "All day event",
                    description: "Description",
                    repeat: "Repeat",
                    timezone: " ",
                    startTimezone: "Start timezone",
                    endTimezone: "End timezone",
                    separateTimezones: "Use separate start and end time zones",
                    timezoneEditorTitle: "Timezones",
                    timezoneEditorButton: "Time zone",
                    editorTitle: "Event"
                }
            },
            height: null,
            width: null,
            resources: [],
            group: {
                resources: [],
                direction: "horizontal"
            },
            views: [],
            selectable: false
        },

        events: [
            REMOVE,
            EDIT,
            CANCEL,
            SAVE,
            "dataBinding",
            "dataBound"
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

            if (that.view()) {
                that.view().destroy();
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

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                dataSource.fetch();
            }
        },

        items: function() {
            return this.wrapper.children(".k-event, .k-task");
        },

        _movable: function() {
            var startSlot;
            var endSlot;
            var event;
            var that = this;

            that._moveDraggable = new kendo.ui.Draggable(that.element, {
                distance: 0,
                filter: ".k-event",
                dragstart: function(e) {
                    var eventElement = e.currentTarget;

                    var uid = eventElement.attr(kendo.attr("uid"));

                    var view = that.view();

                    event = getOccurrenceByUid(that._data, uid);

                    startSlot = view._slotByPosition(e.x.location, e.y.location);

                    endSlot = startSlot;
                },
                drag: function(e) {
                    var view = that.view();

                    var slot = view._slotByPosition(e.x.location, e.y.location);

                    if (!slot) {
                        return;
                    }

                    endSlot = slot;

                    view._updateMoveHint(event, startSlot, endSlot);
                },
                dragend: function() {
                    that.view()._removeMoveHint();

                    var distance = endSlot.start.getTime() - startSlot.start.getTime();

                    var duration = event.end.getTime() - event.start.getTime();

                    var start = new Date(event.start.getTime());

                    kendo.date.setTime(start, distance);

                    var end = new Date(start.getTime());

                    kendo.date.setTime(end, duration);

                    var endResources = that.view()._resourceBySlot(endSlot);
                    var startResources = that.view()._resourceBySlot(startSlot);

                    if (event.start.getTime() != start.getTime() ||
                        event.end.getTime() != end.getTime() ||
                        kendo.stringify(endResources) != kendo.stringify(startResources))  {
                        that._updateEvent(null, event, $.extend({ start: start, end: end }, endResources));
                    }
                },
                dragcancel: function() {
                    that.view()._removeMoveHint();
                }
            });
        },

        _resizable: function() {
            var startSlot;
            var endSlot;
            var event;
            var that = this;

            function direction(handle) {
                var directions = {
                    "k-resize-e": "east",
                    "k-resize-w": "west",
                    "k-resize-n": "north",
                    "k-resize-s": "south"
                };

                for (var key in directions) {
                    if (handle.hasClass(key)) {
                        return directions[key];
                    }
                }
            }

            that._resizeDraggable = new kendo.ui.Draggable(that.element, {
                distance: 0,
                filter: ".k-resize-handle",
                dragstart: function(e) {
                    var dragHandle = $(e.currentTarget);

                    var eventElement = dragHandle.closest(".k-event");

                    var uid = eventElement.attr(kendo.attr("uid"));

                    event = getOccurrenceByUid(that._data, uid);
                    var view = that.view();

                    var events = this.element.find(kendo.format(".k-event[{0}={1}]", kendo.attr("uid"), uid));

                    eventElement = events.first();

                    var offset = eventElement.offset();

                    startSlot = view._slotByPosition(offset.left, offset.top);

                    eventElement = events.last();

                    offset = eventElement.offset();

                    offset.left += eventElement[0].clientWidth;

                    offset.top += eventElement[0].clientHeight;

                    endSlot = view._slotByPosition(offset.left, offset.top);
                },
                drag: function(e) {
                    var dragHandle = $(e.currentTarget);

                    var dir = direction(dragHandle);

                    var view = that.view();

                    var slot = view._slotByPosition(e.x.location, e.y.location);

                    if (!slot) {
                        return;
                    }

                    var update = false;

                    if (dir == "south") {
                        if (startSlot.groupIndex == slot.groupIndex && slot.end - event.start >= view._timeSlotInterval()) {
                            endSlot = slot;
                            update = true;
                        }
                    } else if (dir == "north") {
                        if (endSlot.groupIndex == slot.groupIndex && event.end - slot.start >= view._timeSlotInterval()) {
                            startSlot = slot;
                            update = true;
                        }
                    } else if (dir == "east") {
                        if (startSlot.groupIndex == slot.groupIndex && kendo.date.getDate(slot.end).getTime() >= kendo.date.getDate(event.start).getTime()) {
                            endSlot = slot;
                            update = true;
                        }
                    } else if (dir == "west") {
                        if (endSlot.groupIndex == slot.groupIndex && kendo.date.getDate(event.end).getTime() >= kendo.date.getDate(slot.start).getTime()) {
                            startSlot = slot;
                            update = true;
                        }
                    }

                    if (update) {
                        view._updateResizeHint(dir, startSlot, endSlot);
                    }
                },
                dragend: function(e) {
                    var dragHandle = $(e.currentTarget);
                    var start = new Date(event.start.getTime());
                    var end = new Date(event.end.getTime());
                    var dir = direction(dragHandle);

                    that.view()._removeResizeHint();

                    if (dir == "south") {
                        end = endSlot.end;
                    } else if (dir == "north") {
                        start = startSlot.start;
                    } else if (dir == "east") {
                        end = kendo.date.getDate(endSlot.end);

                        if (!event.isAllDay) {
                            end = kendo.date.addDays(end, 1);
                        }
                    } else if (dir == "west") {
                        start = new Date(startSlot.start.getTime());
                        start.setHours(0);
                        start.setMinutes(0);
                    }

                    if (event.start.getTime() != start.getTime() || event.end.getTime() != end.getTime()) {
                        that._updateEvent(dir, event, { start: start, end: end });
                    }
                },
                dragcancel: function() {
                    that.view()._removeResizeHint();
                }
            });
        },

        _updateEvent: function(dir, event, eventInfo) {
            var that = this;

            var updateEvent = function(event) {
                event.update(eventInfo);

                if (!that.trigger(SAVE, { model: event })) {
                    that._updateSelection(event);
                    that.dataSource.sync();
                }
            };

            var recurrenceHead = function(event) {
                if (event.recurrenceRule) {
                    return that.dataSource.getByUid(event.uid);
                } else {
                    return that.dataSource.get(event.recurrenceId);
                }
            };

            var updateSeries = function() {
                var head = recurrenceHead(event);

                if (dir == "south" || dir == "north") {
                    if (eventInfo.start) {
                        var start = kendo.date.getDate(head.start);
                        kendo.date.setTime(start, getMilliseconds(eventInfo.start));
                        eventInfo.start = start;
                    }
                    if (eventInfo.end) {
                        var end = kendo.date.getDate(head.end);
                        kendo.date.setTime(end, getMilliseconds(eventInfo.end));
                        eventInfo.end = end;
                    }
                }

                updateEvent(head);
            };

            var updateOcurrence = function() {
                var exception = recurrenceHead(event).toOccurrence({ start: event.start, end: event.end });

                exception = that.dataSource.add(exception);
                exception.update(eventInfo);

                if (!that.trigger(SAVE, { model: exception })) {
                    that._updateSelection(exception);
                    that.dataSource.sync();
                }
            };

            var recurrenceMessages = that.options.messages.recurrenceMessages;
            if (event.recurrenceRule || (event.recurrenceId && !event.id)) {
                that.showDialog({
                    title: recurrenceMessages.editWindowTitle,
                    text: recurrenceMessages.editRecurring ? recurrenceMessages.editRecurring : EDITRECURRING,
                    buttons: [
                        { text: recurrenceMessages.editWindowOccurrence, click: updateOcurrence },
                        { text: recurrenceMessages.editWindowSeries, click: updateSeries }
                    ]
                });
            } else {
                updateEvent(that.dataSource.getByUid(event.uid));
            }
        },

        _modelForContainer: function(container) {
            container = $(container).closest("[" + kendo.attr("uid") + "]");

            return this.dataSource.getByUid(container.attr(kendo.attr("uid")));
        },

        showDialog: function(options) {
            var html = kendo.format("<div class='k-popup-edit-form'><div class='k-edit-form-container'><p class='k-popup-message'>{0}</p>", options.text);
            var scheduler = this;

            html += '<div class="k-edit-buttons k-state-default">';

            for (var buttonIndex = 0; buttonIndex < options.buttons.length; buttonIndex++) {
                html+= scheduler._createButton(options.buttons[buttonIndex]);
            }

            html += '</div></div></div>';

            var popup = $(html).appendTo(scheduler.wrapper)
                               .eq(0)
                               .on("click", ".k-button", function(e) {
                                    e.preventDefault();

                                    popup.close();

                                    var buttonIndex = $(e.currentTarget).index();

                                    options.buttons[buttonIndex].click();
                               })
                               .kendoWindow({
                                   modal: true,
                                   resizable: false,
                                   draggable: false,
                                   title: options.title,
                                   visible: false,
                                   close: function() {
                                       this.destroy();
                                       scheduler.focus();
                                   }
                               })
                               .getKendoWindow();

            popup.center().open();
        },

        focus: function() {
            this.wrapper.focus();
        },

        _confirmation: function(callback) {
            var editable = this.options.editable;

            if (editable === true || editable.confirmation) {
                var messages = this.options.messages;

                var text = typeof editable.confirmation === STRING ? editable.confirmation : DELETECONFIRM;

                this.showDialog({
                    text: text,
                    title: "Delete Event",
                    buttons: [
                        { name: "destroy", text: messages.destroy, click: function() { callback(); } },
                        { name: "canceledit", text: messages.cancel, click: function() { callback(true); } }
                    ]
                });
            } else {
                callback();
            }
        },

        addEvent: function(eventInfo) {
            var editable = this.editable,
                dataSource = this.dataSource,
                event;

            if ((editable && editable.end()) || !editable) {

                this.cancelEvent();

                if (eventInfo && eventInfo.toJSON) {
                    eventInfo = eventInfo.toJSON();
                }

                event = dataSource.add(eventInfo);

                if (event) {
                    this.cancelEvent();
                    this._editEvent(event);
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

                if (!model.dirty) {
                    that._convertDates(model, "remove");
                }

                if (model.isRecurrenceHead()) {
                    that.dataSource._removeExceptions(model);
                }

                that.dataSource.sync();
            }
        },

        cancelEvent: function() {
            var that = this,
                container = that._editContainer,
                model;

            if (container) {
                model = that._modelForContainer(container);

                model.startTime = that._startTime;
                model.endTime = that._endTime;

                delete that._startTime;
                delete that._endTime;

                that.dataSource.cancelChanges(model);

                //TODO: handle the cancel in UI

                that._destroyEditable();
            }
        },

        editEvent: function(uid) {
            var model = typeof uid == "string" ? this.getOccurrence(uid) : uid;

            if (!model) {
                return;
            }

            this.cancelEvent();

            if (model.isRecurring()) {
                this._editRecurringDialog(model);
            } else {
                this._editEvent(model);
            }
        },

        _editEvent: function(model) {
            var that = this,
                container;

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
        },

        _editRecurringDialog: function(model) {
            var that = this;

            var editOccurrence = function() {
                if (model.isException()) {
                    that._editEvent(model);
                } else {
                    that.addEvent(model);
                }
            };

            var editSeries = function() {
                if (model.recurrenceId) {
                    model = that.dataSource.get(model.recurrenceId);
                }

                that._editEvent(model);
            };

            var recurrenceMessages = that.options.messages.recurrenceMessages;
            that.showDialog({
                title: recurrenceMessages.editWindowTitle,
                text: recurrenceMessages.editRecurring ? recurrenceMessages.editRecurring : EDITRECURRING,
                buttons: [
                    { text: recurrenceMessages.editWindowOccurrence, click: editOccurrence },
                    { text: recurrenceMessages.editWindowSeries, click: editSeries }
                ]
            });
        },

        _createButton: function(command) {
            var template = command.template || COMMANDBUTTONTMPL,
                commandName = typeof command === STRING ? command : command.name || command.text,
                options = { className: "k-scheduler-" + (commandName || "").replace(/\s/g, ""), text: commandName, attr: "" };

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

                options = extend(true, options, defaultCommands[commandName], command);
            } else {
                options = extend(true, options, defaultCommands[commandName]);
            }

            return kendo.template(template)(options);
        },

        _convertDates: function(model, method) {
            var timezone = this.dataSource.reader.timezone;
            var startTimezone = model.startTimezone;
            var endTimezone = model.endTimezone;
            var start = model.start;
            var end = model.start;

            method = method || "apply";
            startTimezone = startTimezone || endTimezone;
            endTimezone = endTimezone || startTimezone;

            if (startTimezone) {
                if (timezone) {
                    if (method === "apply") {
                        start = kendo.timezone.convert(model.start, timezone, startTimezone);
                        end = kendo.timezone.convert(model.end, timezone, endTimezone);
                    } else {
                        start = kendo.timezone.convert(model.start, startTimezone, timezone);
                        end = kendo.timezone.convert(model.end, endTimezone, timezone);
                    }
                } else {
                    start = kendo.timezone[method](model.start, startTimezone);
                    end = kendo.timezone[method](model.end, endTimezone);
                }

                model._set("start", start);
                model._set("end", end);
            }
        },

        _revertTimezones: function(model) {
            model.set("startTimezone", this._startTimezone);
            model.set("endTimezone", this._endTimezone);

            delete this._startTimezone;
            delete this._endTimezone;
        },

        _createTimezonePopup: function(model, activator) {
            var that = this,
                container = that._editContainer.find(".k-scheduler-timezones"),
                checkbox = container.find(".k-timezone-toggle"),
                endTimezoneRow = container.find(".k-edit-label:last").add(container.find(".k-edit-field:last")),
                saveButton = container.find(".k-scheduler-savetimezone"),
                cancelButton = container.find(".k-scheduler-canceltimezone"),
                timezonePopup = that._timezonePopup,
                wnd;

            that._startTimezone = model.startTimezone;
            that._endTimezone = model.endTimezone;

            if (!timezonePopup) {
                that._timezonePopup = timezonePopup = container.kendoWindow({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: that.options.messages.editor.timezoneEditorTitle,
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            that._revertTimezones(model);
                        }

                        if (activator) {
                            activator.focus();
                        }
                    }
                });

                checkbox.click(function() {
                    endTimezoneRow.toggle($(this).prop("checked"));
                    model.set("endTimezone", "");
                });

                saveButton.click(function(e) {
                    e.preventDefault();
                    wnd.close();
                });

                cancelButton.click(function(e) {
                    e.preventDefault();
                    that._revertTimezones(model);
                    wnd.close();
                });
            }

            checkbox.prop("checked", model.endTimezone);
            endTimezoneRow.toggle(model.endTimezone);

            wnd = timezonePopup.data("kendoWindow");
            wnd.center().open();
        },

        _createPopupEditor: function(model) {
            var that = this,
                editable = that.options.editable,
                html = '<div ' + kendo.attr("uid") + '="' + model.uid + '" class="k-popup-edit-form k-scheduler-edit-form"><div class="k-edit-form-container">',
                template = editable.template,
                messages = that.options.messages,
                updateText = messages.save,
                cancelText = messages.cancel,
                click = function(e) {
                    e.preventDefault();
                    that._createTimezonePopup(model, this);
                },
                fields = [
                    { field: "title", title: messages.editor.title /*, format: field.format, editor: field.editor, values: field.values*/ },
                    { field: "start", title: messages.editor.start, editor: DATERANGEEDITOR },
                    { field: "end", title: messages.editor.end, editor: DATERANGEEDITOR },
                    { field: "isAllDay", title: messages.editor.allDayEvent }
                ],
                attr,
                options = isPlainObject(editable) ? editable.window : {},
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                editableFields = [];

            this._startTime = model.startTime;
            this._endTime = model.endTime;
            delete model.startTime;
            delete model.endTime;

           if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }
                html += (kendo.template(template, settings))(model);
            } else {
                if (kendo.timezone.windows_zones) {
                    fields.push({ field: "timezone", title: messages.editor.timezone, editor: TIMEZONEPOPUP, click: click, messages: messages.editor });
                    fields.push({ field: "startTimezone", title: messages.editor.startTimezone, editor: TIMEZONEEDITOR });
                    fields.push({ field: "endTimezone", title: messages.editor.endTimezone, editor: TIMEZONEEDITOR });
                }

                if (!model.recurrenceId) {
                    fields.push({ field: "recurrenceRule", title: messages.editor.repeat, editor: RECURRENCEEDITOR, timezone: this.dataSource.reader.timezone, messages: messages.recurrenceEditor });
                }

                if ("description" in model) {
                    fields.push({ field: "description", title: messages.editor.description, editor: '<textarea name="description" class="k-textbox"/>' });
                }

                for (var resourceIndex = 0; resourceIndex < that.resources.length; resourceIndex++) {
                    var resource = that.resources[resourceIndex];
                    fields.push({
                       field: resource.field,
                       title: resource.title,
                       editor: resource.multiple? multiSelectResourceEditor(resource) : dropDownResourceEditor(resource)
                    });
                }

                for (var idx = 0, length = fields.length; idx < length; idx++) {
                    var field = fields[idx];

                    if (field.field === "startTimezone") {
                        html += '<div class="k-popup-edit-form k-scheduler-edit-form k-scheduler-timezones" style="display:none">';
                        html += '<div class="k-edit-form-container">';
                        html += '<div class="k-edit-label"></div>';
                        html += '<div class="k-edit-field"><label><input class="k-timezone-toggle" type="checkbox" />' + messages.editor.separateTimezones +'</label></div>';
                    }

                    html += '<div class="k-edit-label"><label for="' + field.field + '">' + (field.title || field.field || "") + '</label></div>';

                    if ((!model.editable || model.editable(field.field))) {
                        editableFields.push(field);
                        html += '<div ' + kendo.attr("container-for") + '="' + field.field + '" class="k-edit-field"></div>';
                    } else {
                        var tmpl = "#:";

                        if (field.field) {
                            field = kendo.expr(field.field, paramName);
                            tmpl += field + "==null?'':" + field;
                        } else {
                            tmpl += "''";
                        }

                        tmpl += "#";

                        tmpl = kendo.template(tmpl, settings);

                        html += '<div class="k-edit-field">' + tmpl(model) + '</div>';
                    }

                    if (field.field === "endTimezone") {
                        html += '<div class="k-edit-buttons k-state-default">';
                        html += that._createButton({ name: "savetimezone", text: messages.save }) + that._createButton({ name: "canceltimezone", text: messages.cancel });
                        html += '</div></div></div>';
                    }
                }
            }

            html += '<div class="k-edit-buttons k-state-default">';
            html += that._createButton({ name: "update", text: updateText, attr: attr }) + that._createButton({ name: "canceledit", text: cancelText, attr: attr });
            html += '</div></div></div>';

            var container = that._editContainer = $(html)
                .appendTo(that.wrapper).eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: messages.editor.editorTitle,
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger(CANCEL, { container: container, event: model })) {
                                e.preventDefault();
                                return;
                            }

                            that.cancelEvent();

                            that.focus();
                        }
                    }
                }, options));

            if (!model.isNew()) {
                that._convertDates(model);
            }

            that.editable = that._editContainer
                .kendoEditable({
                    fields: editableFields,
                    model: model,
                    clearContainer: false,
                    validateOnBlur: true
                }).data("kendoEditable");

            if (that.trigger(EDIT, { container: container, event: model })) {
                that.cancelEvent();
            } else {
                container.data("kendoWindow").center().open();
            }
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
                if (that._timezonePopup && that._timezonePopup.data("kendoWindow")) {
                    that._timezonePopup.data("kendoWindow").destroy();
                    that._timezonePopup = null;
                }

                that._editContainer.data("kendoWindow").bind("deactivate", destroy).close();
            }
        },

        removeEvent: function(uid) {
            var model = typeof uid == "string" ? this.getOccurrence(uid) : uid;

            if (!model) {
                return;
            }

            if (model.isRecurring()) {
                this._deleteRecurringDialog(model);
            } else {
                this._removeEvent(model);
            }
        },

        //TODO: Test it
        getOccurrence: function(uid) {
            var occurrence = this.dataSource.getByUid(uid);
            if (!occurrence) {
                occurrence = getOccurrenceByUid(this._data, uid);
            }

            return occurrence;
        },

        _removeEvent: function(model) {
            var that = this;
            that._confirmation(function() {
                if (!that.trigger(REMOVE, { event: model })) {
                    if (that.dataSource.remove(model)) {
                        that.dataSource.sync();
                    }
                }
            });
        },

        _deleteRecurringDialog: function(model) {
            var that = this;

            var deleteOcurrence = function() {
                var occurrence = model.recurrenceId ? model : model.toOccurrence();

                if (!that.trigger(REMOVE, { event: occurrence })) {
                    if (that.dataSource.remove(occurrence)) {
                        that.dataSource.sync();
                    }
                }
            };

            var deleteSeries = function() {
                if (model.recurrenceId) {
                    model = that.dataSource.get(model.recurrenceId);
                }

                if (!that.trigger(REMOVE, { event: model })) {
                    if (that.dataSource.remove(model)) {
                        that.dataSource.sync();
                    }
                }
            };

            var recurrenceMessages = that.options.messages.recurrenceMessages;
            that.showDialog({
                title: recurrenceMessages.deleteWindowTitle,
                text: recurrenceMessages.deleteRecurring ? recurrenceMessages.deleteRecurring : DELETERECURRING,
                buttons: [
                   { text: recurrenceMessages.deleteWindowOccurrence, click: deleteOcurrence },
                   { text: recurrenceMessages.deleteWindowSeries, click: deleteSeries }
                ]
            });
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
                    that.removeEvent(e.uid);
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
                    that.editEvent(e.uid);
                };

                view.bind(EDIT, this._viewEditHandler);
            }

            if (that._viewNavigateHandler) {
                view.unbind("navigate", that._viewNavigateHandler);
            }

            that._viewNavigateHandler = function(e) {
                if (e.view) {
                    that._selectView(e.view);
                    that.date(e.date);
                }
            };

            view.bind("navigate", that._viewNavigateHandler);

            if (that._viewActivateHandler) {
                view.unbind("activate", that._viewActivateHandler);
            }

            that._viewActivateHandler = function() {
                var view = this;
                if (that._selection) {
                    view.moveSelectionToPeriod(that._selection);
                    view.select(that._selection);

                    that._adjustSelectedDate();
                }
            };

            view.bind("activate", that._viewActivateHandler);
        },

        _selectView: function(name) {
            var that = this;

            if (name && that.views[name]) {

                if (that._selectedView) {
                    that._unbindView(that._selectedView);
                }

                that._selectedView = that._renderView(name);
                that._selectedViewName = name;

                that.toolbar
                    .find(".k-scheduler-views li")
                    .removeClass("k-state-selected")
                    .end()
                    .find(".k-view-" + name)
                    .addClass("k-state-selected");
            }
        },

        view: function(name) {
            var that = this;

            if (name) {

                that._selectView(name);

                that.rebind();

                return;
            }

            return that._selectedView;
        },

        _renderView: function(name) {
            var view = this._initializeView(name);

            this._bindView(view);

            this._model.set("formattedDate", view.dateForTitle());

            return view;
        },

        _resize: function() {
            this.refresh();
        },

        _adjustSelectedDate: function() {
            var date = this._model.selectedDate,
                selection = this._selection,
                start = selection.start;

            if (start && !kendo.date.isInDateRange(date, getDate(start), getDate(selection.end))) {
                date.setFullYear(start.getFullYear(), start.getMonth(), start.getDate());
            }
        },

        _initializeView: function(name) {
            var view = this.views[name];

            if (view) {
                var isSettings = isPlainObject(view),
                    type = view.type;

                if (typeof type === STRING) {
                    type = kendo.getter(view.type)(window);
                }

                if (type) {
                    view = new type(this.wrapper, trimOptions(extend(true, {}, this.options, isSettings ? view : {}, { resources: this.resources, date: this.date() })));
                } else {
                    throw new Error("There is no such view");
                }
            }

            return view;
        },

        _views: function() {
            var views = this.options.views;
            var view;
            var defaultView;
            var selected;
            var isSettings;
            var name;
            var type;
            var idx;
            var length;

            this.views = {};

            for (idx = 0, length = views.length; idx < length; idx++) {
                var hasType = false;

                view = views[idx];

                isSettings = isPlainObject(view);

                if (isSettings) {
                    type = name = view.type ? view.type : view;
                    if (typeof type !== STRING) {
                        name = view.title;
                        hasType = true;
                    }
                } else {
                    type = name = view;
                }

                defaultView = defaultViews[name];

                if (defaultView && !hasType) {
                    view.type = defaultView.type;
                    defaultView.title = this.options.messages.views[name];
                    if (defaultView.type === "day") {
                        defaultView.messages = { allDay: this.options.messages.allDay };
                    } else if (defaultView.type === "agenda") {
                        defaultView.messages = {
                            event: this.options.messages.event,
                            date: this.options.messages.date,
                            time: this.options.messages.time
                        };
                    }
                }

                view = extend({ title: name }, defaultView, isSettings ? view : {});

                if (name) {
                    this.views[name] = view;

                    if (!selected || view.selected) {
                        selected = name;
                    }
                }
            }

            if (selected) {
                this._selectedViewName = selected; // toolbar is not rendered yet
            }
        },

        rebind: function() {
            this.dataSource.fetch();
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (options.timezone && !(dataSource instanceof SchedulerDataSource)) {
                dataSource = extend(true, dataSource, { schema: { timezone: options.timezone } });
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource
                    .unbind(CHANGE, that._refreshHandler);
                    //.unbind(ERROR, that._errorHandler);
            } else {
                //that._errorHandler = proxy(that._error, that);
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = kendo.data.SchedulerDataSource.create(dataSource)
                .bind(CHANGE, that._refreshHandler);
                //.bind(ERROR, that._errorHandler);
        },

        _resources: function() {
            var that = this;
            var resources = that.options.resources;

            for (var idx = 0; idx < resources.length; idx++) {
                var resource = resources[idx];
                var field = resource.field;
                var dataSource = resource.dataSource;

                if (!field || !dataSource) {
                    throw new Error('The "field" and "dataSource" options of the scheduler resource are mandatory.');
                }

                that.resources.push({
                    field: field,
                    name: resource.name || field,
                    title: resource.title || field,
                    dataTextField: resource.dataTextField || "text",
                    dataValueField: resource.dataValueField || "value",
                    dataColorField: resource.dataColorField || "color",
                    valuePrimitive: resource.valuePrimitive != null ? resource.valuePrimitive : true,
                    multiple: resource.multiple || false,
                    dataSource: kendo.data.DataSource.create(dataSource)
                });
            }

            var promises = $.map(that.resources, function(resource) {
                return resource.dataSource.fetch();
            });

            $.when.apply(null, promises)
                  .then(function() {
                      if (that.options.autoBind) {
                          that.view(that._selectedViewName);
                      } else {
                          that._selectView(that._selectedViewName);
                      }
                  });
        },

        _initModel: function() {
            var that = this;
            that._model = kendo.observable({
               selectedDate: this.options.date,
               formattedDate: ""
           });

           that._model.bind("change", function(e) {
                if (e.field === "selectedDate") {
                    that.view(that._selectedViewName);
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

        date: function(value) {
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
                    date = new Date(that.date());

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

                that.date(date);

            });

            toolbar.on(CLICK + NS, ".k-scheduler-views li", function(e) {
                that.view($(this).attr(kendo.attr("name")));
                e.preventDefault();
            });

            toolbar.find("li").hover(function(){
                    $(this).addClass("k-state-hover");
                }, function(){
                    $(this).removeClass("k-state-hover");
                });
        },

        _showCalendar: function() {
            var that = this,
                target = that.toolbar.find(".k-nav-current"),
                html = $('<div class="k-calendar-container"><div class="k-scheduler-calendar"/></div>');

            if (!that.popup) {
                that.popup = new Popup(html, {
                    anchor: target,
                    activate: function() {
                        if (!that.calendar) {
                            that.calendar = new Calendar(this.element.find(".k-scheduler-calendar"),
                            {
                                change: function() {
                                    that.date(this.value());
                                    that.popup.close();
                                }
                            });
                        }
                        that.calendar.value(that.date());
                    },
                    copyAnchorStyles: false
                });
            }

            that.popup.open();
        },

        refresh: function(e) {
            var view = this.view();

            if (e && e.action === "itemchange" && this.editable) { // skip rebinding if editing is in progress
                return;
            }

            this.trigger("dataBinding");

            this._destroyEditable();

            this._data = this.dataSource.expand(view.startDate(), view.endDate());

            view.render(this._data);

            this.trigger("dataBound");
        }
    });

    var defaultViews = {
        day: {
            type: "kendo.ui.DayView"
        },
        week: {
            type: "kendo.ui.WeekView"
        },
        agenda: {
            type: "kendo.ui.AgendaView"
        },
        month: {
            type: "kendo.ui.MonthView"
        }
    };

    ui.plugin(Scheduler);

    var TimezoneEditor = Widget.extend({
        init: function(element, options) {
            var that = this,
                zones = kendo.timezone.windows_zones;

            if (!zones || !kendo.timezone.zones_titles) {
                throw new Error('kendo.timezones.min.js is not included.');
            }

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            that._zonesQuery = new kendo.data.Query(zones);
            that._zoneTitleId = kendo.guid();
            that._zoneTitlePicker();
            that._zonePicker();

            that.value(that.options.value);
        },
        options: {
            name: "TimezoneEditor",
            value: "",
            optionLabel: "No timezone"
        },
        events: [ "change" ],

        _zoneTitlePicker: function() {
            var that = this,
                zoneTitle = $('<input id="' + that._zoneTitleId + '"/>').appendTo(that.wrapper);

            that._zoneTitle = new kendo.ui.DropDownList(zoneTitle, {
                dataSource: kendo.timezone.zones_titles,
                dataValueField: "other_zone",
                dataTextField: "name",
                optionLabel: that.options.optionLabel,
                cascade: function() {
                    if (!this.value()) {
                        that._zone.wrapper.hide();
                    }
                }
            });
        },

        _zonePicker: function() {
            var that = this,
                zone = $('<input />').appendTo(this.wrapper);

            that._zone = new kendo.ui.DropDownList(zone, {
                dataValueField: "zone",
                dataTextField: "territory",
                dataSource: that._zonesQuery.data,
                cascadeFrom: that._zoneTitleId,
                cascade: function() {
                    that._value = this.value();
                    that.trigger("change");
                },
                dataBound: function() {
                    that._value = this.value();
                    this.wrapper.toggle(this.dataSource.view().length > 1);
                }
            });

            that._zone.wrapper.hide();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this._moveDraggable) {
                this._moveDraggable.destroy();
            }

            if (this._resizeDraggable) {
                this._resizeDraggable.destroy();
            }

            kendo.destroy(this.wrapper);
        },

        value: function(value) {
            var that = this,
                zone;

            if (value === undefined) {
                return that._value;
            }

            zone = that._zonesQuery.filter({ field: "zone", operator: "eq", value: value }).data[0];

            if (zone) {
                that._zoneTitle.value(zone.other_zone);
                that._zone.value(zone.zone);
            } else {
                that._zoneTitle.value("");
            }

        }
    });

    ui.plugin(TimezoneEditor);

})(window.kendo.jQuery);
