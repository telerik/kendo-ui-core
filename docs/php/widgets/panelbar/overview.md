---
title: Overview
page_title: How to use the PanelBar PHP class, server-side wrapper for Kendo UI PanelBar widget
description: Learn how to create Kendo UI PanelBar for PHP, handle Kendo UI PanelBar Events, access an existing panelbar.
---

#PanelBar

The Kendo PanelBar for PHP is a server-side wrapper for the [Kendo UI PanelBar](/api/web/panelbar) widget.

## Getting Started

Here is how to configure a simple Kendo PanelBar:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a [panelbar](/api/wrappers/php/Kendo/UI/PanelBar) and set its [items](/api/wrappers/php/Kendo/UI/PanelBar#addItem)

        <?php
        $panelbar = new \Kendo\UI\PanelBar('panelbar');
        $item1 = new \Kendo\UI\PanelBarItem();
        $item1->text("Item 1")
                ->startContent();
        ?>

            First Item Static Content

        <?php
        $item1->endContent();
        $item2 = new \Kendo\UI\PanelBarItem();
        $item2->text("Item 2")
                ->startContent();
        ?>
            Second Item Static Content
        <?php
        $item2->endContent();

        $panelbar->addItem($item1, $item2);
        ?>

1. Output the panelbar by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $panelbar->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo PanelBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/panelbar#methods) to control its behavior.

### Example

    <?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');
    echo $panelbar->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the panelbar
        var panelbar = $("#panelbar").data("kendoPanelBar");
    });
    </script>

## Handling Events

You can subscribe to all panelbar [events](/api/web/panelbar#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    // The 'panelbar_expand' JavaScript function will handle the 'expand' event of the panelbar
    $panelbar->expand('panelbar_expand');

    echo $panelbar->render();
    ?>
    <script>
    function panelbar_expand() {
        // Handle the expand event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    // Provide inline JavaScript code that will handle the 'expand' event of the panelbar
    $panelbar->select('function() { /* Handle the expand event */ }');

    echo $panelbar->render();
    ?>
