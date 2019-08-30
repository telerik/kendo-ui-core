---
title: Virtualization
page_title: Virtualization | Telerik UI MultiSelect HtmlHelper for ASP.NET MVC
description: "Implement virtualization in a model-bound Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: virtualization_multiselect_aspnetmvc
position: 3
---

# Virtualization

You can configure a MultiSelect that is [bound to a model field]({% slug modelbinding_multiselect_aspnetmvc %}) to use virtualization.

> If the [`AutoBind` option of the MultiSelect is set to `false`]({% slug custombinding_multiselect_aspnetmvc %}#preselecting-values-on-initial-load), the MultiSelect will not be able to display the preselected items until it is focused.

1. Create the `Read` and `ValueMapper` actions.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                SelectedOrders = new int[] { 1, 3 }
            });
        }

        [HttpPost]
        public ActionResult OrdersVirtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }

        public ActionResult Orders_ValueMapper(int[] values)
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

            return Json(indices, JsonRequestBehavior.AllowGet);
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

1. Add the MultiSelect to the view and configure it to use virtualization.

    ```Razor
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
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
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
        %>
    ```

## See Also

* [Virtualization by the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect/virtualization)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
