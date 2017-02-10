---
title: Overview
page_title: Overview | Hybrid UI Button HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI Button widget for ASP.NET MVC."
previous_url: /helpers/mobilebutton/overview
slug: overview_hybridbutton_aspnetmvc
position: 1
---

# Hybrid Button HtmlHelper Overview

The hybrid Button HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI Button](http://demos.telerik.com/kendo-ui/m/index#mobile-button/index) widget.

It allows you to configure the hybrid Kendo UI Button from server-side code.

## Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI Button for ASP.NET MVC.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Open `HomeController.cs` and modify the `Index` action method.

    ###### Example

            public ActionResult Index()
            {
                ViewBag.Message = "Welcome to ASP.NET MVC!";

                return View();
            }

1. Add a hybrid Kendo UI Button to the `Index` view. Like most hybrid Kendo UI widgets, the Button must be initialized within the hybrid View content.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().MobileView()
                    .Name("button-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileButton()
                                .Name("mobile-button2")
                                .Text("Trigger Event 2")
                                .HtmlAttributes(new { style = "margin: 2em; text-align: center;" })
                        %>
                        <%
                    })
                    .Render();
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileView()
                .Name("button-view")
                .Title("Inbox")
                .Content(
                    @<text>

                    @(Html.Kendo().MobileButton()
                            .Name("mobile-button2")
                            .Text("Trigger Event 2")
                            .HtmlAttributes(new { style = "margin: 2em; text-align: center;" })
                    )

                </text>)
            )
    ```

1. Initialize the mobile application.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().MobileApplication()
                    .ServerNavigation(true)
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )
    ```

1. Build and run the application.

## Event Handling

You can subscribe to all hybrid Button [events](../../../../kendo-ui/api/javascript/mobile/ui/button#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileButton()
                .Name("MobileButton")
                .Text("Button Text")
                .Events(events => events
                    .Click("onClick")
                )
        %>

        <script>
        function onClick() {
            //Handle the open event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileButton()
                .Name("MobileButton")
                .Text("Button Text")
                .Events(events => events
                    .Click("onClick")
                )
        )

        <script>
        function onClick() {
            //Handle the click event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid Button instance by using the code from the example below. Once a reference is established, use the [hybrid Button API](../../../../kendo-ui/api/javascript/mobile/ui/button#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileButton()
                .Name("MobileButton")
                .Text("Button Text")
        )
        <script>
        $(function() {
            //Notice that the Name() of the Button is used to get its client-side instance.
            var button = $("#MobileButton").data("kendoMobileButton");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: Hybrid UI ButtonBuilder](/api/Kendo.Mvc.UI.Fluent/MobileButtonBuilder)
* [Overview of the Hybrid UI Button Widget](http://docs.telerik.com/kendo-ui/controls/hybrid/button/button)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
