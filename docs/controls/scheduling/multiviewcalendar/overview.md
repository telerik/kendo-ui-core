---
title: Overview
page_title: jQuery MultiViewCalendar Documentation | MultiViewCalendar Overview
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and learn how to initialize the widget and use its events."
slug: overview_kendoui_multiviewcalendar_widget
position: 1
---

# MultiViewCalendar Overview

The MultiViewCalendar renders a graphical Gregorian calendar with multiple horizontal views.

It supports the selection and navigation between dates as well as data templates and ranges for scheduling appointments.

* [Demo page for the MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/index)

## Initializing the MultiViewCalendar

To initialize the MultiViewCalendar, use a jQuery selector.

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();
    </script>
```

## Functionality and Features

* [Active view]({% slug active_view_multiviewcalendar %})
* [Multiple views]({% slug multiple_views_multiviewcalendar %})
* [Selection]({% slug selection_multiviewcalendar %})
* [Day template]({% slug day_template_multiviewcalendar %})
* [Disabled dates]({% slug disabled_dates_multiviewcalendar %})
* [Week column]({% slug week_column_multiviewcalendar %})
* [Accessibility]({% slug accessibility_muliviewcalendar %})

## Events

The following example demonstrates basic MultiViewCalendar events.

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            change: function() {
                var value = this.value();
                console.log(value); // The value is the selected date in the MultiViewCalendar.
            },
            navigate: function() {
                var view = this.view();
                console.log(view.name); // The name of the current view.

                var current = this.current();
                console.log(current); // The currently focused date.
            }
        });
    </script>
```

## See Also

* [Basic Usage of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/index)
* [Using the API of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/api)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
