---
title: Items
page_title: jQuery AppBar Documentation | Items
description: "Learn how to configure the items in the jQuery AppBar by Kendo UI."
slug: items_kendoui_appbar_widget
position: 2
---

# Items

The `Items` represent the content of the AppBar. The [`items`](/api/javascript/ui/appbar/configuration/items) configuration accepts a collection of objects that will be rendered inside the AppBar widget. There are two types of items that developers can choose from:

* [Content Items](#content-items)
* [Spacer](#spacer)

## Content Items

There are two approaches to using templates with **Content Items**:
* You can use the the `template` option exposed by `contentItem` to consume and render HTML. 
* You can supply an evaluated `kendo.template` to the configuration. 
The following example shows how to utilize both approaches:

```dojo
    <div id="appbar"></div>

    <script>
        $("#appbar").kendoAppBar({
            items: [
                { template: '<a class="k-button" href="\\#"><span class="k-icon k-i-menu"></span></a>', type: "contentItem" },
                { type: "spacer", width: "12px" },
                { template: kendo.template($("#search-template").html()), type: "contentItem" }
            ]
        });
    </script>

    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-display-flex">
            <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
            <span class="k-input-icon">
                <span class="k-icon k-i-search"></span>
            </span>
        </span>
    </script>
```

## Spacer

The `spacer` item could be utilized to easily separate the content items from one another.

```dojo
    <div id="appbar"></div>

    <script>
        $("#appbar").kendoAppBar({
            items: [
                { template: '<h3>AppBar Demo</h3>', type: "contentItem" },
                { width: 16, type: "spacer" },
                { template: '<a class="k-button" href="\\#"><span class="k-icon k-i-menu"></span></a>', type: "contentItem" }
            ]
        });
    </script>
```

## See Also

* [Overview of the AppBar (Demo)](https://demos.telerik.com/kendo-ui/appbar/index)
* [JavaScript API Reference of the AppBar](/api/javascript/ui/appbar)
