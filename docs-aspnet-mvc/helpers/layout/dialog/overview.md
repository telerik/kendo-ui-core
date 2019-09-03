---
title: Overview
page_title: Dialog Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Dialog HtmlHelper for ASP.NET MVC."
slug: overview_dialoghelper_aspnetmvc
position: 1
---

# Dialog HtmlHelper Overview

The Telerik UI Dialog HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Dialog widget.

The Dialog is a modal popup that brings information to the user. It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI for jQuery Window]({% slug overview_windowhelper_aspnetmvc %}) where the most prominent difference is the added functionality for actions and predefined dialogs.

* [Demo page for the Dialog](https://demos.telerik.com/aspnet-mvc/dialog)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

      public ActionResult Index()
        {
            return View();
        }

1. Add a Dialog.

    ```ASPX
        <% Html.Kendo().Dialog()
            .Name("dialog") // The name of the Dialog is mandatory. It specifies the "id" attribute of the Dialog.
            .Title("Software Update")// Set the title of the Dialog.
            .Content("Do you agree terms and conditions?") // Define the content of the Dialog.
            .Width(400)  // Set the width of the Dialog.
            .Modal(false) // Disable the modality of the Dialog.
            .ButtonLayout("stretched") // Set a "stretched" layout for the action buttons.
            .Actions(actions =>
            {
                actions.Add().Text("NO"); // Set text of the first button.
                actions.Add().Text("YES").Primary(true); // Set text of the second button and define it as primary.
            })
            .Render(); //Render the Dialog.
        %>
    ```
    ```Razor
        @(Html.Kendo().Dialog()
            .Name("dialog") // The name of the Dialog is mandatory. It specifies the "id" attribute of the Dialog.
            .Title("Software Update")// Set the title of the Dialog.
            .Content("Do you agree terms and conditions?") // Define the content of the Dialog.
            .Width(400)  // Set the width of the Dialog.
            .Modal(false) // Disable the modality of the Dialog.
            .ButtonLayout("stretched") // Set a "stretched" layout for the action buttons.
            .Actions(actions =>
            {
                actions.Add().Text("NO"); // Set text of the first button.
                actions.Add().Text("YES").Primary(true); // Set text of the second button and define it as primary.
            })
        )
    ```

## Events

You can subscribe to all Dialog [events](/api/dialog). For a complete example on basic Dialog events, refer to the [demo on using the events of the Dialog](https://demos.telerik.com/aspnet-mvc/dialog/events).

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Dialog()
            .Name("dialog")
            .Events(e => e
                .Open("dialog_open")
                .Close("dialog_close")
        )
    %>
    <script>
        function dialog_open() {
            // Handle the open event.
        }

        function dialog_close() {
            // Handle the close event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Events(e => e
            .Open("dialog_open")
            .Close("dialog_close")
        )
    )
    <script>
        function dialog_open() {
            // Handle the open event.
        }

        function dialog_close() {
            // Handle the close event.
        }
    </script>
```

## Referencing Existing Instances

To refer to an existing Kendo UI Dialog instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Dialog client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dialog#methods) to control its behavior.

    // Place the following after the Dialog for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
    </script>

## See Also

* [Basic Usage of the Dialog HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dialog)
* [Using the API of the Dialog HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dialog/api)
* [DialogBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DialogBuilder)
* [Dialog Server-Side API](/api/dialog)
