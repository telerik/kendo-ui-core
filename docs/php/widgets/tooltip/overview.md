---
title: Overview
page_title: How to use the Tooltip PHP class, server-side wrapper for Kendo UI Tooltip widget
description: Learn how to create Kendo UI Tooltip for PHP, handle Kendo UI Tooltip Events, access an existing tooltip.
---

# Tooltip

The Kendo Tooltip for PHP is a server-side wrapper for the [Kendo UI Tooltip](/api/web/tooltip) widget.

## Getting Started

Here is how to configure a simple Kendo Tooltip:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [tooltip](/api/wrappers/php/Kendo/UI/Tooltip), set its container and add filter to target all child anchor elements with title attribute for which the tooltip will be shown

        <?php
        $tooltip = new \Kendo\UI\Tooltip('#container');
        $tooltip->filter("a[title]");
        ?>
3. Output the tooltip by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $tooltip->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo Tooltip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tooltip#methods) to control its behavior.

### Example

    <?php
    $tooltip = new \Kendo\UI\Tooltip('#container');
    echo $tooltip->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as a selector for getting tooltip's container
        var tooltip = $("#container").data("kendoTooltip");
    });
    </script>

## Handling Events

You can subscribe to all tooltip [events](/api/web/tooltip#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $tooltip = new \Kendo\UI\Tooltip('#container');

    // The 'tooltip_show' JavaScript function will handle the 'show' event of the tooltip
    $tooltip->show('tooltip_show');

    echo $tooltip->render();
    ?>
    <script>
    function tooltip_show() {
        // Handle the show event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $tooltip = new \Kendo\UI\Tooltip('#container');

    // Provide inline JavaScript code that will handle the 'show' event of the tooltip
    $tooltip->show('function() { /* Handle the show event */ }');

    echo $tooltip->render();
    ?>
