---
title: Overview
page_title: Overview | Kendo UI Dialog HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Dialog widget for ASP.NET MVC."
slug: overview_dialoghelper_aspnetmvc
position: 1
---

# Dialog HtmlHelper Overview

The Dialog HtmlHelper extension is a server-side wrapper for the [Kendo UI Dialog](https://demos.telerik.com/kendo-ui/dialog/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Dialog.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a Dialog.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().Dialog()
                  .Name("dialog") //The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
                  .Title("Software Update")//Set the title of the Dialog.
                  .Content("Do you agree terms and conditions?") //Define the content of the Dialog.
                  .Width(400)  //Set the width of the Dialog.
                  .Modal(false) // Disable the modality of the Dialog.
                  .ButtonLayout("stretched") //Set a "stretched" layout for the action buttons.
                  .Actions(actions =>
                    {
                        actions.Add().Text("NO"); //Set text of the first button.
                        actions.Add().Text("YES").Primary(true); //Set text of the second button and define it as primary.
                    })
                   .Render(); //Render the Dialog.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().Dialog()
                  .Name("dialog") //The name of the Dialog is mandatory. It specifies the "id" attribute of the widget.
                  .Title("Software Update")//Set the title of the Dialog.
                  .Content("Do you agree terms and conditions?") //Define the content of the Dialog.
                  .Width(400)  //Set the width of the Dialog.
                  .Modal(false) // Disable the modality of the Dialog.
                  .ButtonLayout("stretched") //Set a "stretched" layout for the action buttons.
                  .Actions(actions =>
                    {
                        actions.Add().Text("NO"); //Set text of the first button.
                        actions.Add().Text("YES").Primary(true); //Set text of the second button and define it as primary.
                    })
            )
    ```

## Event Handling

You can subscribe to all Dialog [events](../../../kendo-ui/api/javascript/ui/dialog#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Dialog()
                .Name("dialog")
                .Events(e => e
                    .Open("dialog_open")
                    .Close("dialog_close")
            )
        %>
        <script>
        function dialog_open() {
            //Handle the open event.
        }

        function dialog_close() {
            //Handle the close event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Dialog()
              .Name("dialog")
              .Events(e => e
                    .Open("dialog_open")
                    .Close("dialog_close")
              )
        )
        <script>
        function dialog_open() {
            //Handle the open event.
        }

        function dialog_close() {
            //Handle the close event.
        }
        </script>
```

## Reference

### Existing Instances

To refer to an existing Kendo UI Dialog instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Dialog API](../../../kendo-ui/api/javascript/ui/dialog#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Dialog for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Dialog is used to get its client-side instance.
            var dialog = $("#dialog").data("kendoDialog");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: DialogBuilder](/api/Kendo.Mvc.UI.Fluent/DialogBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Dialog Widget](http://docs.telerik.com/kendo-ui/controls/layout/dialog/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
