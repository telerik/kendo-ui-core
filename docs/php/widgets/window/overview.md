---
title: Overview
page_title: How to use the Window PHP class, server-side wrapper for Kendo UI Window widget
description: Learn how to create Kendo UI Window for PHP, handle Kendo UI Window Events, access an existing window.
---

# Window

The Kendo Window for PHP is a server-side wrapper for the [Kendo UI Window](/api/web/window) widget.

## Getting Started

Here is how to configure a simple Kendo Window:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [window](/api/wrappers/php/Kendo/UI/Window)

        <?php
        $window = new \Kendo\UI\Window('window');
        $window->title("About Alvar Aalto")
            ->draggable(true)
            ->width(600)
            ->resizable(true);
        ?>

3. Place the content between startContent and endContent method calls

        <?php
        $window = new \Kendo\UI\Window('window');
        $window->title("About Alvar Aalto")
            ->draggable(true)
            ->width(600)
            ->resizable(true)
            ->startContent();
        ?>

            Static content of the Window

        <?php
            $window->endContent();
        ?>

4. Output the window by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $window->render();
        ?>

### Loading the window contents through an asynchronous call

You can load views asynchronously through the `content` method:

        <?php
        $window = new \Kendo\UI\Window('window');

        $window->content(array(
                "url" => "ajaxContent.html"
            ));

        echo $window->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo Window instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/window#methods) to control its behavior.

### Example

    <?php
    $window = new \Kendo\UI\Window('window');
    echo $window->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the window
        var window = $("#window").data("kendoWindow");
    });
    </script>

## Handling Events

You can subscribe to all window [events](/api/web/window#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $window = new \Kendo\UI\Window('window');

    // The 'window_open' JavaScript function will handle the 'open' event of the window
    $window->open('window_open');

    echo $window->render();
    ?>
    <script>
    function window_open() {
        // Handle the open event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $window = new \Kendo\UI\Window('window');

    // Provide inline JavaScript code that will handle the 'open' event of the window
    $window->open('function() { /* Handle the open event */ }');

    echo $window->render();
    ?>
