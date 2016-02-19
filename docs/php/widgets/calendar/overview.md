---
title: Overview
page_title: Overview | Calendar PHP Class
description: "Get started with the Calendar PHP class in Kendo UI."
slug: overview_calendar_uiforphp
position: 1
---

# Calendar PHP Class Overview

The Kendo UI Calendar for PHP is a server-side wrapper for the [Kendo UI Calendar](/api/javascript/ui/calendar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Calendar for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Calendar](/api/php/Kendo/UI/Calendar), configure its [`min`](/api/php/Kendo/UI/Calendar#min), [`max`](/api/php/Kendo/UI/Calendar#max), and [`value`](/api/php/Kendo/UI/Calendar#value) options.

###### Example

    <?php
    $calendar = new \Kendo\UI\Calendar('calendar');
    $calendar->min(new DateTime('1900-01-01'))
             ->max(new DateTime('2099-12-31'))
             ->value(new DateTime('today', new DateTimeZone('UTC')));
    ?>

## Event Handling

You can subscribe to all Calendar [events](/api/javascript/ui/calendar#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $calendar = new \Kendo\UI\Calendar('calendar');

    // The 'calendar_change' JavaScript function will handle the 'change' event of the calendar
    $calendar->change('calendar_change');

    echo $calendar->render();
    ?>
    <script>
    function calendar_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $calendar = new \Kendo\UI\Calendar('calendar');

    // Provide inline JavaScript code that will handle the 'change' event of the calendar
    $calendar->change('function() { /* Handle the change event */ }');

    echo $calendar->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Calendar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Calendar API](/api/javascript/ui/calendar#methods) to control its behavior.

###### Example

    <?php
    $calendar = new \Kendo\UI\Calendar('calendar');
    echo $calendar->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the calendar
        var calendar = $("#calendar").data("kendoCalendar")
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the Calendar:

* [Overview of the Kendo UI Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
