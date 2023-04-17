---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DataSource component for {{ site.framework }}."
slug: htmlhelpers_datasource_aspnetcore
position: 0
---

# {{ site.framework }} DataSource Overview

{% if site.core %}
The Telerik UI DataSource TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DataSource widget.
{% else %}
The Telerik UI DataSource HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DataSource widget.
{% endif %}

The DataSource is an abstraction for using local data or remote data. In most cases, the DataSource definition is declared as part of the configurations for the Telerik UI helpers. The standalone DataSource component is suitable for scenarios that require a shared data source.

* [Demo page for the DataSource HtmlHelper](https://demos.telerik.com/{{ site.platform }}/datasource/index)
{% if site.core %}
* [Demo page for the DataSource TagHelper](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
{% endif %}

## Initialize the DataSource

The following example demonstrates how to define the DataSource. You can use `Name()` to access the DataSource instance on the client and utilize the [API methods and events of the Kendo UI for jQuery DataSource widget](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource).

```HtmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(d=>d.Read(r => r.Action("ReadOrders", "Home")))
    )

    <script>
        myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action.
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadOrders", "Home")" />
        </transport>
    </kendo-datasource>

    <script>
        myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action.
    </script>
```
{% endif %}
```HomeController

    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // Orders can be IQueriable or IEnumerable.
        return Json(orders.ToDataSourceResult(request));
    }
```

> * If your data is `IQueryable<T>` returned by a LINQ-enabled provider&mdash;Entity Framework, LINQ to SQL, Telerik OpenAccess, NHibernate or other&mdash;the LINQ expressions, created by the `ToDataSourceResult` method, are converted to SQL and executed by the database server.
> * Use the `ToDataSourceResult()` method to page, sort, filter, and group the collection that is passed to it. If this collection is already paged, the method returns an empty result.
> * As of the R1 2017 SP1 release, you can use the `ToDataSourceResultAsync` extension method to provide the asynchronous functionality of `ToDataSourceResult` by leveraging the `async` and `await` features of the .NET Framework.
> * If impersonation is enabled, use the `ToDataSourceResultAsync` extension method with only one thread in your ASP.NET application. If you create a new thread, the impersonation in the newly created child thread decreases because, by default, all newly created child threads in ASP.NET run under the ASP.NET identity of the worker process. To change this behavior, explicitly impersonate the current identity within the code of the child thread.

To use `DataSourceRequest` and `ToDataSourceResult()` with the DataSource HtmlHelper, add the following namespaces with `using` directives in the controller:

```
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
```
{% if site.core %}
To use `DataSourceRequest` and `ToDataSourceResult()` with the DataSource TagHelper, in addition to the Kendo namespaces above, also add the following directive to the view:

```
    @addTagHelper *, Kendo.Mvc
```
{% endif %}

## Basic Configuration

You can declare the DataSource component configuration options by using the available methods&mdash;for example, you can define the page size, page, sort order, filter, group, aggregates, and the model. 

> * To [sort](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/sort#sort) the data based on an object, set [the data field, by which the data items are sorted,](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/sort#sortfield) to a property of that object. 
> * To [group](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group) the data by an object, set [the group by data item field](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group#groupfield) to a property of that object.
> * To [filter](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/filter) the data based on an object, set [the data item field, to which the filter operator is applied,](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/filter#filterfield) to a property of that object.

The configuration accepts the definition for all CRUD operations and facilitates the data sorting, filtering, and grouping.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
          .Read(read => read.Action("Products_Read", "DataSource"))
          .ServerOperation(false)
          .PageSize(5)
          .Sort(sort => sort.Add("FieldName").Ascending())
          .Filter(filter => filter.Add(field => field.FieldName).StartsWith("A"))
          .Group(group => group.Add(field => field.FieldName))
        )
    )
```
```TagHelper
    @{
        var filterValue = "A";
    }

    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
        <transport>
            <read url="@Url.Action("Products_Read", "DataSource")" />
        </transport>
        <sorts>
            <sort field="FieldName" direction="asc" />
        </sorts>
        <filters>
            <datasource-filter field="FieldName" operator="startswith" value="@filterValue"></datasource-filter>
        </filters>
        <groups>
            <group field="FieldName" />
        </groups>
    </kendo-datasource>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource
            .Read(read => read.Action("ReadOrders", "Home"))
            .Sort(sort => sort.Add(field => field.ShipCountry).Ascending())
            .Filter(filter=>filter.Add(field=>field.ShipCountry).StartsWith("A"))
            .Group(group=>group.Add(field=>field.OrderID))
            .PageSize(20)
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
       myDataSource.fetch();
    </script>
```
{% endif %}

## Prevent Ajax Response Caching

To prevent Ajax response caching, refer to [this section from the Frequently Asked Questions article]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-can-i-prevent-ajax-response-caching)

## Model Mapping

Sometimes it is convenient to use view model objects instead of entities returned by Entity Framework. For example, you may want to avoid serializing all Entity Framework properties as JSON or prevent serialization exceptions caused by circular references.

To map to a ViewModel on the fly pass a mapping lambda as a second parameter to the `ToDataSourceResult()` extension method.

 > The naming of the model properties of the view model objects and entities returned by Entity Framework should match. If usage of different naming is desired implement [model mapping]({% slug datasource_model_mapping %}).

    public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
    {
        using (var northwind = new NorthwindEntities())
        {
            IQueryable<Product> products = northwind.Products;
            // Convert the Product entities to ProductViewModel instances.
            DataSourceResult result = products.ToDataSourceResult(request, product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitsInStock = product.UnitsInStock
            });

            return Json(result);
        }
    }

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Model]({% slug htmlhelper_datasourcemodel %}) | Many scenarios require you to configure the Model of the DataSource. |
| [Aggregates]({% slug htmlhelper_datasourceaggregates %}) | You can easily calculate the aggregates of the data set like Min, Max, Average, etc. |
| [Filtering]({% slug htmlhelper_datasourcefilter %}) | The built-in filtering enables you to search for a subset of data among the items. |
| [Sorting]({% slug htmlhelper_datasourcesort %}) | The DataSource supports ascending and descending sorting. |
| [Grouping]({% slug htmlhelper_datasourcegroup %}) | You can group the returned data based on a common criteria. |
| [Headers]({% slug htmlhelper_datasourceheaders_aspnetcore %}) | You can set request headers by using the Headers configuration option of the DataSource. |
| [DataSource Types]({% slug htmlhelper_datasourcetypes_aspnetcore %}) | You can choose the type of DataSource that best fits your needs. |
| [CRUD Operations]({% slug htmlhelper_datasourcecrud %}) | The DataSource supports easy set up of its CRUD operations and handles the server response on its own. |

## Next Steps

* [Getting Started with the DataSource]({% slug datasource_aspnetcore_get_started %})
* [Basic Usage of the DataSource HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datasource/index)
{% if site.core %}
* [Basic Usage of the DataSource TagHelper](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
{% endif %}
## See Also

* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/datasource)
