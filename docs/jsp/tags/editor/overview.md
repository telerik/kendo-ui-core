---
title: Overview
page_title: Overview | Editor JSP Tag
description: "Get started with the Editor JSP tag in Kendo UI."
slug: overview_editor_uiforjsp
position: 1
---

# Editor JSP Tag Overview

The Editor JSP tag is a server-side wrapper for the [Kendo UI Editor](/api/javascript/ui/editor) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Editor.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/editor/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `editor` tag.

###### Example

        <kendo:editor name="editor">
        </kendo:editor>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Editor](/api/javascript/ui/editor#events) by the handler name.

###### Example

    <kendo:editor name="editor" change="editor_change"></kendo:editor>

    <script>
        function editor_change() {
            // Handle the change event
        }
    </script>

## Reference

### Existing Instances

You are able to reference an existing Editor instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Editor API](/api/javascript/ui/editor#methods) to control its behavior.

###### Example

    // Put this after your Kendo Editor tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the editor is used to get its client-side instance
        var editor = $("#editor").data("kendoEditor");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Editor:

* [Overview of the Kendo UI Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
