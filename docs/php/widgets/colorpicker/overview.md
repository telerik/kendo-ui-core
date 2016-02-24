---
title: Overview
page_title: Overview | ColorPicker PHP Class
description: "Get started with the ColorPicker PHP class in Kendo UI."
slug: overview_colorpicker_uiforphp
position: 1
---

# ColorPicker PHP Class Overview

The Kendo UI ColorPicker for PHP is a server-side wrapper for the [Kendo UI ColorPicker](/api/javascript/ui/colorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPicker for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [ColorPicker](/api/php/Kendo/UI/ColorPicker).

###### Example

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');
    $colorpicker->value('#ff0000');
    ?>

**Step 3** Output the ColorPicker by echoing the result of the `render` method.

###### Example

    <?php
    echo $colorpicker->render();
    ?>

## Event Handling

You can subscribe to all ColorPicker [events](/api/javascript/ui/colorpicker#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

   <?php
   $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');

    // The 'colorpicker_change' JavaScript function will handle the 'change' event of the colorpicker
    $colorpicker->change('colorpicker_change');

    echo $colorpicker->render();
    ?>
    <script>
    function colorpicker_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');

    // Provide inline JavaScript code that will handle the 'change' event of the colorpicker
    $colorpicker->change('function() { /* Handle the change event */ }');

    echo $colorpicker->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing ColorPicker instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ColorPicker API](/api/javascript/ui/colorpicker#methods) to control its behavior.

###### Example

    <?php
    $colorpicker = new \Kendo\UI\ColorPicker('colorpicker');
    echo $colorpicker->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the colorpicker
        var colorpicker = $("#colorpicker").data("kendoColorPicker")
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the ColorPicker:

* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
