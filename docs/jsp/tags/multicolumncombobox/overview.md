---
title: Overview
page_title: Overview | MultiColumnComboBox JSP Tag
description: "Get started with the MultiColumnComboBox JSP tag in Kendo UI."
slug: overview_multicolumncombobox_uiforjsp
position: 1
---

# MultiColumnComboBox JSP Tag Overview

The MultiColumnComboBox JSP tag is a server-side wrapper for the [Kendo UI MultiColumnComboBox](/api/javascript/ui/multicolumncombobox) widget.

## Getting Started

### The Basics

To bind a Kendo UI MultiColumnMultiColumnComboBox, use either of the following approaches:

* `server`&mdash;The data is serialized to the client. No Ajax requests will be made.
* `ajax`&mdash;The MultiColumnComboBox is going to make Ajax requests to get the data. For more information on this type of binding, refer to the [MultiColumnComboBox API reference article on Ajax binding](/jsp/tags/multicolumncombobox/ajax-binding).

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiColumnComboBox for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the Products table to the View.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/multicolumncombobox/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound MultiColumnComboBox.

###### Example

        <kendo:multicolumncombobox name="productMultiColumnComboBox" taTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:multicolumncombobox>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI MultiColumnComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#events) by the handler name.

###### Example

    <kendo:multicolumncombobox name="productMultiColumnComboBox" dataTextField="productName" dataValueField="productId" change="multicolumncombobox_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:multicolumncombobox>

    <script>
        function multicolumncombobox_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing MultiColumnComboBox instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, you are able to use the [MultiColumnComboBox API](/api/javascript/ui/multicolumncombobox#methods) to control its behavior.

###### Example

    //Put this after your Kendo MultiColumnComboBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the multicolumncombobox is used to get its client-side instance
        var multicolumncombobox = $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox");
    });
    </script>

## See Also

* [Ajax Binding of the MultiColumnComboBox]({% slug ajaxbinding_multicolumncombobox_uiforjsp %})
* [Overview of the Kendo UI MultiColumnComboBox Widget]({% slug overview_kendoui_multicolumncombobox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
