---
title: Overview
page_title: Overview | Window PHP Class
description: "Get started with the Window PHP class in Kendo UI."
slug: overview_window_uiforphp
position: 1
---

# Window PHP Class Overview

The Kendo UI Window for PHP is a server-side wrapper for the [Kendo UI Window](/api/javascript/ui/window) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Window for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Window](/api/php/Kendo/UI/Window).

###### Example

        <?php
        $window = new \Kendo\UI\Window('window');
        $window->title("About Alvar Aalto")
            ->draggable(true)
            ->width(600)
            ->resizable(true);
        ?>

**Step 3** Place the content between the `startContent` and `endContent` method calls.

###### Example

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

**Step 4** Output the Window by echoing the result of the `render` method.

###### Example

        <?php
        echo $window->render();
        ?>

### Asynchronous Loading of Contents

You are able to load views asynchronously through the `content` method, demonstrated in the example below.

###### Example

        <?php
        $window = new \Kendo\UI\Window('window');

        $window->content(array(
                "url" => "ajaxContent.html"
            ));

        echo $window->render();
        ?>

## Event Handling

You can subscribe to all Window [events](/api/javascript/ui/window#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $window = new \Kendo\UI\Window('window');

        // Provide inline JavaScript code that will handle the 'open' event of the window
        $window->open('function() { /* Handle the open event */ }');

        echo $window->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Window instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Window API](/api/javascript/ui/window#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Window:

* [Overview of the Kendo UI Window Widget]({% slug overview_kendoui_window_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
