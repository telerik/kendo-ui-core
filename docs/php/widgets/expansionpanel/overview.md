---
title: Overview
page_title: Overview | ExpansionPanel PHP Class
description: "Get started with the ExpansionPanel PHP class in Kendo UI."
slug: overview_expansionpanel_uiforphp
position: 1
---

# ExpansionPanel PHP Class Overview

The Kendo UI ExpansionPanel for PHP is a server-side wrapper for the [Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel) widget.
The ExpansionPanel is a layout control that provides the user with an easy way to expand and collapse a content area within the application.

## Getting Started

### Configuration

Here are the required steps to use the Kendo UI ExpansionPanel for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [ExpansionPanel](/api/php/Kendo/UI/ExpansionPanel).


        <?php
        $brazil = new \Kendo\UI\ExpansionPanel('brazil');
        $brazil->title('Brazil');
        $brazil->subTitle('South America');
        $brazil->expanded(true);
        $brazil->content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        ?>

**Step 3** Output the ExpansionPanel by echoing the result of the `render` method.


        <?php
        echo $brazil->render();
        ?>

## Event Handling

All client-side events are listed in the [ExpansionPanel events](/api/javascript/ui/expansionpanel#events) API section.

### Specify Function Names

The example below demonstrates how to subscribe to events by specifying a JavaScript function name.



        <?php
        $brazil = new \Kendo\UI\ExpansionPanel('brazil');

        // The 'expansionpanel_expand' JavaScript function will handle the 'expand' event of the expansionpanel
        $brazil->expand("onExpand")

        echo $brazil->render();
        ?>
        <script>
        function onExpand() {
                console.log("onExpand");
        };
        </script>

### Define an Event Handler Function Inline

The example below demonstrates how to subscribe to events by providing inline JavaScript code.



        <?php
        $expansionpanel = new \Kendo\UI\ExpansionPanel('brazil');

        // Provide inline JavaScript code that will handle the 'expand' event of the ExpansionPanel
        $expansionpanel->expand('function() { /* Handle the expand event */ }');

        echo $expansionpanel->render();
        ?>

<!--*-->
## Reference Client-Side Instances

You can reference an existing ExpansionPanel instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [ExpansionPanel API](/api/javascript/ui/expansionpanel#methods) to control its behavior.



        <?php
        $expansionpanel = new \Kendo\UI\ExpansionPanel('brazil');
        echo $expansionpanel->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the expansionpanel
            var expansionpanel = $("#brazil").data("kendoExpansionPanel");
        });
        </script>

## See Also

* [Overview of the Kendo UI ExpansionPanel Widget]({% slug overview_kendoui_expansionpanel_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
