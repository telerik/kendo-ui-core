---
title: Overview
---

# Grid

The Grid tag is a server-side wrapper for the [Kendo UI Grid](/api/web/grid) widget.

## Getting Started

Here is how to configure the Kendo Grid for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());
    
            return "web/grid/local-data";
        }

3.  Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound grid:

        <kendo:grid name="productGrid" pageable="true">
            <kendo:grid-columns>
                <kendo:grid-column title="Product Name" field="productName" />
                <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
                <kendo:grid-column title="Units In Stock" field="unitsInStock" />
            </kendo:grid-columns>
            <kendo:dataSource data="${products}" pageSize="10"/>
            <kendo:grid-pageable input="true" numeric="false" />
        </kendo:grid>

## Accessing an Existing Grid

You can reference an existing Grid instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/grid#methods) to control its behavior.

### Accessing an existing Grid instance

    //Put this after your Kendo Grid tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the grid is used to get its client-side instance
        var grid = $("#productGrid").data("kendoGrid");
    });
    </script>


## Handling Kendo UI Grid events

You can subscribe to all [events](/api/web/grid#events) exposed by Kendo UI grid:


### Subscribe by handler name

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
