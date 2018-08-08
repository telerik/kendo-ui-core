---
title: Overview
page_title: Overview | UI for ASP.NET Core Dialog HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Dialog widget for ASP.NET Core."
slug: overview_dialoghelper_aspnetcore
position: 1
---

# Dialog HtmlHelper Overview

The Dialog HtmlHelper extension is a server-side wrapper for the [Kendo UI Dialog](https://demos.telerik.com/kendo-ui/dialog/index) widget.

## Configuration

1. Add a Dialog.

    ###### Example

    ```
        @(Html.Kendo().Dialog()
              .Name("dialog") //The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
              .Title("Software Update")//Set the title of the Dialog.
              .Content("Do you agree terms and conditions?") //Define the content of the Dialog.
              .Width(400)  //Set the width of the Dialog.
              .Modal(false) // Disable the modality of the Dialog.
              .ButtonLayout("stretched") //Set a "stretched" layout for the action buttons.
              .Actions(actions =>
                {
                    actions.Add().Text("NO"); //Set text of the first button.
                    actions.Add().Text("YES").Primary(true); //Set text of the second button and define it as primary.
                })
        )
    ```

## Event Handling

You can subscribe to all Dialog [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Events(e => e
              .Open("dialog_open")
              .Close("dialog_close")
        )
    )
    <script>
        function dialog_open(e) {
            //Handle the open event.
        }

        function dialog_close(e) {
            //Handle the close event.
        }
    </script>
```

## Reference

### Existing Instances

To refer to an existing Kendo UI Dialog instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Dialog API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog#methods) to control its behavior.

###### Example

```
    // Put this after your Kendo UI Dialog for ASP.NET Core declaration.
    <script>
        $(function() {
            // Notice that the Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
    </script>
```

## See Also

* [Overview of the Kendo UI jQuery Dialog Widget](https://docs.telerik.com/kendo-ui/controls/layout/dialog/overview)
* [Overview of the UI for ASP.NET Core Window]({% slug htmlhelpers_window_aspnetcore %})
* [UI for ASP.NET Core Dialog live demos](https://demos.telerik.com/aspnet-core/dialog)