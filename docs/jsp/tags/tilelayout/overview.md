---
title: Overview
page_title: Overview | TileLayout JSP Tag
description: "Get started with the TileLayout JSP tag in Kendo UI."
slug: overview_tilelayout_uiforjsp
---

# TileLayout JSP Tag Overview

The TileLayout JSP tag is a server-side wrapper for the [Kendo UI TileLayout](/api/javascript/ui/tilelayout) widget.

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
