---
title: Overview
---

# TreeList

The TreeList tag is a server-side wrapper for the [Kendo UI TreeList](/api/web/treelist) widget.

## Getting Started

Here is how to configure the Kendo TreeList for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());
    
            return "web/treelist/local-data";
        }

3.  Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound treelist:

        <kendo:treeList name="employees" pageable="true">
            <kendo:treeList-columns>
                <kendo:treeList-column title="Product Name" field="productName" />
                <kendo:treeList-column title="Unit Price" field="unitPrice" format="{0:c}" />
                <kendo:treeList-column title="Units In Stock" field="unitsInStock" />
            </kendo:treeList-columns>
            <kendo:dataSource data="${products}" pageSize="10"/>
            <kendo:treeList-pageable input="true" numeric="false" />
        </kendo:treeList>

## Accessing an Existing TreeList

You can reference an existing TreeList instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/treelist#methods) to control its behavior.

### Accessing an existing TreeList instance

    //Put this after your Kendo TreeList tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the treelist is used to get its client-side instance
        var treelist = $("#employees").data("kendoTreeList");
    });
    </script>


## Handling Kendo UI TreeList events

You can subscribe to all [events](/api/web/treelist#events) exposed by Kendo UI TreeList:


### Subscribe by handler name

    <kendo:treeList name="employees" dataBound="employees_dataBound" change="employees_change">
        <kendo:dataSource data="${data}" pageSize="10"/>
    </kendo:treeList>

    <script>
    function employees_dataBound() {
        //Handle the dataBound event
    }

    function employees_change() {
        //Handle the change event
    }
    </script>

