---
title: Overview
page_title: Overview | Kendo UI ColorPalette HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ColorPalette widget for ASP.NET MVC."
slug: overview_colorpalettehelper_aspnetmvc
position: 1
---

# ColorPalette HtmlHelper Overview

The ColorPalette HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPalette](/api/javascript/ui/colorpalette) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPalette.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a ColorPalette.

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

You can subscribe to all ColorPalette [events](/api/javascript/ui/colorpalette#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

Reference an existing Kendo UI ColorPalette instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ColorPalette API](/api/javascript/ui/colorpalette#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPalette for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ColorPalette is used to get its client-side instance.
            var colorpalette = $("#colorpalette").data("kendoColorPalette");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ColorPalette:

* [ASP.NET MVC API Reference: ColorPaletteBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ColorPaletteBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
