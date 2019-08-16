---
title: Types
page_title: Types | Telerik UI DataSource HtmlHelper for ASP.NET Core
description: "Learn about the types of DataSource supported by the Telerik UI DataSource HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelper_datasourcetypes_aspnetcore
position: 2
---

# DataSource Types

The DataSource supports the following types of binding:

* Ajax&mdash; This is the most popular data source type. It performs ajax requests to retrieve or update data. It formats the request filter, sort, group, page, pageSize, aggregates and binds the model out of the box to a controller which expects a [`[DataSourceRequest]DataSourceRequest request`](/api/Kendo.Mvc.UI/DataSourceRequest) parameter. This allows us to use the [`ToDataSourceResult()`](/api/Kendo.Mvc.Extensions/QueryableExtensions) extension method and return a collection that corresponds to the request without having to deal with data operations programmatically.

```HtmlHelper
     @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource
            .Read(read => read.Action("ReadOrders", "Home"))
            .Create(create => create.Action("CreateOrders", "Home"))
            .Update(update => update.Action("UpdateOrders", "Home"))
            .Destroy(destroy => destroy.Action("DestroyOrders", "Home"))
            .Sort(sort => sort.Add(field => field.ShipCountry).Ascending())
            .Filter(filter=>filter.Add(field=>field.ShipCountry).StartsWith("A"))
            .Group(group=>group.Add(field=>field.OrderID))
            .Aggregates(aggregates=>aggregates.Add(field=>field.ShipCountry).Count())
            .PageSize(2)
            .ServerOperation(true)
            .Model(model =>
                {
                model.Id(field => field.OrderID);
                model.Field(field => field.OrderID).Editable(false);
                model.Field(field => field.ShipCountry).DefaultValue("USA");
            });
        })
    )

    <script>
        myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action
    </script>  
```
```HomeController

    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // orders can be IQueriable or IEnumerable
        // the result is a filtered, paged, grouped, sorted collection 
        var result = orders.ToDataSourceResult(request);

        // response object : { AggregateResults: [], Data: [{},{}], Errors: null, Total: 7 }
        return Json(result);
    }
```

* WebApi&mdash; It works in the same way as the Ajax data source but it is designed for WebAPI projects. 

```HtmlHelper
     @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .WebApi(dataSource =>
        {
          dataSource
            .Read(read => read.Action("Get", "Product"))
	    	.Create(create => create.Action("Post", "Product"))
	    	.Update(update => update.Action("Put", "Product", new { id = "{0}"} ))
	    	.Destroy(destroy => destroy.Action("DELETE", "Product", new { id = "{0}" }))
            .PageSize(2)
            .ServerOperation(true)
            .Model(model =>
                {
                model.Id(field => field.OrderID);
                model.Field(field => field.OrderID).Editable(false);
            });
        })
    )

    <script>
        myDataSource.read(); // A GET request will be sent to the ProductController Get action
    </script>  
```
```ProductController

    [HttpGet]
	public DataSourceResult Get([DataSourceRequest]DataSourceRequest request)
    {
        // orders can be IQueriable or IEnumerable
        // the result is a filtered, paged, grouped, sorted collection 
        var result = orders.ToDataSourceResult(request);

        // response object : { AggregateResults: [], Data: [{},{}], Errors: null, Total: 7 }
        return Json(result);
    }
```

* Custom (`default`)&mdash; The custom type binding allows a full control over the DataSource options listed in the  [client-side API](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource). For example, the server operations have to be separately set (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates) instead of using the `serverOperation` property (only applicable for Ajax and WebApi types of binding).

> The custom type binding is suitable for working with `oData` and `oData-v4` services. This is achievable because of [type](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/type) property and usage of predefined transport and schema settings for consuming such services. Since the custom type binding is the default type it can be omitted in the DataSource declaration. Please refer to the examples below in order to get a better idea of what the custom type binding can be used for.

The following example demonstrates how to consume an OData service.

	@(Html.Kendo().DataSource<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("myDataSource")
        .Custom(dataSource =>
        {
            dataSource
            .Type("odata")
            .ServerPaging(true)
            .ServerFiltering(true)
            .ServerSorting(true)
            .Transport(transport => {
                  transport.Read(read => {
                      read.Url("https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders")
                      .DataType("jsonp");
                  });
              });
        })
    )
    <script>
       myDataSource.fetch();
    </script>

## See Also

* [API Reference of the DataSource Helper for ASP.NET Core](/api/datasource)
