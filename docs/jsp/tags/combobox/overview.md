---
title: Overview
page_title: Overview | ComboBox JSP Tag
description: "Get started with the ComboBox JSP tag in Kendo UI."
slug: overview_combobox_uiforjsp
position: 1
---

# ComboBox JSP Tag Overview

The ComboBox JSP tag is a server-side wrapper for the [Kendo UI ComboBox](/api/javascript/ui/combobox) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI ComboBox:

* `server`&mdash;The data is serialized to the client. No Ajax requests are going to be made.
* `ajax`&mdash;The ComboBox is going to make Ajax requests to get the data. For more information on this type of binding, refer to the [ComboBox API reference article on Ajax binding](/jsp/tags/combobox/ajax-binding).

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the Products table to the View.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/combobox/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound ComboBox.

###### Example

        <kendo:comboBox name="productComboBox" taTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:comboBox>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ComboBox](/api/javascript/ui/combobox#events) by the handler name.

###### Example

    <kendo:combobox name="productComboBox" dataTextField="productName" dataValueField="productId" change="combobox_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:combobox>

    <script>
        function combobox_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing ComboBox instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ComboBox API](/api/javascript/ui/combobox#methods) to control its behavior.

###### Example

    //Put this after your Kendo ComboBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the combobox is used to get its client-side instance
        var combobox = $("#productComboBox").data("kendoComboBox");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the ComboBox:

* [Ajax Binding of the ComboBox]({% slug ajaxbinding_combobox_uiforjsp %})
* [Overview of the Kendo UI ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
