---
title: Overview
page_title: Overview | Kendo UI NumericTextBox HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI NumericTextBox widget for ASP.NET MVC."
slug: overview_notificationhelper_aspnetmvc
position: 1
---

# NumericTextBox HtmlHelper Overview

The NumericTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI NumericTextBox.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a NumericTextBox.

###### Example

```tab-ASPX

        <%: Html.Kendo().NumericTextBox()
                .Name("numerictextbox") //The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
                .Min(-100) //Set the min value of the NumericTextBox.
                .Max(100) //Set the min value of the NumericTextBox.
                .Value(10) //Set the value of the NumericTextBoxNumericTextBox.
        %>
```
```tab-Razor

        @(Html.Kendo().NumericTextBox()
              .Name("numerictextbox") //The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
              .Min(-100) //Set the min value of the NumericTextBox.
              .Max(100) //Set the min value of the NumericTextBox.
              .Value(10) //Set the value of the NumericTextBox.
        )
```

## Event Handling

You can subscribe to all NumericTextBox [events](/api/javascript/ui/numerictextbox#events).

### By Handler Name

The example below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

      <%: Html.Kendo().NumericTextBox()
              .Name("numerictextbox")
              .Events(e => e
                  .Change("numerictextbox_change")
                  .Spin("numerictextbox_spin")
              )
      %>
      <script>
      function numerictextbox_spin() {
          //Handle the spin event.
      }

      function numerictextbox_change() {
          //Handle the change event.
      }
      </script>
```
```tab-Razor

      @(Html.Kendo().NumericTextBox()
            .Name("numerictextbox")
            .Events(e => e
                  .Change("numerictextbox_change")
                  .Spin("numerictextbox_spin")
            )
      )
      <script>
      function numerictextbox_spin() {
          //Handle the spin event.
      }

      function numerictextbox_change() {
          //Handle the change event.
      }
      </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox")
          .Events(e => e
              .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
              </text>)
              .Spin(@<text>
                function() {
                    //Handle the spin event inline.
                }
                </text>)
          )
    )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI NumericTextBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [NumericTextBox API](/api/javascript/ui/numerictextbox#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI NumericTextBox for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the NumericTextBox is used to get its client-side instance.
          var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
      });
      </script>


## See Also

Other articles on Telerik UI for ASP.NET MVC and on the NumericTextBox:

* [ASP.NET MVC API Reference: NumericTextBoxBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI NumericTextBox Widget]({% slug overview_kendoui_numerictextbox_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
