---
title: Overview
---

# ComboBox

The ComboBox JSP tag is a server-side wrapper for the [Kendo UI ComboBox](/api/web/combobox) widget.

## Getting Started

There are two ways to bind a Kendo ComboBox:

*   **server** - the data will be serialized to the client. No Ajax requests will be made.
*   **ajax** - the combobox will make ajax requests to get the data. [Here](/jsp/tags/combobox/ajax-binding) you can find more information about this binding.

Here is how to configure the Kendo ComboBox for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index(Model model) {
            model.addAttribute("products", product.getList());

            return "web/combobox/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound combobox:

        <kendo:comboBox name="productComboBox" taTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:comboBox>

## Accessing an Existing ComboBox

You can reference an existing ComboBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/combobox#methods) to control its behavior.

### Accessing an existing ComboBox instance

    //Put this after your Kendo ComboBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the combobox is used to get its client-side instance
        var combobox = $("#productComboBox").data("kendoComboBox");
    });
    </script>

## Handling Kendo UI ComboBox events

You can subscribe to all [events](/api/web/combobox#events) exposed by Kendo UI combobox:

### Subscribe by handler name

    <kendo:combobox name="productComboBox" dataTextField="productName" dataValueField="productId" change="combobox_change">
        <kendo:dataSource data="${products}">
        </kendo:dataSource>
    </kendo:combobox>

    <script>
        function combobox_change() {
            //Handle the change event
        }
    </script>
