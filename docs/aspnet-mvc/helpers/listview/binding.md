---
title: Ajax Binding
page_title: Binding | Kendo UI ListView HtmlHelper
description: "Configure the Kendo UI ListView component for AJAX binding and easily enable client-data processing during AJAX binding."
slug: ajaxbinding_listviewhelper_aspnetmvc
position: 3
---

# Ajax Editing

When configured for Аjax binding, the Kendo UI ListView for ASP.NET MVC makes Ajax requests when doing paging.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ListView for ASP.NET MVC for Ajax binding.

**Step 1** Add a new action method which returns data to populate the ListView.

###### Example

        public ActionResult Products_Read()
        {
            var products = new NorthwindDataContext().Products;
        }

**Step 2** Add a new parameter of type `Kendo.UI.DataSourceRequest`. It will contain the current ListView request information. Decorate that parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;
        }

**Step 3** Use the `ToDataSourceResult` extension method to convert your `IQueryable` or `IEnumerable` to a `Kendo.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);
        }

**Step 4** Return the `DataSourceResult` as JSON.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);

            return Json(result);
        }

**Step 5** In the view, configure the ListView to use the action method created in the previous steps.

###### Example

```tab-Item Template

            <script type="text/x-kendo-tmpl" id="template">
                <div class="product">
                    <img src="@Url.Content("~/content/web/foods/")${ProductID}.jpg" alt="${ProductName} image" />
                    <h3>${ProductName}</h3>
                    <dl>
                        <dt>Price:</dt>
                        <dd>${kendo.toString(UnitPrice, "c")}</dd>
                    </dl>
                </div>
            </script>
```
```tab-ASPX

            <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
                .Name("ListView")
                .TagName("div")
                .ClientTemplateId("template")
                .DataSource(dataSource => dataSource
                    .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
                )
                .Pageable()
            %>
```
```tab-Razor

            @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
                .Name("ListView")
                .TagName("div")
                .ClientTemplateId("template")
                .DataSource(dataSource => dataSource
                    .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
                )
                .Pageable()
            )
```

The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and Linq expressions to apply paging, sorting, filtering, and grouping. The JSON response of the action method will contain only a single page of data. The ListView will be bound to that data.

### Additional Parametres

To pass additional parameters to the action method, use the `Data` setting. Provide the name of a JavaScript function which will return an object containing the additional data.

The example below demonstrates the action method.

###### Example

          public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
          {
              //Implementation omitted
          }


The example below demonstrates how to send additional data.

###### Example

``tab-ASPX

          <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
                  .Name("ListView")
                  .TagName("div")
                  .ClientTemplateId("template")
                  .DataSource(dataSource => dataSource
                      .Read(read => read.Action("Products_Read", "Home")
                                        .Data("additionalData")) // Specify the name of the JavaScript function that returns the data
                  )
                  .Pageable()
          %>
          <script>
          function additionalData() {
              return {
                  firstName: "John",
                  lastName: "Doe"
              };
          }
          </script>
```
```tag-Razor

          @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
              .Name("ListView")
              .TagName("div")
              .ClientTemplateId("template")
              .DataSource(dataSource => dataSource
                  .Read(read => read.Action("Products_Read", "Home")
                      .Data("additionalData")) // Specify the name of the JavaScript function that returns the data
              )
              .Pageable()
          )
          <script>
          function additionalData() {
              return {
                  firstName: "John",
                  lastName: "Doe"
              };
          }
          </script>
```

### Client Data Processing

By default, Kendo UI ListView for ASP.NET MVC requests data from the server every time the user changes the page, filters the grid, sorts, or groups. This behavior
can be changed by disabling `ServerOperation`.

###### Example

    .DataSource(dataSource => dataSource
        .ServerOperation(false) // paging will be applied client-side
        .Read(read => read.Action("Products_Read", "Home"))
    )

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ListView:

* [Overview of the ListView HtmlHelper]({% slug overview_listviewhelper_aspnetmvc %})
* [Configuration of the ListView HtmlHelper]({% slug configuration_listviewhelper_aspnetmvc %})
* [Editing of the ListView HtmlHelper]({% slug eiditing_listviewhelper_aspnetmvc %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
