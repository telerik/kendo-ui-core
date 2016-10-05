---
title: Overview
page_title: Overview | Kendo UI ColorPicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ColorPicker widget for ASP.NET MVC."
slug: overview_colorpickerhelper_aspnetmvc
position: 1
---

# ColorPicker HtmlHelper Overview

The ColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPicker](/api/javascript/ui/colorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a ColorPicker.

###### Example

```tab-ASPX

        <%: Html.Kendo().ColorPicker()
                .Name("colorpicker") //The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
                .Value("#ff0000") //Set the value of the ColorPicker.
        %>
```
```tab-Razor

        @(Html.Kendo().ColorPicker()
              .Name("colorpicker") //The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
              .Value("#ff0000") //Set the value of the ColorPicker.
        )
```

## Event Handling

You can subscribe to all ColorPicker [events](/api/javascript/ui/colorpicker#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

    <%: Html.Kendo().ColorPicker()
            .Name("colorpicker")
            .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
            )
    %>
    <script>
        function colorpicker_open() {
            //Handle the open event.
        }

        function colorpicker_close() {
            //Handle the close event.
        }

        function colorpicker_select() {
            //Handle the select event.
        }

        function colorpicker_change() {
            //Handle the change event.
        }
    </script>
```
```tab-Razor

    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
          )
    )
    <script>
        function colorpicker_open() {
            //Handle the open event.
        }

        function colorpicker_close() {
            //Handle the close event.
        }

        function colorpicker_select() {
            //Handle the select event.
        }

        function colorpicker_change() {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

###### Example

```tab-Razor

    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
              .Open(@<text>
                function() {
                    //Handle the open event inline.
                }
              </text>)
              .Close(@<text>
                function() {
                    //Handle the close event inline.
                }
                </text>)
              .Select(@<text>
                function() {
                    //Handle the select event inline.
                }
                </text>)
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

Reference an existing Kendo UI ColorPicker instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ColorPicker API](/api/javascript/ui/colorpicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPicker for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ColorPicker:

* [ASP.NET MVC API Reference: ColorPickerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ColorPickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
