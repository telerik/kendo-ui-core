---
title: Virtualization
page_title: Virtualization | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC
description: "Implement virtualization in a model-bound Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: virtualization_multicolumncombobox_aspnetmvc
position: 3
---

# Virtualization

You can configure a MultiColumnComboBox that is [bound to a model field]({% slug modelbinding_multicolumncombobox_aspnetmvc %}) to use virtualization.

> * In order for the virtualization to work properly, define the widths of all columns in pixels.
> * The value type to which the DropDownList will be bound on the server can only be a primitive type or an enum value.

1. Create the `Read` and `ValueMapper` actions.

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
        // Additional configuration.
    )
```
```ASPX
    <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
    Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

    <%: Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        // Additional configuration.
    %>
```

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/index)
* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
