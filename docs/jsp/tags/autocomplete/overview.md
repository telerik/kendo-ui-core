---
title: Overview
---

# AutoComplete

The AutoComplete JSP tag is a server-side wrapper for the [Kendo UI AutoComplete](/api/web/autocomplete) widget.

## Getting Started

There are two ways to bind a Kendo AutoComplete:

*   **server** - the data will be serialized to the client. No Ajax requests will be made.
*   **ajax** - the autocomplete will make ajax requests to get the data. [Here](/jsp/tags/autocomplete/ajax-binding) you can find more information about this binding.

Here is how to configure the Kendo AutoComplete for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/autocomplete/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound autocomplete:

        <kendo:autoComplete name="productAutoComplete" dataTextField="productName">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:autoComplete>

## Accessing an Existing AutoComplete

You can reference an existing AutoComplete instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/autocomplete#methods) to control its behavior.

### Accessing an existing AutoComplete instance

    //Put this after your Kendo AutoComplete tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the autocomplete is used to get its client-side instance
        var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
    });
    </script>

## Handling Kendo UI AutoComplete events

You can subscribe to all [events](/api/web/autocomplete#events) exposed by Kendo UI autocomplete:

### Subscribe by handler name

    <kendo:autoComplete name="productAutoComplete" dataTextField="productName" change="autocomplete_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:autoComplete>

    <script>
        function autocomplete_change() {
            //Handle the change event
        }
    </script>
