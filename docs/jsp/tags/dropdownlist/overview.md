---
title: Overview
page_title: Overview - DropDownList JSP Tag
description: "Get started with the DropDownList JSP tag in Kendo UI."
slug: overview_dropdownlist_uiforjsp
position: 1
---

# DropDownList JSP Tag Overview

The DropDownList JSP tag is a server-side wrapper for the [Kendo UI DropDownList](/api/javascript/ui/dropdownlist) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI DropDownList:

* `server`&mdash;The data is serialized to the client. No Ajax requests are going to be made.
* `ajax`&mdash;The DropDownList is going to make Ajax requests to get the data. For more information on this type of binding, refer to the [DropDownList API reference article on Ajax binding]({% slug ajaxbinding_dropdownlist_uiforjsp %}).

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **Products** table to the View.



        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/dropdownlist/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.



        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add a server-bound DropDownList.



        <kendo:dropdownlist name="productDropDownList" taTextField="productName" dataValueField="productId">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:dropdownlist>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI DropDownList](/api/javascript/ui/dropdownlist#events) by the handler name.



        <kendo:dropDownList name="productDropDownList" dataTextField="productName" dataValueField="productId" change="dropdownlist_change">
            <kendo:dataSource data="${products}">
            </kendo:dataSource>
        </kendo:dropDownList>

        <script>
            function dropdownlist_change() {
                //Handle the change event
            }
        </script>

## Reference

### Existing Instances

You are able to reference an existing DropDownList instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [DropDownList API](/api/javascript/ui/dropdownlist#methods) to control its behavior.



    //Put this after your Kendo DropDownList tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the dropdownlist is used to get its client-side instance
        var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
    });
    </script>

## See Also

* [Ajax Binding of the DropDownList]({% slug ajaxbinding_autocomplete_uiforjsp %})
* [Overview of the Kendo UI DropDownList Widget]({% slug ajaxbinding_dropdownlist_uiforjsp %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
