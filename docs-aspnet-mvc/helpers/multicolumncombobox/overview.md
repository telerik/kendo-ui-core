---
title: Overview
page_title: MultiColumnComboBox | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI MultiColumnComboBox widget for ASP.NET MVC."
slug: overview_multicolumncombobox_aspnetmvc
position: 1
---

# MultiColumnComboBox HtmlHelper Overview

As of the Kendo UI R3 2018, the Telerik UI for ASP.NET MVC suite delivers the MultiColumnComboBox.

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

The MultiColumnComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiColumnComboBox](http://demos.telerik.com/kendo-ui/multicolumncombobox/index) widget.

## Configuration

The following example demonstrates the basic configuration of the MultiColumnComboBox HtmlHelper and how to get the MultiColumnComboBox instance.

###### Example

```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter("contains")
        .AutoBind(true)
        .MinLength(3)
        .Height(400)
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
        .Events(events => events
            .Change("onChange")
            .Select("onSelect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the MultiColumnComboBox is used to get its client-side instance.
            var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
            console.log(multicolumncombobox);
        });
    </script>
```

### Columns

The MultiColumnComboBox widget provides allows you to predefine the columns that will be rendered in the drop-down. You can also set which field from the `dataItem` will be populated, set a title, template, `headerTemplate`, and width.

###### Example

```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Columns(columns =>
        {
            columns.Add().Field("ContactName").Title("Contact Name").Width("200px")
            columns.Add().Field("ContactTitle").Title("Contact Title").Width("200px");
            columns.Add().Field("CompanyName").Title("Company Name").Width("200px");
            columns.Add().Field("Country").Title("Country").Width("200px");
        })
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```

### Filtering

Besides the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered. The option accepts an array of strings.

###### Example

```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Filter("contains")
        .FilterFields(new string[] { "ContactName", "ContactTitle" })
        .Columns(columns =>
        {
            columns.Add().Field("ContactName").Title("Contact Name").Width("200px")
            columns.Add().Field("ContactTitle").Title("Contact Title").Width("200px");
            columns.Add().Field("CompanyName").Title("Company Name").Width("200px");
            columns.Add().Field("Country").Title("Country").Width("200px");
        })
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```

### Columns Width

The MultiColumnComboBox allows you to set the width of the drop-down through the [`dropDownWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/dropdownwidth) option. In addition, the columns also allow you to [set their width](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> **Important**
>
> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

## Data Binding

Similar to the ComboBox, the MultiColumnComboBox helper exposes various data-binding options.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiColumnComboBox for server binding to the Northwind **Products** table using Linq to SQL.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method and pass the **Products** table as the model.

    ###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ```Razor
        @model IEnumerable<MvcApplication1.Models.Product>
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```

1.  Add a server-bound MultiColumnComboBox.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .BindTo(Model)   //Pass the list of Products to the MultiColumnComboBox.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        )
    ```
    ```ASPX
        <%: Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .BindTo(Model)   //Pass the list of Products to the MultiColumnComboBox.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        %>
    ```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiColumnComboBox for Ajax binding to the Northwind **Products** table using Linq to SQL.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create an action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

    ###### Example

        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }

1. Add an Ajax-bound MultiColumnComboBox.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Filter(FilterType.Contains)
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) //Select the first item.
        )
    ```
    ```ASPX
        <%: Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Filter(FilterType.Contains)
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) //Select the first item.
        %>
    ```

> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

### ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiColumnComboBox to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create an action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the Products table as JSON result.

    ###### Example

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound MultiColumnComboBox.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") //Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data") //Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                            .Total("Total"); //Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                    });
            })
        )
    ```
    ```ASPX
        <%: Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") //Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data") //Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                            .Total("Total"); //Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                    });
            })
        %>
    ```

### Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

#### Local Data

Local data is the data that is available on the client when the MultiColumnComboBox is initialized.

1. Pass the data to the view through the `ViewData`.

    ###### Example

        public ActionResult Index()
        {
            ViewData["products"] = GetProducts();

            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var products = Enumerable.Range(0, 2000).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return products;
        }


1. Add the MultiColumnComboBox to the view and bind it to the data that is saved in the `ViewData`.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .DataValueField("ProductID")
            .DataTextField("ProductName")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
                .DataValueField("ProductID")
                .DataTextField("ProductName")
                .Columns(columns =>
                {
                    columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                    columns.Add().Field("ProductID").Title("Product ID").Width("200px");
                })
                .BindTo((System.Collections.IEnumerable)ViewData["products"])
        %>
    ```

#### Remote Data

You can configure the MultiColumnComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        public JsonResult GetProductsAjax()
        {
            var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return Json(products, JsonRequestBehavior.AllowGet);
        }

1. Add the MultiColumnComboBox to the view and configure its DataSource to use remote data.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .Placeholder("Select product...")
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProductsAjax", "Home");
                })
                .ServerFiltering(false);
            })
        )
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .Placeholder("Select product...")
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProductsAjax", "Home");
                })
                .ServerFiltering(false);
            })
        %>
    ```

#### Virtualization

You can configure a MultiColumnComboBox that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/multicolumncombobox/virtualization).

> **Important**
>
> * You have to define the widths of all columns in pixels in order for the vistualization to work properly.
> * The value type to which you can bind the MultiColumnComboBox on the server can be a primitive type or an enum value only.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        [HttpPost]
        public ActionResult ProductsVirtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        public ActionResult Products_ValueMapper(int[] values)
        {
            var indices = new List<int>();

            if (values != null && values.Any())
            {
                var index = 0;

                foreach (var product in GetProducts())
                {
                    if (values.Contains(product.ProductID))
                    {
                        indices.Add(index);
                    }

                    index += 1;
                }
            }

            return Json(indices, JsonRequestBehavior.AllowGet);
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var products = Enumerable.Range(0, 2000).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return products;
        }


1. Add the MultiColumnComboBox to the view and configure it to use virtualization.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Placeholder("Select product...")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .ServerPaging(true)
                    .PageSize(80)
                    .Type("aspnetmvc-ajax")
                    .Transport(transport =>
                    {
                        transport.Read("ProductsVirtualization_Read", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data")
                                .Total("Total");
                    });
            })
            .Virtual(v => v.ItemHeight(26).ValueMapper("valueMapper"))

        <script>
            function valueMapper(options) {
                $.ajax({
                    url: "@Url.Action("Products_ValueMapper", "Home")",
                    data: convertValues(options.value),
                    success: function (data) {
                        options.success(data);
                    }
                });
            }

            function convertValues(value) {
                var data = {};

                value = $.isArray(value) ? value : [value];

                for (var idx = 0; idx < value.length; idx++) {
                    data["values[" + idx + "]"] = value[idx];
                }

                return data;
            }
        </script>
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Placeholder("Select product...")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .ServerPaging(true)
                    .PageSize(80)
                    .Type("aspnetmvc-ajax")
                    .Transport(transport =>
                    {
                        transport.Read("ProductsVirtualization_Read", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data")
                                .Total("Total");
                    });
            })
            .Virtual(v => v.ItemHeight(26).ValueMapper("valueMapper"))
        %>

        <script>
            function valueMapper(options) {
                $.ajax({
                    url: "@Url.Action("Products_ValueMapper", "Home")",
                    data: convertValues(options.value),
                    success: function (data) {
                        options.success(data);
                    }
                });
            }

            function convertValues(value) {
                var data = {};

                value = $.isArray(value) ? value : [value];

                for (var idx = 0; idx < value.length; idx++) {
                    data["values[" + idx + "]"] = value[idx];
                }

                return data;
            }
        </script>
    ```

1. If the `AutoBind` option of the MultiColumnComboBox is set to `false` and you need the widget to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

```Razor
    @model MvcApplication1.Models.ProductViewModel


    @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        //...additional configuration
    )
```
```ASPX
    <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
    Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

    <%: Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        //...additional configuration
    %>
```

### Parameter Sending to Server

The following example demonstrates how to configure the Kendo UI MultiColumnComboBox to send parameters to the server.

```ASPX
    <%: Html.Kendo().MultiColumnComboBox()
        .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
        .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
        .Filter(FilterType.Contains)
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Product Name").Width("200px")
            columns.Add().Field("ProductID").Title("Product ID").Width("200px");
        })
        .DataSource(source =>
        {
                source.Read(read =>
                {
                        read.Action("GetProducts", "Home")
                            .Data("onAdditionalData");
                });
        })
        .SelectedIndex(0) //Select the first item.
    %>
    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox").text()
            };
        }
    </script>
```
```Razor
    @(Html.Kendo().MultiColumnComboBox()
        .Name("productMultiColumnComboBox") //The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiColumnComboBox as a text.
        .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiColumnComboBox as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") //Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
        })
        .SelectedIndex(0) //Select the first item.
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox").text()
            };
        }
    </script>
```

The following example demonstrates how the `GetProducts` method is used.

###### Example

    public JsonResult GetProducts(string text)
    {
        var northwind = new SampleEntities();

        var products = northwind.Products.Select(product => new ProductViewModel
                {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
                });

        if (!string.IsNullOrEmpty(text))
        {
            products = products.Where(p => p.ProductName.Contains(text));
        }

        return Json(products, JsonRequestBehavior.AllowGet);
    }

> **Important**
>
> The Kendo UI MultiColumnComboBox has a default event handler for the Data callback of the DataSource which is used when no event handler is defined.

The following example demonstrates the default event handler for the Data callback of the DataSource&mdash;the MultiColumnComboBox sends the value of its input only if the end user starts to type in it the input field.

###### Example

    function requestData(selector) {
        var multicolumncombobox = $(selector).data("kendoMultiColumnComboBox"),
            filters = multicolumncombobox.dataSource.filter(),
            value = multicolumncombobox.input.val();

        if (!filter || !filter.filters.length) {
            value = "";
        }

        return { text: value };
    }

### Grouping

The MultiColumnComboBox supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the [Custom DataSource configuration]({% slug customdatasource_aspnetmvc %}).

For more information, refer to the [demo on grouping](http://demos.telerik.com/aspnet-mvc/autocomplete/grouping).

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.

## Event Handling

You can subscribe to all MultiColumnComboBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
    @(Html.Kendo().MultiColumnComboBox()
      .Name("multicolumncombobox")
      .BindTo(new string[] { "Item1", "Item2", "Item3" })
      .Events(e => e
            .Select("multicolumncombobox_select")
            .Change("multicolumncombobox_change")
      )
    )
    <script>
        function multicolumncombobox_select() {
            //Handle the select event.
        }

        function multicolumncombobox_change() {
            //Handle the change event.
        }
    </script>
```
```ASPX
    <%: Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multicolumncombobox_select")
            .Change("multicolumncombobox_change")
        )
    %>
    <script>
        function multicolumncombobox_select() {
            //Handle the select event.
        }

        function multicolumncombobox_change() {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
                function() {
                    //Handle the select event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
                </text>)
        )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI MultiColumnComboBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiColumnComboBox API](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI MultiColumnComboBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Note that the Name() of the MultiColumnComboBox is used to get its client-side instance.
            var multicolumncombobox = $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: MultiColumnComboBoxBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MultiColumnComboBox Widget](http://docs.telerik.com/kendo-ui/controls/editors/multicolumncombobox/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
