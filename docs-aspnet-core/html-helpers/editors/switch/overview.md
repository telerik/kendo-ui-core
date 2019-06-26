---
title: Overview
page_title: Switch Overview | UI for ASP.NET Core Switch HtmlHelper
description: "Learn the basics when working with the Kendo UI Switch for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_switchhelper_aspnetcore
position: 1
---

# Switch HtmlHelper Overview

The Kendo UI Switch displays two exclusive choices.

With the new Switch variables introduced in the Kendo UI R1 2019 release, the default styling of the Switch component for each of the [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on [custom Switch layout](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

The Switch HtmlHelper extension is a server-side wrapper for the [Kendo UI Switch](https://demos.telerik.com/kendo-ui/switch/index) widget. For more information on the Switch HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/switch/overview).

## Initializing the Switch

The following example demonstrates how to how to define the Switch by using the Switch HtmlHelper.

```
    @(Html.Kendo().Switch()
        .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
        .Checked(true)
    )
```

## Events

You can subscribe to all Switch [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch#events). For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/aspnet-core/switch/events).

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

To reference an existing Kendo UI Switch instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch) to control its behavior.

```
    // Place this after your Kendo UI Switch for ASP.NET Core declaration.
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
* [JavaScript API Reference of the Switch](http://docs.telerik.com/kendo-ui/api/javascript/ui/switch)
