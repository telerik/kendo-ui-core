---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI NumericTextBox for {{ site.framework }}."
previous_url: /helpers/html-helpers/numerictextbox, /helpers/editors/numerictextbox/overview
slug: htmlhelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox HtmlHelper Overview

The Telerik UI NumericTextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI NumericTextBox widget.

The NumericTextBox allows the user to select numeric values through direct input or using spinner buttons.

* [Demo page for the NumericTextBox](https://demos.telerik.com/{{ site.platform }}/numerictextbox/index)

## Initializing the NumericTextBox

The following example demonstrates the basic configuration for the NumericTextBox.


    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
          .Min(-100) // Set the min value of the NumericTextBox.
          .Max(100) // Set the min value of the NumericTextBox.
          .Value(10) // Set the value of the NumericTextBox.
    )

## Functionality and Features

* [Formats]({% slug formats_numerictextbox_aspnetcore %})
* [Input Restrictions]({% slug input_restrictions_numerictextbox_aspnetcore %})
* [Globalization]({% slug globalization_numerictextbox_aspnetcore %})
* [Accessibility]({% slug accessibility_numerictextbox_aspnetcore %})

## Events

You can subscribe to all NumericTextBox events. For a complete example on basic NumericTextBox events, refer to the [demo on using the events of the NumericTextBox](https://demos.telerik.com/{{ site.platform }}/numerictextbox/events).

The following example demonstrates how to subscribe to events by a handler name.

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

To get a reference to the NumericTextBox, always use the `id` attribute instead of a class selector. Behind the scenes, the NumericTextBox creates a secondary element that represents the visual look of the helper and copies all non-`id` attributes including the class. When you use the class for referencing the NumericTextBox, this behavior causes unexpected results.

Once a reference is established, use the [NumericTextBox client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox#methods) to control its behavior.

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

* [Basic Usage by the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/index)
* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Known Limitations of the NumericTextBox HtmlHelper for {{ site.framework }}]({% slug limitations_numerictextbox_aspnetcore %})
* [Server-Side API](/api/numerictextbox)
