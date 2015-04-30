---
title: Overview
---

# DropDownList

The DropDownList JSP tag is a server-side wrapper for the [Kendo UI DropDownList](/api/web/dropdownlist) widget.

## Getting Started

There are two ways to bind a Kendo DropDownList:

*   **server** - the data will be serialized to the client. No Ajax requests will be made.
*   **ajax** - the dropdownlist will make ajax request to get the data. [Here](/jsp/tags/dropdownlist/ajax-binding) you can find more information about this binding.

Here is how to configure the Kendo DropDownList for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/dropdownlist/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound dropdownlist:

        <kendo:dropdownlist name="productDropDownList" taTextField="productName" dataValueField="productId">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:dropdownlist>

## Accessing an Existing DropDownList

You can reference an existing DropDownList instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/dropdownlist#methods) to control its behavior.

### Accessing an existing DropDownList instance

    //Put this after your Kendo DropDownList tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the dropdownlist is used to get its client-side instance
        var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
    });
    </script>

## Handling Kendo UI DropDownList events

You can subscribe to all [events](/api/web/dropdownlist#events) exposed by Kendo UI dropdownlist:

### Subscribe by handler name

    <kendo:dropDownList name="productDropDownList" dataTextField="productName" dataValueField="productId" change="dropdownlist_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:dropDownList>

    <script>
        function dropdownlist_change() {
            //Handle the change event
        }
    </script>
