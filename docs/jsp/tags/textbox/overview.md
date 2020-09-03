---
title: Overview
page_title: Overview | TextBox JSP Tag
description: "How to configure and use the TextBox JSP tag in Kendo UI."
slug: overview_textbox_uiforjsp
---

# TextBox JSP Tag Overview

The TextBox JSP tag is a server-side wrapper for the [Kendo UI TextBox](https://demos.telerik.com/kendo-ui/textbox/index) widget.

The Kendo UI TextBox widget converts an `<input>` element into a styled input.

## Getting Started

### Configuration

The TextBox provides a set of [default API configuration options](/api/jsp/textbox) that can be set during its initialization such as value, placeholder, and so on. Below are listed the steps for you to follow when configuring the Kendo UI TextBox.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "textbox/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add a `TextBox` tag.

    <kendo:textBox name="textbox" placeholder="Name..." style="width: 100%;"></kendo:textBox>

### Labels

The Label enables you to associate a `label` HTML element with a TextBox.

* [Demo page for the TextBox Floating Label](https://demos.telerik.com/jsp-ui/textbox/floating-label) 

The example below demonstrates how to add a floating label to a TextBox.

    <kendo:textBox name="textbox">
        <kendo:textBox-label content="Name" floating="true"></kendo:textBox-label>
    </kendo:textBox>

    <style>
        .k-floating-label-container {
            width: 100%;
        }
    </style>

## Event Handling

### Subscribe to Events

You can subscribe to the [change](/api/javascript/ui/textbox/events/change) event by the handler name. The `change` fires each time a new value is set by the user.  For a full list, refer to the TextBox events documentation in the API section.

> **Important:** The [`change`](/api/javascript/ui/textbox/events/change) event is not fired when the value of the widget is changed from JavaScript code.

    <kendo:textBox name="textbox" change="onChange" style="width: 100%;"></kendo:textBox>
    <script>
        function onChange() {
            console.log("Change :: " + this.value());
        }
    </script>

## Reference

### Existing Instances

To reference to an existing TextBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textbox) to control its behavior.

The following example demonstrates how to access an existing TextBox instance.

    //Put this after your Kendo TextBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the TextBox is used to get its client-side instance
        var textbox = $("#textbox").data("kendoTextBox");
    });
    </script>

## See Also

* [Overview of the Kendo UI TextBox Widget]({% slug overview_kendoui_textbox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/textbox)
