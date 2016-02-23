---
title: Overview
page_title: Overview | DatePicker PHP Class
description: "Get started with the DatePicker PHP class in Kendo UI."
slug: overview_datepicker_uiforphp
position: 1
---

# DatePicker PHP Class Overview

The Kendo UI DatePicker for PHP is a server-side wrapper for the [Kendo UI DatePicker](/api/javascript/ui/datepicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DatePicker for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [DatePicker](/api/javascript/ui/datepicker).

###### Example

        <?php
        $datepicker = new \Kendo\UI\DatePicker('datepicker');
        $datepicker->min(new DateTime('1900-01-01'))
                   ->max(new DateTime('2099-12-31'))
                   ->value(new DateTime('today', new DateTimeZone('UTC')));
        ?>

**Step 3** Output the DatePicker by echoing the result of the `render` method.

###### Example

        <?php
        echo $datepicker->render();
        ?>

## Event Handling

You can subscribe to all DatePicker [events](/api/javascript/ui/datepicker#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $datepicker = new \Kendo\UI\DatePicker('datepicker');

        // The 'datepicker_change' JavaScript function will handle the 'change' event of the datepicker
        $datepicker->change('datepicker_change');

        echo $datepicker->render();
        ?>
        <script>
        function datepicker_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $datepicker = new \Kendo\UI\DatePicker('datepicker');

        // Provide inline JavaScript code that will handle the 'change' event of the datepicker
        $datepicker->change('function() { /* Handle the change event */ }');

        echo $datepicker->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing DatePicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DatePicker API](/api/javascript/ui/datepicker#methods) to control its behavior.

###### Example

        <?php
        $datepicker = new \Kendo\UI\DatePicker('datepicker');
        echo $datepicker->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the datepicker
            var datepicker = $("#datepicker").data("kendoDatePicker")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the DatePicker:

* [Overview of the Kendo UI DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
