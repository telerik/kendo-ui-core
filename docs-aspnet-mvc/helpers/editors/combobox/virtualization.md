---
title: Virtualization
page_title: Virtualization | Telerik UI ComboBox HtmlHelper for ASP.NET MVC
description: "Implement virtualization in a model-bound Telerik UI ComboBox HtmlHelper for ASP.NET MVC."
slug: virtualization_combobox_aspnetmvc
position: 3
---

# Virtualization

You can configure a ComboBox that is [bound to a model field]({% slug modelbinding_combobox_aspnetmvc %}) to use virtualization.

> The value type to which the ComboBox will be bound on the server can only be a primitive type or an enum value.

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

1. Add the ComboBox to the view and configure it to use virtualization.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().ComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
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
        )

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

        <%: Html.Kendo().ComboBoxFor(m => m.ProductID)
                .Filter("contains")
                .DataTextField("ProductName")
                .DataValueField("ProductID")
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
        %>
    ```

1. If the `AutoBind` option of the ComboBox is set to `false` and you need the ComboBox to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

```Razor
    @model MvcApplication1.Models.ProductViewModel

    @(Html.Kendo().ComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        // Additional configuration.
    )
```
```ASPX
    <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
    Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

    <%: Html.Kendo().ComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        // Additional configuration.
    %>
```

## See Also

* [Virtualization by the ComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/combobox/virtualization)
* [ComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ComboBoxBuilder)
* [ComboBox Server-Side API](/api/combobox)
