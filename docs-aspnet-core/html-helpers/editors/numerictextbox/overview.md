---
title: Overview
page_title: NumericTextBox Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI NumericTextBox for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/numerictextbox
slug: htmlhelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox HtmlHelper Overview

The Telerik UI NumericTextBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI NumericTextBox widget.

The NumericTextBox allows the user to select numeric values through direct input or using spinner buttons.

* [Demo page for the NumericTextBox](https://demos.telerik.com/aspnet-core/numerictextbox/index)

## Initializing the NumericTextBox

The following example demonstrates the basic configuration for the NumericTextBox.

```
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
    )
```

## Functionality and Features

* [Formats]({% slug formats_numerictextbox_aspnetcore %})
* [Input Restrictions]({% slug input_restrictions_numerictextbox_aspnetcore %})
* [Globalization]({% slug globalization_numerictextbox_aspnetcore %})
* [Accessibility]({% slug accessibility_numerictextbox_aspnetcore %})

For more information on the known limitations of the NumericTextBox, refer to [this article]({% slug limitations_numerictextbox_aspnetcore %}).

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

To get a reference to the NumericTextBox, always use the `id` attribute instead of a class selector. Behind the scenes, the NumericTextBox creates a secondary element that represents the visual look of the helper and copies all non-`id` attributes including the class. When you use the class for referencing the NumericTextBox, this behavior causes unexpected results.

The following example demonstrates how to get a reference to an existing instance.

```
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the helper.
    )

    <script>
        var numericTextBox = $('#numerictextbox').data('kendoNumericTextBox'); // numericTextBox is a reference to the instance of the helper.
    </script>
```

## See Also

* [Basic Usage by the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/index)
* [Using the API of the NumericTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/api)
* [Server-Side API](/api/numerictextbox)
