---
title: Overview
page_title: ScrollView | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Kendo UI ScrollView for ASP.NET MVC."
slug: htmlhelpers_scrollview_aspnetmvc
---

# ScrollView Overview

The ScrollView HtmlHelper extension is a server-side wrapper for the [Kendo UI ScrollView](https://demos.telerik.com/kendo-ui/scrollview/index) widget.

It displays a horizontal collection of content or image views with built-in navigation between them. It can be scrolled via dragging, gestures, arrow click or page click or tap.

## Key Features

The Kendo UI ScrollView:

* Can be initialized with HTML only.
* Features data source binding.
* Has a customizable template.
* Provides a built-in pager.
* Allows you to scroll to a specific page programmatically via its API methods.
* Has adjustable bounce effects and scroll velocity.
* Allows you to capture user interactions by handling the events that are triggered by the widget.

## Getting Started

You can initialize the ScrollView either from HTML or from a data source with a template.

### Initialize the ScrollView from HTML

To initialize the Kendo UI ScrollView from HTML:

* Use its `Items()` method.
* Add HTML elements for each page as part of the content of the ScrollView items.

```
<style>
    h1 {
        margin-top: 30%;
        text-align:center;
    }
</style>
 @(Html.Kendo().ScrollView()
        .Name("scrollView")
        .ContentHeight("100%")
        .Items(x =>
        {
            x.Add().Content("<h1>One</h1>");
            x.Add().Content("<h1>Two</h1>");
            x.Add().Content("<h1>Three</h1>");
        })
        .HtmlAttributes(new { style = "height:748px; width:1022px; max-width: 100%;" })
)
```

### Initialize the ScrollView with a Data Source and a Template

To initialize the Kendo UI ScrollView with a Data Source and a template:

1. Create a [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
1. Use the `TemplateId()` method to pass it and provide a DataSource.

Make sure that the template provides the `pageSize` of the data source. If `serverPaging` is enabled, the ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The Kendo UI ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

```
    @(Html.Kendo().ScrollView()
         .Name("scrollView")
         .ContentHeight("100%")
         .TemplateId("employee-template")
         .DataSource(d =>
                d.Custom()
                  .Type("odata")
                  .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees")))
                  .ServerPaging(true)
                  .PageSize(1))
         .HtmlAttributes(new { style = "height:600px; width:890px; max-width: 100%;" })
    )
    <script id="employee-template" type="text/x-kendo-template">
        <div class="template">
            <h1>
                <span>#:TitleOfCourtesy# #: FirstName# #: LastName# </span>
            </h1>
            <h3>Title: #: Title #</h3>
            <div class="notes"><em>#:Notes#</em></div>
            <div class="country">
                #: Country #
            </div>
        </div>
    </script>
```

###### Fetch Data From a Controller Action

```View
@(Html.Kendo().ScrollView()
    .Name("scrollView")
    .EnablePager(false)
    .ContentHeight("100%")
    .TemplateId("scrollview-template")
     .DataSource(dataSource => dataSource
        .Custom()
        .Type("aspnetmvc-ajax")
        .Transport(transport => transport
          .Read(read => read.Action("GetScrollViewData", "Home"))
        )
        .Schema(s => s.Data("Data").Total("Total"))
        .ServerPaging(true)
        .PageSize(1))
    .HtmlAttributes(new { style = "height:200px; width:300px" })
)

<script id="scrollview-template" type="text/x-kendo-template">
    <p style="border: 2px solid blue; color: red;">#= data.SomeField #</p>
</script>
```
```Controller
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public ActionResult GetScrollViewData([DataSourceRequest]DataSourceRequest request)
    {
        IEnumerable<MyModel> data = Enumerable.Range(1, 5).Select(x => new MyModel { SomeField = "item " + x + " from page " + request.Page });
        return Json(data.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
    }
}
```
```Model
public class MyModel
{
    public string SomeField { get; set; }
}
```

If you set the `PageSize` option to a larger value, you will need to use a loop in the template:

```
<script id="scrollview-template" type="text/x-kendo-template">
    # for (var i = 0; i < data.length; i++) { #
        <p style="border: 2px solid blue; color: red;">#= data[i].SomeField #</p>
    # } #
</script>
```

## See Also

* [ScrollView Official Demos](https://demos.telerik.com/aspnet-MVC/scrollview/index)
* [ScrollView JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
