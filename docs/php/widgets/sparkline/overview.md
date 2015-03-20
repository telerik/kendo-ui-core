---
title: Overview
page_title: How to use the Sparkline PHP class, server-side wrapper for Kendo UI Sparkline widget
description: Learn how to bind Kendo UI Sparkline for PHP, handle Kendo UI Sparkline Events, access an existing sparkline.
---

# Sparkline

The Kendo Sparkline for PHP is a server-side wrapper for the [Kendo UI Sparkline](/api/dataviz/sparkline) widget.

## Getting Started

There are two main ways to bind Kendo Sparkline for PHP:

* [local](/php/widgets/sparkline/local-binding) - the sparkline is bound to PHP array
* [remote](/php/widgets/sparkline/remote-binding) - the sparkline makes AJAX requests and is bound to JSON result

Here is how to configure the sparkline for local binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an array which to which the sparkline will be bound to

        <?php
        $data = array(1, 3, 5, 4, 2);
        ?>
4. Create a [sparkline](/api/wrappers/php/Kendo/Dataviz/UI/Sparkline), configure its [data](/api/wrappers/php/Kendo/Dataviz/UI/Sparkline#data).

        <?php
        $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');
        $sparkline->data($data);
        ?>
5. Output the sparkline by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $sparkline->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Sparkline instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/sparkline#methods) to control its behavior.


### Example

    <?php
    $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');
    echo $sparkline->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the sparkline
        var sparkline = $("#sparkline").data("kendoSparkline")
    });
    </script>

## Handling Events

You can subscribe to all Sparkline [events](/api/dataviz/sparkline#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');

    // The 'sparkline_dataBound' JavaScript function will handle the 'dataBound' event of the sparkline
    $sparkline->dataBound('sparkline_dataBound');

    echo $sparkline->render();
    ?>
    <script>
    function sparkline_dataBound() {
        // Handle the dataBound event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the sparkline
    $sparkline->dataBound('function() { /* Handle the dataBound event */ }');

    echo $sparkline->render();
    ?>
