---
title: MultiViewCalendar Century Cells Format
page_title: jQuery MultiViewCalendar Documentation - MultiViewCalendar Century Cells Format
description: "Learn the possible formats for the century cells in the Kendo for jQuery MultiViewCalendar."
slug: century_cells_format_multiviewcalendar
position: 8
---

# Century Cells Format

As of R2 2024 version of the Kendo UI suite, the MultiViewCalendar component exposes an option to choose from two formats for the century cells in the century view. The default value of the [`centuryCellsFormat`](/api/javascript/ui/multiviewcalendar/configuration/centurycellsformat) configuration is `long` which causes the cells to render like "2010-2019". The below example shows how you can change the format to display only the starting year of the decade.

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
