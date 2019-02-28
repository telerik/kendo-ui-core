---
title: Overview
page_title: Dialog | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Dialog HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_dialoghelper_aspnetcore
position: 1
---

# Dialog HtmlHelper Overview

The Dialog HtmlHelper extension is a server-side wrapper for the [Kendo UI Dialog](https://demos.telerik.com/kendo-ui/dialog/index) widget.

The Dialog is a modal popup that brings information to the user. It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI Window widget]({% slug htmlhelpers_window_aspnetcore %}) where the most prominent difference is the added functionality for actions and predefined dialogs.

## Basic Usage

Usually, a Dialog is opened as a result of a user action rather than of the `load` event of the page. The [Dialog JavaScript API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog) provides methods for handling such scenarios. Basically, the widget can be initialized as non-visible and can be opened when needed.

The following example demonstrates how to define the Dialog by using the Dialog HtmlHelper.

###### Example

    @(Html.Kendo().Dialog()
        .Name("dialog") //The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
        .Title("Software Update")//Set the title of the Dialog.
        .Content("Do you agree terms and conditions?") //Define the content of the Dialog.
        .Visible(false) //The widget will be initialized as invisible
    )

## Configuration

The Dialog provides default configuration options that can be set during initialization.

Some of the properties that can be overridden and controlled are:

* [Dimensions (height and width)]({% slug dimensions_dialoghelper_aspnetcore %})
* [Custom action buttons and button layout]({% slug action_buttons_dialoghelper_aspnetcore %})
* Title and **Close** buttons
* Animation effects and duration
* Modality
* Predefined dialogs
* Content

The following example demonstrates a basic configuration of the Dialog HtmlHelper and how to get the Dialog instance.

###### Example

    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        .Content("Do you agree terms and conditions?")
        .Width(400)  //Set the width of the Dialog.
        .Modal(false) // Disable the modality of the Dialog.
        .ButtonLayout("stretched") //Set a "stretched" layout for the action buttons.
        .Actions(actions =>
        {
            actions.Add().Text("NO"); //Set text of the first button.
            actions.Add().Text("YES").Primary(true); //Set text of the second button and define it as primary.
        })
    )

    <script type="text/javascript">
        $(function() {
            //Notice that the Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
    </script>

## Event Handling

You can subscribe to all Dialog [events](/api/Kendo.Mvc.UI.Fluent/DialogEventBuilder).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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
            //Handle the InitOpen event.
        }

        function onOpen(e) {
            //Handle the open event.
        }

        function onClose(e) {
            //Handle the close event.
        }

        function onShow(e) {
            //Handle the show event.
        }

        function onHide(e) {
            //Handle the hide event.
        }
    </script>
```

## See Also

* [Overview of the Kendo UI jQuery Dialog Widget](https://docs.telerik.com/kendo-ui/controls/layout/dialog/overview)
* [Overview of the UI for ASP.NET Core Window]({% slug htmlhelpers_window_aspnetcore %})
* [UI for ASP.NET Core Dialog live demos](https://demos.telerik.com/aspnet-core/dialog)
