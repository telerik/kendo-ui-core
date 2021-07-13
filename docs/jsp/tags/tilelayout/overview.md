---
title: Overview
page_title: Overview | TileLayout JSP Tag
description: "Get started with the TileLayout JSP tag in Kendo UI."
slug: overview_tilelayout_uiforjsp
---

# TileLayout JSP Tag Overview

The TileLayout JSP tag is a server-side wrapper for the [Kendo UI TileLayout](https://demos.telerik.com/kendo-ui/tilelayout/index) widget.

The Kendo UI TileLayout widget allows you configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

It is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)(with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering and templates customizations.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TileLayout.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "tilelayout/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.


        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add a `TileLayout` tag.


    <kendo:tileLayout name="tilelayout" columns="2" columnsWidth="285" rowsHeight="285" reorderable="true" >
    		<kendo:tileLayout-containers>
    			<kendo:tileLayout-container rowSpan="1" colSpan="1" >
    				<kendo:tileLayout-container-header text="Header One"></kendo:tileLayout-container-header>
    				<kendo:tileLayout-container-bodyTemplate>
    						Body Text One
    				</kendo:tileLayout-container-bodyTemplate>				
    			</kendo:tileLayout-container>
    			<kendo:tileLayout-container rowSpan="1" colSpan="1" >
    				<kendo:tileLayout-container-header text="Header Two"></kendo:tileLayout-container-header>
    				<kendo:tileLayout-container-bodyTemplate>
    						Body Text Two
    				</kendo:tileLayout-container-bodyTemplate>				
    			</kendo:tileLayout-container>
    			<kendo:tileLayout-container rowSpan="1" colSpan="1" >
    				<kendo:tileLayout-container-header text="Header Three"></kendo:tileLayout-container-header>
    				<kendo:tileLayout-container-bodyTemplate>
    						Body Text Three
    				</kendo:tileLayout-container-bodyTemplate>				
    			</kendo:tileLayout-container>
    	</kendo:tileLayout>

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

For a full implementation of the Add/Remove functionality please refer to the official [`Add/Remove demo`](https://demos.telerik.com/jsp-ui/tilelayout/add-remove) page.

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TileLayout](/api/javascript/ui/tilelayout#events) by the handler name.



    <kendo:tileLayout-resize>
			function (e) {

                // for widgets that do not auto resize
                // https://docs.telerik.com/kendo-ui/styles-and-layout/using-kendo-in-responsive-web-pages
                kendo.resize(e.item, true);
            }
		</kendo:tileLayout-resize>

	</kendo:tileLayout>

## Reference

### Existing Instances

You are able to reference an existing TileLayout instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [TileLayout API](/api/javascript/ui/tilelayout#methods) to control its behavior.


    //Put this after your Kendo TileLayout tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the TileLayout is used to get its client-side instance
        var tileLayout = $("#tilelayout").data("kendoTileLayout");
    });
    </script>

## See Also

* [Overview of the Kendo UI TileLayout Widget]({% slug overview_kendoui_tilelayout_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/tilelayout)
