---
title: Overview
page_title: Overview | MaskedTextBox JSP Tag
description: "Get started with the MaskedTextBox JSP tag in Kendo UI."
slug: overview_maskedtextbox_uiforjsp
position: 1
---

# MaskedTextBox JSP Tag Overview

The MaskedTextBox JSP tag is a server-side wrapper for the [Kendo UI MaskedTextBox](/api/javascript/ui/maskedtextbox) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MaskedTextBox for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/maskedtextbox/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `maskedtextbox` tag.

###### Example

        <kendo:maskedTextBox name="maskedtextbox" mask="(999) 000-0000" value="555 123 4567">
        </kendo:maskedTextBox>

### Mask Values Definition

The MaskedTextBox has [a list of predefined mask rules]({% slug overview_kendoui_maskedtextbox_widget %}##configuration-Rules), which can be used to compose the mask of the widget.

The example below demonstrates how to set a `zip code` mask.

###### Example

        <kendo:maskedTextBox name="maskedtextbox" mask="00000-9999">
        </kendo:maskedTextBox>

> **Important**
>
> If no mask is defined, widget allows for any input.

### Custom Mask Rules Setup

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is sufficient. To add a custom rule, use the `rules` attribute.

The example below demonstrates how to defines a custom rule for the `-` and `+` symbols.

###### Example

        <%
            HashMap<String, String> rules = new HashMap<String, String>();

            rules.put("~", "/[+-]/");
        %>

        <kendo:maskedTextBox name="maskedtextbox" mask="~0000" rules="<%=rules%>">
        </kendo:maskedTextBox>

> **Important**
>
> The widgets support [JavaScript Reguler Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), defined as a string or a JavaScript function.

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI MaskedTextBox](/api/javascript/ui/maskedtextbox#events) by the handler name.

###### Example

    <kendo:maskedTextBox name="maskedtextbox" change="maskedtextbox_change"></kendo:maskedTextBox>

    <script>
        function maskedtextbox_change() {
            //Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing MaskedTextBox instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [MaskedTextBox API](/api/javascript/ui/maskedtextbox#methods) to control its behavior.

###### Example

    //Put this after your Kendo MaskedTextBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the maskedtextbox is used to get its client-side instance
        var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the MaskedTextBox:

* [Overview of the Kendo UI MaskedTextBox Widget]({% slug overview_kendoui_maskedtextbox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
