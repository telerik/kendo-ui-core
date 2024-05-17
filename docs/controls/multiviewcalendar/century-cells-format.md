---
title: MultiViewCalendar Century Cells Format
page_title: jQuery MultiViewCalendar Documentation - MultiViewCalendar Century Cells Format
description: "Learn the possible formats for the century cells in the Kendo UI for jQuery MultiViewCalendar."
slug: century_cells_format_multiviewcalendar
position: 8
---

# Century Cells Format

Starting with Kendo UI suite R2 2024, the MultiViewCalendar component provides two formats for the decades listed in the century view:

* `long` (default)&mdash;Shows decades in the `YYYY-YYYY` format (for example: `2010-2019`).
* `short`&mdash;Shows only the starting year of the decade (for example: `2010`).

To change the way decades display in the MultiViewCalendar century view, you can use [`centuryCellsFormat`](/api/javascript/ui/multiviewcalendar/configuration/centurycellsformat).

The following example shows how to change the display format for decades in the Century view.

```dojo
    <div id='multiviewcalendar'></div>
    <script>
        $("#multiviewcalendar").kendoMultiViewCalendar({
            centuryCellsFormat: "short",
            start: "century"
        });
    </script>
```
 

## See Also

* [Century Cells Format Demo of the MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/century-cells-format)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
