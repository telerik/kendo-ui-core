---
title: Overview
page_title: Overview | DateTimePicker PHP Class
description: "Get started with the DateTimePicker PHP class in Kendo UI."
slug: overview_datetimepicker_uiforphp
position: 1
---

# DateTimePicker PHP Class Overview

The Kendo UI DateTimePicker for PHP is a server-side wrapper for the [Kendo UI DateTimePicker](/api/javascript/ui/datetimepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateTimePicker for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [DateTimePicker](/api/javascript/ui/datetimepicker).

###### Example

        <?php
        $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');
        $datetimepicker->min(new DateTime('1900-01-01'))
                       ->max(new DateTime('2099-12-31'))
                       ->value(new DateTime('today', new DateTimeZone('UTC')));
        ?>

## Event Handling

You can subscribe to all DateTimePicker [events](/api/javascript/ui/datetimepicker#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');

        // The 'datetimepicker_change' JavaScript function will handle the 'change' event of the datetimepicker
        $datetimepicker->change('datetimepicker_change');

        echo $datetimepicker->render();
        ?>
        <script>
        function datetimepicker_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');

        // Provide inline JavaScript code that will handle the 'change' event of the datetimepicker
        $datetimepicker->change('function() { /* Handle the change event */ }');

        echo $datetimepicker->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing DateTimePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DateTimePicker API](/api/javascript/ui/datetimepicker#methods) to control its behavior.

###### Example

        <?php
        $datetimepicker = new \Kendo\UI\DateTimePicker('datetimepicker');
        echo $datetimepicker->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the datetimepicker
            var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the DateTimePicker:

* [Overview of the Kendo UI DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
