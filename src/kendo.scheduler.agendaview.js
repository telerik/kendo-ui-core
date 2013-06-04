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

        renderEvents: function(events) {
            var eventTemplate = kendo.template(this.options.eventTemplate);
            var dateTemplate = kendo.template(this.options.dateTemplate);
            var timeTemplate = kendo.template(this.options.timeTemplate);
            var event, i;

            var table = this.content.find("table").empty();

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
                            task.allDay = true;
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

                    if (eventDate.getTime() > date.getTime() || i == events.length - 1) {
                        var html = kendo.format('<tr><td class="k-scheduler-datecolumn" rowspan="{0}">{1}</td>{2}</tr>', tr.length, dateTemplate(events[i-1]), tr.join("</tr><tr>"));

                        table.append(html);

                        tr = [];

                        date = eventDate;
                    }

                    tr.push(kendo.format('<td class="k-scheduler-timecolumn">{0}</td><td>{1}</td>', timeTemplate(event), eventTemplate(event)));
                }
            }

            this.refreshLayout();
        },
        options: {
            title: "Agenda",
            name: "agenda",
            selectedDateFormat: "{0:D}",
            eventTemplate: '<div title="#:title#" data-#=kendo.ns#uid="#=uid#">#:title#</div>',
            timeTemplate: "#if(data.allDay) {#" +
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
