---
title: Getting Started
page_title: jQuery ExpansionPanel Documentation - Getting Started with the ExpansionPanel
description: "Get started with the jQuery ExpansionPanel by Kendo UI and learn how to create, initialize, and enable the component."
components: ["expansionpanel"]
slug: getting_started_kendoui_expansionpanel_component
position: 2
---

# Getting Started with the ExpansionPanel 

This guide demonstrates how to get up and running with the Kendo UI for jQuery ExpansionPanel.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="brazil">
        The word "Brazil" likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology "red like an ember", formed from brasa ("ember") and the suffix -il (from -iculum or -ilium).
    </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            expanded: false
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be used as content for the ExpansionPanel.

```html
    <div id="brazil">
        The word "Brazil" likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology "red like an ember", formed from brasa ("ember") and the suffix -il (from -iculum or -ilium).
    </div>
```

## 2. Initialize the ExpansionPanel

In this step, you will initialize the ExpansionPanel from the `<div>` element.

```html
    <div id="brazil">
        The word "Brazil" likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology "red like an ember", formed from brasa ("ember") and the suffix -il (from -iculum or -ilium).
    </div>

<script>
    // Target the input element by using jQuery and then call the kendoExpansionPanel() method.
    $('#brazil').kendoExpansionPanel({
        // Add some basic configurations such as title, subtitle and expanded.
        title: 'Brazil',
        subTitle: 'South America',
        expanded: false
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ExpansionPanel](https://demos.telerik.com/kendo-ui/expansionpanel/index)

## See Also 

* [JavaScript API Reference of the ExpansionPanel](/api/javascript/ui/expansionpanel)
* [Knowledge Base Section](/knowledge-base)


