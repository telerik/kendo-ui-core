---
title: Virtualization
page_title: Virtualization
description: "Learn how to setup the Virtualization feature of the Telerik UI ComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/combobox/virtualization
slug: htmlhelpers_combobox_virtualization_aspnetcore
position: 5
---

# Virtualization

Virtualization is useful for displaying large data sets.

The UI virtualization technique uses a fixed amount of list items in the popup list of the widget regardless of the dataset size. When the list is scrolled, the widget reuses the existing items to display the relevant data instead of creating new ones. For a runnable example, refer to the [demo on virtualization in the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/virtualization).

> The ComboBox supports binding to primitive or enum value types.  

1. Create the `Read` and `ValueMapper` actions.

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

1. Add a ComboBox to the view and configure it to use virtualization.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-combobox for="ProductID"
    datatextfield="ProductName"
    datavaluefield="ProductID"
    filter="FilterType.Contains"
    placeholder="Select product...">
    <datasource type="DataSourceTagHelperType.Custom"
        server-filtering="true"
        server-paging="true"
        custom-type="aspnetmvc-ajax"
        page-size="80">
        <transport>
            <read url="@Url.Action("GetCascadeProducts", "ComboBox")" />
        </transport>
        <schema data="Data" total="Total">
        </schema>
    </datasource>
     <virtual value-mapper="valueMapper" item-height="26" />
</kendo-combobox>
```
{% endif %}
```script
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

        
            value = $.isArray(value) ? value : [value];

                for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
               }
                return data;
        }
        </script>
```

1. If the `AutoBind` option of the ComboBox is set to `false` and you need the widget to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

```HtmlHelper
    @model MvcApplication1.Models.ProductViewModel

    @(Html.Kendo().ComboBoxFor(m => m.ProductID)
        .AutoBind(false)
        .Text(Model.ProductName)
        .DataTextField("ProductName")
        // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
<kendo-combobox for="ProductID"
                auto-bind="false"
                placeholder="Select product..."
                datatextfield="ProductName">

</kendo-combobox>
```
{% endif %}

## See Also

* [Virtualization by the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/virtualization)
* [Server-Side API](/api/combobox)
