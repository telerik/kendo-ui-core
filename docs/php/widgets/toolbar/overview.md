---
title: Overview
title: How to use the ToolBar PHP class, server-side wrapper for Kendo UI ToolBar widget
description: Learn how to create Kendo UI ToolBar for PHP, handle Kendo UI ToolBar Events, access an existing toolbar.
---

# ToolBar

The Kendo ToolBar for PHP is a server-side wrapper for the [Kendo UI ToolBar](/api/web/toolbar) widget.

## Getting Started

Here is how to configure a simple Kendo ToolBar:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [toolbar](/api/wrappers/php/Kendo/UI/ToolBar), specify the widget's commands.

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

3. Output the toolbar by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php echo $toolbar->render(); ?>

## Getting Client-side Reference

You can reference the client-side Kendo ToolBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).

### Example

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

## Handling Events

You can subscribe to all toolbar [events](/api/web/toolbar#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

    <?php
    $toolbar = new \Kendo\UI\ToolBar('#container');
    $toolbar->addItem(
        array("type" => "button", "text" => "Button"),
    );

    // Provide inline JavaScript code that will handle the 'click' event of the toolbar
    $toolbar->click('function() { /* Handle the show event */ }');

    echo $toolbar->render();
    ?>
