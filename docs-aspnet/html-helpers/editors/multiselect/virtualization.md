---
title: Virtualization
page_title: Virtualization
description: "Learn how to setup the Virtualization feature of the Telerik UI MultiSelect HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/multiselect/virtualization
slug: htmlhelpers_multiselect_virtualization_aspnetcore
position: 5
---

# Virtualization

Virtualization is useful for displaying large data sets.

The UI virtualization technique uses a fixed amount of list items in the popup list of the widget regardless of the dataset size. When the list is scrolled, the widget reuses the existing items to display the relevant data instead of creating new ones.

> If the `AutoBind` option of the MultiSelect is set to `false`, the widget will be able to display pre-selected items only after it is focused.

1. Create the `Read` and `ValueMapper` actions.

        public IActionResult Index()
        {
            return View(new ProductViewModel
            {
                SelectedOrders = new int[] { 1, 3 }
            });
        }

        [HttpPost]
        public IActionResult OrdersVirtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }

        public IActionResult Orders_ValueMapper(int[] values)
        {
            var indices = new List<int>();

            if (values != null && values.Any())
            {
                var index = 0;

                foreach (var order in GetOrders())
                {
                    if (values.Contains(order.OrderID))
                    {
                        indices.Add(index);
                    }

                    index += 1;
                }
            }

            return Json(indices);
        }

        private static List<Order> GetOrders()
        {
            var orders = Enumerable.Range(0, 2000).Select(i => new Order
            {
                OrderID = i,
                OrderName = "OrderName" + i
            });

            return orders.ToList();
        }

1. Add a MultiSelect to the view and configure it to use virtualization.

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .Filter("contains")
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .ServerPaging(true)
                    .PageSize(80)
                    .Type("aspnetmvc-ajax")
                    .Transport(transport =>
                    {
                        transport.Read("OrdersVirtualization_Read", "Home");
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
                    url: "@Url.Action("Orders_ValueMapper", "Home")",
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

## See Also

* [Virtualization by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/virtualization)
* [Server-Side API](/api/multiselect)
