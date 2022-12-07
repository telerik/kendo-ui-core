---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Pager component for {{ site.framework }}."
slug: htmlhelpers_pager_aspnet_overview
position: 1
---

# {{ site.framework }} Pager Overview

{% if site.core %}
The Telerik UI Pager TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Pager widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Pager HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Pager widget.
{% endif %}

The Pager enables you to split a set of data into pages with flexible and intuitive UI. The user interface of the Pager is useful for paging data-bound components that have a [data source](/api/datasource) and do not have a built-in UI for paging such as the ListView or scenarios that require  paging options&mdash;for example, Kendo Templates with a data source.

 You can customize the page number templates or use an input for navigation to a specific page, toggle the visibility of previous and next buttons, include a pagesize dropdown and alter the information messages. The pager API also offers the ability to [localize its messages]({% slug localization_pager_aspnet %}).

* [Demo page for the Pager HtmlHelper](https://demos.telerik.com/{{ site.platform }}/pager/index)
{% if site.core %}
* [Demo page for the Pager TagHelper](https://demos.telerik.com/{{ site.platform }}/pager/tag-helper) 
{% endif %}

## Initializing the Pager

To use the Pager, you have to define a standalone data source and pass it by name to the Pager and to the data-bound control that will use it.

The following example demonstrates how to tie a pager to a data source and enable the `PageSizes()` functionality.

```HtmlHelper
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("dataSource1")
        .Ajax(t=>t.Read(read => read.Action("People_Read", "Pager")).PageSize(20))
    )

    @(Html.Kendo().Pager()
        .Name("pager")
        .DataSource("dataSource1")
        .PageSizes(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" server-operation="false">
        <transport>
            <read url="@Url.Action("TagHelper_Products_Read", "DataSource")" />
        </transport>
    </kendo-datasource>

    <kendo-pager name="pager1" refresh="true" datasource-id="dataSource1" page-sizes="true">
    </kendo-pager>
```
{% endif %}
```Controller
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

    public class PagerController : BaseController
    {
        public IActionResult People_Read([DataSourceRequest]DataSourceRequest request)
        {
            var people = new List<SampleData>() {
                 new SampleData() { Name = "Jane Doe", Age = 25, IsOnLeave = false },
                 new SampleData() { Name = "John Doe", Age = 33, IsOnLeave = true },
                 new SampleData() { Name = "John Smith", Age = 37, IsOnLeave = true },
                 new SampleData() { Name = "Nathan Doe", Age = 42, IsOnLeave = false }
            };
            return Json(people.ToDataSourceResult(request));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
```
```Model
    public class SampleData
    {
        public int Age { get; set; }
        public string Name { get; set; }
        public bool IsOnLeave { get; set; }
    }
```

## Functionality and Features

* [Pager Settings and Types]({% slug settings_pager_aspnet %})
* [Responsive Pager]({% slug responsive_pager_aspnet  %})
* [Pager Templates]({% slug templates_pager_aspnet %})
* [Globalization and Messages]({% slug globalization_pager_aspnet %})

## Events

You can subscribe to the Pager [events](/api/pager).

```HtmlHelper
    @(Html.Kendo().Pager()
        .Name("Pager")
        .Events(events => events
            .Change("onChange")
        )
    )
    <script>
        function onChange(e){
            console.log("pager change event");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-pager name="pager" on-change="onChange">
    <script>
        function onChange(e) {
            console.log("pager change event");
        }
    </script>
```
{% endif %}

## Referencing Existing Instances

To refer to an existing Pager instance use the `jQuery.data()` method. Once a reference is established, use the [Pager API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager) to control its behavior.

```
<script>
    $(function() {
        // The Name() of the Pager is used to get its client-side instance.
        var pager = $("#pager").data("kendoPager");
    });
</script>
```

## See Also

* [Basic Usage of the Pager HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pager/index)
* [Pager HtmlHelper Integration for {{ site.framework }}(Demo)](https://demos.telerik.com/{{ site.platform }}/pager/integration)
* [Pager Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager)
* [Pager Server-Side API](/api/pager)
