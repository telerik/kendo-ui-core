---
title: Overview
page_title: Overview | TileLayout PHP Class
description: "Get started with the TileLayout PHP class in Kendo UI."
slug: overview_tilelayout_uiforphp
---

# TileLayout PHP Class Overview

The Kendo UI TileLayout for PHP is a server-side wrapper for the [Kendo UI TileLayout](https://demos.telerik.com/kendo-ui/tilelayout/index) widget.

The Kendo UI TileLayout widget allows you configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

It is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)(with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering and templates customizations.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TileLayout for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TileLayout](/api/php/Kendo/UI/TileLayout).


        $tilelayout = new \Kendo\UI\TileLayout("tilelayout");
        $tilelayout->columns(2);

        $header1 = new \Kendo\UI\TileLayoutContainerHeader();
        $header1->text("Header One");

        $container1 = new \Kendo\UI\TileLayoutContainer();
        $container1->bodyTemplate("Body Text One")
                    ->colSpan(1)
                    ->rowSpan(1)
                    ->header($header1);

        $tilelayout ->addContainer($container1);

        $header2 = new \Kendo\UI\TileLayoutContainerHeader();
        $header2->text("Header Two");

        $container2 = new \Kendo\UI\TileLayoutContainer();
        $container2->bodyTemplate("Body Text Two")
                    ->colSpan(1)
                    ->rowSpan(1)
                    ->header($header2);

        $tilelayout->addContainer($container2);

        $header3 = new \Kendo\UI\TileLayoutContainerHeader();
        $header3->text("Header Three");

        $container3 = new \Kendo\UI\TileLayoutContainer();
        $container3->bodyTemplate("Body Text Three")
                    ->colSpan(2)
                    ->rowSpan(1)
                    ->header($header3);

        $tilelayout->addContainer($container3);

**Step 3** Output the TileLayout by echoing the result of the `render` method.

       <?php echo $tilelayout->render(); ?>
        
## Container Styles

The TileLayout exposes an object that allows you to override the following styles:

```
    var tileLayoutStyles = {
        wrapper: "k-widget k-tilelayout",
        item: "k-tilelayout-item k-card",
        itemHeader: "k-tilelayout-item-header k-card-header",
        itemHeaderTitle: "k-card-title",
        itemBody: "k-tilelayout-item-body k-card-body",
        reorderHint: "k-layout-item-hint k-layout-item-hint-reorder",
        resizeHint: "k-layout-item-hint k-layout-item-hint-resize"
    };
```

To override any of the classes, add your own or remove some, insert the new definition before the widget is initialized:

```
    kendo.ui.TileLayout.styles.item = "k-tilelayout-item k-card my-own-class";
```
# Add or Remove Tiles

The Kendo UI TileLayout supports the option to dynamically add and remove tiles.

## Usage

This functionality is a custom implementation based on the [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) JS array method and the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout/methods/setOptions) TileLayout client-side method.

For a full implementation of the Add/Remove functionality please refer to the official [`Add/Remove demo`](https://demos.telerik.com/php-ui/tilelayout/add-remove) page.

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## Event Handling

You can subscribe to all TileLayout [events](/api/javascript/ui/tilelayout#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.


    $tilelayout = new \Kendo\UI\TileLayout("tilelayout");
    $tilelayout->resize("onResize");

    <script>
        function onResize(e) {
            // for widgets that do not auto resize
            // https://docs.telerik.com/kendo-ui/styles-and-layout/using-kendo-in-responsive-web-pages
            kendo.resize(e.item, true);
        };
    </script>

## Reference

### Client-Side Instances

You are able to reference an existing TileLayout instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [TileLayout API](/api/javascript/ui/tilelayout#methods) to control its behavior.


        $tilelayout = new \Kendo\UI\TileLayout("tilelayout");

        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the tilelayout
            var TileLayout = $("#tilelayout").data("kendoTileLayout");
        });
        </script>

## See Also

* [Overview of the Kendo UI TileLayout Widget]({% slug overview_kendoui_tilelayout_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/TileLayout)
