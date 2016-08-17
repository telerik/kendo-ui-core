---
title: Overview
page_title: Overview | ColorPalette PHP Class
description: "Get started with the ColorPalette PHP class in Kendo UI."
slug: overview_colorpalette_uiforphp
position: 1
---

# ColorPalette PHP Class Overview

The Kendo UI ColorPalette for PHP is a server-side wrapper for the [Kendo UI ColorPalette](/api/javascript/ui/colorpalette) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPalette for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [ColorPalette](/api/php/Kendo/UI/ColorPalette).

###### Example

    <?php
    $colorpalette = new \Kendo\UI\ColorPalette('colorpalette');
    $colorpalette->value('#ff0000');
    ?>

**Step 3** Output the ColorPalette by echoing the result of the `render` method.

###### Example

    <?php
    echo $colorpalette->render();
    ?>

## Event Handling

You can subscribe to all ColorPalette [events](/api/web/colorpalette#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $colorpalette = new \Kendo\UI\ColorPalette('colorpalette');

    // The 'colorpalette_change' JavaScript function will handle the 'change' event of the ColorPalette
    $colorpalette->change('colorpalette_change');

    echo $colorpalette->render();
    ?>
    <script>
    function colorpalette_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $colorpalette = new \Kendo\UI\ColorPalette('colorpalette');

    // Provide inline JavaScript code that will handle the 'change' event of the colorpalette
    $colorpalette->change('function() { /* Handle the change event */ }');

    echo $colorpalette->render();
    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing ColorPalette instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ColorPalette API](/api/javascript/ui/colorpalette#methods) to control its behavior.

###### Example

    <?php
    $colorpalette = new \Kendo\UI\ColorPalette('colorpalette');
    echo $colorpalette->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the colorpalette
        var colorpalette = $("#colorpalette").data("kendoColorPalette")
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and related to the ColorPalette:

* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
