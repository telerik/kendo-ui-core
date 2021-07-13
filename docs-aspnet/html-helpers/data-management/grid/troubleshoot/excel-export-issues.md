---
title: Excel Export
page_title: Excel Export Troubleshooting
description: "Learn about the solutions of common issues that may occur while exporting the Grid to Excel in ASP.NET MVC applications."
slug: excelissues_gridhelper_aspnetmvc
position: 2
---

# Excel Export

This article provides solutions for issues you might encounter while exporting the content of the Telerik UI Grid HtmlHelper for {{ site.framework }}.

## JSZip Is Not Found

Clicking the **Export to Excel** button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library is not found.

**Solution** Include JSZip in the page. For more information on the export of the Grid to Excel, refer to [this article](https://docs.telerik.com/kendo-ui/framework/save-files/introduction).

## Export Does Not Work in Internet Explorer and Safari

Internet Explorer versions below 10 and Safari cannot save a file and require the implementation of a [server proxy](https://docs.telerik.com/kendo-ui/framework/save-files/introduction).

**Solution** Set the `ProxyURL` option to specify the server proxy URL.

The following example demonstrates the user server proxy.

```Controller
    public class ProxyController : Controller
    {
        [HttpPost]
        public ActionResult Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }
    }
```
```ASPX
    <%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
            .ProxyURL(Url.Action("Save", "Proxy"))
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>
```
```Razor

    @(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
            .ProxyURL(Url.Action("Save", "Proxy"))
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
```

## See Also

* [Basic Usage of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid)
* [Using the API of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid/api)
* [Server-Side API](/api/grid)
