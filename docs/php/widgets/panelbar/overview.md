---
title: Overview
page_title: Overview | PanelBar PHP Class
description: "Get started with the PanelBar PHP class in Kendo UI."
slug: overview_panelbar_uiforphp
position: 1
---

# PanelBar  PHP Class Overview

The Kendo UI PanelBar for PHP is a server-side wrapper for the [Kendo UI PanelBar](/api/javascript/ui/panelbar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PanelBar for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [PanelBar](/api/php/Kendo/UI/PanelBar).

###### Example

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

**Step 3** Output the PanelBar by echoing the result of the `render` method.

###### Example

        <?php
        echo $panelbar->render();
        ?>

## Event Handling

You can subscribe to all PanelBar [events](/api/javascript/ui/panelbar#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $panelbar = new \Kendo\UI\PanelBar('panelbar');

        // Provide inline JavaScript code that will handle the 'expand' event of the panelbar
        $panelbar->select('function() { /* Handle the expand event */ }');

        echo $panelbar->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing PanelBar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [PanelBar API](/api/javascript/ui/panelbar#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the PanelBar:

* [Overview of the Kendo UI PanelBar Widget]({% slug overview_kendoui_panelbar_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
