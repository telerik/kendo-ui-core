---
title: Overview
page_title: Overview | Hybrid UI Switch HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI Switch widget for ASP.NET MVC."
previous_url: /helpers/mobileswitch/overview
slug: overview_hybridswitch_aspnetmvc
position: 1
---

# Hybrid Switch HtmlHelper Overview

The hybrid SplitView HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI SplitView](http://demos.telerik.com/kendo-ui/m/index#splitview/index) widget.

It allows you to configure the hybrid Kendo UI SplitView from server-side code.

## Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI Switch for ASP.NET MVC.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Open `HomeController.cs` and modify the `Index` action method.

    ###### Example

            public ActionResult Index()
            {
                ViewBag.Message = "Welcome to ASP.NET MVC!";

                return View();
            }

1. Add a Kendo UI Switch to the `Index` view. Like most hybrid Kendo UI widgets, the Switch must be initialized within the hybrid View content.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().MobileView()
                    .Name("switch-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileSwitch()
                                .Name("subscription-switch")
                                .Checked(true)
                                .OnLabel("YES")
                                .OffLabel("NO")
                        %>
                        <%
                    })
                    .Render();
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileView()
                .Name("switch-view")
                .Title("Inbox")
                .Content(
                    @<text>

                    @(Html.Kendo().MobileSwitch()
                            .Name("subscription-switch")
                            .Checked(true)
                            .OnLabel("YES")
                            .OffLabel("NO")
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

You can subscribe to all hybrid Switch [events](../../../../kendo-ui/api/javascript/mobile/ui/switch#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileSwitch()
                .Name("mobile-switch")
                .Events(events => events.Change("onChange"))
        %>

        <script>
        function onChange() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileSwitch()
            .Name("mobile-switch")
            .Events(events => events.Change("onChange"))
        )

        <script>
        function onChange() {
            //Handle the change event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid Switch instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid Switch API](../../../../kendo-ui/api/javascript/mobile/ui/switch#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileSwitch()
                .Name("subscription-switch")
                .Checked(true)
                .OnLabel("YES")
                .OffLabel("NO")
        )
        <script>
        $(function() {
            //Notice that the Name() of the Switch is used to get its client-side instance.
            var switch = $("#subscription-switch").data("kendoMobileSwitch");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: SwitchBuilder](/api/Kendo.Mvc.UI.Fluent/MobileSwitchBuilder)
* [Overview of the Hybrid UI Switch Widget](http://docs.telerik.com/kendo-ui/controls/hybrid/switch/switch)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
