(function(f, define){
    define([ "./kendo.dropdownlist", "./kendo.editable", "./kendo.multiselect", "./kendo.window", "./kendo.datetimepicker", "./kendo.scheduler.recurrence", "./kendo.scheduler.view", "./kendo.scheduler.dayview", "./kendo.scheduler.agendaview", "./kendo.scheduler.monthview", "./kendo.scheduler.timelineview", "./kendo.mobile.actionsheet", "./kendo.mobile.pane", "./kendo.pdf" ], f);
})(function(){

var __meta__ = {
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is an event calendar.",
    depends: [ "dropdownlist", "editable", "multiselect", "window", "datepicker", "datetimepicker", "scheduler.recurrence", "scheduler.view" ],
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
    }, {
        id: "scheduler-timelineview",
        name: "Scheduler Timeline View",
        description: "Scheduler Timeline View",
        depends: [ "scheduler.timelineview" ]
    }, {
        id: "scheduler-mobile",
        name: "Scheduler adaptive rendering",
        description: "Support for adaptive rendering",
        depends: [ "mobile.actionsheet", "mobile.pane" ]
    }, {
        id: "scheduler-pdf-export",
        name: "PDF export",
        description: "Export the scheduler events as PDF",
        depends: [ "pdf", "drawing" ]
    } ]
};

/*jshint eqnull: true */
(function($, undefined) {
    var kendo = window.kendo,
        date = kendo.date,
        input_support = kendo.support.input,
        MS_PER_DAY = date.MS_PER_DAY,
        getDate = date.getDate,
        getMilliseconds = kendo.date.getMilliseconds,
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
        valueStartEndBoundRegex = /(?:value:start|value:end)(?:,|$)/,
        TODAY = getDate(new Date()),
        RECURRENCE_EXCEPTION = "recurrenceException",
        DELETECONFIRM = "Are you sure you want to delete this event?",
        DELETERECURRING = "Do you want to delete only this event occurrence or the whole series?",
        EDITRECURRING = "Do you want to edit only this event occurrence or the whole series?",
        COMMANDBUTTONTMPL = '<a class="k-button #=className#" #=attr# href="\\#">#=text#</a>',
        TOOLBARTEMPLATE = kendo.template('<div class="k-floatwrap k-header k-scheduler-toolbar">' +
           '# if (pdf) { #' +
           '<ul class="k-reset k-scheduler-tools">' +
               '<li><a role="button" href="\\#" class="k-button k-pdf"><span class="k-icon k-i-pdf"></span>${messages.pdf}</a></li>' +
           '</ul>' +
           '# } #' +
            '<ul class="k-reset k-scheduler-navigation">' +
               '<li class="k-state-default k-header k-nav-today"><a role="button" href="\\#" class="k-link">${messages.today}</a></li>' +
               '<li class="k-state-default k-header k-nav-prev"><a role="button" href="\\#" class="k-link"><span class="k-icon k-i-arrow-w"></span></a></li>' +
               '<li class="k-state-default k-header k-nav-next"><a role="button" href="\\#" class="k-link"><span class="k-icon k-i-arrow-e"></span></a></li>' +
               '<li class="k-state-default k-nav-current"><a role="button" href="\\#" class="k-link"><span class="k-icon k-i-calendar"></span><span data-#=ns#bind="text: formattedDate"></span></a></li>' +
            '</ul>' +
            '<ul class="k-reset k-header k-scheduler-views">' +
                '#for(var view in views){#' +
                    '<li class="k-state-default k-view-#= view.toLowerCase() #" data-#=ns#name="#=view#"><a role="button" href="\\#" class="k-link">${views[view].title}</a></li>' +
                '#}#'  +
            '</ul>' +
            '</div>'),
        MOBILETOOLBARTEMPLATE = kendo.template('<div class="k-floatwrap k-header k-scheduler-toolbar">' +
            '<ul class="k-reset k-header k-scheduler-navigation">' +
               '<li class="k-state-default k-nav-today"><a role="button" href="\\#" class="k-link">${messages.today}</a></li>' +
            '</ul>' +
            '<ul class="k-reset k-header k-scheduler-views">' +
                '#for(var view in views){#' +
                    '<li class="k-state-default k-view-#= view.toLowerCase() #" data-#=ns#name="#=view#"><a role="button" href="\\#" class="k-link">${views[view].title}</a></li>' +
                '#}#'  +
            '</ul>' +
            '</div>'+
            '<div class="k-floatwrap k-header k-scheduler-toolbar">' +
                '<ul class="k-reset k-header k-scheduler-navigation">' +
                   '<li class="k-state-default k-nav-prev"><a role="button" href="\\#" class="k-link"><span class="k-icon k-i-arrow-w"></span></a></li>' +
                   '<li class="k-state-default k-nav-current"><span data-#=ns#bind="text: formattedDate"></span></li>' +
                   '<li class="k-state-default k-nav-next"><a role="button" href="\\#" class="k-link"><span class="k-icon k-i-arrow-e"></span></a></li>' +
                '</ul>' +
            '</div>'),
        MOBILEDATERANGEEDITOR = function(container, options) {
            var attr = { name: options.field };
            var datepicker_role = !input_support.date ? kendo.attr("role") + '="datepicker" ' : "";
            var datetimepicker_role = kendo.attr("role") + '="datetimepicker" ';
            var isAllDay = options.model.isAllDay;
            var dateTimeValidate = kendo.attr("validate") + "='" + (!isAllDay) + "'";
            var dateValidate = kendo.attr("validate") + "='" + isAllDay + "'";

            appendTimezoneAttr(attr, options);
            appendDateCompareValidator(attr, options);

            $('<input type="datetime-local" required ' + kendo.attr("type") + '="date" ' + datetimepicker_role + kendo.attr("bind") + '="value:' + options.field +',invisible:isAllDay" ' +
                dateTimeValidate + '/>')
                .attr(attr).appendTo(container);

            $('<input type="date" required ' + kendo.attr("type") + '="date" ' + datepicker_role + kendo.attr("bind") + '="value:' + options.field +',visible:isAllDay" ' +
                dateValidate + '/>')
                .attr(attr).appendTo(container);

            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        },
        DATERANGEEDITOR = function(container, options) {
            var attr = { name: options.field },
                isAllDay = options.model.isAllDay,
                dateTimeValidate = kendo.attr("validate") + "='" + (!isAllDay) + "' ",
                dateValidate = kendo.attr("validate") + "='" + isAllDay + "' ";

            appendTimezoneAttr(attr, options);
            appendDateCompareValidator(attr, options);

            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' ' + kendo.attr("role") + '="datetimepicker" ' + kendo.attr("bind") + '="value:' + options.field +',invisible:isAllDay" ' +
                dateTimeValidate + '/>')
            .attr(attr).appendTo(container);

            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' '  + kendo.attr("role") + '="datepicker" ' + kendo.attr("bind") + '="value:' + options.field +',visible:isAllDay" ' +
                dateValidate + '/>')
            .attr(attr).appendTo(container);

            $('<span ' + kendo.attr("bind") + '="text: ' + options.field + 'Timezone"></span>').appendTo(container);

            if (options.field === "end") {
                $('<span ' + kendo.attr("bind") + '="text: startTimezone, invisible: endTimezone"></span>').appendTo(container);
            }

            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        },
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
        MOBILERECURRENCEEDITOR = function(container, options) {
            $('<div ' + kendo.attr("bind") + '="value:' + options.field +'" />')
                .attr({
                    name: options.field
                })
                .appendTo(container)
                .kendoMobileRecurrenceEditor({
                    start: options.model.start,
                    timezone: options.timezone,
                    messages: options.messages,
                    pane: options.pane,
                    value: options.model[options.field]
                });
        },
        MOBILETIMEZONEPOPUP = function(container, options) {
            var text = timezoneButtonText(options.model, options.messages.noTimezone);

            $('<a href="#" class="k-button k-timezone-button" data-bind="invisible:isAllDay">' + text + '</a>').click(options.click).appendTo(container);
        },
        TIMEZONEPOPUP = function(container, options) {
            $('<a href="#" class="k-button" data-bind="invisible:isAllDay">' + options.messages.timezoneEditorButton + '</a>').click(options.click).appendTo(container);
        },
        MOBILETIMEZONEEDITOR = function(container, options) {
            $('<div ' + kendo.attr("bind") + '="value:' + options.field +'" />')
                .attr({
                    name: options.field
                })
                .toggle(options.visible)
                .appendTo(container)
                .kendoMobileTimezoneEditor({
                    optionLabel: options.noTimezone
                });
        },
        TIMEZONEEDITOR = function(container, options) {
            $('<div ' + kendo.attr("bind") + '="value:' + options.field +'" />')
                .attr({ name: options.field })
                .toggle(options.visible)
                .appendTo(container)
                .kendoTimezoneEditor({
                    optionLabel: options.noTimezone
                });
        };

    function timezoneButtonText(model, message) {
        message = message || "";

        if (model.startTimezone) {
            message = model.startTimezone;

            if (model.endTimezone) {
                message += " | " + model.endTimezone;
            }
        }

        return message;
    }

    function appendTimezoneAttr(attrs, options) {
        var timezone = options.timezone;

        if (timezone) {
            attrs[kendo.attr("timezone")] = timezone;
        }
    }

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

    function applyZone(date, fromZone, toZone) {
        if (toZone) {
            date = kendo.timezone.convert(date, fromZone, toZone);
        } else {
            date = kendo.timezone.remove(date, fromZone);
        }

        return date;
    }

    function dateCompareValidator(input) {
        if (input.filter("[name=end]").length) {
            var container = input.closest(".k-scheduler-edit-form");
            var startInput = container.find("[name=start]:visible");
            var endInput = container.find("[name=end]:visible");

            if (endInput[0] && startInput[0]) {
                var start, end;
                var startPicker = kendo.widgetInstance(startInput, kendo.ui);
                var endPicker = kendo.widgetInstance(endInput, kendo.ui);

                var editable = container.data("kendoEditable");
                var model = editable ? editable.options.model : null;

                if (startPicker && endPicker) {
                    start = startPicker.value();
                    end = endPicker.value();
                } else {
                    start = kendo.parseDate(startInput.val());
                    end = kendo.parseDate(endInput.val());
                }

                if (start && end) {
                    if (model) {
                        var timezone = startInput.attr(kendo.attr("timezone"));
                        var startTimezone = model.startTimezone;
                        var endTimezone = model.endTimezone;

                        startTimezone = startTimezone || endTimezone;
                        endTimezone = endTimezone || startTimezone;

                        if (startTimezone) {
                            start = applyZone(start, startTimezone, timezone);
                            end = applyZone(end, endTimezone, timezone);
                        }
                    }

                    return start <= end;
                }
            }
        }

        return true;
    }

    var SchedulerEvent = kendo.data.Model.define({
        init: function(value) {
            var that = this;

            kendo.data.Model.fn.init.call(that, value);

            that._defaultId = that.defaults[that.idField];
        },

        _time: function(field) {
            var date = this[field];
            var fieldTime = field + "Time";

            if (this[fieldTime]) {
                return this[fieldTime] - kendo.date.toUtcTime(kendo.date.getDate(date));
            }

            return getMilliseconds(date);
        },

        _date: function(field) {
            var fieldTime = field + "Time";

            if (this[fieldTime]) {
                return this[fieldTime] - this._time(field);
            }

            return kendo.date.getDate(this[field]);
        },

        clone: function(options, updateUid) {
            var uid = this.uid,
                event = new this.constructor($.extend({}, this.toJSON(), options));

            if (!updateUid) {
                event.uid = uid;
            }

            return event;
        },

        duration: function() {
            var end = this.end;
            var start = this.start;
            var offset = (end.getTimezoneOffset() - start.getTimezoneOffset()) * kendo.date.MS_PER_MINUTE;

            return end - start - offset;
        },

        expand: function(start, end, zone) {
            return recurrence ? recurrence.expand(this, start, end, zone) : [this];
        },

        update: function(eventInfo) {
            for (var field in eventInfo) {
                this.set(field, eventInfo[field]);
            }

            if (this.startTime) {
                this.set("startTime", kendo.date.toUtcTime(this.start));
            }

            if (this.endTime) {
                this.set("endTime", kendo.date.toUtcTime(this.end));
            }
        },

        isMultiDay: function() {
            return this.isAllDay || this.duration() >= kendo.date.MS_PER_DAY;
        },

        isException: function() {
            return !this.isNew() && this.recurrenceId;
        },

        isOccurrence: function() {
            return this.isNew() && this.recurrenceId;
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
                recurrenceId: this.id || this.recurrenceId
            });

            options[this.idField] = this.defaults[this.idField];

            return this.clone(options, true);
        },

        toJSON: function() {
            var obj = kendo.data.Model.fn.toJSON.call(this);
            obj.uid = this.uid;

            delete obj.startTime;
            delete obj.endTime;

            return obj;
        },

        shouldSerialize: function(field) {
            return kendo.data.Model.fn.shouldSerialize.call(this, field) && field !== "_defaultId";
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
            if (model && model.isOccurrence()) {
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

            if ((!this._pushCreated && model.isRecurrenceHead()) || model.recurrenceId) {
                model = model.recurrenceId ? model : model.toOccurrence();
                this._addExceptionDate(model);
            }

            return DataSource.fn.insert.call(this, index, model);
        },

        pushCreate: function(items) {
            this._pushCreated = true;
            DataSource.fn.pushCreate.call(this, items);
            this._pushCreated = false;
        },

        remove: function(model) {
            if (model.isRecurrenceHead()) {
                this._removeExceptions(model);
            } else if (model.isRecurring()) {
                this._addExceptionDate(model);
            }

            return DataSource.fn.remove.call(this, model);
        },

        _removeExceptions: function(model) {
            var data = this.data().slice(0),
                item = data.shift(),
                id = model.id;

            while(item) {
                if (item.recurrenceId === id) {
                    DataSource.fn.remove.call(this, item);
                }

                item = data.shift();
            }

            model.set(RECURRENCE_EXCEPTION, "");
        },

        _removeExceptionDate: function(model) {
            if (model.recurrenceId) {
                var head = this.get(model.recurrenceId);

                if (head) {
                    var start = model.start;

                    head.set(RECURRENCE_EXCEPTION, head.recurrenceException.replace(recurrence.toExceptionString(start, this.reader.timezone), ""));
                }
            }
        },

        _addExceptionDate: function(model) {
            var start = model.start;
            var zone = this.reader.timezone;
            var head = this.get(model.recurrenceId);
            var recurrenceException = head.recurrenceException || "";

            if (!recurrence.isException(recurrenceException, start, zone)) {
                head.set(RECURRENCE_EXCEPTION, recurrenceException + recurrence.toExceptionString(start, zone));
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
            className: "k-primary k-scheduler-update"
        },
        canceledit: {
            text: "Cancel",
            className: "k-scheduler-cancel"
        },
        destroy: {
            text: "Delete",
            imageClass: "k-delete",
            className: "k-primary k-scheduler-delete",
            iconClass: "k-icon"
        }
    };

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        delete options.remove;
        delete options.edit;
        delete options.add;
        delete options.navigate;

        return options;
    }

    function fieldType(field) {
        field = field != null ? field : "";
        return field.type || $.type(field) || "string";
    }

    function createValidationAttributes(model, field) {
        var modelField = (model.fields || model)[field];
        var specialRules = ["url", "email", "number", "date", "boolean"];
        var validation = modelField ? modelField.validation : {};
        var type = fieldType(modelField);
        var datatype = kendo.attr("type");
        var inArray = $.inArray;
        var ruleName;
        var rule;

        var attr = {};

        for (ruleName in validation) {
            rule = validation[ruleName];

            if (inArray(ruleName, specialRules) >= 0) {
                attr[datatype] = ruleName;
            } else if (!kendo.isFunction(rule)) {
                attr[ruleName] = isPlainObject(rule) ? (rule.value || ruleName) : rule;
            }

            attr[kendo.attr(ruleName + "-msg")] = rule.message;
        }

        return attr;
    }

    function dropDownResourceEditor(resource, model) {
        var attr = createValidationAttributes(model, resource.field);

        return function(container) {
           $(kendo.format('<select data-{0}bind="value:{1}">', kendo.ns, resource.field))
             .appendTo(container)
             .attr(attr)
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

    function dropDownResourceEditorMobile(resource, model) {
        var attr = createValidationAttributes(model, resource.field);

        return function(container) {
            var options = '';
            var view = resource.dataSource.view();

            for (var idx = 0, length = view.length; idx < length; idx++) {
                options += kendo.format('<option value="{0}">{1}</option>',
                    kendo.getter(resource.dataValueField)(view[idx]),
                    kendo.getter(resource.dataTextField)(view[idx])
                );
            }

           $(kendo.format('<select data-{0}bind="value:{1}">{2}</select>', kendo.ns, resource.field, options))
             .appendTo(container)
             .attr(attr);
       };
    }

    function descriptionEditor(options) {
        var attr = createValidationAttributes(options.model, options.field);

        return function(container) {
            $('<textarea name="description" class="k-textbox"/>').attr(attr)
                .appendTo(container);
        };
    }

    function multiSelectResourceEditor(resource, model) {
        var attr = createValidationAttributes(model, resource.field);

        return function(container) {
           $(kendo.format('<select data-{0}bind="value:{1}">', kendo.ns, resource.field))
             .appendTo(container)
             .attr(attr)
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

    function multiSelectResourceEditorMobile(resource, model) {
        var attr = createValidationAttributes(model, resource.field);

        return function(container) {
            var options = "";
            var view = resource.dataSource.view();

            for (var idx = 0, length = view.length; idx < length; idx++) {
                options += kendo.format('<option value="{0}">{1}</option>',
                    kendo.getter(resource.dataValueField)(view[idx]),
                    kendo.getter(resource.dataTextField)(view[idx])
                );
            }

            $(kendo.format('<select data-{0}bind="value:{1}" multiple="multiple" data-{0}value-primitive="{3}">{2}</select>',
                kendo.ns,
                resource.field,
                options,
                resource.valuePrimitive
             ))
             .appendTo(container)
             .attr(attr);
       };
    }

    function moveEventRange(event, distance) {
        var duration = event.end.getTime() - event.start.getTime();

        var start = new Date(event.start.getTime());

        kendo.date.setTime(start, distance);

        var end = new Date(start.getTime());

        kendo.date.setTime(end, duration, true);

        return {
            start: start,
            end: end
        };
    }

    var editors = {
        mobile: {
            dateRange: MOBILEDATERANGEEDITOR,
            timezonePopUp: MOBILETIMEZONEPOPUP,
            timezone: MOBILETIMEZONEEDITOR,
            recurrence: MOBILERECURRENCEEDITOR,
            description: descriptionEditor,
            multipleResources: multiSelectResourceEditorMobile,
            resources: dropDownResourceEditor
        },
        desktop: {
            dateRange: DATERANGEEDITOR,
            timezonePopUp: TIMEZONEPOPUP,
            timezone: TIMEZONEEDITOR,
            recurrence: RECURRENCEEDITOR,
            description: descriptionEditor,
            multipleResources: multiSelectResourceEditor,
            resources: dropDownResourceEditor
        }
    };

    var Editor = kendo.Observable.extend({
        init: function(element, options) {

            kendo.Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);
            this.createButton = this.options.createButton;

            this.toggleDateValidationHandler = proxy(this._toggleDateValidation, this);
        },

        _toggleDateValidation: function(e) {
            if (e.field == "isAllDay") {
                var container = this.container,
                    isAllDay = this.editable.options.model.isAllDay,
                    bindAttribute = kendo.attr("bind"),
                    element, isDateTimeInput, shouldValidate;
                container.find("[" + bindAttribute+ "*=end],[" + bindAttribute + "*=start]").each(function() {
                    element = $(this);
                    if (valueStartEndBoundRegex.test(element.attr(bindAttribute))) {
                        isDateTimeInput = element.is("[" + kendo.attr("role") + "=datetimepicker],[type*=datetime]");
                        shouldValidate = isAllDay !== isDateTimeInput;
                        element.attr(kendo.attr("validate"), shouldValidate);
                    }
                });
            }
        },

        fields: function(editors, model) {
            var that = this;

            var messages = that.options.messages;
            var timezone = that.options.timezone;

            var click = function(e) {
                e.preventDefault();
                that._initTimezoneEditor(model, this);
            };

            var fields = [
                { field: "title", title: messages.editor.title /*, format: field.format, editor: field.editor, values: field.values*/ },
                { field: "start", title: messages.editor.start, editor: editors.dateRange, timezone: timezone },
                { field: "end", title: messages.editor.end, editor: editors.dateRange, timezone: timezone },
                { field: "isAllDay", title: messages.editor.allDayEvent }
            ];

            if (kendo.timezone.windows_zones) {
                fields.push({ field: "timezone", title: messages.editor.timezone, editor: editors.timezonePopUp, click: click, messages: messages.editor, model: model });
                fields.push({ field: "startTimezone", title: messages.editor.startTimezone, editor: editors.timezone, noTimezone: messages.editor.noTimezone });
                fields.push({ field: "endTimezone", title: messages.editor.endTimezone, editor: editors.timezone, noTimezone: messages.editor.noTimezone });
            }

            if (!model.recurrenceId) {
                fields.push({ field: "recurrenceRule", title: messages.editor.repeat, editor: editors.recurrence, timezone: timezone, messages: messages.recurrenceEditor, pane: this.pane });
            }

            if ("description" in model) {
                fields.push({ field: "description", title: messages.editor.description, editor: editors.description({model: model, field: "description"}) });
            }

            for (var resourceIndex = 0; resourceIndex < this.options.resources.length; resourceIndex++) {
                var resource = this.options.resources[resourceIndex];
                fields.push({
                    field: resource.field,
                    title: resource.title,
                    editor: resource.multiple? editors.multipleResources(resource, model) : editors.resources(resource, model)
                });
            }

            return fields;
        },

        end: function() {
            return this.editable.end();
        },

        _buildEditTemplate: function(model, fields, editableFields) {
            var messages = this.options.messages;
            var settings = extend({}, kendo.Template, this.options.templateSettings);
            var paramName = settings.paramName;
            var template = this.options.editable.template;

            var html = "";

            if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }
                html += (kendo.template(template, settings))(model);
            } else {
                for (var idx = 0, length = fields.length; idx < length; idx++) {
                    var field = fields[idx];

                    if (field.field === "startTimezone") {
                        html += '<div class="k-popup-edit-form k-scheduler-edit-form k-scheduler-timezones" style="display:none">';
                        html += '<div class="k-edit-form-container">';
                        html += '<div class="k-edit-label"></div>';
                        html += '<div class="k-edit-field"><label class="k-check"><input class="k-timezone-toggle" type="checkbox" />' + messages.editor.separateTimezones +'</label></div>';
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
                        html += this._createEndTimezoneButton();
                    }
                }
            }

            return html;
        },

        _createEndTimezoneButton: function() {
            return '</div></div>';
        },

        _revertTimezones: function(model) {
            model.set("startTimezone", this._startTimezone);
            model.set("endTimezone", this._endTimezone);

            delete this._startTimezone;
            delete this._endTimezone;
        }
    });

    var MobileEditor = Editor.extend({
        init: function() {
            Editor.fn.init.apply(this, arguments);

            this.pane = kendo.mobile.ui.Pane.wrap(this.element);
            this.pane.element.parent().css("height", this.options.height);
            this.view = this.pane.view();
            this._actionSheetButtonTemplate = kendo.template('<li><a #=attr# class="k-button #=className#" href="\\#">#:text#</a></li>');

            this._actionSheetPopupOptions = $(document.documentElement).hasClass("km-root") ? { modal: false } : {
                align: "bottom center",
                position: "bottom center",
                effect: "slideIn:up"
            };
        },

        options: {
            animations: {
                left: "slide",
                right: "slide:right"
            }
        },

        destroy: function() {
            this.close();
            this.unbind();
            this.pane.destroy();
        },

        _initTimezoneEditor: function(model) {
            var that = this;
            var pane = that.pane;
            var messages = that.options.messages;
            var timezoneView = that.timezoneView;
            var container = that.container.find(".k-scheduler-timezones");
            var checkbox = container.find(".k-timezone-toggle");
            var endTimezoneRow = container.find(".k-edit-label:last").add(container.find(".k-edit-field:last"));
            var startTimezoneChange = function(e) {
                if (e.field === "startTimezone") {
                    var value = model.startTimezone;

                    checkbox.prop("disabled", !value);

                    if (!value) {
                        endTimezoneRow.hide();
                        model.set("endTimezone", "");
                        checkbox.prop("checked", false);
                    }
                }
            };

            that._startTimezone = model.startTimezone || "";
            that._endTimezone = model.endTimezone || "";

            if (!timezoneView) {
                var html = '<div data-role="view" class="k-popup-edit-form k-scheduler-edit-form k-mobile-list">' +
                           '<div data-role="header" class="k-header"><a href="#" class="k-button k-scheduler-cancel">' + messages.cancel + '</a>' +
                           messages.editor.timezoneTitle + '<a href="#" class="k-button k-scheduler-update">' + messages.save + '</a></div></div>';

                this.timezoneView = timezoneView = pane.append(html);

                timezoneView.contentElement().append(container.show());

                timezoneView.element.on(CLICK + NS, ".k-scheduler-cancel, .k-scheduler-update", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if ($(this).hasClass("k-scheduler-cancel")) {
                        that._revertTimezones(model);
                    }

                    model.unbind("change", startTimezoneChange);

                    var editView = pane.element.find("#edit").data("kendoMobileView");

                    var text = timezoneButtonText(model, messages.editor.noTimezone);

                    editView.contentElement().find(".k-timezone-button").text(text);

                    pane.navigate(editView, that.options.animations.right);
                });

                checkbox.click(function() {
                    endTimezoneRow.toggle(checkbox.prop("checked"));
                    model.set("endTimezone", "");
                });

                model.bind("change", startTimezoneChange);
            }

            checkbox.prop("checked", model.endTimezone).prop("disabled", !model.startTimezone);

            if (model.endTimezone) {
                endTimezoneRow.show();
            } else {
                endTimezoneRow.hide();
            }

            pane.navigate(timezoneView, that.options.animations.left);
        },

        _createActionSheetButton: function(options) {
            options.template = this._actionSheetButtonTemplate;
            return  this.createButton(options);
        },

        showDialog: function(options) {
            var type = "";
            var html = "<ul><li class=\"km-actionsheet-title\">" + options.title + "</li>";

            var target = this.element.find(".k-event[" + kendo.attr("uid") + "='" + options.model.uid + "']");

            if (this.container) {
                target = this.container.find(".k-scheduler-delete");

                if (target[0]) {
                    type = 'phone';
                }
            }

            for (var buttonIndex = 0; buttonIndex < options.buttons.length; buttonIndex++) {
                html+= this._createActionSheetButton(options.buttons[buttonIndex]);
            }

            html += "</ul>";

            var actionSheet = $(html)
                .appendTo(this.pane.view().element)
                .kendoMobileActionSheet({
                    type: type,
                    cancel: this.options.messages.cancel,
                    cancelTemplate: '<li class="km-actionsheet-cancel"><a class="k-button" href="\\#">#:cancel#</a></li>',
                    close: function() {
                        this.destroy();
                    },
                    command: function(e) {
                        var buttonIndex = actionSheet.element.find("li:not(.km-actionsheet-cancel) > .k-button").index($(e.currentTarget));
                        if (buttonIndex > -1) {
                            actionSheet.close();
                            options.buttons[buttonIndex].click();
                        }
                    },
                    popup: this._actionSheetPopupOptions
                })
                .data("kendoMobileActionSheet");

            actionSheet.open(target);
        },

        editEvent: function(model) {
            var pane = this.pane;
            var html = "";

            var messages = this.options.messages;
            var updateText = messages.save;
            var removeText = messages.destroy;
            var cancelText = messages.cancel;
            var titleText = messages.editor.editorTitle;

            html += '<div data-role="view" class="k-popup-edit-form k-scheduler-edit-form k-mobile-list" id="edit" ' + kendo.attr("uid") + '="' + model.uid + '">' +
                '<div data-role="header" class="k-header"><a href="#" class="k-button k-scheduler-cancel">' + cancelText + '</a>' +
                titleText + '<a href="#" class="k-button k-scheduler-update">' + updateText + '</a></div>';

            var fields = this.fields(editors.mobile, model);

            var that = this;

            var editableFields = [];

            html += this._buildEditTemplate(model, fields, editableFields);

            if (!model.isNew() && this.options.editable && this.options.editable.destroy !== false) {
                html += '<div class="k-edit-buttons"><a href="#" class="k-scheduler-delete k-button">' + removeText + '</a></div>';
            }

            html += "</div>";

            var view = pane.append(html);

            var container = this.container = view.element;

            this.editable = container.kendoEditable({
                fields: editableFields,
                model: model,
                clearContainer: false,
                target: that.options.target,

                validateOnBlur: true
            }).data("kendoEditable");

            // TODO: Replace this code with labels and for="ID"
            container.find("input[type=checkbox],input[type=radio]")
                     .parent(".k-edit-field")
                     .addClass("k-check")
                     .prev(".k-edit-label")
                     .addClass("k-check")
                     .click(function() {
                         $(this).next().children("input").click();
                     });

            if (!this.trigger("edit", { container: container, model: model })) {

                container.on(CLICK + NS, "a.k-scheduler-edit, a.k-scheduler-cancel, a.k-scheduler-update, a.k-scheduler-delete", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var button = $(this);

                    if (!button.hasClass("k-scheduler-edit")) {

                        var name = "cancel";

                        if (button.hasClass("k-scheduler-update")) {
                            name = "save";
                        } else if (button.hasClass("k-scheduler-delete")) {
                            name = "remove";
                        }

                        that.trigger(name, { container: container, model: model });
                    } else {
                        pane.navigate("#edit", that.options.animations.right);
                    }
                });

                pane.navigate(view, that.options.animations.left);

                model.bind("change", that.toggleDateValidationHandler);
            } else {
                this.trigger("cancel", { container: container, model: model });
            }

            return this.editable;
        },

        _views: function() {
            return this.pane.element
                    .find(kendo.roleSelector("view"))
                    .not(this.view.element);
        },

        close: function() {
            if (this.container) {
                this.pane.navigate("", this.options.animations.right);

                var views = this._views();
                var view;

                for (var idx = 0, length = views.length; idx < length; idx++) {
                    view = views.eq(idx).data("kendoMobileView");
                    if (view) {
                       view.purge();
                    }
                }

                views.remove();

                this.container = null;
                if (this.editable) {
                    this.editable.options.model.unbind("change", this.toggleDateValidationHandler);
                    this.editable.destroy();
                    this.editable = null;
                }
                this.timezoneView = null;
            }
        }
    });

    var PopupEditor = Editor.extend({
        destroy: function() {
            this.close();
            this.unbind();
        },

        editEvent: function(model) {
            var that = this;
            var editable = that.options.editable;
            var html = '<div ' + kendo.attr("uid") + '="' + model.uid + '" class="k-popup-edit-form k-scheduler-edit-form"><div class="k-edit-form-container">';
            var messages = that.options.messages;
            var updateText = messages.save;
            var cancelText = messages.cancel;
            var deleteText = messages.destroy;

            var fields = this.fields(editors.desktop, model);

            var editableFields = [];

            html += this._buildEditTemplate(model, fields, editableFields);

            var attr;
            var options = isPlainObject(editable) ? editable.window : {};

            html += '<div class="k-edit-buttons k-state-default">';
            html += this.createButton({ name: "update", text: updateText, attr: attr }) + this.createButton({ name: "canceledit", text: cancelText, attr: attr });

            if (!model.isNew() && editable.destroy !== false) {
                html += this.createButton({ name: "delete", text: deleteText, attr: attr });
            }

            html += '</div></div></div>';

            var container = this.container = $(html)
                .appendTo(that.element).eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: messages.editor.editorTitle,
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger(CANCEL, { container: container, model: model })) {
                                e.preventDefault();
                            }
                        }
                    }
                }, options));

            that.editable = container.kendoEditable({
                fields: editableFields,
                model: model,
                clearContainer: false,
                validateOnBlur: true,
                target: that.options.target
            }).data("kendoEditable");

            if (!that.trigger(EDIT, { container: container, model: model })) {

                container.data("kendoWindow").center().open();

                container.on(CLICK + NS, "a.k-scheduler-cancel", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger(CANCEL, { container: container, model: model });
                });

                container.on(CLICK + NS, "a.k-scheduler-update", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger("save", { container: container, model: model });
                });

                container.on(CLICK + NS, "a.k-scheduler-delete", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger(REMOVE, { container: container, model: model });
                });

                model.bind("change", that.toggleDateValidationHandler);
            } else {
                that.trigger(CANCEL, { container: container, model: model });
            }

            return that.editable;
        },

        close: function() {
            var that = this;

            var destroy = function() {
                if (that.editable) {
                    that.editable.options.model.unbind("change", that.toggleDateValidationHandler);
                    that.editable.destroy();
                    that.editable = null;
                    that.container = null;
                }
                if (that.popup) {
                    that.popup.destroy();
                    that.popup = null;
                }
            };

            if (that.editable) {
                if (that._timezonePopup && that._timezonePopup.data("kendoWindow")) {
                    that._timezonePopup.data("kendoWindow").destroy();
                    that._timezonePopup = null;
                }

                if (that.container.is(":visible")) {
                    that.container.data("kendoWindow").bind("deactivate", destroy).close();
                } else {
                    destroy();
                }
            } else {
                destroy();
            }
        },

        _createEndTimezoneButton: function() {
            var messages = this.options.messages;
            var html = "";

            html += '<div class="k-edit-buttons k-state-default">';
            html += this.createButton({ name: "savetimezone", text: messages.save }) + this.createButton({ name: "canceltimezone", text: messages.cancel });
            html += '</div></div></div>';

            return html;
        },

        showDialog: function(options) {
            var html = kendo.format("<div class='k-popup-edit-form'><div class='k-edit-form-container'><p class='k-popup-message'>{0}</p>", options.text);

            html += '<div class="k-edit-buttons k-state-default">';

            for (var buttonIndex = 0; buttonIndex < options.buttons.length; buttonIndex++) {
                html+= this.createButton(options.buttons[buttonIndex]);
            }

            html += '</div></div></div>';

            var wrapper = this.element;

            if (this.popup) {
                this.popup.destroy();
            }

            var popup = this.popup = $(html).appendTo(wrapper)
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
                                       wrapper.focus();
                                   }
                               })
                               .getKendoWindow();

            popup.center().open();
        },

        _initTimezoneEditor: function(model, activator) {
            var that = this;
            var container = that.container.find(".k-scheduler-timezones");
            var checkbox = container.find(".k-timezone-toggle");
            var endTimezoneRow = container.find(".k-edit-label:last").add(container.find(".k-edit-field:last"));
            var saveButton = container.find(".k-scheduler-savetimezone");
            var cancelButton = container.find(".k-scheduler-canceltimezone");
            var timezonePopup = that._timezonePopup;
            var startTimezoneChange = function(e) {
                if (e.field === "startTimezone") {
                    var value = model.startTimezone;

                    checkbox.prop("disabled", !value);

                    if (!value) {
                        endTimezoneRow.hide();
                        model.set("endTimezone", "");
                        checkbox.prop("checked", false);
                    }
                }
            };
            var wnd;

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
                        model.unbind("change", startTimezoneChange);

                        if (e.userTriggered) {
                            that._revertTimezones(model);
                        }

                        if (activator) {
                            activator.focus();
                        }
                    }
                });

                checkbox.click(function() {
                    endTimezoneRow.toggle(checkbox.prop("checked"));
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

                model.bind("change", startTimezoneChange);
            }

            checkbox.prop("checked", model.endTimezone).prop("disabled", !model.startTimezone);

            if (model.endTimezone) {
                endTimezoneRow.show();
            } else {
                endTimezoneRow.hide();
            }

            wnd = timezonePopup.data("kendoWindow");
            wnd.center().open();
        }
    });

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

            that._resizeHandler = proxy(that.resize, that);

            that.wrapper.on("mousedown" + NS + " selectstart" + NS, function(e) {
                if (!$(e.target).is(":kendoFocusable")) {
                    e.preventDefault();
                }
            });

            if (that.options.editable && that.options.editable.resize !== false) {
                that._resizable();
            }

            that._movable();

            $(window).on("resize" + NS, that._resizeHandler);

            if(that.options.messages && that.options.messages.recurrence) {
                recurrence.options = that.options.messages.recurrence;
            }

            that._selectable();

            that._ariaId = kendo.guid();

            that._createEditor();
        },

        _isMobile: function() {
            var options = this.options;
            return (options.mobile === true && kendo.support.mobileOS) || options.mobile === "phone" || options.mobile === "tablet";
        },

        _isMobilePhoneView: function() {
            var options = this.options;
            return (options.mobile === true && kendo.support.mobileOS && !kendo.support.mobileOS.tablet) || options.mobile === "phone";
        },

        _selectable: function() {
            var that = this,
                wrapper = that.wrapper,
                selectEvent = kendo.support.mobileOS ? "touchend" : "mousedown";

            if (!that.options.selectable) {
                return;
            }

            that._tabindex();

            wrapper.on(selectEvent + NS, ".k-scheduler-header-all-day td, .k-scheduler-content td, .k-event", function(e) {
                var which = e.which;
                var button = e.button;
                var browser = kendo.support.browser;
                var isRight = which && which === 3 || button && button == 2;

                if (kendo.support.mobileOS && e.isDefaultPrevented()) {
                    return;
                }

                if (!isRight) {
                    that._createSelection(e.currentTarget);
                }

                wrapper.focus();

                if (browser.msie && browser.version < 9) {
                    setTimeout(function() {
                        wrapper.focus();
                    });
                }
            });

            var mouseMoveHandler = $.proxy(that._mouseMove, that);

            wrapper.on("mousedown" + NS, ".k-scheduler-header-all-day td, .k-scheduler-content td", function(e) {
                var which = e.which;
                var button = e.button;
                var isRight = which && which === 3 || button && button == 2;

                if (!isRight) {
                    wrapper.on("mousemove" + NS, ".k-scheduler-header-all-day td, .k-scheduler-content td", mouseMoveHandler);
                }
            });

            wrapper.on("mouseup" + NS + " mouseleave" + NS, function() {
                wrapper.off("mousemove" + NS, ".k-scheduler-header-all-day td, .k-scheduler-content td", mouseMoveHandler);
            });

            wrapper.on("focus" + NS, function() {
                if (!that._selection) {
                    that._createSelection($(".k-scheduler-content").find("td:first"));
                }

                that._select();
            });

            wrapper.on("focusout" + NS, function() {
                that.view().clearSelection();
                that._ctrlKey = that._shiftKey = false;
            });

            wrapper.on("keydown" + NS, proxy(that._keydown, that));

            wrapper.on("keyup" + NS, function(e) {
                that._ctrlKey = e.ctrlKey;
                that._shiftKey = e.shiftKey;
            });
        },

        _select: function() {
            var that = this;
            var view = that.view();
            var wrapper = that.wrapper;
            var current = view.current();
            var selection = that._selection;

            if (current) {
                current.removeAttribute("id");
                current.removeAttribute("aria-label");
                wrapper.removeAttr("aria-activedescendant");
            }

            view.select(selection);

            current = view.current();

            if (current && that._old !== current) {
                var labelFormat;
                var data = selection;
                var events = that._selectedEvents();
                var slots = view._selectedSlots;

                if (events[0]) {
                    data = events[0] || selection;
                    labelFormat = kendo.format(that.options.messages.ariaEventLabel, data.title, data.start, data.start);
                } else {
                    labelFormat = kendo.format(that.options.messages.ariaSlotLabel, data.start, data.end);
                }

                current.setAttribute("id", that._ariaId);
                current.setAttribute("aria-label", labelFormat);
                wrapper.attr("aria-activedescendant", that._ariaId);

                that._old = current;

                that.trigger("change", {
                    start: selection.start,
                    end: selection.end,
                    events: events,
                    slots: slots,
                    resources: view._resourceBySlot(selection)
                });
            }
        },

        _selectedEvents: function() {
            var uids = this._selection.events;
            var length = uids.length;
            var idx = 0;
            var event;

            var events = [];

            for (; idx < length; idx++) {
                event = this.occurrenceByUid(uids[idx]);
                if (event) {
                    events.push(event);
                }
            }

            return events;
        },

        _mouseMove: function(e) {
            var that = this;
            clearTimeout(that._moveTimer);

            that._moveTimer = setTimeout(function() {
                var view = that.view();
                var selection = that._selection;

                if (selection) {
                    var slot = view.selectionByElement($(e.currentTarget));

                    if (slot && selection.groupIndex === slot.groupIndex) {
                        var startDate = slot.startDate();
                        var endDate = slot.endDate();

                        if (startDate >= selection.end) {
                            selection.backward = false;
                        } else if (endDate <= selection.start) {
                            selection.backward = true;
                        }

                        if (selection.backward) {
                            selection.start = startDate;
                        } else {
                            selection.end = endDate;
                        }

                        that._select();
                    }
                }
            }, 5);
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
                shiftKey = e.shiftKey;

            that._ctrlKey = e.ctrlKey;
            that._shiftKey = e.shiftKey;

            if (key === keys.TAB) {
                if (view.moveToEvent(selection, shiftKey)) {
                    that._select();

                    e.preventDefault();
                }
            } else if (editable && key === keys.ENTER) {
                // add/edit event
                if (selection.events.length) {
                    if (editable.update !== false) {
                        that.editEvent(selection.events[0]);
                    }
                } else if (editable.create !== false) {
                    if (selection.isAllDay) {
                        selection = $.extend({}, selection, {
                            end: kendo.date.addDays(selection.end, -1)
                        });
                    }

                    that.addEvent(extend({}, selection, view._resourceBySlot(selection)));
                }
            } else if (key === keys.DELETE && editable !== false && editable.destroy !== false) {
                that.removeEvent(selection.events[0]);
            } else if (key >= 49 && key <= 57) {
                // switch to view 1-9
                that.view(that._viewByIndex(key - 49));
            } else if (view.move(selection, key, shiftKey)) {
                if (view.inRange(selection)) {
                    that._select();
                } else {
                    that.date(selection.start);
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
                selection.groupIndex = slot.groupIndex || 0;
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
                var view =  this.view();

                if (dataItem.uid) {
                    dataItem = view._updateEventForSelection(dataItem);
                }

                if (this._shiftKey && selection.start && selection.end) {
                    var backward = dataItem.end < selection.end;

                    selection.end = dataItem.endDate ? dataItem.endDate() : dataItem.end;

                    if (backward && view._timeSlotInterval) {
                        kendo.date.setTime(selection.end, -view._timeSlotInterval());
                    }
                } else {
                    selection.start = dataItem.startDate ? dataItem.startDate() : dataItem.start;
                    selection.end = dataItem.endDate ? dataItem.endDate() : dataItem.end;
                }

                if ("isDaySlot" in dataItem) {
                    selection.isAllDay = dataItem.isDaySlot;
                } else {
                    selection.isAllDay = dataItem.isAllDay;
                }

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
            snap: true,
            mobile: false,
            timezone: "",
            allDaySlot: true,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            toolbar: null,
            messages: {
                today: "Today",
                pdf: "Export to PDF",
                save: "Save",
                cancel: "Cancel",
                destroy: "Delete",
                deleteWindowTitle: "Delete event",
                ariaSlotLabel: "Selected from {0:t} to {1:t}",
                ariaEventLabel: "{0} on {1:D} at {2:t}",
                views: {
                    day: "Day",
                    week: "Week",
                    workWeek: "Work Week",
                    agenda: "Agenda",
                    month: "Month",
                    timeline: "Timeline",
                    timelineWeek: "Timeline Week",
                    timelineWorkWeek: "Timeline Work Week",
                    timelineMonth: "Timeline Month"
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
                    timezoneTitle: "Time zones",
                    noTimezone: "No timezone",
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
            "add",
            "dataBinding",
            "dataBound",
            "moveStart",
            "move",
            "moveEnd",
            "resizeStart",
            "resize",
            "resizeEnd",
            "navigate",
            "change"
        ],

        destroy: function() {
            var that = this,
                element;

            Widget.fn.destroy.call(that);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
                that.dataSource.unbind("progress", that._progressHandler);
                that.dataSource.unbind("error", that._errorHandler);
            }

            if (that.calendar) {
                that.calendar.destroy();
                that.popup.destroy();
            }

            if (that.view()) {
                that.view().destroy();
            }

            if (that._editor) {
                that._editor.destroy();
            }

            if (this._moveDraggable) {
                this._moveDraggable.destroy();
            }

            if (this._resizeDraggable) {
                this._resizeDraggable.destroy();
            }

            element = that.element
                .add(that.wrapper)
                .add(that.toolbar)
                .add(that.popup);

            element.off(NS);

            clearTimeout(that._moveTimer);

            that._model = null;
            that.toolbar = null;
            that.element = null;

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
            return this.wrapper.find(".k-event, .k-task");
        },

        _movable: function() {
            var startSlot;
            var endSlot;
            var startTime;
            var endTime;
            var event;
            var clonedEvent;
            var that = this;

            var isMobile = that._isMobile();
            var movable = that.options.editable && that.options.editable.move !== false;
            var resizable = that.options.editable && that.options.editable.resize !== false;

            if (movable || (resizable && isMobile)) {

                that._moveDraggable = new kendo.ui.Draggable(that.element, {
                    distance: 0,
                    filter: ".k-event",
                    ignore: ".k-resize-handle",
                    holdToDrag: isMobile
                });

                if (movable) {
                    that._moveDraggable.bind("dragstart", function(e) {
                        var view = that.view();
                        var eventElement = e.currentTarget;

                        if (!view.options.editable || view.options.editable.move === false) {
                            e.preventDefault();
                            return;
                        }

                        if (isMobile && !eventElement.hasClass("k-event-active")) {
                            that.element.find(".k-event-active").removeClass("k-event-active");
                            e.preventDefault();
                            return;
                        }

                        event = that.occurrenceByUid(eventElement.attr(kendo.attr("uid")));

                        clonedEvent = event.clone();

                        view._updateEventForMove(clonedEvent);

                        startSlot = view._slotByPosition(e.x.startLocation, e.y.startLocation);

                        startTime = startSlot.startOffset(e.x.startLocation, e.y.startLocation, that.options.snap);

                        endSlot = startSlot;

                        if (!startSlot || that.trigger("moveStart", { event: event })) {
                            e.preventDefault();
                        }
                    })
                    .bind("drag", function(e) {
                        var view = that.view();

                        var slot = view._slotByPosition(e.x.location, e.y.location);

                        if (!slot) {
                            return;
                        }

                        endTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);

                        var distance = endTime - startTime;

                        view._updateMoveHint(clonedEvent, slot.groupIndex, distance);

                        var range = moveEventRange(clonedEvent, distance);

                        if (!that.trigger("move", {
                            event: event,
                            slot: { element: slot.element, start: slot.startDate(), end: slot.endDate() },
                            resources: view._resourceBySlot(slot),
                            start: range.start,
                            end: range.end
                        })) {

                            endSlot = slot;

                        } else {
                            view._updateMoveHint(clonedEvent, slot.groupIndex, distance);
                        }
                    })
                    .bind("dragend", function(e) {
                        that.view()._removeMoveHint();

                        var distance = endTime - startTime;
                        var range = moveEventRange(clonedEvent, distance);

                        var start = range.start;
                        var end = range.end;

                        var endResources = that.view()._resourceBySlot(endSlot);
                        var startResources = that.view()._resourceBySlot(startSlot);

                        var prevented = that.trigger("moveEnd", {
                            event: event,
                            slot: { element: endSlot.element, start: endSlot.startDate(), end: endSlot.endDate() },
                            start: start,
                            end: end,
                            resources: endResources
                        });

                        if (!prevented && (clonedEvent.start.getTime() != start.getTime() ||
                        clonedEvent.end.getTime() != end.getTime() || kendo.stringify(endResources) != kendo.stringify(startResources)))  {
                            that.view()._updateEventForMove(event);
                            that._updateEvent(null, event, $.extend({ start: start, end: end}, endResources));
                        }

                        e.currentTarget.removeClass("k-event-active");
                        this.cancelHold();
                    })
                    .bind("dragcancel", function() {
                        that.view()._removeMoveHint();
                        this.cancelHold();
                    });
                }

                if (isMobile) {
                    that._moveDraggable.bind("hold", function(e) {
                        if (that.element.find(".k-scheduler-monthview").length) {
                            e.preventDefault();
                        }
                        that.element.find(".k-event-active").removeClass("k-event-active");
                        e.currentTarget.addClass("k-event-active");
                    });

                    that._moveDraggable.userEvents.bind("press", function(e) {
                        e.preventDefault();
                    });
                }
            }
        },

        _resizable: function() {
            var startTime;
            var endTime;
            var event;
            var clonedEvent;
            var slot;
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

                    var view = that.view();

                    event = that.occurrenceByUid(uid);

                    clonedEvent = event.clone();

                    view._updateEventForResize(clonedEvent);

                    slot = view._slotByPosition(e.x.startLocation, e.y.startLocation);

                    if (that.trigger("resizeStart", { event: event })) {
                        e.preventDefault();
                    }

                    startTime = kendo.date.toUtcTime(clonedEvent.start);

                    endTime = kendo.date.toUtcTime(clonedEvent.end);
                },
                drag: function(e) {
                    if (!slot) {
                        return;
                    }

                    var dragHandle = $(e.currentTarget);

                    var dir = direction(dragHandle);

                    var view = that.view();

                    var currentSlot = view._slotByPosition(e.x.location, e.y.location);

                    if (!currentSlot || slot.groupIndex != currentSlot.groupIndex) {
                        return;
                    }

                    slot = currentSlot;

                    var originalStart = startTime;

                    var originalEnd = endTime;

                    if (dir == "south") {
                        if (!slot.isDaySlot && slot.end - kendo.date.toUtcTime(clonedEvent.start) >= view._timeSlotInterval()) {
                            if (clonedEvent.isAllDay) {
                                endTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);
                            } else {
                                endTime = slot.endOffset(e.x.location, e.y.location, that.options.snap);
                            }
                        }
                    } else if (dir == "north") {
                        if (!slot.isDaySlot && kendo.date.toUtcTime(clonedEvent.end) - slot.start >= view._timeSlotInterval()) {
                            startTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);
                        }
                    } else if (dir == "east") {
                        if (slot.isDaySlot && kendo.date.toUtcTime(kendo.date.getDate(slot.endDate())) >= kendo.date.toUtcTime(kendo.date.getDate(clonedEvent.start))) {
                            if (clonedEvent.isAllDay) {
                                endTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);
                            } else {
                                endTime = slot.endOffset(e.x.location, e.y.location, that.options.snap);
                            }
                        } else if (!slot.isDaySlot && slot.end - kendo.date.toUtcTime(clonedEvent.start) >= view._timeSlotInterval()) {
                            endTime = slot.endOffset(e.x.location, e.y.location, that.options.snap);
                        }
                    } else if (dir == "west") {
                        if (slot.isDaySlot && kendo.date.toUtcTime(kendo.date.getDate(clonedEvent.end)) >= kendo.date.toUtcTime(kendo.date.getDate(slot.startDate()))) {
                            startTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);
                        } else if (!slot.isDaySlot && kendo.date.toUtcTime(clonedEvent.end) - slot.start >= view._timeSlotInterval()) {
                            startTime = slot.startOffset(e.x.location, e.y.location, that.options.snap);
                        }
                    }

                    if (!that.trigger("resize", {
                        event: event,
                        slot: { element: slot.element, start: slot.startDate(), end: slot.endDate() },
                        start: kendo.timezone.toLocalDate(startTime),
                        end: kendo.timezone.toLocalDate(endTime),
                        resources: view._resourceBySlot(slot)
                    })) {
                        view._updateResizeHint(clonedEvent, slot.groupIndex, startTime, endTime);
                    } else {
                        startTime = originalStart;
                        endTime = originalEnd;
                    }
                },
                dragend: function(e) {
                    var dragHandle = $(e.currentTarget);
                    var start = new Date(clonedEvent.start.getTime());
                    var end = new Date(clonedEvent.end.getTime());
                    var dir = direction(dragHandle);

                    that.view()._removeResizeHint();

                    if (dir == "south") {
                        end = kendo.timezone.toLocalDate(endTime);
                    } else if (dir == "north") {
                        start = kendo.timezone.toLocalDate(startTime);
                    } else if (dir == "east") {
                        if (slot.isDaySlot) {
                            end = kendo.date.getDate(kendo.timezone.toLocalDate(endTime));
                        } else {
                            end = kendo.timezone.toLocalDate(endTime);
                        }
                    } else if (dir == "west") {
                        if (slot.isDaySlot) {
                            start = new Date(kendo.timezone.toLocalDate(startTime));
                            start.setHours(0);
                            start.setMinutes(0);
                        } else {
                            start = kendo.timezone.toLocalDate(startTime);
                        }
                    }

                    var prevented = that.trigger("resizeEnd", {
                        event: event,
                        slot: { element: slot.element, start: slot.startDate(), end: slot.endDate() },
                        start: start,
                        end: end,
                        resources: that.view()._resourceBySlot(slot)
                    });

                    if (!prevented && end.getTime() >= start.getTime()) {
                        if (clonedEvent.start.getTime() != start.getTime() || clonedEvent.end.getTime() != end.getTime()) {
                            that.view()._updateEventForResize(event);
                            that._updateEvent(dir, event, { start: start, end: end });
                        }
                    }

                    slot = null;
                    event = null;
                },
                dragcancel: function() {
                    that.view()._removeResizeHint();

                    slot = null;
                    event = null;
                }
            });
        },

        _updateEvent: function(dir, event, eventInfo) {
            var that = this;

            var updateEvent = function(event, callback) {
                try {
                    that._preventRefresh = true;
                    event.update(eventInfo);
                    that._convertDates(event);
                } finally {
                    that._preventRefresh = false;
                }

                if (!that.trigger(SAVE, { event: event })) {
                    if (callback) {
                        callback();
                    }

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

                that.dataSource._removeExceptions(head);

                updateEvent(head);
            };

            var updateOccurrence = function() {
                var head = recurrenceHead(event);

                var callback = function() {
                    that._convertDates(head);
                };

                var exception = head.toOccurrence({ start: event.start, end: event.end });
                updateEvent(that.dataSource.add(exception), callback);
            };

            var recurrenceMessages = that.options.messages.recurrenceMessages;
            if (event.recurrenceRule || event.isOccurrence()) {
                that.showDialog({
                    model: event,
                    title: recurrenceMessages.editWindowTitle,
                    text: recurrenceMessages.editRecurring ? recurrenceMessages.editRecurring : EDITRECURRING,
                    buttons: [
                        { text: recurrenceMessages.editWindowOccurrence, click: updateOccurrence },
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
            this._editor.showDialog(options);
        },

        focus: function() {
            this.wrapper.focus();
        },

        _confirmation: function(callback, model) {
            var editable = this.options.editable;

            if (editable === true || editable.confirmation !== false) {
                var messages = this.options.messages;

                var text = typeof editable.confirmation === STRING ? editable.confirmation : DELETECONFIRM;
                var buttons = [
                    { name: "destroy", text: messages.destroy, click: function() { callback(); } }
                ];

                if (!(this._isMobile() && kendo.mobile.ui.Pane)) {
                    buttons.push({ name: "canceledit", text: messages.cancel, click: function() { callback(true); } });
                }

                this.showDialog({
                    model: model,
                    text: text,
                    title: messages.deleteWindowTitle,
                    buttons: buttons
                });
            } else {
                callback();
            }
        },

        addEvent: function(eventInfo) {
            var editable = this._editor.editable;
            var dataSource = this.dataSource;
            var event;

            eventInfo = eventInfo || {};

            var prevented = this.trigger("add", { event:  eventInfo });

            if (!prevented && ((editable && editable.end()) || !editable)) {

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
            var editor = this._editor;

            if (!editor) {
                return;
            }

            var editable = editor.editable;
            var container = editor.container;
            var model = this._modelForContainer(container);

            if (container && editable && editable.end() &&
                !this.trigger(SAVE, { container: container, event: model } )) {

                if (model.isRecurrenceHead()) {
                    this.dataSource._removeExceptions(model);
                }

                if (!model.dirty && !model.isOccurrence()) {
                    this._convertDates(model, "remove");
                }

                this.dataSource.sync();
            }
        },

        cancelEvent: function() {
            var editor = this._editor;
            var container = editor.container;
            var model;

            if (container) {
                model = this._modelForContainer(container);

                if (model && model.isOccurrence()) {
                    this._convertDates(model, "remove");
                    this._convertDates(this.dataSource.get(model.recurrenceId), "remove");
                }

                this.dataSource.cancelChanges(model);

                //TODO: handle the cancel in UI

                editor.close();
            }
        },

        editEvent: function(uid) {
            var model = typeof uid == "string" ? this.occurrenceByUid(uid) : uid;

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
            this._createPopupEditor(model);
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
                model: model,
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

        _createEditor: function() {
            var that = this;

            var editor;

            if (this._isMobile() && kendo.mobile.ui.Pane) {
                editor = that._editor = new MobileEditor(this.wrapper, extend({}, this.options, {
                    target: this,
                    timezone: that.dataSource.reader.timezone,
                    resources: that.resources,
                    createButton: proxy(this._createButton, this)
                }));
            } else {
                editor = that._editor = new PopupEditor(this.wrapper, extend({}, this.options, {
                    target: this,
                    createButton: proxy(this._createButton, this),
                    timezone: that.dataSource.reader.timezone,
                    resources: that.resources
                }));
            }

            editor.bind("cancel", function(e) {
                if (that.trigger("cancel", { container: e.container, event: e.model })) {
                    e.preventDefault();
                    return;
                }
                that.cancelEvent();

                that.focus();
            });

            editor.bind("edit", function(e) {
                if (that.trigger(EDIT, { container: e.container, event: e.model })) {
                    e.preventDefault();
                }
            });

            editor.bind("save", function() {
                that.saveEvent();
            });

            editor.bind("remove", function(e) {
                that.removeEvent(e.model);
            });
        },

        _createPopupEditor: function(model) {
            var editor = this._editor;

            if (!model.isNew() || model.isOccurrence()) {
                if (model.isOccurrence()) {
                    this._convertDates(model.recurrenceId ? this.dataSource.get(model.recurrenceId) : model);
                }
                this._convertDates(model);
            }

            this.editable = editor.editEvent(model);
        },

        removeEvent: function(uid) {
            var that = this,
                model = typeof uid == "string" ? that.occurrenceByUid(uid) : uid;

            if (!model) {
                return;
            }

            if (model.isRecurring()) {
                that._deleteRecurringDialog(model);
            } else {
                that._confirmation(function(cancel) {
                    if (!cancel) {
                        that._removeEvent(model);
                    }
                }, model);
            }
        },

        occurrenceByUid: function(uid) {
            var occurrence = this.dataSource.getByUid(uid);
            if (!occurrence) {
                occurrence = getOccurrenceByUid(this._data, uid);
            }

            return occurrence;
        },

        occurrencesInRange: function(start, end) {
            return new kendo.data.Query(this._data).filter({
                logic: "or",
                filters: [
                    {
                        logic: "and",
                        filters: [
                            { field: "start", operator: "gte", value: start },
                            { field: "end", operator: "gte", value: start },
                            { field: "start", operator: "lt", value: end }
                        ]
                    },
                    {
                        logic: "and",
                        filters: [
                            { field: "start", operator: "lte", value: start },
                            { field: "end", operator: "gt", value: start }
                        ]
                    }
                ]
            }).toArray();
        },

        _removeEvent: function(model) {
            if (!this.trigger(REMOVE, { event: model })) {
                if (this.dataSource.remove(model)) {
                    this.dataSource.sync();
                }
            }
        },

        _deleteRecurringDialog: function(model) {
            var that = this;

            var currentModel = model;

            var deleteOccurrence = function() {
                var occurrence = currentModel.recurrenceId ? currentModel : currentModel.toOccurrence();
                var head = that.dataSource.get(occurrence.recurrenceId);

                that._convertDates(head);
                that._removeEvent(occurrence);
            };

            var deleteSeries = function() {
                if (currentModel.recurrenceId) {
                    currentModel = that.dataSource.get(currentModel.recurrenceId);
                }

                that._removeEvent(currentModel);
            };

            var recurrenceMessages = that.options.messages.recurrenceMessages;
            that.showDialog({
                model: model,
                title: recurrenceMessages.deleteWindowTitle,
                text: recurrenceMessages.deleteRecurring ? recurrenceMessages.deleteRecurring : DELETERECURRING,
                buttons: [
                   { text: recurrenceMessages.deleteWindowOccurrence, click: deleteOccurrence },
                   { text: recurrenceMessages.deleteWindowSeries, click: deleteSeries }
                ]
            });
        },

        _unbindView: function(view) {
            var that = this;
            that.angular("cleanup", function(){
                return { elements: that.items() };
            });

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
                    var switchWorkDay = "isWorkDay" in e;
                    var action = switchWorkDay ? "changeWorkDay" : "changeView";

                    if (!that.trigger("navigate", { view: e.view, isWorkDay: e.isWorkDay, action: action, date: e.date })) {
                        if (switchWorkDay) {
                            that._workDayMode = e.isWorkDay;
                        }

                        that._selectView(e.view);
                        that.date(e.date);
                    }
                }
            };

            view.bind("navigate", that._viewNavigateHandler);

            if (that._viewActivateHandler) {
                view.unbind("activate", that._viewActivateHandler);
            }

            that._viewActivateHandler = function() {
                var view = this;
                if (that._selection) {
                    view.constrainSelection(that._selection);
                    that._select();

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
                    .find(".k-view-" + name.replace(/\./g, "\\.").toLowerCase())
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

        resize: function(force) {
            var size = this.getSize();
            var currentSize = this._size;
            var view = this.view();

            if (!view || !view.groups) {
                return;
            }

            if (force || !currentSize || size.width !== currentSize.width || size.height !== currentSize.height) {
                this.refresh({ action: "resize" });
                this._size = size;
            }
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
                    view = new type(this.wrapper, trimOptions(extend(true, {}, this.options, isSettings ? view : {}, { resources: this.resources, date: this.date(), showWorkHours: this._workDayMode })));
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
            } else if(dataSource instanceof SchedulerDataSource) {
                options.timezone = dataSource.schema ? dataSource.schema.timezone : "";
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource
                    .unbind(CHANGE, that._refreshHandler)
                    .unbind("progress", that._progressHandler)
                    .unbind("error", that._errorHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._requestStart, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = kendo.data.SchedulerDataSource.create(dataSource)
                .bind(CHANGE, that._refreshHandler)
                .bind("progress", that._progressHandler)
                .bind("error", that._errorHandler);

            that.options.dataSource = that.dataSource;
        },

        _error: function() {
            this._progress(false);
        },

        _requestStart: function() {
            this._progress(true);
        },

        _progress: function(toggle) {
            var element = this.element.find(".k-scheduler-content");
            kendo.ui.progress(element, toggle);
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
               selectedDate: new Date(this.options.date),
               formattedDate: ""
           });

           that._model.bind("change", function(e) {
                if (e.field === "selectedDate") {
                    that.view(that._selectedViewName);
                }
           });
        },

        _wrapper: function() {
            var that = this;
            var options = that.options;
            var height = options.height;
            var width = options.width;

            that.wrapper = that.element
                               .addClass("k-widget k-scheduler k-floatwrap")
                               .attr("role", "grid")
                               .attr("aria-multiselectable", true);

            if (that._isMobile()) {
               that.wrapper.addClass("k-scheduler-mobile");
            }

            if (that._isMobilePhoneView()) {
               that.wrapper.addClass("k-scheduler-phone");
            }

            if (height) {
                that.wrapper.height(height);
            }

            if (width) {
                that.wrapper.width(width);
            }
        },

        date: function(value) {
            if (value != null && getDate(value) >= getDate(this.options.min) && getDate(value) <= getDate(this.options.max)) {
                this._model.set("selectedDate", value);
            }
            return getDate(this._model.get("selectedDate"));
        },

        _toolbar: function() {
            var that = this;
            var options = that.options;
            var commands = [];

            if (options.toolbar) {
                commands = $.isArray(options.toolbar) ? options.toolbar : [options.toolbar];
            }

            var template = this._isMobilePhoneView() ? MOBILETOOLBARTEMPLATE : TOOLBARTEMPLATE;
            var toolbar = $(template({
                    messages: options.messages,
                    pdf: $.grep(commands, function(item) {
                            return item == "pdf" || item.name == "pdf";
                        }).length > 0,
                    ns: kendo.ns,
                    views: that.views
                }));

            that.wrapper.append(toolbar);
            that.toolbar = toolbar;

            kendo.bind(that.toolbar, that._model);

            toolbar.on(CLICK + NS, ".k-pdf", function(e) {
                e.preventDefault();
                that.saveAsPDF();
            });

            toolbar.on(CLICK + NS, ".k-scheduler-navigation li", function(e) {
                var li = $(this);
                var date = new Date(that.date());
                var action = "";

                e.preventDefault();

                if (li.hasClass("k-nav-today")) {
                    action = "today";
                    date = new Date();
                } else if (li.hasClass("k-nav-next")) {
                    action = "next";
                    date = that.view().nextDate();
                } else if (li.hasClass("k-nav-prev")) {
                    action = "previous";
                    date = that.view().previousDate();
                } else if (li.hasClass("k-nav-current") && !that._isMobilePhoneView()) {
                    that._showCalendar();
                    return; // TODO: Not good - refactor
                }

                if (!that.trigger("navigate", { view: that._selectedViewName, action: action, date: date })) {
                    that.date(date);
                }
            });

            toolbar.on(CLICK + NS, ".k-scheduler-views li", function(e) {
                e.preventDefault();

                var name = $(this).attr(kendo.attr("name"));

                if (!that.trigger("navigate", { view: name, action: "changeView", date: that.date() })) {
                    that.view(name);
                }
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
                                    var date = this.value();
                                    if (!that.trigger("navigate", { view: that._selectedViewName, action: "changeDate", date: date })) {
                                        that.date(date);
                                        that.popup.close();
                                    }
                                },
                                min: that.options.min,
                                max: that.options.max
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
            var that = this;
            var view = this.view();

            this._progress(false);

            this.angular("cleanup", function(){
                return { elements: that.items() };
            });

            e = e || {};

            if (!view) {
                return;
            }

            if (e && e.action === "itemchange" && (this._editor.editable || this._preventRefresh)) { // skip rebinding if editing is in progress
                return;
            }

            if (this.trigger("dataBinding", { action: e.action || "rebind", index: e.index, items: e.items })) {
                return;
            }

            if (!(e && e.action === "resize") && this._editor) {
                this._editor.close();
            }

            this._data = this.dataSource.expand(view.startDate(), view.endDate());

            view.render(this._data);

            this.trigger("dataBound");
        },

        slotByPosition: function(x, y) {
            var view = this.view();

            if(!view._slotByPosition) {
                return null;
            }

            var slot = view._slotByPosition(x, y);

            if(!slot) {
                return null;
            }

            return {
                startDate: slot.startDate(),
                endDate: slot.endDate(),
                groupIndex: slot.groupIndex,
                element: slot.element,
                isDaySlot: slot.isDaySlot
            };
        },

        slotByElement: function(element) {
            var offset = $(element).offset();
            return this.slotByPosition(offset.left, offset.top);
        },

        resourcesBySlot: function(slot) {
            return this.view()._resourceBySlot(slot);
        }
    });

    var defaultViews = {
        day: {
            type: "kendo.ui.DayView"
        },
        week: {
            type: "kendo.ui.WeekView"
        },
        workWeek: {
            type: "kendo.ui.WorkWeekView"
        },
        agenda: {
            type: "kendo.ui.AgendaView"
        },
        month: {
            type: "kendo.ui.MonthView"
        },
        timeline: {
            type: "kendo.ui.TimelineView"
        },
        timelineWeek: {
            type: "kendo.ui.TimelineWeekView"
        },
        timelineWorkWeek: {
            type: "kendo.ui.TimelineWorkWeekView"
        },
        timelineMonth: {
            type: "kendo.ui.TimelineMonthView"
        }
    };

    ui.plugin(Scheduler);

    if (kendo.PDFMixin) {
        kendo.PDFMixin.extend(Scheduler.prototype);
    }

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

    var ZONETITLEOPTIONTEMPLATE = kendo.template('<option value="#=other_zone#">#=name#</option>');
    var ZONEOPTIONTEMPLATE = kendo.template('<option value="#=zone#">#=territory#</option>');

    var MobileTimezoneEditor = Widget.extend({
        init: function(element, options) {
            var that = this,
                zones = kendo.timezone.windows_zones;

            if (!zones || !kendo.timezone.zones_titles) {
                throw new Error('kendo.timezones.min.js is not included.');
            }

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            that._zonesQuery = new kendo.data.Query(zones);
            that._zoneTitlePicker();
            that._zonePicker();

            that.value(that.options.value);
        },

        options: {
            name: "MobileTimezoneEditor",
            optionLabel: "No timezone",
            value: ""
        },

        events: [ "change" ],

        _bindZones: function(value) {
            var data = value ? this._filter(value) : [];

            this._zone.html(this._options(data, ZONEOPTIONTEMPLATE));
        },

        _filter: function(value) {
            return this._zonesQuery.filter({ field: "other_zone", operator: "eq", value: value }).data;
        },

        _options: function(data, template, optionLabel) {
            var idx = 0;
            var html = "";
            var length = data.length;

            if (optionLabel) {
                html += template({ other_zone: "", name: optionLabel });
            }

            for (; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },

        _zoneTitlePicker: function() {
            var that = this;
            var options = that._options(kendo.timezone.zones_titles, ZONETITLEOPTIONTEMPLATE, that.options.optionLabel);

            that._zoneTitle = $('<select>' + options + '</select>')
                                .appendTo(that.wrapper)
                                .change(function() {
                                    var value = this.value;
                                    var zone = that._zone;

                                    that._bindZones(value);

                                    if (value && zone[0].children.length > 1) {
                                        zone.show();
                                    } else {
                                        zone.hide();
                                    }

                                    that._value = zone[0].value;

                                    that.trigger("change");
                                });
        },

        _zonePicker: function() {
            var that = this;

            that._zone = $('<select style="display:none"></select>')
                            .appendTo(this.wrapper)
                            .change(function() {
                                that._value = this.value;

                                that.trigger("change");
                            });

            that._bindZones(that._zoneTitle.val());
            that._value = that._zone[0].value;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            kendo.destroy(this.wrapper);
        },

        value: function(value) {
            var that = this;
            var zonePicker = that._zone;
            var other_zone = "";
            var zone_value = "";
            var zone;

            if (value === undefined) {
                return that._value;
            }

            zone = that._zonesQuery.filter({ field: "zone", operator: "eq", value: value }).data[0];

            if (zone) {
                zone_value = zone.zone;
                other_zone = zone.other_zone;
            }

            that._zoneTitle.val(other_zone);
            that._bindZones(other_zone);

            zonePicker.val(zone_value);
            zone_value = zonePicker[0].value;

            if (zone_value && zonePicker[0].children.length > 1) {
                zonePicker.show();
            } else {
                zonePicker.hide();
            }

            that._value = zone_value;
        }
    });

    ui.plugin(MobileTimezoneEditor);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
