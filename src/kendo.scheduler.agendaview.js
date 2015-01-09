(function(f, define){
    define([ "./kendo.scheduler.view" ], f);
})(function(){

var __meta__ = {
    id: "scheduler.agendaview",
    name: "Scheduler Agenda View",
    category: "web",
    description: "The Scheduler Agenda View",
    depends: [ "scheduler.view" ],
    hidden: true
};

(function($){
    var kendo = window.kendo,
        ui = kendo.ui,
        NS = ".kendoAgendaView";

    var EVENT_WRAPPER_FORMAT = '<div class="k-task" title="#:title.replace(/"/g,"\'")#" data-#=kendo.ns#uid="#=uid#">' +
                               '# if (resources[0]) {#' +
                               '<span class="k-scheduler-mark" style="background-color:#=resources[0].color#"></span>' +
                               "# } #" +
                               "# if (data.isException()) { #" +
                               '<span class="k-icon k-i-exception"></span>' +
                               '# } else if (data.isRecurring()) {#' +
                               '<span class="k-icon k-i-refresh"></span>' +
                               "# } #" +
                               '{0}' +
                               '#if (showDelete) {#' +
                                   '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                               '#}#' +
                           '</div>';

    ui.AgendaView = ui.SchedulerView.extend({
        init: function(element, options) {
            ui.SchedulerView.fn.init.call(this, element, options);

            options = this.options;

            if (options.editable) {
                options.editable = $.extend(
                    { "delete": true },
                    options.editable,
                    { create: false, update: false }
                );
            }

            this.title = options.title;

            this.name = "agenda";

            this._eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_FORMAT);
            this._dateTemplate = kendo.template(options.eventDateTemplate);
            this._groupTemplate = kendo.template(options.eventGroupTemplate);
            this._timeTemplate = kendo.template(options.eventTimeTemplate);

            this.element.on("mouseenter" + NS, ".k-scheduler-agenda .k-scheduler-content tr", "_mouseenter")
                        .on("mouseleave" + NS, ".k-scheduler-agenda .k-scheduler-content tr", "_mouseleave")
                        .on("click" + NS, ".k-scheduler-agenda .k-scheduler-content .k-link:has(.k-si-close)", "_remove");

            this._renderLayout(options.date);
        },

        _mouseenter: function(e) {
            $(e.currentTarget).addClass("k-state-hover");
        },

        _mouseleave: function(e) {
            $(e.currentTarget).removeClass("k-state-hover");
        },

        _remove: function(e) {
            e.preventDefault();

            this.trigger("remove", {
                uid: $(e.currentTarget).closest(".k-task").attr(kendo.attr("uid"))
            });
        },

        nextDate: function() {
            return kendo.date.nextDay(this.startDate());
        },

        startDate: function() {
            return this._startDate;
        },

        endDate: function() {
            return this._endDate;
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate());
        },

        _renderLayout: function(date) {
            this._startDate = date;
            this._endDate = kendo.date.addDays(date, 7);
            this.createLayout(this._layout());
            this.table.addClass("k-scheduler-agenda");
        },

        _layout: function() {
            var columns = [
                    { text: this.options.messages.time, className: "k-scheduler-timecolumn" },
                    { text: this.options.messages.event }
                ];

            if (!this._isMobilePhoneView()) {
                columns.splice(0, 0, { text: this.options.messages.date, className: "k-scheduler-datecolumn" });
            }

            var resources = this.groupedResources;
            if (resources.length) {
                var groupHeaders = [];
                for (var idx = 0; idx < resources.length; idx++) {
                    groupHeaders.push({ text: "", className: "k-scheduler-groupcolumn"});
                }

                columns = groupHeaders.concat(columns);
            }

            return {
                columns: columns
            };
        },

        _tasks: function(events) {
            var tasks = [];

            for (var idx = 0; idx < events.length; idx++) {
                var event = events[idx];
                var start = event.start;
                var end = event.end;

                var eventDurationInDays =
                    (kendo.date.getDate(end) - kendo.date.getDate(start)) / kendo.date.MS_PER_DAY + 1;

                var task = event.clone();
                task.startDate = kendo.date.getDate(start);

                if (task.startDate >= this.startDate()) {
                    tasks.push(task);
                }

                if (eventDurationInDays > 1) {
                    task.end = kendo.date.nextDay(start);
                    task.head = true;
                    for (var day = 1; day < eventDurationInDays; day++) {
                        start = task.end;
                        task = event.clone();
                        task.start = start;
                        task.startDate = kendo.date.getDate(start);
                        task.end = kendo.date.nextDay(start);
                        if (day == eventDurationInDays -1) {
                            task.end = new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate(), end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds());
                            task.tail = true;
                        } else {
                            task.isAllDay = true;
                            task.middle = true;
                        }

                        if (task.end <= this.endDate() && task.start >= this.startDate()) {
                            tasks.push(task);
                        }
                    }
                }
            }

            return new kendo.data.Query(tasks).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "asc" }]).groupBy({field: "startDate"}).toArray();
        },

        _renderTaskGroups: function(tasksGroups, groups) {
            var tableRows = [];
            var editable = this.options.editable;
            var showDelete = editable && editable.destroy !== false && !this._isMobile();
            var isPhoneView = this._isMobilePhoneView();

            for (var taskGroupIndex = 0; taskGroupIndex < tasksGroups.length; taskGroupIndex++) {
                var date = tasksGroups[taskGroupIndex].value;

                var tasks = tasksGroups[taskGroupIndex].items;

                var today = kendo.date.isToday(date);

                for (var taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
                    var task = tasks[taskIndex];

                    var tableRow = [];

                    var headerCells = !isPhoneView ? tableRow : [];

                    if (taskGroupIndex === 0 && taskIndex === 0 && groups.length) {
                        for (var idx = 0; idx < groups.length; idx++) {
                            headerCells.push(kendo.format(
                                '<td class="k-scheduler-groupcolumn{2}" rowspan="{0}">{1}</td>',
                                groups[idx].rowSpan,
                                this._groupTemplate({ value: groups[idx].text }),
                                groups[idx].className
                            ));
                        }
                    }

                    if (taskIndex === 0) {
                        if (isPhoneView) {
                            headerCells.push(kendo.format(
                                '<td class="k-scheduler-datecolumn" colspan="2">{0}</td>',
                                this._dateTemplate({ date: date })
                            ));

                            tableRows.push('<tr role="row" aria-selected="false"' + (today ? ' class="k-today">' : ">") + headerCells.join("")  + "</tr>");
                        } else {
                            tableRow.push(kendo.format(
                                '<td class="k-scheduler-datecolumn{3}{2}" rowspan="{0}">{1}</td>',
                                tasks.length,
                                this._dateTemplate({ date: date }),
                                taskGroupIndex == tasksGroups.length - 1 && !groups.length ? " k-last" : "",
                                !groups.length ? " k-first" : ""
                            ));
                        }
                    }

                    if (task.head) {
                        task.format = "{0:t}";
                    } else if (task.tail) {
                        task.format = "{1:t}";
                    } else {
                        task.format = "{0:t}-{1:t}";
                    }

                    task.resources = this.eventResources(task);

                    tableRow.push(kendo.format(
                        '<td class="k-scheduler-timecolumn"><div>{0}{1}{2}</div></td><td>{3}</td>',
                        task.tail || task.middle ? '<span class="k-icon k-i-arrow-w"></span>' : "",
                        this._timeTemplate(task.clone({ start: task._startTime || task.start, end: task.endTime || task.end })),
                        task.head || task.middle ? '<span class="k-icon k-i-arrow-e"></span>' : "",
                        this._eventTemplate(task.clone({ showDelete: showDelete }))
                    ));

                    tableRows.push('<tr role="row" aria-selected="false"' + (today ? ' class="k-today">' : ">") + tableRow.join("") + "</tr>");
                }
            }

            return tableRows.join("");
        },

        render: function(events) {
            var table = this.content.find("table").empty();
            var groups = [];

            if (events.length > 0) {
                var resources = this.groupedResources;

                if (resources.length) {
                    groups = this._createGroupConfiguration(events, resources, null);
                    this._renderGroups(groups, table, []);
                } else {
                    groups = this._tasks(events);
                    table.append(this._renderTaskGroups(groups, []));
                }
            }

            var items = this._eventsList = flattenTaskGroups(groups);
            this._angularItems(table, items);

            this.refreshLayout();
            this.trigger("activate");
        },

        _angularItems: function(table, items) {
            this.angular("compile", function(){
                var data = [], elements = items.map(function(item){
                    data.push({ dataItem: item });
                    return table.find(".k-task[" + kendo.attr("uid") + "=" + item.uid + "]");
                });
                return { elements: elements, data: data };
            });
        },

        _renderGroups: function(groups, table, parentGroups) {
            for (var idx = 0, length = groups.length; idx < length; idx++) {
                var parents = parentGroups.splice(0);
                parents.push(groups[idx]);

                if (groups[idx].groups) {
                    this._renderGroups(groups[idx].groups, table, parents);
                } else {
                    table.append(this._renderTaskGroups(groups[idx].items, parents));
                }
            }
        },

        _createGroupConfiguration: function(events, resources, parent) {
            var resource = resources[0];
            var configuration = [];
            var data = resource.dataSource.view();
            var isPhoneView = this._isMobilePhoneView();

            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                var value = resourceValue(resource, data[dataIndex]);

                var tmp = new kendo.data.Query(events).filter({ field: resource.field, operator: ui.SchedulerView.groupEqFilter(value) }).toArray();

                if (tmp.length) {
                    var tasks = this._tasks(tmp);
                    var className = parent ? "" : " k-first";

                    if (dataIndex === data.length - 1 && (!parent || parent.className.indexOf("k-last") > -1)) {
                        className += " k-last";
                    }

                    var obj = {
                        text: kendo.getter(resource.dataTextField)(data[dataIndex]),
                        value: value,
                        rowSpan: 0,
                        className: className
                    };

                    if (resources.length > 1) {
                        obj.groups = this._createGroupConfiguration(tmp, resources.slice(1), obj);
                        if (parent) {
                            parent.rowSpan += obj.rowSpan;
                        }
                    } else {
                        obj.items = tasks;
                        var span = rowSpan(obj.items);

                        if (isPhoneView) {
                            span += obj.items.length;
                        }

                        obj.rowSpan = span;
                        if (parent) {
                            parent.rowSpan += span;
                        }
                    }
                    configuration.push(obj);
                }
            }

            return configuration;
        },

        selectionByElement: function(cell) {
            var index, event;
            cell = $(cell);
            if (cell.hasClass("k-scheduler-datecolumn")) {
                return;
            }

            if (this._isMobile()) {
                var parent = cell.parent();
                index = parent.parent().children()
                    .filter(function() {
                        return $(this).children(":not(.k-scheduler-datecolumn)").length;
                    })
                    .index(parent);
            } else {
                index = cell.parent().index();
            }

            event = this._eventsList[index];

            return {
                index: index,
                start: event.start,
                end: event.end,
                isAllDay: event.isAllDay,
                uid: event.uid
            };
        },

        select: function(selection) {
            this.clearSelection();

            var row = this.table
                .find(".k-task")
                .eq(selection.index)
                .closest("tr")
                .addClass("k-state-selected")
                .attr("aria-selected", true)[0];

            this.current(row);
        },

        move: function(selection, key) {
            var handled = false;
            var index = selection.index;

            if (key == kendo.keys.UP) {
                index --;
                handled = true;
            } else  if (key == kendo.keys.DOWN) {
                index ++;
                handled = true;
            }

            if (handled) {
                var event = this._eventsList[index];
                if (event) {
                    selection.start = event.start;
                    selection.end = event.end;
                    selection.isAllDay = event.isAllDay;
                    selection.events = [ event.uid ];
                    selection.index = index;
                }
            }

            return handled;
        },

        moveToEvent: function() {
            return false;
        },

        constrainSelection: function(selection) {
            var event = this._eventsList[0];
            if (event) {
                selection.start = event.start;
                selection.end = event.end;
                selection.isAllDay = event.isAllDay;
                selection.events = [ event.uid ];
                selection.index = 0;
            }
        },

        isInRange: function() {
            return true;
        },

        destroy: function(){
            if (this.element) {
                this.element.off(NS);
            }

            ui.SchedulerView.fn.destroy.call(this);
        },

        options: {
            title: "Agenda",
            name: "agenda",
            editable: true,
            selectedDateFormat: "{0:D}-{1:D}",
            eventTemplate: "#:title#",
            eventTimeTemplate: "#if(data.isAllDay) {#" +
                            '#=this.options.messages.allDay#' +
                          "#} else { #" +
                            '#=kendo.format(format, start, end)#' +
                          "# } #",
            eventDateTemplate: '<strong class="k-scheduler-agendaday">' +
                            '#=kendo.toString(date, "dd")#' +
                          '</strong>' +
                          '<em class="k-scheduler-agendaweek">' +
                              '#=kendo.toString(date,"dddd")#' +
                          '</em>' +
                          '<span class="k-scheduler-agendadate">' +
                              '#=kendo.toString(date, "y")#' +
                              '</span>',
            eventGroupTemplate: '<strong class="k-scheduler-adgendagroup">' +
                            '#=value#' +
                          '</strong>',
            messages: {
                event: "Event",
                date: "Date",
                time: "Time",
                allDay: "all day"
            }
        }
    });

    function rowSpan(tasks) {
        var result = 0;

        for (var idx = 0, length = tasks.length; idx < length; idx++) {
            result += tasks[idx].items.length;
        }

        return result;
    }

    function resourceValue(resource, item) {
        if (resource.valuePrimitive) {
            item = kendo.getter(resource.dataValueField)(item);
        }
        return item;
    }

    function flattenTaskGroups(groups) {
        var idx = 0,
            length = groups.length,
            item,
            result = [];

        for ( ; idx < length; idx ++) {
            item = groups[idx];
            if (item.groups) {
                item = flattenGroup(item.groups);
                result = result.concat(item);
            } else {
                result = result.concat(flattenGroup(item.items));
            }
        }

        return result;
    }

    function flattenGroup(groups) {
        var items = [].concat(groups),
            item = items.shift(),
            result = [],
            push = [].push;
        while (item) {
            if (item.groups) {
                push.apply(items, item.groups);
            } else if (item.items) {
                push.apply(items, item.items);
            } else {
                push.call(result, item);
            }

            item = items.shift();
        }

        return result;
    }

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
