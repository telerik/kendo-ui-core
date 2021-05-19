---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Dialog HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/dialog/overview
slug: overview_dialoghelper_aspnetcore
position: 1
---

# Dialog HtmlHelper Overview

The Telerik UI Dialog HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Dialog widget.

The Dialog is a modal popup that brings information to the user. It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI for jQuery Window]({% slug htmlhelpers_window_aspnetcore %}) where the most prominent difference is the added functionality for actions and predefined dialogs.

* [Demo page for the Dialog](https://demos.telerik.com/{{ site.platform }}/dialog/index)

## Initializing the Dialog

The Dialog is often opened as a result of a user action rather than of the `load` event of the page. Basically, you can initialize the widget as non-visible and open it when needed.

The following example demonstrates how to define the Dialog by using the Dialog HtmlHelper.

    @(Html.Kendo().Dialog()
        .Name("dialog") // The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
        .Title("Software Update")// Set the title of the Dialog.
        .Content("Do you agree terms and conditions?") // Define the content of the Dialog.
        .Visible(false) // The widget will be initialized as invisible.
    )

## Basic Configuration

The Dialog provides default configuration options that can be set during initialization such as its height and width, custom action buttons, title and **Close** buttons, animation effects and duration, and so on.

The following example demonstrates a basic configuration of the Dialog HtmlHelper.

    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        .Content("Do you agree terms and conditions?")
        .Width(400)  // Set the width of the Dialog.
        .Modal(false) // Disable the modality of the Dialog.
        .ButtonLayout("stretched") // Set a "stretched" layout for the action buttons.
        .Actions(actions =>
        {
            actions.Add().Text("NO"); // Set text of the first button.
            actions.Add().Text("YES").Primary(true); // Set text of the second button and define it as primary.
        })
    )

    <script type="text/javascript">
        $(function() {
            // The Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
    </script>

## Functionality and Features

* [Height and width]({% slug dimensions_dialoghelper_aspnetcore %})
* [Custom action buttons]({% slug action_buttons_dialoghelper_aspnetcore %})
* [HTML structure and DOM placement]({% slug structure_and_placement_dialoghelper_aspnetcore %})

## Events

You can subscribe to all Dialog events. For a complete example on basic Dialog events, refer to the [demo on using the events of the Dialog](https://demos.telerik.com/{{ site.platform }}/dialog/events).

The following example demonstrates how to subscribe to events by a handler name.

```
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Events(e => e
            .InitOpen("onInitOpen")
            .Open("dialog_open")
            .Close("dialog_close")
            .Show("onShow")
            .Hide("onHide")
        )
    )
    <script>
        function onInitOpen(e) {
            // Handle the InitOpen event.
        }

        function onOpen(e) {
            // Handle the open event.
        }

        function onClose(e) {
            // Handle the close event.
        }

        function onShow(e) {
            // Handle the show event.
        }

        function onHide(e) {
            // Handle the hide event.
        }
    </script>
```

## See Also

* [Basic Usage of the Dialog HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog)
* [Using the API of the Dialog HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog/api)
* [Server-Side API](/api/dialog)
