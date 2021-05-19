---
title: Overview
page_title: jQuery Calendar Documentation | Calendar Overview
description: "Get started with the jQuery Calendar by Kendo UI and learn how to initialize the widget and use its events."
slug: overview_kendoui_calendar_widget
position: 1
---

# Calendar Overview

The Calendar renders a graphical calendar that provides navigation and selection functionalities.

It also supports custom templates for its `month` view and configuration options for minimum and maximum dates, a start view, and the depth of the navigation. The first day of the week depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

* [Demo page for the Calendar](https://demos.telerik.com/kendo-ui/calendar/index)

## Initializing the Calendar

To initialize the Calendar, use a jQuery selector.

    <div id="calendar"></div>

    <script>
        $(document).ready(function(){
            $("#calendar").kendoCalendar();
        });
    </script>

## Functionality and Features

* [Selected dates]({% slug selecteddates_kendoui_calendar %})
* [Disabled dates]({% slug disableddates_kendoui_calendar %})
* [Start date and navigation depth]({% slug navdepth_kendoui_calendar %})
* [Day template]({% slug daytemplate_kendoui_calendar %})
* [Week numbers]({% slug weeknum_kendoui_calendar %})
* [Selection]({% slug selection_kendoui_calendar %})
* [Accessibility]({% slug accessibility_calendar %})

## See Also

* [Basic Usage of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/index)
* [Using the API of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/api)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
