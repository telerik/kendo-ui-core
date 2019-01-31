---
title: Overview
page_title: Overview | Switch PHP Class
description: "Get started with the Switch PHP class in Kendo UI."
slug: overview_switch_uiforphp
position: 1
---

# Switch PHP Class Overview

The Kendo UI Switch for PHP is a server-side wrapper for the [Kendo UI Switch](/api/javascript/ui/switch) widget.

The Switch displays two exclusive choices.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Switch for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Switch](/api/php/Kendo/UI/SwitchButton).

###### Example

    <?php
      $switchButton = new \Kendo\UI\SwitchButton('switch');
    ?>

**Step 3** Output the Switch by echoing the result of the `render` method.

###### Example

    <?php
    echo $switchButton->render();
    ?>

## Event Handling

You can subscribe to all Switch [events](/api/javascript/ui/switch#events).

### Specify Function Names

The following example demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

    <?php
    $switchButton = new \Kendo\UI\SwitchButton('switch');

    // The 'switch_change' JavaScript function will handle the 'change' event of the switch
    $switch->change('switch_change');

    echo $switchButton->render();
    ?>
    <script>
    function switch_change() {
        // Handle the change event
    }
    </script>

### Provide Inline Code

The following example demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

    <?php
    $switchButton = new \Kendo\UI\SwitchButton('switch');

    // Provide inline JavaScript code that will handle the change event of the Switch.
    $switchButton->change('function() { /* Handle the change event */ }');

    echo $switchButton->render();
    ?>

## Reference

### Client-Side Instances

You are able to reference an existing Switch instance through [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [Switch API](/api/javascript/ui/switch) to control its behavior.

###### Example

    <?php
    $switch = new \Kendo\UI\Switch('switch');
    echo $switch->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the id HTML attribute of the Switch.
        var switch = $("#switch").data("kendoSwitch");
    });
    </script>

## See Also

* [Overview of the Kendo UI Switch Widget]({% slug overview_kendoui_switch_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
