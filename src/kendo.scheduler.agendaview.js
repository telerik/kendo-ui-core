kendo_module({
    id: "scheduler.agendaview",
    name: "Scheduler Agenda View",
    category: "web",
    description: "The Scheduler Agenda View",
    depends: [ "core", "scheduler.view" ]
});

(function(){
    var kendo = window.kendo,
        ui = kendo.ui;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    ui.AgendaView = ui.SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            ui.SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title;
        },

        // change to setDate
        renderGrid: function(date) {
            this.startDate = date;
            this.endDate = date;
            this.prepareLayout(this._layout());
            this.table.addClass("k-scheduler-agendaview");
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
                var eventDurationInDays = Math.ceil((end - start) / (1000 * 3600 * 24));

                var task = event.toJSON();

                task.uid = event.uid;

                tasks.push(task);

                if (eventDurationInDays > 1) {
                    task.end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);

                    for (var day = 1; day < eventDurationInDays; day++) {
                        start = task.end;
                        task = event.toJSON();
                        task.uid = event.uid;
                        task.start = start;
                        task.end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
                        if (day == eventDurationInDays -1) {
                            task.end = new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate(), end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds());
                        } else {
                            task.isAllDay = true;
                        }
                        tasks.push(task);
                    }
                }
            }

            return new kendo.data.Query(tasks).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();
        },

        renderEvents: function(events) {
            var taskTemplate = kendo.template(this.options.eventTemplate);
            var dateTemplate = kendo.template(this.options.dateTemplate);
            var timeTemplate = kendo.template(this.options.timeTemplate);

            var table = this.content.find("table").empty();

            var tasks = this._tasks(events);

            if (tasks.length > 0) {
                var task = tasks[0];
                var day = { date: getDate(task.start), tasks: [] };
                var days = [day];

                for (var i = 0; i < tasks.length; i++) {
                    task = tasks[i];

                    var taskDate = getDate(task.start);

                    if (day.date < taskDate) {
                        day = { date: taskDate, tasks: [] };
                        days.push(day);
                    }

                    day.tasks.push(task);
                }

                for (i = 0; i < days.length; i++) {
                    var tr = [];

                    for (var taskIndex = 0; taskIndex < days[i].tasks.length; taskIndex++) {
                        task = days[i].tasks[taskIndex];

                        tr.push(kendo.format('<td class="k-scheduler-timecolumn">{0}</td><td>{1}</td>',
                            timeTemplate(task), taskTemplate(task)));
                    }

                    tr.unshift(kendo.format('<td class="k-scheduler-datecolumn" rowspan="{0}">{1}</td>{2}', tr.length,
                            dateTemplate({ start: days[i].date }), tr.shift()));

                    table.append("<tr>" + tr.join("</tr><tr>") + "</tr>");
                }
            }

            this.refreshLayout();
        },
        options: {
            title: "Agenda",
            name: "agenda",
            selectedDateFormat: "{0:D}",
            eventTemplate: '<div title="#:title#" data-#=kendo.ns#uid="#=uid#">#:title#</div>',
            timeTemplate: "#if(data.isAllDay) {#" +
                            "all day" +
                          "#} else { #" +
                            '#=kendo.toString(start, "t")#-#=kendo.toString(end, "t")#' +
                          "# } #",
            dateTemplate: '<strong class="k-scheduler-agendaday">' +
                            '#=kendo.toString(start, "dd")#' +
                          '</strong>' +
                          '<em class="k-scheduler-agendaweek">' +
                              '#=kendo.toString(start,"dddd")#' +
                          '</em>' +
                          '<span class="k-scheduler-agendadate">' +
                              '#=kendo.toString(start, "y")#' +
                          '</span>'
        }
    });

})(window.kendo.jQuery);
