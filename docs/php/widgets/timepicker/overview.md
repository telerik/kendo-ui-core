---
title: Overview
page_title: Overview | TimePicker PHP Class
description: "Get started with the TimePicker PHP class in Kendo UI."
slug: overview_timepicker_uiforphp
position: 1
---

# TimePicker PHP Class Overview

The Kendo UI TimePicker for PHP is a server-side wrapper for the [Kendo UI TimePicker](/api/javascript/ui/timepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TimePicker for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TimePicker](/api/php/Kendo/UI/TimePicker).

###### Example

        <?php
        $timePicker = new \Kendo\UI\TimePicker('timepicker');

        $timePicker->value('10:00 AM');
        ?>

**Step 3** Output the TimePicker by echoing the result of the `render` method.

###### Example

        <?php
        echo $timePicker->render();
        ?>

## Event Handling

You can subscribe to all TimePicker [events](/api/javascript/ui/tabstrip#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $timepicker = new \Kendo\UI\TimePicker('timepicker');

        // The 'timepicker_change' JavaScript function will handle the 'change' event of the timepicker
        $timepicker->change('timepicker_change');

        echo $timepicker->render();
        ?>
        <script>
        function timepicker_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $timepicker = new \Kendo\UI\TimePicker('timepicker');

        // Provide inline JavaScript code that will handle the 'change' event of the timepicker
        $timepicker->change('function() { /* Handle the change event */ }');

        echo $timepicker->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing TimePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TimePicker API](/api/javascript/ui/timepicker#methods) to control its behavior.

###### Example

        <?php
        $timepicker = new \Kendo\UI\TimePicker('timepicker');
        echo $timepicker->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the treeview
            var timepicker = $("#timepicker").data("kendoTimePicker");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the TimePicker:

* [Overview of the Kendo UI TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
