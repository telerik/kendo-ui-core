---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ScrollView for {{ site.framework }}."
previous_url: /helpers/media/scrollview/overview
slug: htmlhelpers_scrollview_aspnetcore
position: 1
---

# ScrollView HtmlHelper Overview

The Telerik UI ScrollView HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ScrollView widget.

The ScrollView displays a horizontal collection of content or image views with built-in navigation between them. It can be scrolled through dragging, gestures, arrow click or page click or tap. Among the key features of the ScrollView are data-source binding, customizable template, built-in pager, adjustable bounce effects and scroll velocity.

* [Demo page for the ScrollView](https://demos.telerik.com/{{ site.platform }}/scrollview/index)

## Initializing the ScrollView

You can initialize the ScrollView either [from HTML](#from-html) or [from a data source with a template](#from-the-data-source).

### From HTML

1. Use its `Items()` method.
1. Add HTML elements for each page as part of the content of the ScrollView items.

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

### From the Data Source

1. Create a [Kendo UI for jQuery template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
1. Use the `TemplateId()` method to pass it and provide a DataSource.

Make sure that the template provides the `pageSize` of the data source. If `serverPaging` is enabled, the ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

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

The following example demonstrates how to fetch data from a Controller action.

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
        {% if site.core %}
        return Json(data.ToDataSourceResult(request));{% else %}
        return Json(data.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);{% endif %}
    }
}
```
```Model
public class MyModel
{
    public string SomeField { get; set; }
}
```

If you set the `PageSize` option to a larger value, you will need to use a loop in the template.

```
<script id="scrollview-template" type="text/x-kendo-template">
    # for (var i = 0; i < data.length; i++) { #
        <p style="border: 2px solid blue; color: red;">#= data[i].SomeField #</p>
    # } #
</script>
```

## Functionality and Features

* [Paging]({% slug htmlhelpers_scrollview_aspnetcore_paging %})
* [Templates]({% slug htmlhelpers_scrollview_aspnetcore_templates %})

## Events

For a complete example on basic ScrollView events, refer to the [demo on using the events of the ScrollView](https://demos.telerik.com/{{ site.platform }}/scrollview/events).

## Referencing Existing Instances

To reference an existing Telerik UI ScrollView instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once you have a reference to the widget, use the [ScrollView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview#methods) to control its behavior.

```
    // Place the following after your Telerik UI ScrollView for {{ site.framework }} declaration.
    <script>
    $(function() {
        // The For() of the ScrollView is used to get its client-side instance.
        var scrollview = $("#scrollview").data("kendoScrollView");
    });
    </script>
```

## See Also

* [Basic Usage of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/index)
* [Using the API of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/api)
* [ScrollView Server-Side API](/api/scrollview)
* [ScrollView Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
