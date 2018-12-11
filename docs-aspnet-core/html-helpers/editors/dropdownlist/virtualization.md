---
title: Virtualization
page_title: Virtualization | Kendo UI DropDownList HtmlHelper for ASP.NET Core
description: "Learn how to setup the Virtualization feature of the Kendo UI DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dropdownlist_virtualization_aspnetcore
position: 5
---

# Virtualization

Virtualization is useful for displaying large data sets.

The UI virtualization technique uses a fixed amount of list items in the popup list of the widget regardless of the dataset size. When the list is scrolled, the widget reuses the existing items to display the relevant data instead of creating new ones. For more information, refer to the article on [virtualization in the ComboBox](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> As value types to which the DropDownList can be bound, the widget accepts only primitive types or enum values.  

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

1. Add a DropDownList to the view and configure it to use virtualization.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().DropDownListFor(m => m.ProductID)
                .Filter("contains")
                .DataTextField("ProductName")
                .DataValueField("ProductID")
                .OptionLabel("Select product...")
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


1. If the `AutoBind` option of the DropDownList is set to `false` and you need the widget to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

    ###### Example

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().DropDownListFor(m => m.ProductID)
            .AutoBind(false)
            .Text(Model.ProductName)
            .DataTextField("ProductName")
            //...additional configuration
        )

## See Also

* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)
