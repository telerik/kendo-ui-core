---
title: Overview
page_title: Overview | Hybrid UI View HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI View widget for ASP.NET MVC."
previous_url: /helpers/mobileview/overview
slug: overview_hybridview_aspnetmvc
position: 1
---

# Hybrid View HtmlHelper Overview

The hybrid View HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI View](http://demos.telerik.com/kendo-ui/m/index#mobile-view/index) widget.

It allows you to configure the hybrid Kendo UI View from server-side code.

## Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI View for ASP.NET MVC.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Open `HomeController.cs` and modify the `Index` action method.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a Kendo UI View to the `Index` view.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().MobileView()
                    .Title("View Title")
                    .Content(() =>
                    {
                        %>
                            View Content Template
                        <%
                    })
                    .Render();
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileView()
                    .Title("View Title")
                    .Content(
                        @<text>
                            View Content Template
                        </text>
                    )
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

You can subscribe to all hybrid View [events](../../../../kendo-ui/api/javascript/mobile/ui/view#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileView()
                .Name("MobileView")
                .Events(events => events
                    .AfterShow("onAfterShow")
                )
        %>

        <script>
        function onAfterShow() {
            //Handle the show event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileView()
                .Name("MobileView")
                .Events(events => events
                    .AfterShow("onAfterShow")
                )
        )

        <script>
        function onAfterShow() {
            //Handle the show event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid View instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid View API](../../../../kendo-ui/api/javascript/mobile/ui/view#methods) to control its behavior.

###### Example

      @(Html.Kendo().MobileView()
              .Name("MobileView")
      )
      <script>
      $(function() {
          //Notice that the Name() of the View is used to get its client-side instance.
          var view = $("#Mobileview").data("kendoMobileView");
      });
      </script>

## See Also

* [ASP.NET MVC API Reference: TabStripBuilder](/api/Kendo.Mvc.UI.Fluent/MobileTabStripBuilder)
* [Overview of the Hybrid UI View Widget](http://docs.telerik.com/kendo-ui/controls/hybrid/view/view)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
