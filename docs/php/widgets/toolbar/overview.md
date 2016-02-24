---
title: Overview
page_title: Overview | ToolBar PHP Class
description: "Get started with the ToolBar PHP class in Kendo UI."
slug: overview_toolbar_uiforphp
position: 1
---

# ToolBar PHP Class Overview

The Kendo UI ToolBar for PHP is a server-side wrapper for the [Kendo UI ToolBar](/api/javascript/ui/toolbar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ToolBar for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [ToolBar](/api/php/Kendo/UI/ToolBar) and specify the widget's commands.

###### Example

        <?php

        $toolbar = new \Kendo\UI\ToolBar('toolbar');

        $toolbar->addItem(

            //regular button
            array("type" => "button", "text" => "Button"),

            //toggle button
            array("type" => "button", "text" => "Toggle Button", "togglable" => true),

            //split button
            array(
                "type" => "splitButton",
                "text" => "Insert",
                "menuButtons" => array(
                    array("text" => "Insert above", "icon" => "insert-n"),
                    array("text" => "Insert between", "icon" => "insert-m"),
                    array("text" => "Insert below", "icon" => "insert-s")
                )
            ),

            //button group
            array(
                "type" => "buttonGroup",
                "buttons" => array(
                    array("spriteCssClass" => "k-tool-icon k-justifyLeft", "text" => "Left", "togglable" => true, "group" => "text-align"),
                    array("spriteCssClass" => "k-tool-icon k-justifyCenter", "text" => "Center", "togglable" => true, "group" => "text-align"),
                    array("spriteCssClass" => "k-tool-icon k-justifyRight", "text" => "Right", "togglable" => true, "group" => "text-align")
                )
            ),

            //separator
            array("type" => "separator"),

            //custom template
            array("template" => "<input id='dropdown' style='width: 150px;' />", "overflow" => "never"),
        );

        ?>

**Step 3** Output the ToolBar by echoing the result of the `render` method.

###### Example

        <?php echo $toolbar->render(); ?>

## Event Handling

You can subscribe to all ToolBar [events](/api/javascript/ui/toolbar#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $toolbar = new \Kendo\UI\ToolBar('#container');
        $toolbar->addItem(
            array("type" => "button", "text" => "Button"),
        );

        // The 'onClick' JavaScript function will handle the 'click' event of the toolbar
        $toolbar->click('onClick');

        echo $toolbar->render();
        ?>
        <script>
        function onClick() {
            // Handle the show event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $toolbar = new \Kendo\UI\ToolBar('#container');
        $toolbar->addItem(
            array("type" => "button", "text" => "Button"),
        );

        // Provide inline JavaScript code that will handle the 'click' event of the toolbar
        $toolbar->click('function() { /* Handle the show event */ }');

        echo $toolbar->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing ToolBar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ToolBar API](/api/javascript/ui/toolbar#methods) to control its behavior.

###### Example

        <?php
        $toolbar = new \Kendo\UI\ToolBar('#container');
        $toolbar->addItem(
            //regular button
            array("type" => "button", "text" => "Button"),
        );
        echo $toolbar->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as a selector for getting toolbar's container
            var toolbar = $("#container").data("kendoToolBar");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the ToolBar:

* [Overview of the Kendo UI ToolBar Widget]({% slug overview_kendoui_toolbar_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
