---
title: Overview
---

# Editor

The Editor JSP tag is a server-side wrapper for the [Kendo UI Editor](/api/web/editor) widget.

## Getting Started

Here is how to configure a simple Kendo Editor:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/editor/index";
        }

3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a editor tag:

        <kendo:editor name="editor">
        </kendo:editor>

## Accessing an Existing Editor

You can reference an existing Editor instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/editor#methods) to control its behavior.

### Accessing an existing Editor instance

    // Put this after your Kendo Editor tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the editor is used to get its client-side instance
        var editor = $("#editor").data("kendoEditor");
    });
    </script>

## Handling Kendo UI Editor events

You can subscribe to all [events](/api/web/editor#events) exposed by Kendo UI Editor:

### Subscribe by handler name

    <kendo:editor name="editor" change="editor_change"></kendo:editor>

    <script>
        function editor_change() {
            // Handle the change event
        }
    </script>
