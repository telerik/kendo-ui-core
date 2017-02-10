---
title: Overview
page_title: Overview | Kendo UI FlatColorPicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI FlatColorPicker widget for ASP.NET MVC."
slug: overview_flatcolorpickerhelper_aspnetmvc
position: 1
---

# FlatColorPicker HtmlHelper Overview

The FlatColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI FlatColorPicker](../../../kendo-ui/api/javascript/ui/flatcolorpicker) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI FlatColorPicker.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a FlatColorPicker.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().FlatColorPicker()
                    .Name("flatcolorpicker") //The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
                    .Value("#ff0000") //Set the value of the FlatColorPicker.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().FlatColorPicker()
                  .Name("flatcolorpicker") //The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
                  .Value("#ff0000") //Set the value of the FlatColorPicker.
            )
    ```

## Event Handling

You can subscribe to all FlatColorPicker [events](../../../kendo-ui/api/javascript/ui/flatcolorpicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().FlatColorPicker()
              .Name("flatcolorpicker")
              .Events(e => e
                  .Change("flatcolorpicker_change")
              )
      %>
      <script>
          function flatcolorpicker_change() {
              //Handle the change event.
          }
      </script>
```
```tab-Razor

      @(Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker")
            .Events(e => e
                  .Change("flatcolorpicker_change")
            )
      )
      <script>
          function flatcolorpicker_change() {
              //Handle the change event.
          }
      </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

      @(Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker")
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

To reference an existing Kendo UI FlatColorPicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [FlatColorPicker API](../../../kendo-ui/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI FlatColorPicker for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the FlatColorPicker is used to get its client-side instance.
          var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
      });
      </script>

## See Also

* [ASP.NET MVC API Reference: FlatColorPickerBuilder](/api/Kendo.Mvc.UI.Fluent/FlatColorPickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [FlatColorPicker JavaScript API Reference](/api/javascript/ui/flatcolorpicker)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
