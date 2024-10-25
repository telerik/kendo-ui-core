---
title: Calendar Century Cells Format
page_title: jQuery Calendar Documentation - Calendar Century Cells Format
description: "Learn the possible formats for the century cells in the Kendo UI for jQuery Calendar."
slug: century_cells_format_calendar
position: 9
---

# Century Cells Format

Starting with Kendo UI suite R2 2024, the Calendar component provides two formats for the decades listed in the century view:

* `long` (default)&mdash;Shows decades in the `YYYY-YYYY` format (for example: `2010-2019`).
* `short`&mdash;Shows only the starting year of the decade (for example: `2010`).

To change the way decades display in the Calendar century view, you can use [`centuryCellsFormat`](/api/javascript/ui/calendar/configuration/centurycellsformat).

The following example shows how to change the display format for decades in the Century view.

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
