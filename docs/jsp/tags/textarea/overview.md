---
title: Overview
page_title: Overview | TextArea JSP Tag
description: "How to configure and use the TextArea JSP tag in Kendo UI."
slug: overview_textarea_uiforjsp
---

# TextArea JSP Tag Overview

The TextArea JSP tag is a server-side wrapper for the [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index) widget.

The Kendo UI TextArea widget converts a `<textarea>` element into a styled textarea.

## Getting Started

### Configuration

The TextArea provides a set of [default API configuration options](/api/jsp/textarea) that can be set during its initialization such as value, placeholder, and so on. Below are listed the steps for you to follow when configuring the Kendo UI TextArea.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "textarea/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add a `TextArea` tag.

    <kendo:textArea name="description" rows="5" placeholder="Description..." style="width: 100%;"></kendo:textArea>

### Labels

The Label enables you to associate a `label` HTML element with a TextArea.

* [Demo page for the TextArea Floating Label](https://demos.telerik.com/jsp-ui/textarea/floating-label) 

The example below demonstrates how to add a floating label to a TextArea.

    <kendo:textArea name="description" rows="5">
        <kendo:textArea-label content="Description" floating="true"></kendo:textArea-label>
    </kendo:textArea>

    <style>
        .k-floating-label-container {
            width: 100%;
        }
    </style>

## Event Handling

### Subscribe to Events

You can subscribe to the [change](/api/javascript/ui/textarea/events/change) event by the handler name. The `change` fires each time a new value is set by the user.  For a full list, refer to the TextArea events documentation in the API section.

> **Important:** The [`change`](/api/javascript/ui/textarea/events/change) event is not fired when the value of the widget is changed from JavaScript code.

    <kendo:textArea rows="5" name="description" change="onChange" style="width: 100%;"></kendo:textArea>
    <script>
        function onChange() {
            console.log("Change :: " + this.value());
        }
    </script>

## Reference

### Existing Instances

To reference to an existing TextArea instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textarea) to control its behavior.

The following example demonstrates how to access an existing TextArea instance.

    //Put this after your Kendo TextArea tag declaration
    <script>
        $(function() {
            // Notice that the Name() of the TextArea is used to get its client-side instance
            var textarea = $("#description").data("kendoTextArea");
        });
    </script>

## See Also

* [Overview of the Kendo UI TextArea Widget]({% slug overview_kendoui_textarea_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/textarea)
