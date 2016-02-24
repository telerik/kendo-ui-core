---
title: Overview
page_title: Overview | Tooltip PHP Class
description: "Get started with the Tooltip PHP class in Kendo UI."
slug: overview_tooltip_uiforphp
position: 1
---

# Tooltip PHP Class Overview

The Kendo UI Tooltip for PHP is a server-side wrapper for the [Kendo UI Tooltip](/api/javascript/ui/tooltip) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Tooltip for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Tooltip](/api/php/Kendo/UI/Tooltip), set its container, and add a filter to target all child anchor elements with a title attribute for which the Tooltip will be shown.

###### Example

        <?php
        $tooltip = new \Kendo\UI\Tooltip('#container');
        $tooltip->filter("a[title]");
        ?>

**Step 3** Output the Tooltip by echoing the result of the `render` method.

###### Example

        <?php
        echo $tooltip->render();
        ?>

## Event Handling

You can subscribe to all Tooltip [events](/api/javascript/ui/tooltip#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $tooltip = new \Kendo\UI\Tooltip('#container');

    // Provide inline JavaScript code that will handle the 'show' event of the tooltip
    $tooltip->show('function() { /* Handle the show event */ }');

    echo $tooltip->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Tooltip instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Tooltip API](/api/javascript/ui/tooltip#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Tooltip:

* [Overview of the Kendo UI Tooltip Widget]({% slug overview_kendoui_tooltip_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
