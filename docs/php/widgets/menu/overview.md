---
title: Overview
page_title: Overview | Menu PHP Class
description: "Get started with the Menu PHP class in Kendo UI."
slug: overview_menu_uiforphp
position: 1
---

# Menu PHP Class Overview

The Kendo UI Menu for PHP is a server-side wrapper for the [Kendo UI Menu](/api/javascript/ui/menu) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Menu for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Menu](/api/php/Kendo/UI/Menu) and set its [items](/api/php/Kendo/UI/Menu#additem).

###### Example

        <?php
        $menu = new \Kendo\UI\Menu('menu');
        $item1 = new \Kendo\UI\MenuItem();
        $item1->text("Item 1")
                ->startContent();
        ?>

        First Item Static Content

        <?php
        $item1->endContent();
        $item2 = new \Kendo\UI\MenuItem();
        $item2->text("Item 2")
                ->startContent();
        ?>
            Second Item Static Content
        <?php
        $item2->endContent();

        $menu.addItem($item1, $item2);
        ?>

**Step 3** Output the Menu by echoing the result of the `render` method.

###### Example

        <?php
        echo $menu->render();
        ?>

## Event Handling

You can subscribe to all Editor [events](/api/javascript/ui/menu#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $menu = new \Kendo\UI\Menu('menu');

        // The 'menu_select' JavaScript function will handle the 'select' event of the menu
        $menu->expand('menu_select');

        echo $menu->render();
        ?>
        <script>
        function menu_select() {
            // Handle the select event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $menu = new \Kendo\UI\Menu('menu');

        // Provide inline JavaScript code that will handle the 'select' event of the menu
        $menu->select('function() { /* Handle the select event */ }');

        echo $menu->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Menu instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Menu API](/api/javascript/ui/editor#methods) to control its behavior.

###### Example
        <?php
        $menu = new \Kendo\UI\Menu('menu');
        echo $menu->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the menu
            var menu = $("#menu").data("kendoMenu");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the Menu:

* [Overview of the Kendo UI Menu Widget]({% slug overview_kendoui_menu_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
