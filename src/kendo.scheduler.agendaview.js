kendo_module({
    id: "scheduler.agendaview",
    name: "Scheduler Agenda View",
    category: "web",
    description: "The Scheduler Agenda View",
    depends: [ "core", "scheduler.view" ]
});

(function($){
    var kendo = window.kendo,
        ui = kendo.ui;

    ui.AgendaView = ui.SchedulerView.extend({
        init: function(element, options) {
            ui.SchedulerView.fn.init.call(this, element, options);

            this.title = this.options.title;
            this._taskTemplate = kendo.template(this.options.eventTemplate);
            this._dateTemplate = kendo.template(this.options.dateTemplate);
            this._timeTemplate = kendo.template(this.options.timeTemplate);

            this.element.on("mouseenter", ".k-scheduler-agenda .k-scheduler-content tr", "_mouseenter")
                        .on("mouseleave", ".k-scheduler-agenda .k-scheduler-content tr", "_mouseleave")
                        .on("click", ".k-scheduler-agenda .k-scheduler-content .k-link:has(.k-i-close)", "_remove");
        },

        _mouseenter: function(e) {
            $(e.currentTarget).addClass("k-state-hover");
        },

        _mouseleave: function(e) {
            $(e.currentTarget).removeClass("k-state-hover");
        },

        _remove: function(e) {
            this.trigger("remove", {
                uid: $(e.currentTarget).closest(".k-task").attr(kendo.attr("uid"))
            });
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate);
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate);
        },

        // change to setDate
        renderGrid: function(date) {
            this.startDate = date;
            var endDate = new Date(date);

            kendo.date.dayOfWeek(endDate, 6);

            this.endDate = endDate;
            this.prepareLayout(this._layout());
            this.table.addClass("k-scheduler-agenda");
        },

        _layout: function() {
            return {
                columns: [
                    { text: "Date", className: "k-scheduler-datecolumn" },
                    { text: "Time", className: "k-scheduler-timecolumn" },
                    { text: "Event" }
                ]
            };
        },

        _tasks: function(events) {
            var tasks = [];

            for (var idx = 0; idx < events.length; idx++) {
                var event = events[idx];
                var start = event.start;
                var end = event.end;

                if (event.isAllDay) {
                    end = kendo.date.nextDay(end);
                }

                var eventDurationInDays = Math.ceil((end - start) / (1000 * 3600 * 24));

                var task = event.toJSON();

                task.uid = event.uid;
                task.startDate = kendo.date.getDate(start);
                tasks.push(task);

                if (eventDurationInDays > 1) {
                    task.end = kendo.date.nextDay(start);

                    for (var day = 1; day < eventDurationInDays; day++) {
                        start = task.end;
                        task = event.toJSON();
                        task.uid = event.uid;
                        task.start = start;
                        task.startDate = kendo.date.getDate(start);
                        task.end = kendo.date.nextDay(start);
                        if (day == eventDurationInDays -1) {
                            task.end = new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate(), end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds());
                        } else {
                            task.isAllDay = true;
                        }
                        tasks.push(task);
                    }
                }
            }

            return new kendo.data.Query(tasks).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).groupBy({field: "startDate"}).toArray();
        },

        renderEvents: function(events) {
            var table = this.content.find("table").empty();

            var tasks = this._tasks(events);

            if (tasks.length > 0) {

                for (var i = 0; i < tasks.length; i++) {
                    var tr = [];

                    for (var taskIndex = 0; taskIndex < tasks[i].items.length; taskIndex++) {
                        var task = tasks[i].items[taskIndex];

                        tr.push(kendo.format(
                                '<td class="k-scheduler-timecolumn">{0}</td><td>{1}</td>',
                                this._timeTemplate(task),
                                this._taskTemplate(task)
                            )
                        );
                    }

                    tr.unshift(kendo.format(
                            '<td class="k-scheduler-datecolumn" rowspan="{0}">{1}</td>{2}',
                            tr.length,
                            this._dateTemplate({ date: tasks[i].value }),
                            tr.shift()
                        )
                    );

                    table.append("<tr>" + tr.join("</tr><tr>") + "</tr>");
                }
            }

            this.refreshLayout();
        },
        options: {
            title: "Agenda",
            name: "agenda",
            selectedDateFormat: "{0:D}-{1:D}",
            eventTemplate: '<div class="k-task" title="#:title#" data-#=kendo.ns#uid="#=uid#">' +
                               '#:title#' +
                               '<a href="\\#" class="k-link"><span class="k-icon k-i-close"></span></a>' +
                           '</div>',
            timeTemplate: "#if(data.isAllDay) {#" +
                            "all day" +
                          "#} else { #" +
                            '#=kendo.toString(start, "t")#-#=kendo.toString(end, "t")#' +
                          "# } #",
            dateTemplate: '<strong class="k-scheduler-agendaday">' +
                            '#=kendo.toString(date, "dd")#' +
                          '</strong>' +
                          '<em class="k-scheduler-agendaweek">' +
                              '#=kendo.toString(date,"dddd")#' +
                          '</em>' +
                          '<span class="k-scheduler-agendadate">' +
                              '#=kendo.toString(date, "y")#' +
                          '</span>'
        }
    });

})(window.kendo.jQuery);
