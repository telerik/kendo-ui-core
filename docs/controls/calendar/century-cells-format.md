---
title: Calendar Century Cells Format
page_title: jQuery Calendar Documentation - Calendar Century Cells Format
description: "Learn the possible formats for the century cells in the Kendo for jQuery Calendar."
slug: century_cells_format_calendar
position: 9
---

# Century Cells Format

As of R2 2024 version of the Kendo UI suite, the Calendar component on option to choose from two formats for the century cells in the Calendar century view. The default value of the [`centuryCellsFormat`](/api/javascript/ui/calendar/configuration/centurycellsformat) configuration is `long` which causes the cells to render like "2010-2019". The below example shows how you can change the format to display only the starting year of the decade.

```dojo
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            centuryCellsFormat: "short",
            start: "century"
        });
    </script>
```
 

## See Also

* [Century Cells Format Demo of the Calendar](https://demos.telerik.com/kendo-ui/calendar/century-cells-format)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
