---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid extension for Ajax binding to make Ajax requests upon paging, sorting, filtering, or grouping."
previous_url: /aspnet-mvc/helpers/grid/ajax-binding
slug: ajaxbinding_grid_aspnetmvc
position: 1
---

# Ajax Binding

This article demonstrates how to configure the Kendo UI Grid extension for Ajax binding to make Ajax requests upon paging, sorting, filtering, or grouping.

## Getting Started

When configured for Ajax binding, the Kendo UI Grid for ASP.NET MVC makes Ajax requests when doing paging, sorting, filtering, grouping, or when saving data.

### The Basics

The Ajax-bound mode has the following features:
 - The Grid retrieves only the data (in JSON format) representing the current page. As a result, only the Grid is updated.
 - All Grid templates (column, detail) are executed client-side. They follow the [Kendo UI Template]({% slug overview_kendoui_templatescomponent %}) definition rules and may contain embedded JavaScript code.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to do Ajax binding to the Northwind database, the **Products** table.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridAjaxBinding`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add new item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3**  Pick the **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.

**Figure 2. Choose the connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** table from the **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choose the Products table**

![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)

**Step 5** Open the `HomeController.cs` and add a new action method which will return the Products as JSON. The Grid makes Ajax requests to this action.

###### Example

        public ActionResult Products_Read()
        {
        }

**Step 6** Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. It will contain the current Grid request information&mdash;page, sort, group, and filter. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute will populate the `DataSourceRequest` object from the posted data. Now import the `Kendo.Mvc.UI` namespace.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

**Step 7** Use the `ToDataSourceResult` extension method to convert the Products to a `Kendo.Mvc.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
            }
        }

> **Important**
>
> The `ToDataSourceResult()` method will page, sort, filter, and group the collection that is passed to it. If this collection is already paged, the method returns an empty result. To perform the data operations manually, use [custom binding]({% slug custombinding_grid_aspnetmvc %}) instead.

**Step 8** Return the `DataSourceResult` as JSON. Configure the Kendo UI Grid for Ajax binding.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
                return Json(result);
            }
        }

**Step 9** In the view, configure the Grid to use the action method created in the previous steps.

###### Example

```tab-ASPX

    <%: Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource //Configure the Grid data source.
              .Ajax() //Specify that Ajax binding is used.
              .Read(read => read.Action("Products_Read", "Home")) // Set the action method which will return the data in JSON format
           )
          .Columns(columns =>
          {
              //Create a column bound to the ProductID property.
              columns.Bound(product => product.ProductID);
              //Create a column bound to the ProductName property.
              columns.Bound(product => product.ProductName);
              //Create a column bound to the UnitsInStock property.
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable() // Enable paging
          .Sortable() // Enable sorting
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource //Configure the Grid data source.
              .Ajax() //Specify that Ajax binding is used.
              .Read(read => read.Action("Products_Read", "Home")) //Set the action method which will return the data in JSON format.
           )
          .Columns(columns =>
          {
              //Create a column bound to the ProductID property.
              columns.Bound(product => product.ProductID);
              //Create a column bound to the ProductName property.
              columns.Bound(product => product.ProductName);
              //Create a column bound to the UnitsInStock property.
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable() // Enable paging
          .Sortable() // Enable sorting
    )
```

**Step 10** Build and run the application.

**Figure 4. The final result**

![Final result](/aspnet-mvc/helpers/grid/images/grid-bound-grid.png)

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/ajax-binding).

The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and LINQ expressions to page, sort, filter, and group your data. The JSON response of the action method will contain only a single page of data and the Grid will be bound to that data.

> **Important**  
>
> If your data is `IQueryable<T>` returned by a LINQ-enabled provider&Mdash;Entity Framework, LINQ to SQL, Telerik OpenAccess, NHibernate or other&mdash;the LINQ expressions, created by the `ToDataSourceResult` method, are converted to SQL and executed by the database server.

## Common Scenarios

### Use View Models

Sometimes it is convenient to use view model objects instead of entities returned by Entity Framework. For example, you may want to avoid serializing all Entity Framework properties as JSON or prevent serialization exceptions caused by circular references.

This section shows how to use view models and the Kendo UI Grid for ASP.NET MVC.

**Step 1** Perform all steps from the previous section.

**Step 2** Add a new class to the `~/Models` folder. Name it `ProductViewModel`.

###### Example

        public class ProductViewModel
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public short? UnitsInStock { get; set; }
        }

**Step 3** Modify the Grid declaration and make it use `ProductViewModel` instead of `Product`.

###### Example

```tab-ASPX

    <%: Html.Kendo().Grid<KendoGridAjaxBinding.Models.ProductViewModel>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<KendoGridAjaxBinding.Models.ProductViewModel>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    )
```

**Step 4** Modify the `Products_Read` action method and use the `ToDataSourceResult` method overload which accepts a mapping lambda.

###### Example

            public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
            {
                using (var northwind = new NorthwindEntities())
                {
                    IQueryable<Product> products = northwind.Products;
                    //Convert the Product entities to ProductViewModel instances.
                    DataSourceResult result = products.ToDataSourceResult(request, product => new ProductViewModel
                            {
                            ProductID = product.ProductID,
                            ProductName = product.ProductName,
                            UnitsInStock = product.UnitsInStock
                            });
                    return Json(result);
                }
            }

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/ajax-binding).

### Pass Additional Data to Action Methods

To pass additional parameters to the action, use the `Data` method. Provide the name of a JavaScript function which will return a JavaScript object with the additional data.

The custom parameter names must not match reserved words, which are used by the Kendo UI DataSource for [sorting](/api/javascript/data/datasource#configuration-serverSorting), [filtering](/api/javascript/data/datasource#configuration-serverFiltering), [paging](/api/javascript/data/datasource#configuration-serverPaging), and [grouping](/api/javascript/data/datasource#configuration-serverGrouping).

The example below demonstrates how to add the additional parameters to the action method.

###### Example

    public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
    {
        //The implementation is omitted.
    }

The example below demonstrates how to specify the JavaScript function which returns additional data.

###### Example

```tab-ASPX

    <%: Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read
                   .Action("Products_Read", "Home") //Set the action method which will return the data in JSON format.
                   .Data("productsReadData") //Specify the JavaScript function which will return the data.
              )
          )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    %>
    <script>
    function productsReadData() {
        return {
            firstName: "John",
            lastName: "Doe"
        };
    }
    </script>
```
```tab-Razor

    @(Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read
                   .Action("Products_Read", "Home") //Set the action method which will return the data in JSON format.
                   .Data("productsReadData") //Specify the JavaScript function which will return the data.
              )
          )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    )
    <script>
    function productsReadData() {
        return {
            firstName: "John",
            lastName: "Doe"
        };
    }
    </script>
```

### Enable Client Data Processing

By default, the Kendo UI Grid for ASP.NET MVC makes an Ajax request to the `action` method every time the user changes the page, sorts, filters, or groups. Change this behavior by disabling the `ServerOperation`.

The example below demonstrates how to enable client data processing.

###### Example

```tab-ASPX

    <%: Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .ServerOperation(false) //Paging, sorting, filtering, and grouping will be done client-side.
              .Read(read => read
                   .Action("Products_Read", "Home") //Set the action method which will return the data in JSON format.
                   .Data("productsReadData")
              )
          )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<KendoGridAjaxBinding.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .ServerOperation(false) //Paging, sorting, filtering, and grouping will be done client-side.
              .Read(read => read
                   .Action("Products_Read", "Home") //Set the action method which will return the data in JSON format.
                   .Data("productsReadData")
              )
          )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
          .Pageable()
          .Sortable()
    )
```

### Customize Content and Attach Event Handlers on the Fly

In addition to using [server]({% slug configuration_gridhelper_aspnetmvc %}#template) and [client]({% slug configuration_gridhelper_aspnetmvc %}#clienttemplate) column templates, in some cases you may need to customize the appearance or content of the Grid data rows by using Javascript&mdash;hide, show, or modify content, attach custom event handlers, etc.

When using client-side data binding for the Grid, perform all these customizations in the [`dataBound`]({% slug overview_gridhelper_aspnetmvc %}#event-handling) event of the Grid. If the custom code is executed earlier&mdash;for example, in `document.ready`&mdash;it is very likely it has no effect, because the table rows are still not rendered at that time.

There is one exception to the above. Delegated event handlers will work, because they are attached to an ancestor element of the data rows&mdash;for example, the Grid [`table`](/api/javascript/ui/grid#fields-table), [`tbody`](/api/javascript/ui/grid#fields-tbody), or [`wrapper`]({% slug widgetwrapperandelement_references_gettingstarted %}), and the event handler code should check what the event target is.

### Prevent Ajax Response Caching

To prevent Ajax response caching, refer to [this section from the Frequently Asked Questions article]({% slug freqaskedquestions_gridhelper_aspnetmvc %}#how-to-prevent-ajax-response-caching)

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting of the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
