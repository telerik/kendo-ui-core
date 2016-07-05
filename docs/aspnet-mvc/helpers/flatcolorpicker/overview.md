---
title: Overview
page_title: Overview | Kendo UI FlatColorPicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI FlatColorPicker widget for ASP.NET MVC."
slug: overview_flatcolorpickerhelper_aspnetmvc
position: 1
---

# FlatColorPicker HtmlHelper Overview

The FlatColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI FlatColorPicker](/api/javascript/ui/flatcolorpicker) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI FlatColorPicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a FlatColorPicker.

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

You can subscribe to all FlatColorPicker [events](/api/javascript/ui/flatcolorpicker#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

Reference an existing Kendo UI FlatColorPicker instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [FlatColorPicker API](/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI FlatColorPicker for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the FlatColorPicker is used to get its client-side instance.
          var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the FlatColorPicker:

* [ASP.NET MVC API Reference: FlatColorPickerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/FlatColorPickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ColorPicker Widget]({% slug overview_kendoui_colorpicker_widget %})
* [FlatColorPicker JavaScript API Reference](/api/javascript/ui/flatcolorpicker)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
