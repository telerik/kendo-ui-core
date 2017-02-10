---
title: Overview
page_title: Overview | Kendo UI ColorPicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ColorPicker widget for ASP.NET MVC."
slug: overview_colorpickerhelper_aspnetmvc
position: 1
---

# ColorPicker HtmlHelper Overview

The ColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPicker](../../../kendo-ui/api/javascript/ui/colorpicker) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ColorPicker.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a ColorPicker.

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

You can subscribe to all ColorPicker [events](../../../kendo-ui/api/javascript/ui/colorpicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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

The following example demonstrates how to subscribe to events by a template delegate.

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

To reference an existing Kendo UI ColorPicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker API](../../../kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPicker for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: ColorPickerBuilder](/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
