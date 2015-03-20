---
title: Overview
page_title: How to use the DatePicker PHP class, server-side wrapper for Kendo UI DatePicker widget
description: Getting started with Kendo UI DatePicker for PHP in quick steps - configure Kendo UI DatePicker widget and operate Kendo UI DatePicker events.
---

# DatePicker

The Kendo DatePicker for PHP is a server-side wrapper for the [Kendo UI DatePicker](/api/web/datepicker) widget.

## Getting Started

Here is how to configure a simple Kendo DatePicker:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [datepicker](/api/wrappers/php/Kendo/UI/DatePicker).

        <?php
        $datepicker = new \Kendo\UI\DatePicker('datepicker');
        $datepicker->min(new DateTime('1900-01-01'))
                   ->max(new DateTime('2099-12-31'))
                   ->value(new DateTime('today', new DateTimeZone('UTC')));
        ?>

3. Output the datepicker by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $datepicker->render();
        ?>


## Getting Client-side Reference

You can reference the client-side Kendo DatePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/datepicker#methods) to control its behavior.


### Example

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

## Handling Events

You can subscribe to all datepicker [events](/api/web/datepicker#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $datepicker = new \Kendo\UI\DatePicker('datepicker');

    // Provide inline JavaScript code that will handle the 'change' event of the datepicker
    $datepicker->change('function() { /* Handle the change event */ }');

    echo $datepicker->render();
    ?>
