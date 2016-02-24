---
title: Overview
page_title: Overview | TabStrip PHP Class
description: "Get started with the TabStrip PHP class in Kendo UI."
slug: overview_tabstrip_uiforphp
position: 1
---

# TabStrip PHP Class Overview

The Kendo UI TabStrip for PHP is a server-side wrapper for the [Kendo UI TabStrip](/api/javascript/ui/tabstrip) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TabStrip for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TabStrip](/api/php/Kendo/UI/TabStrip) and set its [items](/api/php/Kendo/UI/TabStrip#addItem).

###### Example

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

**Step 3** Output the TabStrip by echoing the result of the `render` method.

###### Example

        <?php
        echo $tabstrip->render();
        ?>

## Event Handling

You can subscribe to all TabStrip [events](/api/javascript/ui/tabstrip#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

        // Provide inline JavaScript code that will handle the 'select' event of the tabstrip
        $tabstrip->select('function() { /* Handle the select event */ }');

        echo $tabstrip->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing TabStrip instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TabStrip API](/api/javascript/ui/tabstrip#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the TabStrip:

* [Overview of the Kendo UI TabStrip Widget]({% slug overview_kendoui_tabstrip_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
