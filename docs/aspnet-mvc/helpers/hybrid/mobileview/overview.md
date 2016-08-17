---
title: Overview
page_title: Overview | Hybrid UI View HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI View widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobileview/overview
slug: overview_hybridview_aspnetmvc
position: 1
---

# Hybrid View HtmlHelper Overview

The hybrid View HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI View](http://demos.telerik.com/kendo-ui/m/index#mobile-view/index) widget. It allows you to configure the hybrid Kendo UI View from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI View for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Kendo UI View to the `Index` view.

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

**Step 4** Initialize the mobile application.

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

**Step 5** Build and run the application.

## Event Handling

You can subscribe to all hybrid View [events](/api/javascript/mobile/ui/view#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

You can reference a hybrid View instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method. Once a reference is established, use the [hybrid View API](/api/javascript/mobile/ui/view#methods) to control its behavior.

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

Other articles on Telerik UI for ASP.NET MVC and on the View:

* [ASP.NET MVC API Reference: TabStripBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileTabStripBuilder)
* [Overview of the Hybrid UI View Widget]({% slug overview_hybridtabstrip %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
