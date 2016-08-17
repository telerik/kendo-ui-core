---
title: Overview
page_title: Overview | Sparkline PHP Class
description: "Get started with the Sparkline PHP class in Kendo UI."
slug: overview_sparkline_uiforphp
position: 1
---

# Sparkline PHP Class Overview

The Kendo UI Sparkline for PHP is a server-side wrapper for the [Kendo UI Sparkline](/api/javascript/dataviz/ui/sparkline) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Sparkline for PHP:

* [Locally]({% slug localbinding_chart_uiforphp %})&mdash;Local binding binds the Sparkline to a PHP array.
* [Remotely]({% slug remotebinding_chart_uiforphp %})&mdash;During remote binding the Sparkline makes AJAX requests and is bound to the JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Sparkline for local binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create an array to which the Sparkline will be bound.

###### Example

        <?php
        $data = array(1, 3, 5, 4, 2);
        ?>

**Step 3** Create a [Sparkline](/api/php/Kendo/Dataviz/UI/Sparkline), configure its [`data`](/api/php/Kendo/Dataviz/UI/Sparkline#data).

###### Example

        <?php
        $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');
        $sparkline->data($data);
        ?>

**Step 4** Output the Sparkline by echoing the result of the `render` method.

###### Example

        <?php
        echo $sparkline->render();
        ?>

## Event Handling

You can subscribe to all Sparkline [events](/api/javascript/dataviz/ui/sparkline).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $sparkline = new \Kendo\Dataviz\UI\Sparkline('sparkline');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the sparkline
        $sparkline->dataBound('function() { /* Handle the dataBound event */ }');

        echo $sparkline->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI Sparkline instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Sparkline API](/api/javascript/dataviz/ui/sparkline#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Sparkline:

* [Local Binding of the Sparkline PHP Class]({% slug localbinding_sparkline_uiforphp %})
* [Remote Binding of the Sparkline PHP Class]({% slug remotebinding_sparkline_uiforphp %})
* [Overview of the Kendo UI Sparkline Widget]({% slug overview_kendoui_sparklinescharts %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
