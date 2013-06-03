kendo_module({
    id: "scheduler.view",
    name: "Scheduler View",
    category: "web",
    description: "The Scheduler Common View",
    depends: [ "core" ]
});

(function($) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var Widget = ui.Widget;

    function levels(values, key) {
        var result = [];

        function collect(depth, values) {
            values = values[key];

            if (values) {
                var level = result[depth] = result[depth] || [];

                for (var idx = 0; idx < values.length; idx++) {
                    level.push(values[idx]);
                    collect(depth + 1, values[idx]);
                }
            }
        }

        collect(0, values);

        return result;
    }

    function table(tableRows, className) {
        if (!tableRows.length) {
            return "";
        }

        return '<table class="k-scheduler-table ' + (className || "") + '">' +
               '<tr>' +
                    tableRows.join("</tr><tr>") +
               '</tr>' +
               '</table>';
    }

    function timesHeader(columnLevelCount, allDaySlot) {
        var tableRows = [];

        for (var idx = 0; idx < columnLevelCount; idx++) {
            tableRows.push("<th></th>");
        }

        if (allDaySlot) {
            tableRows.push("<th>" + allDaySlot.text + "</th>");
        }

        return $('<div class="k-scheduler-times">' + table(tableRows) + '</div>');
    }

    function datesHeader(columnLevels, columnCount, allDaySlot) {
        var dateTableRows = [];
        var columnIndex;

        for (var columnLevelIndex = 0; columnLevelIndex < columnLevels.length; columnLevelIndex++) {
            var level = columnLevels[columnLevelIndex];
            var th = [];
            var colspan = columnCount / level.length;

            for (columnIndex = 0; columnIndex < level.length; columnIndex ++) {
                th.push('<th colspan="' + colspan + '" class="' + (level[columnIndex].className || "")  + '">' + level[columnIndex].text + "</th>");
            }

            dateTableRows.push(th.join(""));
        }

        var allDayTableRows = [];

        if (allDaySlot) {
            var lastLevel = columnLevels[columnLevels.length - 1];
            var td = [];

            for (columnIndex = 0; columnIndex < lastLevel.length; columnIndex++) {
                td.push('<td class="' + (lastLevel[columnIndex].className || "")  + '">&nbsp;</th>');
            }

            allDayTableRows.push(td.join(""));
        }

        return $(
            '<div class="k-scheduler-header k-state-default">' +
                '<div class="k-scheduler-header-wrap">' +
                    table(dateTableRows) +
                    table(allDayTableRows, "k-scheduler-header-all-day") +
                '</div>' +
            '</div>'
        );
    }

    function times(rowLevels, rowCount) {
        var rows = new Array(rowCount).join().split(",");
        var rowHeaderRows = [];
        var rowIndex;

        for (var rowLevelIndex = 0; rowLevelIndex < rowLevels.length; rowLevelIndex++) {
            var level = rowLevels[rowLevelIndex];
            var rowspan = rowCount / level.length;

            for (rowIndex = 0; rowIndex < level.length; rowIndex++) {
                rows[rowspan * rowIndex] += '<th rowspan="' + rowspan + '">' + level[rowIndex].text + "</th>";
            }
        }

        for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            rowHeaderRows.push(rows[rowIndex]);
        }

        return $('<div class="k-scheduler-times">' + table(rowHeaderRows) + '</div>');
    }

    function content(columnLevel, rowLevel) {
        var rows = [];

        for (var rowIndex = 0; rowIndex < rowLevel.length; rowIndex++) {
            if (rowLevel[rowIndex].skip) {
                continue;
            }
            var row = ['<tr class="' + (rowLevel[rowIndex].className || "") + '">'];

            for (var columnIndex = 0; columnIndex < columnLevel.length; columnIndex++) {
                row.push('<td class="' + (columnLevel[columnIndex].className || "")  + '">&nbsp;</th>');
            }

            row.push("</tr>");

            rows.push(row.join(""));
        }

        return $(
            '<div class="k-scheduler-content">' +
                '<table class="k-scheduler-table">' +
                   rows.join("") +
                '</table>' +
            '</div>'
        );
    }

    kendo.ui.SchedulerView = Widget.extend({
        prepareLayout: function(layout) {
            var allDayIndex = -1;

            for (var idx = 0; idx < layout.rows.length; idx++) {
                if (layout.rows[idx].allDay) {
                    allDayIndex = idx;
                    break;
                }
            }

            var allDaySlot = layout.rows[allDayIndex];

            if (allDayIndex >= 0) {
                layout.rows.splice(allDayIndex, 1);
            }

            var columnLevels = levels(layout, "columns");

            this.timesHeader = timesHeader(columnLevels.length, allDaySlot);

            var columnCount = columnLevels[columnLevels.length - 1].length;

            this.datesHeader = datesHeader(columnLevels, columnCount, allDaySlot);

            var rowLevels = levels(layout, "rows");

            var rowCount = rowLevels[rowLevels.length - 1].length;

            this.times = times(rowLevels, rowCount);

            this.content = content(columnLevels[columnLevels.length - 1], rowLevels[rowLevels.length - 1]);

            this.element.append(this.timesHeader).append(this.datesHeader).append(this.times).append(this.content);
        }
    });

})(window.kendo.jQuery);
