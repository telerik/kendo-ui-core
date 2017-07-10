---
title: Overview
page_title: Overview | Kendo UI ColorPalette HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ColorPalette widget for ASP.NET MVC."
slug: overview_colorpalettehelper_aspnetmvc
position: 1
---

# ColorPalette HtmlHelper Overview

The ColorPalette HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPalette](http://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPalette.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a ColorPalette.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().ColorPalette()
                    .Name("colorpalette") //The name of the ColorPalette is mandatory. It specifies the "id" attribute of the widget.
                    .Value("#ff0000") //Set the value of the ColorPalette.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().ColorPalette()
                  .Name("colorpalette") //The name of the ColorPalette is mandatory. It specifies the "id" attribute of the widget.
                  .Value("#ff0000") //Set the value of the ColorPalette.
            )
    ```

## Event Handling

You can subscribe to all ColorPalette [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().ColorPalette()
                .Name("colorpalette")
                .Events(e => e
                    .Change("colorpalette_change")
                )
        %>
        <script>
            function colorpalette_change() {
                //Handle the change event.
            }
        </script>
```
```tab-Razor

        @(Html.Kendo().ColorPalette()
              .Name("colorpalette")
              .Events(e => e
                    .Change("colorpalette_change")
              )
        )
        <script>
            function colorpalette_change() {
                //Handle the change event.
            }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().ColorPalette()
              .Name("colorpalette")
              .Events(e => e
                  .Change(@<text>
                    function() {
                        //Handle the change event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

To reference an existing Kendo UI ColorPalette instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPalette API](http://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPalette for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ColorPalette is used to get its client-side instance.
            var colorpalette = $("#colorpalette").data("kendoColorPalette");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: ColorPaletteBuilder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc.UI.Fluent/ColorPaletteBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
