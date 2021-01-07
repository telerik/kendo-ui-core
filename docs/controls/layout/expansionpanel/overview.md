---
title: Overview
page_title: jQuery ExpansionPanel Documentation | ExpansionPanel Overview
description: "Get started with the jQuery ExpansionPanel by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_expansionpanel_widget
position: 1
---

# ExpansionPanel Overview

The Kendo UI ExpansionPanel control is a layout widget that provides the user with an easy way to expand and collapse  a content area within the application.

* [Demo page for the ExpansionPanel](https://demos.telerik.com/kendo-ui/expansionpanel/index)

## Initializing the ExpansionPanel

To initialize an ExpansionPanel, use a `div` element where its content will be used as a content for the ExpansionPanel. 

The following example demonstrates how to initialize an expanded ExpansionPanel widget.

```dojo
<div id="brazil">
            The word "Brazil" likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology "red like an ember", formed from brasa ("ember") and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            expanded: true
        });
    </script>
```

## Referencing Existing Instances

To get a reference to an existing ExpansionPanel instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [ExpansionPanel API](/api/javascript/ui/expansionpanel) to control its behavior:

        var expansionpanel = $("#brazil").data("kendoExpansionPanel");

## Functionality and Features

* [Default State]({% slug state_kendoui_expansionpanel_widget %})

## See Also

* [Basic Usage of the ExpansionPanel (Demo)](https://demos.telerik.com/kendo-ui/expanisonpanel/index)
* [JavaScript API Reference of the ExpansionPanel](/api/javascript/ui/expansionpanel)
