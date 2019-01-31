---
title: Overview
page_title: Overview | Kendo UI MultiViewCalendar
description: "Learn how to initialize the Kendo UI MultiViewCalendar widget, configure its options, and make use of custom templates."
slug: overview_kendoui_multiviewcalendar_widget
position: 1
---

# MultiViewCalendar Overview

The [Kendo UI MultiViewCalendar widget](http://demos.telerik.com/kendo-ui/multiviewcalendar/index) renders a graphical Gregorian calendar with multiple horizontal views.

It supports the selection and navigation between dates as well as data templates and ranges for scheduling appointments.

## Getting Started

### Initialize the MultiViewCalendar

To initialize the MultiViewCalendar, use a jQuery selector.

###### Example

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
* [Keyboard navigation]({% slug keyboard_navigation_multiviewcalendar %})

## Events

The following example demonstrates basic MultiViewCalendar events.

###### Example

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            change: function() {
                var value = this.value();
                console.log(value); //value is the selected date in the multiViewCalendar
            },
            navigate: function() {
                var view = this.view();
                console.log(view.name); //name of the current view

                var current = this.current();
                console.log(current); //currently focused date
            }
        });
    </script>
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)
