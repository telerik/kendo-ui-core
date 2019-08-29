---
title: Overview
page_title: DateInput Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI DateInput HtmlHelper for ASP.NET MVC."
slug: overview_dateinputhelper_aspnetmvc
position: 1
---

# DateInput HtmlHelper Overview

The Telerik UI DateInput HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI DateInput widget.

The DateInput represents an input field that recognizes and formats scheduling values such as dates.

* [Demo page for the DateInput](https://demos.telerik.com/aspnet-mvc/dateinput)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

      public ActionResult Index()
        {
            return View();
        }

1. Add a DateInput.

    ```ASPX
        <%: Html.Kendo().DateInput()
            .Name("dateinput") // The name of the DateInput is mandatory. It specifies the "id" attribute of the DateInput.
            .Value(DateTime.Today) // Set the value of the DateInput.
        %>
    ```
    ```Razor
        @(Html.Kendo().DateInput()
            .Name("dateinput") // The name of the DateInput is mandatory. It specifies the "id" attribute of the DateInput.
            .Value(DateTime.Today) // Set the value of the DateInput.
        )
    ```

## Events

You can subscribe to all DateInput [events](/api/dateinput). For a complete example on basic DateInput events, refer to the [demo on using the events of the DateInput](https://demos.telerik.com/aspnet-mvc/dateinput/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("dateInput_change")
        )
    %>
    <script>
        function dateInput_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("dateInput_change")
        )
    )
    <script>
        function dateInput_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().DateInput()
      .Name("dateinput")
      .Events(e => e
          .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
      )
    )
```

## Referencing Existing Instances

To reference an existing DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

    // Place the following after the DateInput for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
    </script>

## See Also

* [Basic Usage of the DateInput HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dateinput/index)
* [Using the API of the DateInput HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dateinput/api)
* [Server-Side API](/api/dateinput)
