---
title: Overview
page_title: User guide for Kendo UI MaskedTextBox widget | Kendo UI documentation
description: How to configure a simple Kendo UI MaskedTextBox widget, add MaskedTextBox, handle events to control widget's behavior.
---

# MaskedTextBox

The MaskedTextBox JSP tag is a server-side wrapper for the [Kendo UI MaskedTextBox](/api/web/maskedtextbox) widget.

## Getting Started

Here is how to configure a simple Kendo MaskedTextBox:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/maskedtextbox/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a maskedtextbox tag:

        <kendo:maskedTextBox name="maskedtextbox" mask="(999) 000-0000" value="555 123 4567">
        </kendo:maskedTextBox>

### Define widget's mask value

The MaskedTextBox has [a list of predefined mask rules](/web/maskedtextbox/overview#predefined-mask-rules),
which can be used to compose the widget's mask.

#### Set a `zip code` mask

        <kendo:maskedTextBox name="maskedtextbox" mask="00000-9999">
        </kendo:maskedTextBox>

> If no mask is defined widget will allow any input.

### Define a custom mask rule

The MaskedTextBox gives the ability to define custom mask rules if no of the predefined ones is sufficient.
To add a custom rule use the **rules** attribute:

#### Define a custom rule for "-" and "+" symbols

        <%
            HashMap<String, String> rules = new HashMap<String, String>();

            rules.put("~", "/[+-]/");
        %>

        <kendo:maskedTextBox name="maskedtextbox" mask="~0000" rules="<%=rules%>">
        </kendo:maskedTextBox>

> Widgets supports [JavaScript Reguler Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
defined as a string or JavaScript function.

## Accessing an Existing MaskedTextBox

You can reference an existing MaskedTextBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/maskedtextbox#methods) to control its behavior.

### Accessing an existing MaskedTextBox instance

    //Put this after your Kendo MaskedTextBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the maskedtextbox is used to get its client-side instance
        var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
    });
    </script>

## Handling Kendo UI MaskedTextBox events

You can subscribe to all [events](/api/web/maskedtextbox#events) exposed by Kendo UI MaskedTextBox:

### Subscribe by handler name

    <kendo:maskedTextBox name="maskedtextbox" change="maskedtextbox_change"></kendo:maskedTextBox>

    <script>
        function maskedtextbox_change() {
            //Handle the change event
        }
    </script>
