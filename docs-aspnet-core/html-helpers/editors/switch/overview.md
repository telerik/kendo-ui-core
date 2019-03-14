---
title: Overview
page_title: Switch | UI for ASP.NET Core Switch HtmlHelper
description: "Learn the basics when working with the Kendo UI Switch for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_switchhelper_aspnetcore
position: 1
---

# Switch HtmlHelper Overview

The Switch HtmlHelper extension is a server-side wrapper for the [Kendo UI Switch](https://demos.telerik.com/kendo-ui/switch/index) widget.

## Getting Started

### The Basics

The Kendo UI Switch displays two exclusive choices.

### Configuration

Add the Switch.

###### Example

```
    @(Html.Kendo().Switch()
        .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
        .Checked(true)
    )
```

## Event Handling

You can subscribe to all Switch [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

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

## Customization

### Custom Switch Layout

With the new Switch variables introduced in R1 2019 release, the default styling of the Switch component for each of the [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout.

For more information and examples, refer to the [Custom Switch Component Layout](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout) article, which demonstrates how to override the default Sass values in order to achieve any of the predefined custom layouts.

## Reference

### Existing Instances

To reference an existing Kendo UI Switch instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch) to control its behavior.

###### Example

```
    // Put this after your Kendo UI Switch for ASP.NET Core declaration.
    <script>
        $(function() {
            //Notice that the Name() of the Switch is used to get its client-side instance.
            var switch = $("#switch").data("kendoSwitch");
        });
    </script>
```

## See Also

* [Overview of the Kendo UI Switch Widget](https://docs.telerik.com/kendo-ui/controls/editors/switch/overview)
* [UI for ASP.NET Core Switch official live demos](https://demos.telerik.com/aspnet-core/switch)
