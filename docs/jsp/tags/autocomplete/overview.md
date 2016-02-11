---
title: Overview
page_title: Overview | AutoComplete JSP Tag
description: "Get started with the AutoComplete JSP tag in Kendo UI."
slug: overview_autocomplete_uiforjsp
position: 1
---

# AutoComplete JSP Tag Overview

The AutoComplete JSP tag is a server-side wrapper for the [Kendo UI AutoComplete](/api/javascript/ui/autocomplete) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI AutoComplete:

* `server`&mdash;The data is serialized to the client. No Ajax requests are going to be made.
* `ajax`&mdash;The AutoComplete is going to make Ajax requests to get the data. For more information on this type of binding, refer to the [AutoComplete API reference article on Ajax binding]({% slug ajaxbinding_autocomplete_uiforjsp %}).

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **Products** table to the View.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/autocomplete/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound AutoComplete.

###### Example

        <kendo:autoComplete name="productAutoComplete" dataTextField="productName">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:autoComplete>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI AutoComplete](/api/web/autocomplete#events) by the handler name.

###### Example

    <kendo:autoComplete name="productAutoComplete" dataTextField="productName" change="autocomplete_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:autoComplete>

    <script>
        function autocomplete_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing AutoComplete instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [AutoComplete API](/api/javascript/ui/autocomplete#methods) to control its behavior.

###### Example

    //Put this after your Kendo AutoComplete tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the autocomplete is used to get its client-side instance
        var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the AutoComplete:

* [Ajax Binding of the AutoComplete]({% slug ajaxbinding_autocomplete_uiforjsp %})
* [Overview of the Kendo UI AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
