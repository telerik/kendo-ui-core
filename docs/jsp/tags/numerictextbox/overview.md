---
title: Overview
---

# NumericTextBox

The NumericTextBox JSP tag is a server-side wrapper for the [Kendo UI NumericTextBox](/api/web/numerictextbox) widget.

## Getting Started

Here is how to configure a simple Kendo NumericTextBox:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/numerictextbox/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a numerictextbox tag:

        <kendo:numericTextBox name="numerictextbox" value="10" max="100" min="-100">
        </kendo:numericTextBox>

## Accessing an Existing NumericTextBox

You can reference an existing NumericTextBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/numerictextbox#methods) to control its behavior.

### Accessing an existing NumericTextBox instance

    //Put this after your Kendo NumericTextBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the numerictextbox is used to get its client-side instance
        var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    });
    </script>

## Handling Kendo UI NumericTextBox events

You can subscribe to all [events](/api/web/numerictextbox#events) exposed by Kendo UI NumericTextBox:

### Subscribe by handler name

    <kendo:numericTextBox name="numerictextbox" change="numerictextbox_change"></kendo:numericTextBox>

    <script>
        function numerictextbox_change() {
            //Handle the change event
        }
    </script>
