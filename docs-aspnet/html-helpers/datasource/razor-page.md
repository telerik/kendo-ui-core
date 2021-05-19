---
title: Razor Page
page_title: Razor Page
description: "Learn how to configure the Telerik UI DataSource HtmlHelper for {{ site.framework }} in Razor Page scenario"
slug: htmlhelpers_datasource_aspnetcore_razor_page
position: 10
---

# Razor Page

When configuring the DataSource for a Razor Page scenario it is important to keep several specifics of the ASP.NET Razor Pages framework in mind:

* The page handles requests directly, without using a controller. A naming convention is used to find the appropriate handler method to execute in the PageModel class. Handler methods are prefixed with the word "On" followed by the HTTP verb used for the request that they process: OnGet, OnPost, OnGetAsync and OnPostAsync. Following this convention, additional handlers can be included, for example OnPostCreate. 
* Razor Pages automatically implement antiforgery validation, which protects against cross-site request forgery (XSRF/CSRF) attacks. Therefore you need to pass an antiforgery token, in order to validate the request. 
* Razor Pages use Page in their routing mechanism which interferes with GET requests made by the Kendo UI DataSource. As a result, only POST requests should be used when paging is required.

The example below demonstrates how to configure the Telerik UI DataSource HtmlHelper for {{ site.framework }} in Razor Page scenario. For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.DataSource.DataSourceIndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().DataSource<Telerik.Examples.RazorPages.Models.OrderViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
        .PageSize(10)
        .Create(read => read.Url(@Url.Page("DataSourceIndex", "Create")).Data("dataFunction"))
        .Read(read => read.Url(@Url.Page("DataSourceIndex","Read")).Data("dataFunction"))
        .Update(read => read.Url(@Url.Page("DataSourceIndex", "Update")).Data("dataFunction"))
        .Destroy(read => read.Url(@Url.Page("DataSourceIndex", "Destroy")).Data("dataFunction"))
        .Model(model=>model.Id(m=>m.OrderID))
        )
    )

    <script>
        function dataFunction() {
            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken
            };
        }
    </script>
```
```tab-PageModel(cshtml.cs)      
	public static List<OrderViewModel> orders;
    private static int count;
    public void OnGet()
    {
        if (orders == null)
        {
            orders = new List<OrderViewModel>();

            Enumerable.Range(1, 10).ToList().ForEach(i => orders.Add(new OrderViewModel
            {
                OrderID = i,
                Freight = i * 10,
                ShipName = "Ship name " + i,
                ShipCity = "Ship city " + i,
                OrderDate = DateTime.Now.AddDays(i)
            }));
            
            count = orders.Count;
        }
    }

    public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
    {
        return new JsonResult(orders.ToDataSourceResult(request));
    }
    public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
    {
        order.OrderID = ++count;
        orders.Add(order);

        return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
    {
        orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

        return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
    }

    public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
    {
        orders.Remove(orders.First(x => x.OrderID == order.OrderID));

        return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
    }
```
