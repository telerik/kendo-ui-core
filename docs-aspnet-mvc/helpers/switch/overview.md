---
title: Overview
page_title: Overview | Kendo UI Switch HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Switch widget for ASP.NET MVC."
slug: overview_switchhelper_aspnetmvc
position: 1
---

# Switch HtmlHelper Overview

The Switch HtmlHelper extension is a server-side wrapper for the [Kendo UI Switch](https://demos.telerik.com/kendo-ui/switch/index) widget.

## Getting Started

### The Basics

The Kendo UI Switch displays two exclusive choices.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Switch.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

  ###### Example

    public ActionResult Index()
    {
        return View();
    }

1. Add the Switch.

  ###### Example

    ```tab-Razor
        @(Html.Kendo().Switch()
            .Name("switch") //The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
            .Checked(true)
        )
    ```
    ```tab-ASPX
        <%: Html.Kendo().Switch()
            .Name("switch") //The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
            .Checked(true)
        %>
    ```

## Event Handling

You can subscribe to all Switch [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/switch#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-Razor
    @(Html.Kendo().Switch()
            .Name("switch")
            .Events(e => e
                .Change("change")
            )
    )
    <script>
    function change() {
        //Handle the change event.
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
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor
    @(Html.Kendo().Switch()
            .Name("switch")
            .Events(e => e
                .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
                </text>)
            )
    )
```

## Customization

### Custom Switch Layout

With the new Switch variables introduced in R1 2019 release, the default styling of the Switch component for each of the [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout.

For more information and examples, refer to the [Custom Switch Component Layout](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout) article, which demonstrates how to override the default Sass values in order to achieve any of the predefined custom layouts.

## Reference

### Existing Instances

To reference an existing Kendo UI Switch instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch API](http://docs.telerik.com/kendo-ui/api/javascript/ui/switch) to control its behavior.

###### Example

    // Place this after your Kendo UI Switch for ASP.NET MVC declaration.
    <script>
    $(function() {
        // Notice that the Name() of the Switch is used to get its client-side instance.
        var switch = $("#switch").data("kendoSwitch");
    });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: SwitchBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SwitchBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Switch Widget](http://docs.telerik.com/kendo-ui/controls/editors/switch/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
