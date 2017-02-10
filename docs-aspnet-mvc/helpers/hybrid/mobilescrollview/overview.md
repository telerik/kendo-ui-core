---
title: Overview
page_title: Overview | Hybrid UI ScrollView HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI ScrollView widget for ASP.NET MVC."
previous_url: /helpers/mobilescrollview/overview
slug: overview_hybridscrollview_aspnetmvc
position: 1
---

#  Hybrid ScrollView HtmlHelper Overview

The hybrid ScrollView HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI ScrollView](http://demos.telerik.com/kendo-ui/m/index#scrollview/mobile) widget.

It allows you to configure the hybrid Kendo UI ScrollView from server-side code.

## Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI ScrollView for ASP.NET MVC.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Open `HomeController.cs` and modify the `Index` action method.

    ###### Example

            public ActionResult Index()
            {
                ViewBag.Message = "Welcome to ASP.NET MVC!";

                return View();
            }

1. Add a Kendo UI ScrollView to the `Index` view. Like most hybrid Kendo UI widgets, the PopOver must be initialized within the hybrid View content.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().MobileView()
                    .Name("scrollview-home")
                    .Title("Photo Gallery")
                    .Content(() =>
                    {
                        %>
                        <div id="scrollview-container">
                        <%
                        Html.Kendo().MobileScrollView()
                            .Page(2)
                            .Items(items =>
                            {
                                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                                items.Add().HtmlAttributes(new { @class = "photo photo2" });
                                items.Add().HtmlAttributes(new { @class = "photo photo3" });
                                items.Add().HtmlAttributes(new { @class = "photo photo4" });
                                items.Add().HtmlAttributes(new { @class = "photo photo5" });
                                items.Add().HtmlAttributes(new { @class = "photo photo6" });
                                items.Add().HtmlAttributes(new { @class = "photo photo7" });
                                items.Add().HtmlAttributes(new { @class = "photo photo8" });
                                items.Add().HtmlAttributes(new { @class = "photo photo9" });
                                items.Add().HtmlAttributes(new { @class = "photo photo10" });
                            })
                            .FitItemPerPage(true)
                            .Render();
                        %>
                        </div>
                        <%
                    })
                    .Render();
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileView()
                    .Name("scrollview-home")
                    .Title("Photo Gallery")
                    .Content(
                        @<text>
                        <div id="scrollview-container">
                        @(Html.Kendo().MobileScrollView()
                            .Page(2)
                            .Items(items =>
                            {
                                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                                items.Add().HtmlAttributes(new { @class = "photo photo2" });
                                items.Add().HtmlAttributes(new { @class = "photo photo3" });
                                items.Add().HtmlAttributes(new { @class = "photo photo4" });
                                items.Add().HtmlAttributes(new { @class = "photo photo5" });
                                items.Add().HtmlAttributes(new { @class = "photo photo6" });
                                items.Add().HtmlAttributes(new { @class = "photo photo7" });
                                items.Add().HtmlAttributes(new { @class = "photo photo8" });
                                items.Add().HtmlAttributes(new { @class = "photo photo9" });
                                items.Add().HtmlAttributes(new { @class = "photo photo10" });
                            })
                            .FitItemPerPage(true))
                        </div>
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

You can subscribe to all hybrid ScrollView [events](../../../../kendo-ui/api/javascript/mobile/ui/scrollview#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

         <%: Html.Kendo().MobileScrollView()
                  .Name("scrollView")
                  .Items(items =>
                  {
                      items.Add().HtmlAttributes(new { @class = "photo photo1" });
                      items.Add().HtmlAttributes(new { @class = "photo photo2" });
                  })
                  .Events(events => events
                      .Change("onChange")
                  )
                  .FitItemPerPage(true)
          %>

          <script>
          function onChange() {
              //Handle the change event
          }
          </script>
```
```tab-Razor

          @(Html.Kendo().MobileScrollView()
              .Name("scrollView")
              .Items(items =>
              {
                  items.Add().HtmlAttributes(new { @class = "photo photo1" });
                  items.Add().HtmlAttributes(new { @class = "photo photo2" });
              })
              .Events(events => events
                  .Change("onChange")
              )
              .FitItemPerPage(true))

          <script>
          function onChange() {
              //Handle the change event
          }
          </script>
```

## Reference

### Instances

You can reference a hybrid ScrollView instance by using the code from the example below. Once a reference is established, use the [hybrid ScrollView API](../../../../kendo-ui/api/javascript/mobile/ui/scrollview#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileScrollView()
                .Name("scrollView")
                .Items(items =>
                {
                    items.Add().HtmlAttributes(new { @class = "photo photo1" });
                    items.Add().HtmlAttributes(new { @class = "photo photo2" });
                })
                .FitItemPerPage(true))
        <script>
        $(function() {
            // Notice that the Name() of the scrollview is used to get its client-side instance
            var scrollview = $("#scrollView").data("kendoMobileScrollView");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: ScrollViewBuilder](/api/Kendo.Mvc.UI.Fluent/MobileScrollViewBuilder)
* [Overview of the Hybrid UI ScrollView Widget](http://docs.telerik.com/kendo-ui/controls/hybrid/scrollview/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
