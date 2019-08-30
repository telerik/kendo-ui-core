---
title: Overview
page_title: Switch Overview | Telerik UI Switch HtmlHelper for ASP.NET MVC
description: "Learn the basics when working with the Telerik UI Switch for ASP.NET MVC."
slug: overview_switchhelper_aspnetmvc
position: 1
---

# Switch HtmlHelper Overview

The Telerik UI Switch HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Switch widget.

The Switch displays two exclusive choices. With the new Switch variables introduced in the Kendo UI for jQuery R1 2019 release, the default styling of the Switch component for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on implementing a [custom layout for the Switch](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

* [Demo page for the Switch](https://demos.telerik.com/aspnet-mvc/switch)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

    public ActionResult Index()
    {
        return View();
    }

1. Add the Switch.

   ```tab-Razor
        @(Html.Kendo().Switch()
            .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the Switch.
            .Checked(true)
        )
    ```
    ```tab-ASPX
        <%: Html.Kendo().Switch()
            .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the Switch.
            .Checked(true)
        %>
    ```

## Events

You can subscribe to all Switch [events](/api/switch). For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/aspnet-mvc/switch/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```tab-Razor
    @(Html.Kendo().Switch()
            .Name("switch")
            .Events(e => e
                .Change("change")
            )
    )
    <script>
    function change() {
        // Handle the change event.
    }
    </script>
```
```tab-ASPX
    <%: Html.Kendo().Switch()
            .Name("switch")
            .Events(e => e
                .Change("change")
            )
    %>
    <script>
        function change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```tab-Razor
    @(Html.Kendo().Switch()
            .Name("switch")
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

To reference an existing Kendo UI Switch instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/switch) to control its behavior.

    // Place the following after the Switch for ASP.NET MVC declaration.
    <script>
    $(function() {
        // The Name() of the Switch is used to get its client-side instance.
        var switch = $("#switch").data("kendoSwitch");
    });
    </script>

## See Also

* [Basic Usage by the Switch HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/switch)
* [Using the API of the Switch HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/switch/api)
* [SwitchBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SwitchBuilder)
* [Switch Server-Side API](/api/switch)
