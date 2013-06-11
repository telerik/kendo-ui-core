kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is an event calendar.",
    depends: [ "core", "binder", "popup", "calendar", "data", "data.scheduler"],
    features: [ {
        id: "scheduler-dayview",
        name: "Scheduler Day View",
        description: "Scheduler Day View",
        depends: [ "scheduler.view", "scheduler.dayview" ]
    }, {
        id: "scheduler-agendaview",
        name: "Scheduler Agenda View",
        description: "Scheduler Agenda View",
        depends: [ "scheduler.view", "scheduler.agendaview" ]
    }, {
        id: "scheduler-monthview",
        name: "Scheduler Month View",
        description: "Scheduler Month View",
        depends: [ "scheduler.view", "scheduler.monthview" ]
    } ]
});

(function($, undefined) {
    var kendo = window.kendo,
        date = kendo.date,
        getDate = date.getDate,
        recurrence = kendo.recurrence,
        ui = kendo.ui,
        Widget = ui.Widget,
        STRING = "string",
        Popup = ui.Popup,
        Calendar = ui.Calendar,
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
        DELETECONFIRM = "Are you sure you want to delete this event?",
        COMMANDBUTTONTMPL = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>',
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
        DATERANGEEDITOR = function(container, options) {
            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' ' + kendo.attr("role") + '="datetimepicker" ' + kendo.attr("bind") + '="value:' + options.field +',invisible:isAllDay" />')
            .attr({
                name: options.field
            }).appendTo(container);

            $('<input type="text" required ' + kendo.attr("type") + '="date"' + ' '  + kendo.attr("role") + '="datepicker" ' + kendo.attr("bind") + '="value:' + options.field +',visible:isAllDay" />')
            .attr({
                name: options.field
            }).appendTo(container);

            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        };

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

            convertData(data, "remove",  timezone);

            data = originalFunction(data);

            return data || [];
        };
    }

    function convertData(data, method, timezone) {
        var event,
            idx,
            length;

        data = data || [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            event = data[idx];

            event.start = kendo.timezone[method](event.start, event.startTimezone || event.endTimezone || timezone);
            event.end = kendo.timezone[method](event.end, event.endTimezone || event.startTimezone || timezone);

            //delete event.uid;
        }
        return data;
    }

    var SchedulerDataReader = kendo.Class.extend({
        init: function(schema, reader) {
            var timezone = schema.timezone || "Etc/UTC";

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

    var SchedulerEvent = kendo.data.Model.define({
        init: function(value) {
            var that = this;

            kendo.data.Model.fn.init.call(that, value);
        },

        toJSON: function() {
            var obj = kendo.data.Model.fn.toJSON.call(this);
            obj.uid = this.uid;

            return obj;
        }
    });

    var SchedulerDataSource = kendo.data.DataSource.extend({
        init: function(options) {
            kendo.data.DataSource.fn.init.call(this, extend(true, {}, { schema: {
                modelBase: SchedulerEvent, model: { fields: { title: { defaultValue: "" } } } } }, options));

            this.reader = new SchedulerDataReader(this.options.schema, this.reader);
        }
    });

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

    function convertToPlainObjects(data) {
        var idx,
            length,
            result = [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            result.push(data[idx].toJSON());
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

            that.resources = [];

            that._initModel();

            that._wrapper();

            that._views();

            that._toolbar();

            that._dataSource();

            that._resources();

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
            resources: [],
            views: []
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
            container = $(container).closest("[" + kendo.attr("uid") + "]");

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
                    this.editEvent(event.uid);
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

        editEvent: function(uid) {
            var that = this,
                model = that.dataSource.getByUid(uid),
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
                fields = [
                    { field: "title", title: "Title" /*, format: field.format, editor: field.editor, values: field.values*/ },
                    { field: "start", title: "Start", editor: DATERANGEEDITOR },
                    { field: "end", title: "End", editor: DATERANGEEDITOR },
                    { field: "isAllDay", title: "All day event" }
                ],
                attr,
                options = isPlainObject(editable) ? editable.window : {},
                settings = extend({}, kendo.Template, that.options.templateSettings),
                editableFields = [],
                paramName = settings.paramName;

           if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }
                html += (kendo.template(template, settings))(model);
            } else {

                if ("description" in model) {
                    fields.push({ field: "description", title: "Description", editor: '<textarea name="description" class="k-textbox"/>' });
                }

                for (var resourceIndex = 0; resourceIndex < that.resources.length; resourceIndex++) {
                    (function(resource) {
                        var field = {
                           field: resource.field,
                           title: resource.field,
                        }

                        if (resource.multiple) {
                            field.editor = function(container, options) {
                               $(kendo.format('<select data-{0}bind="value: {1}">', kendo.ns, resource.field))
                                 .appendTo(container)
                                 .kendoMultiSelect({
                                     dataTextField: resource.dataTextField,
                                     dataValueField: resource.dataValueField,
                                     dataSource: resource.dataSource,
                                     itemTemplate: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField),
                                     tagTemplate: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField)
                                 });
                           }
                        } else {
                            field.editor = function(container, options) {
                               $(kendo.format('<select data-{0}bind="value: {1}">', kendo.ns, resource.field))
                                 .appendTo(container)
                                 .kendoDropDownList({
                                     dataTextField: resource.dataTextField,
                                     dataValueField: resource.dataValueField,
                                     dataSource: resource.dataSource,
                                     optionLabel: "None",
                                     template: kendo.format('<span class="k-scheduler-mark" style="background-color:#= data.{0}?{0}:"none" #"></span>#={1}#', resource.dataColorField, resource.dataTextField)
                                 });
                           }
                        }
                        fields.push(field);
                    })(that.resources[resourceIndex]);
                }

                for (var idx = 0, length = fields.length; idx < length; idx++) {
                    var field = fields[idx];

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
                }
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
                    fields: editableFields,
                    model: model,
                    clearContainer: false,
                    validateOnBlur: true
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

        removeEvent: function(uid) {
            var model = this.dataSource.getByUid(uid);

            if (model) {
                if (!this._confirmation()) {
                    return;
                }

                if (!this.trigger(REMOVE, { event: model })) {
                    if (this.dataSource.remove(model)) {
                        this.dataSource.sync();
                    }
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
        },

        view: function(name) {
            var that = this;

            if (name) {

                if (that._selectedViewName !== name) {
                    that._unbindView(that.views[that._selectedViewName]);
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

            view.destroy();

            this._bindView(this.views[name]);

            view.renderLayout(this.selectDate(), this.resources);

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
            var that = this;
            var view = that.view();

            that.dataSource.filter({
                filters: [{
                    logic: "or",
                    filters: [
                        { field: "start", operator: "gte", value: view.startDate },
                        { field: "start", operator: "lte", value: view.endDate }
                    ]
                }]
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
                    dataTextField: resource.dataTextField || "text",
                    dataValueField: resource.dataValueField || "value",
                    dataColorField: resource.dataColorField || "color",
                    multiple: resource.multiple || false,
                    dataSource: kendo.data.DataSource.create(dataSource)
                });
            }

            var promises = $.map(that.resources, function(resource) {
                return resource.dataSource.fetch();
            });

            $.when.apply(null, promises)
                  .then(function() {
                      that.view(that._selectedViewName);
                  });
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

        _expandEvents: function(data, view) {
            var endDate = view.endDate,
                endTime = view.endTime;

            if (recurrence) {
                endDate = new Date(endDate);
                if (endTime) {
                    endDate.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), endTime.getMilliseconds());
                } else {
                    endDate.setHours(23, 59, 59, 999);
                }

                data = recurrence.expandAll(data, view.startDate, endDate, this.dataSource.reader.timezone);
            } else {
                data = convertToPlainObjects(data);
            }

            return data;
        },

        refresh: function(e) {
            var view = this.view(),
                data = this.dataSource.view();

            if (e && e.action === "itemchange" && this.editable) { // skip rebinding if editing is in progress
                return;
            }

            this.trigger("dataBinding");

            this._destroyEditable();

            data = this._expandEvents(data, view);

            view.renderEvents(data);

            this.trigger("dataBound");
        }
    });

    var defaultViews = {
        day: kendo.ui.DayView,
        week: kendo.ui.WeekView,
        agenda: kendo.ui.AgendaView,
        month: kendo.ui.MonthView
    };

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
