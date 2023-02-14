---
title: Headers
page_title: Headers
description: "Learn how to set request headers in the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourceheaders_aspnetcore
position: 3
---

# Headers

As of the {{ site.product }} R3 2019 release, you can set request headers by using the `Headers` configuration option of the DataSource.

The following example demonstrates how to use the `Headers` option to set a request header.

```HtmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(d => d.Read(r => r.Action("ReadOrders", "Home").Headers(new { header1 = "test" })))
    )

    <script>
        myDataSource.read(); // The header will be set in the request that is sent to the HomeController ReadOrders action.
    </script>  
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadOrders", "Home")" headers='new Dictionary<string,string> { ["header1"] = "test" }'/>
        </transport>
    </kendo-datasource>

    <script>
        myDataSource.read(); // The header will be set in the request that is sent to the HomeController ReadOrders action.
    </script>
```
{% endif %}
```HomeController

    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // Get the request header "header1".
        var Header1Value = Request.Headers["header1"];
        // Orders can be IQueriable or IEnumerable.
        return Json(orders.ToDataSourceResult(request));
    }
```

## See Also

* [Server-Side API](/api/datasource)
