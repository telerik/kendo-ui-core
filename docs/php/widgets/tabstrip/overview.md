---
title: Overview
page_title: How to use the TabStrip PHP class, server-side wrapper for Kendo UI TabStrip widget
description: Learn how to create Kendo UI TabStrip for PHP, handle Kendo UI TabStrip Events, access an existing tabstrip.
---

# TabStrip

The Kendo TabStrip for PHP is a server-side wrapper for the [Kendo UI TabStrip](/api/web/tabstrip) widget.

## Getting Started

Here is how to configure a simple Kendo TabStrip:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1. Create a [tabstrip](/api/wrappers/php/Kendo/UI/TabStrip) and set its [items](/api/wrappers/php/Kendo/UI/TabStrip#addItem)

        <?php
        $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

        $item1 = new \Kendo\UI\TabStripItem();

        $item1->text("Item 1")
                ->startContent();
        ?>

            First Item Static Content

        <?php
        $item1->endContent();

        $item2 = new \Kendo\UI\TabStripItem();

        $item2->text("Item 2")
                ->startContent();
        ?>
            Second Item Static Content
        <?php
        $item2->endContent();

        $tabstrip.addItem($item1, $item2);
        ?>

1. Output the tabstrip by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $tabstrip->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo TabStrip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tabstrip#methods) to control its behavior.

### Example

    <?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');
    echo $tabstrip->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the tabstrip
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
    });
    </script>

## Handling Events

You can subscribe to all tabstrip [events](/api/web/tabstrip#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

    // The 'tabstrip_select' JavaScript function will handle the 'tabstrip_select' event of the tabstrip
    $tabstrip->select('tabstrip_select');

    echo $tabstrip->render();
    ?>
    <script>
    function tabstrip_select() {
        // Handle the select event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

    // Provide inline JavaScript code that will handle the 'select' event of the tabstrip
    $tabstrip->select('function() { /* Handle the select event */ }');

    echo $tabstrip->render();
    ?>
