---
title: Overview
page_title: MaskedTextBox Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI MaskedTextBox for ASP.NET MVC."
slug: overview_maskedtextboxhelper_aspnetmvc
position: 1
---

# MaskedTextBox HtmlHelper Overview

The Telerik UI MaskedTextBox HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI MaskedTextBox widget.

The MaskedTextBox enables a controlled text input that is based on a specific format.

* [Demo page for the MaskedTextBox](https://demos.telerik.com/aspnet-mvc/maskedtextbox)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a MaskedTextBox.

    ```ASPX
        <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox") // The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
            .Mask("(000) 000-0000") // Set the mask value of the MaskedTextBox.
            .Value("(123) 345-6789") // Set the value of the MaskedTextBox.
        %>
    ```
    ```Razor
        @(Html.Kendo().MaskedTextBox()
                .Name("maskedtextbox") // The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
                .Mask("(000) 000-0000") // Set the mask value of the MaskedTextBox.
                .Value("(123) 345-6789") // Set the value of the MaskedTextBox.
        )
    ```

## Functionality and Features

The MaskedTextBox provides options for [using predefined and custom masks rules and validate user input]({% slug validation_maskedtextbox_aspnetmvc %}).

## Events

You can subscribe to all MaskedTextBox [events](/api/maskedtextbox). For a complete example on basic MaskedTextBox events, refer to the [demo on using the events of the MaskedTextBox](https://demos.telerik.com/aspnet-mvc/maskedtextbox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox")
            .Events(e => e
                .Change("maskedtextbox_change")
            )
    %>
    <script>
        function maskedtextbox_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change("maskedtextbox_change")
        )
    )
    <script>
        function maskedtextbox_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI MaskedTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MaskedTextBox client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#methods) to control its behavior.

    // Place the following after the MaskedTextBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the MaskedTextBox is used to get its client-side instance.
            var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
        });
    </script>

## See Also

* [Basic Usage of the MaskedTextBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/maskedtextbox/index)
* [Using the API of the MaskedTextBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/maskedtextbox/api)
* [MaskedTextBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MaskedTextBoxBuilder)
* [MaskedTextBox Server-Side API](/api/maskedtextbox)
