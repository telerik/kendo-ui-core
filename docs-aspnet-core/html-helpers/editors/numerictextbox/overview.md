---
title: Overview
page_title: NumericTextBox Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Telerik UI NumericTextBox for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/numerictextbox
slug: htmlhelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox HtmlHelper Overview

The Telerik UI NumericTextBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MultiSelect widget.

The NumericTextBox converts an `input` element into a numeric, percentage, or currency textbox.

* [Demo page for the NumericTextBox](https://demos.telerik.com/aspnet-core/numerictextbox/index)

## Basic Configuration

The following example demonstrates the basic configuration for the NumericTextBox.

```
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
          .Min(-100) // Set the min value of the NumericTextBox.
          .Max(100) // Set the min value of the NumericTextBox.
          .Value(10) // Set the value of the NumericTextBox.
    )
```

## Events

You can subscribe to all NumericTextBox events. For a complete example on basic NumericTextBox events, refer to the [demo on using the events of the NumericTextBox](https://demos.telerik.com/aspnet-core/numerictextbox/events).

The following example demonstrates how to subscribe to events by a handler name.

```
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

## Referencing Existing Instances

To reference an existing Telerik UI NumericTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [NumericTextBox API](/api/numerictextbox) to control its behavior.

The following example demonstrates how to access an existing NumericTextBox instance.

      // Place this after your Telerik UI NumericTextBox for ASP.NET Core declaration.
      <script>
      $(function() {
          // The Name() of the NumericTextBox is used to get its client-side instance.
          var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
      });
      </script>

## See Also

* [Basic Usage by the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/index)
* [Using the API of the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/api)
* [API Reference of the NumericTextBox HtmlHelper for ASP.NET Core](/api/numerictextbox)
