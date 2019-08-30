---
title: Overview
page_title: NumericTextBox Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI NumericTextBox for ASP.NET MVC."
slug: overview_numerictextboxhelper_aspnetmvc
position: 1
---

# NumericTextBox HtmlHelper Overview

The Telerik UI NumericTextBox HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI NumericTextBox widget.

The NumericTextBox allows the user to select numeric values through direct input or using spinner buttons.

* [Demo page for the NumericTextBox](https://demos.telerik.com/aspnet-mvc/numerictextbox)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a NumericTextBox.

    ```ASPX
        <%: Html.Kendo().NumericTextBox()
            .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the NumericTextBox.
            .Min(-100) // Set the min value of the NumericTextBox.
            .Max(100) // Set the min value of the NumericTextBox.
            .Value(10) // Set the value of the NumericTextBoxNumericTextBox.
        %>
    ```
    ```Razor
        @(Html.Kendo().NumericTextBox()
            .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the NumericTextBox.
            .Min(-100) // Set the min value of the NumericTextBox.
            .Max(100) // Set the min value of the NumericTextBox.
            .Value(10) // Set the value of the NumericTextBox.
        )
    ```

## Events

You can subscribe to all NumericTextBox [events](/api/numerictextbox). For a complete example on basic NumericTextBox events, refer to the [demo on using the events of the NumericTextBox](https://demos.telerik.com/aspnet-mvc/numerictextbox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().NumericTextBox()
        .Name("numerictextbox")
        .Events(e => e
            .Change("numerictextbox_change")
            .Spin("numerictextbox_spin")
        )
    %>
    <script>
        function numerictextbox_spin() {
            // Handle the spin event.
        }

        function numerictextbox_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().NumericTextBox()
        .Name("numerictextbox")
        .Events(e => e
                .Change("numerictextbox_change")
                .Spin("numerictextbox_spin")
        )
    )
    <script>
        function numerictextbox_spin() {
            // Handle the spin event.
        }

        function numerictextbox_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().NumericTextBox()
        .Name("numerictextbox")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
            .Spin(@<text>
                function() {
                    // Handle the spin event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI NumericTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [NumericTextBox client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox#methods) to control its behavior.

    // Place the following after the NumericTextBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the NumericTextBox is used to get its client-side instance.
            var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
        });
    </script>

## See Also

* [Basic Usage by the NumericTextBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/numerictextbox/index)
* [Using the API of the NumericTextBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/numerictextbox/api)
* [NumericTextBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder)
* [NumericTextBox Server-Side API](/api/numerictextbox)
