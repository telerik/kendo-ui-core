---
title: Overview
page_title: Overview | DateInput PHP Class
description: "Get started with the DateInput PHP class in Kendo UI."
slug: overview_dateinput_uiforphp
position: 1
---

# DateInput PHP Class Overview

The Kendo UI DateInput for PHP is a server-side wrapper for the [Kendo UI DateInput](/api/javascript/ui/dateinput) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateInput for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [DateInput](/api/javascript/ui/dateinput).

###### Example

        <?php
        $dateinput = new \Kendo\UI\DateInput('dateinput');
        $dateinput->value(new DateTime('today', new DateTimeZone('UTC')));
        ?>

**Step 3** Output the DateInput by echoing the result of the `render` method.

###### Example

        <?php
        echo $dateinput->render();
        ?>

## Event Handling

You can subscribe to all DateInput [events](/api/javascript/ui/dateinput#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $dateinput = new \Kendo\UI\DateInput('dateinput');

        // The 'dateinput_change' JavaScript function will handle the 'change' event of the dateinput
        $dateinput->change('dateinput_change');

        echo $dateinput->render();
        ?>
        <script>
        function dateinput_change() {
            // Handle the change event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $dateinput = new \Kendo\UI\DateInput('dateinput');

        // Provide inline JavaScript code that will handle the 'change' event of the dateinput
        $dateinput->change('function() { /* Handle the change event */ }');

        echo $dateinput->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing DateInput instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DateInput API](/api/javascript/ui/dateinput#methods) to control its behavior.

###### Example

        <?php
        $dateinput = new \Kendo\UI\DateInput('dateinput');
        echo $dateinput->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the dateinput
            var dateinput = $("#dateinput").data("kendoDateInput")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the DateInput:

* [Overview of the Kendo UI DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [Overview of the Kendo UI DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
