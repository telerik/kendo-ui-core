kendo_module({
    id: "scheduler.agendaview",
    name: "Scheduler Agenda View",
    category: "web",
    description: "The Scheduler Agenda View",
    depends: [ "core", "scheduler.view" ]
});

(function($){
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    ui.AgendaView = ui.SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            ui.SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title;
            that.table = $();
        },
        // change to setDate
        renderGrid: function(date) {
            this.startDate = date;
            this.endDate = date;
        },
        renderEvents: function(events) {
            var eventTemplate = kendo.template(this.options.eventTemplate);
            var dateTemplate = kendo.template(this.options.dateTemplate);
            var timeTemplate = kendo.template(this.options.timeTemplate);
            var event, i;

            this.table.remove();

            this.table = $(kendo.format('<table class="k-scheduler-table">' +
                    "<colgroup><col/><col/><col/></colgroup>" +
                    "<thead><tr><th>{0}</th><th>{1}</th><th>{2}</th></tr></thead>" +
                    "</table>", "Date", "Time", "Event"));

            this.table.appendTo(this.element);

            var tasks = [];

            for (var idx = 0; idx < events.length; idx++) {
                event = events[idx];
                var start = event.start;
                var end = event.end;
                var duration = Math.ceil((end - start) / (1000 * 3600 * 24));

                var task = event.toJSON();

                task.uid = event.uid;

                tasks.push(task);

                if (duration > 1) {
                    task.end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);

                    for (i = 1; i < duration; i++) {
                        start = task.end;
                        task = event.toJSON();
                        task.uid = event.uid;
                        task.start = start;
                        task.end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
                        if (i == duration -1) {
                            task.end = new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate(), end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds());
                        } else {
                            task.isAllDay = true;
                        }
                        tasks.push(task);
                    }
                }
            }

            events = new kendo.data.Query(tasks).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            if (events.length > 0) {
                var date = getDate(events[0].start);

                var tr = [];

                for (i = 0; i < events.length; i++) {
                    event = events[i];

                    var eventDate = getDate(event.start);

                    if (eventDate.getTime() > date.getTime()) {
                        var html = kendo.format('<tr><td rowspan="{0}">{1}</td>{2}</tr>', tr.length, dateTemplate(events[i-1]), tr.join("</tr><tr>"));

                        this.table.append(html);

                        tr = [];
                        date = eventDate;
                    }

                    tr.push(kendo.format("<td>{0}</td><td>{1}</td>", timeTemplate(event), eventTemplate(event)));
                }
            }
        },
        destroy: function() {
            Widget.fn.destroy.call(this);
            this.table.remove();
        },
        dateForTitle: function() {
            return "foo";
        },
        options: {
            title: "Agenda",
            name: "agenda",
            eventTemplate: '<div title="#:title#" data-#=kendo.ns#uid="#=uid#">#:title#</div>',
            timeTemplate: "#if(data.isAllDay) {#" +
                            "all day" +
                          "#} else { #" +
                            '#=kendo.toString(start, "t")#-#=kendo.toString(end, "t")#' +
                          "# } #",
            dateTemplate: '<div>#=kendo.toString(start, "dd")#</div><div>#=kendo.toString(start,"dddd")#</div><div>#=kendo.toString(start, "y")#</div>'
        }
    });

})(window.kendo.jQuery);
