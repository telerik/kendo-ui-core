---
title: Overview
page_title: Overview | Grid JSP Tag
description: "Get started with the Grid JSP tag in Kendo UI."
slug: overview_grid_uiforjsp
position: 1
---

# Grid JSP Tag Overview

The Grid JSP tag is a server-side wrapper for the [Kendo UI Grid](/api/javascript/ui/grid) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for binding to data passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **Products** table to the View.

###### Example

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());

            return "web/grid/local-data";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound Grid.

###### Example

        <kendo:grid name="productGrid" pageable="true">
            <kendo:grid-columns>
                <kendo:grid-column title="Product Name" field="productName" />
                <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
                <kendo:grid-column title="Units In Stock" field="unitsInStock" />
            </kendo:grid-columns>
            <kendo:dataSource data="${products}" pageSize="10"/>
            <kendo:grid-pageable input="true" numeric="false" />
        </kendo:grid>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Grid](/api/javascript/ui/grid#events) by the handler name.

###### Example

    <kendo:grid name="productGrid" dataBound="productGrid_dataBound" change="productGrid_change">
        <kendo:dataSource data="${data}" pageSize="10"/>
    </kendo:grid>

    <script>
    function productGrid_dataBound() {
        //Handle the dataBound event
    }

    function productGrid_change() {
        //Handle the change event
    }
    </script>

## Reference

### Existing Instances

You are able to reference an existing Grid instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Grid API](/api/javascript/ui/grid#methods) to control its behavior.

###### Example

    //Put this after your Kendo Grid tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the grid is used to get its client-side instance
        var grid = $("#productGrid").data("kendoGrid");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Grid:

* [Batch Editing of the Grid]({% slug batchediting_grid_uiforjsp %})
* [Ajax Binding of the Grid]({% slug ajaxbinding_grid_uiforjsp %})
* [Ajax Editing of the Grid]({% slug ajaxediting_grid_uiforjsp %})
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
