---
title: Overview
page_title: Overview | TileLayout PHP Class
description: "Get started with the TileLayout PHP class in Kendo UI."
slug: overview_tilelayout_uiforphp
---

# TileLayout PHP Class Overview

The Kendo UI TileLayout for PHP is a server-side wrapper for the [Kendo UI TileLayout](/api/javascript/ui/tilelayout) widget.

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
            // The constructor parameter is used as the 'id' HTML attribute of the treeview
            var TileLayout = $("#tilelayout").data("kendoTileLayout");
        });
        </script>

## See Also

* [Overview of the Kendo UI TileLayout Widget]({% slug overview_kendoui_tilelayout_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/TileLayout)
