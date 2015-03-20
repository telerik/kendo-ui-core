---
title: Overview
page_title: How to use the NumericTextBox PHP class, server-side wrapper for Kendo UI NumericTextBox widget
description: Getting started with Kendo UI NumericTextBox for PHP in quick steps - configure Kendo UI NumericTextBox widget and operate Kendo UI NumericTextBox events.
---

# NumericTextBox

The Kendo NumericTextBox for PHP is a server-side wrapper for the [Kendo UI NumericTextBox](/api/web/numerictextbox) widget.

## Getting Started

Here is how to configure a simple Kendo NumericTextBox:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

2. Create a [numerictextbox](/api/wrappers/php/Kendo/UI/NumericTextBox).

        <?php
        $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');
        $numerictextbox->min(-100)
                       ->max(100)
                       ->value(10));
        ?>

3. Output the numerictextbox by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $numerictextbox->render();
        ?>


## Getting Client-side Reference

You can reference the client-side Kendo NumericTextBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/numerictextbox#methods) to control its behavior.


### Example

    <?php
    $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');
    echo $numerictextbox->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the numerictextbox
        var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox")
    });
    </script>

## Handling Events

You can subscribe to all numerictextbox [events](/api/web/numerictextbox#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');

    // The 'numerictextbox_change' JavaScript function will handle the 'change' event of the numerictextbox
    $numerictextbox->change('numerictextbox_change');

    echo $numerictextbox->render();
    ?>
    <script>
    function numerictextbox_change() {
        // Handle the change event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $numerictextbox = new \Kendo\UI\NumericTextBox('numerictextbox');

    // Provide inline JavaScript code that will handle the 'change' event of the numerictextbox
    $numerictextbox->change('function() { /* Handle the change event */ }');

    echo $numerictextbox->render();
    ?>
