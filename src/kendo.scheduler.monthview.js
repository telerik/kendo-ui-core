kendo_module({
    id: "scheduler.monthview",
    name: "Scheduler Month View",
    category: "web",
    description: "The Scheduler Month View",
    depends: [ "core", "scheduler.view" ]
});

(function($){
    var kendo = window.kendo,
        ui = kendo.ui,
        DAY_TEMPLATE = kendo.template('#=kendo.toString(data, "dd")#');

    ui.MonthView = ui.SchedulerView.extend({
        init: function(element, options) {
            ui.SchedulerView.fn.init.call(this, element, options);

            this.title = this.name = this.options.title;
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate);
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate);
        },

        setDate: function(date) {
            this.startDate = kendo.date.firstDayOfMonth(date);
            this.endDate = kendo.date.lastDayOfMonth(date);

            this.prepareLayout(this._layout());

            this.table.addClass("k-scheduler-monthview");

            this._content();

            this.refreshLayout();
        },

        _content: function() {
            var start =  firstVisibleMonthDay(this.startDate),
                min = this.startDate,
                max = this.endDate,
                idx = 0,
                length = 42,
                cellsPerRow = 7,
                content = this.options.dayTemplate,
                classes = "",
                html = '<tbody><tr>';

            for(; idx < length; idx++) {
                if (idx > 0 && idx % cellsPerRow === 0) {
                    html += '</tr><tr>';
                }

                classes = "";

                if (kendo.date.isToday(start)) {
                    classes += "k-today";
                }

                if (!kendo.date.isInDateRange(start, min, max)) {
                    classes += "k-other-month";
                }

                html += "<td ";

                if (classes !== "") {
                    html += 'class="' + classes + '"';
                }

                html += ">";
                html += content(start);
                html += "</td>";

                start = kendo.date.nextDay(start);
            }

            html + "</tr></tbody>";

            this.content.find("table").html(html);
        },

        _layout: function() {
            return {
                columns: $.map(getCalendarInfo().days.names, function(value) { return { text: value } })
            };
        },

        render: function(events) {

        },

        destroy: function(){
            if (this.table) {
                this.table.removeClass("k-scheduler-monthview");
            }

            kendo.ui.SchedulerView.fn.destroy.call(this);
        },

        options: {
            title: "Month",
            name: "month",
            selectedDateFormat: "{0:y}",
            dayTemplate: DAY_TEMPLATE
        }
    });

    function getCalendarInfo() {
        return kendo.culture().calendars.standard;
    }

    function firstVisibleMonthDay(date) {
        calendarInfo = getCalendarInfo();

        var firstDay = calendarInfo.firstDay,
            firstVisibleDay = new Date(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

        while (firstVisibleDay.getDay() != firstDay) {
            kendo.date.setTime(firstVisibleDay, -1 * kendo.date.MS_PER_DAY);
        }

        return firstVisibleDay;
    }

})(window.kendo.jQuery);
