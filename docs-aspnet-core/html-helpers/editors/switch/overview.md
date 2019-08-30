---
title: Overview
page_title: Switch Overview | Telerik UI Switch HtmlHelper for ASP.NET Core
description: "Learn the basics when working with the Telerik UI Switch for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_switchhelper_aspnetcore
position: 1
---

# Switch HtmlHelper Overview

The Telerik UI Switch HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Switch widget.

The Switch displays two exclusive choices. With the new Switch variables introduced in the Kendo UI for jQuery R1 2019 release, the default styling of the Switch component for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on implementing a [custom layout for the Switch](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

* [Demo page for the Switch](https://demos.telerik.com/aspnet-core/switch/index)

## Initializing the Switch

The following example demonstrates how to how to define the Switch by using the Switch HtmlHelper.

```
    @(Html.Kendo().Switch()
        .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
        .Checked(true)
    )
```

## Events

You can subscribe to all Switch events. For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/aspnet-core/switch/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change("change")
        )
    )
    <script>
        function change(e) {
            //Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  //Handle the change event inline.
              }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Telerik UI Switch instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch API](/api/switch) to control its behavior.

```
    // Place the following after your Telerik UI Switch for ASP.NET Core declaration.
    <script>
        $(function() {
            // The Name() of the Switch is used to get its client-side instance.
            var switch = $("#switch").data("kendoSwitch");
        });
    </script>
```

## See Also

* [Basic Usage by the Switch HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/switch)
* [Using the API of the Switch HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/switch/api)
* [Server-Side API](/api/switch)
