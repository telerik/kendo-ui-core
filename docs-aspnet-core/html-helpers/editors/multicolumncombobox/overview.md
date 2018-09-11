---
title: Overview
page_title: MultiColumnComboBox | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI MultiColumnComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/multicolumncombobox
slug: htmlhelpers_multicolumncombobox_aspnetcore
position: 1
---

# MultiColumnComboBox HtmlHelper Overview

As of the Kendo UI R3 2018, the MultiColumnComboBox is available in the Telerik UI for ASP.NET Core suite. The MultiColumnComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiColumnComboBox](http://demos.telerik.com/kendo-ui/multicolumncombobox/index) widget.
The main purpose of the widget is to visualize a big set of data in a grid-like table.


Besides the core functionality that the standard Kendo ComboBox provides such as Virtualization, Templates, Cascading functionality and various data-binding scenarios, the new widget provides a few more. It gives you the ability to define Columns that will be rendered in the dropdown (along with additional options for them) and specify against which Fields from the data source the Filter should work upon.

## Basic Usage

The following example demonstrates how to define the MultiColumnComboBox HtmlHelper.

###### Example

```tab-Razor
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Product Name").Width("200px")
            columns.Add().Field("ProductID").Title("Product ID").Width("200px");
        })
        .Filter(FilterType.StartsWith)
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "MultiColumnComboBox");
            })
            .ServerFiltering(true);
        })
    )

```
```tab-Controller

    public class MultiColumnComboBoxController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read(string text)
        {
            var result = GetProducts();

            if (!string.IsNullOrEmpty(text))
            {
                result = result.Where(p => p.ProductName.Contains(text)).ToList();
            }

            return Json(result);
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return result;
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the MultiColumnComboBox HtmlHelper and how to get the MultiColumnComboBox instance.

###### Example
```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Product Name").Width("200px")
            columns.Add().Field("ProductID").Title("Product ID").Width("200px");
        })
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

The MultiColumnComboBox widget provides you with the functionality to predefine the columns that needs to be rendered in the dropdown. You can also set which field from the **dataItem** should be populated, set a title, template, headerTemplate and width.

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

Besides the standard Filter options, the widget allows you to set fields, against which the data will be filtered. The option accepts an array of strings:

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
The widget allows you to set a dropdown width through the `DropDownWidth` option. In addition, the columns allows setting their width as well. That being said, the below cases for width configuration exists:

* If all columns width are defined in pixels (through their width option) - the dropDownWidth value (if set) is disregarded.
* In all other cases (not all of the columns width values are set), the dropDownWidth value is applied to the element.

## Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

### Local Data

Local data is the data that is available on the client when the MultiColumnComboBox is initialized.

1. Pass the data to the view through `ViewData`.

    ###### Example

            public IActionResult Index()
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

    ###### Example

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

### Remote Data

You can configure the MultiColumnComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

            public IActionResult Index()
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

                return Json(products);
            }


1. Add the MultiColumnComboBox to the view and configure its DataSource to use remote data.

    ###### Example

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
                    source.Read(read =>
                    {
                        read.Action("GetProductsAjax", "Home");
                    })
                    .ServerFiltering(false);
                })
            )

### Virtualization

You can configure a MultiColumnComboBox that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/multicolumncombobox/virtualization).

> **Important**
>
> All columns width should be set and this must be done in px, in order for the functionality to work properly.
> Also, the value type to which the MultiColumnComboBox can be bound on the server can only be a primitive type or an enum value.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    ProductID = 4,
                    ProductName = "ProductName4"
                });
            }

            [HttpPost]
            public IActionResult ProductsVirtualization_Read([DataSourceRequest] DataSourceRequest request)
            {
                return Json(GetProducts().ToDataSourceResult(request));
            }

            public IActionResult Products_ValueMapper(int[] values)
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

                return Json(indices);
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

    ###### Example

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

If the `AutoBind` option of the MultiColumnComboBox is set to `false` and you need the widget to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

###### Example

        @model MvcApplication1.Models.ProductViewModel


        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .AutoBind(false)
            .Text(Model.ProductName)
            .DataTextField("ProductName")
            //...additional configuration
        )

## See Also

* [JavaScript API Reference of the MultiColumnComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
* [MultiColumnComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multicolumncombobox/overview)
* [MultiColumnComboBox Official Demos](http://demos.telerik.com/aspnet-core/multicolumncombobox/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
