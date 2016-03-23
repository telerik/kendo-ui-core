---
title: Overview
page_title: Overview | MultiSelect JSP Tag
description: "Get started with the MultiSelect JSP tag in Kendo UI."
slug: overview_multiselect_uiforjsp
position: 1
---

# MultiSelect JSP Tag Overview

The MultiSelect JSP tag is a server-side wrapper for the [Kendo UI MultiSelect](/api/javascript/ui/multiSelect) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI MultiSelect:

* `server`&mdash;The data is serialized to the client. No Ajax requests are going to be made.
* `ajax`&mdash;The MultiSelect is going to make Ajax requests to get the data. For more information on this type of binding, refer to the [MultiSelect API reference article on Ajax binding]({% slug ajaxbinding_multiselect_uiforjsp %}).

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you have followed all the steps from the [Introduction]({% slug overview_uiforjsp %}) help topic.

**Step 2** Create a new action method and pass the **Products** table to the View.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/multiselect/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound MultiSelect.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());
            return "web/multiselect/index";
        }

        <kendo:multiSelect name="productMultiSelect" dataTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:multiSelect>

### Pre-Selection of Values on Initial Loading

When deferred binding (`autoBind="false"`) is used, you need to specify a list of data items instead of just a list of strings. This functionality is supported in the Kendo UI Q1 2013 SP1 release and later versions of Kendo UI.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            Product product1 = new Product();
            product1.setProductId(1);
            product1.setProductName("Chai");

            List<Product> values = new ArrayList<>();
            values.add(product1);

            model.addAttribute("values", values);

            return "web/multiselect/index";
        }

    <kendo:multiSelect name="productMultiSelect" taTextField="productName" dataValueField="productId" filter="startswith"
        autoBind="false" value="${values}">
        <kendo:dataSource data="${products}"></kendo:dataSource>
    </kendo:multiSelect>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI MultiSelect](/api/javascript/ui/multiSelect) by the handler name.

###### Example

    <kendo:multiSelect name="productMultiSelect" dataTextField="productName" dataValueField="productId" change="multiselect_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:multiSelect>

    <script>
        function multiselect_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing MultiSelect instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [MultiSelect API](/api/javascript/ui/multiselect#methods) to control its behavior.

###### Example

    //Put this after your Kendo MultiSelect tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the multiselect is used to get its client-side instance
        var multiSelect = $("#productMultiSelect").data("kendoMultiSelect");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the MultiSelect:

* [Ajax Binding of the MultiSelect]({% slug ajaxbinding_multiselect_uiforjsp %})
* [Overview of the Kendo UI MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
