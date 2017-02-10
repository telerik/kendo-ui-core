---
title: Overview
page_title: Overview | Kendo UI NumericTextBox HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI NumericTextBox widget for ASP.NET MVC."
slug: overview_notificationhelper_aspnetmvc
position: 1
---

# NumericTextBox HtmlHelper Overview

The NumericTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI NumericTextBox.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a NumericTextBox.

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

You can subscribe to all NumericTextBox [events](../../../kendo-ui/api/javascript/ui/numerictextbox#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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

The following example demonstrates how to subscribe to events by a template delegate.

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

To reference an existing Kendo UI NumericTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [NumericTextBox API](../../../kendo-ui/api/javascript/ui/numerictextbox#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI NumericTextBox for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the NumericTextBox is used to get its client-side instance.
          var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
      });
      </script>


## See Also

* [ASP.NET MVC API Reference: NumericTextBoxBuilder](/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI NumericTextBox Widget](http://docs.telerik.com/kendo-ui/controls/editors/numerictextbox/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
