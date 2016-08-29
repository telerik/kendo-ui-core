---
title: Overview
page_title: Overview | Dialog JSP Tag
description: "Get started with the Dialog JSP tag in Kendo UI."
slug: overview_dialog_uiforjsp
position: 1
---

# Dialog JSP Tag Overview

The Dialog JSP tag is a server-side wrapper for the [Kendo UI Dialog](/api/javascript/ui/dialog) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Dialog.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/dialog/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `dialog` tag.

###### Example

    <kendo:dialog name="dialog" title="Software Update" closable="false" modal="false"
                content="Do you agree terms and conditions?">
        <kendo:dialog-actions>
            <kendo:dialog-action text="NO" />
            <kendo:dialog-action text="YES" primary="true" />
        </kendo:dialog-actions>
    </kendo:dialog>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Dialog](/api/javascript/ui/dialog#events) by the handler name.

###### Example

    <kendo:dialog name="dialog"  open="dialog_open" close="dialog_close">
    </kendo:dialog>

    <script>
        function dialog_open() {
            // Handle the open event
        }

        function dialog_close() {
            // Handle the close event
        }
    </script>

## Reference

### Existing Instances

To refer to an existing Dialog instance, use [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Dialog API](/api/javascript/ui/dialog#methods) to control its behavior.

###### Example

    // Put this after your Kendo Dialog tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the dialog is used to get its client-side instance
        var dialogObject = $("#dialog").data("kendoDialog");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Dialog:

* [Overview of the Kendo UI Dialog Widget]({% slug overview_kendoui_dialog_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
