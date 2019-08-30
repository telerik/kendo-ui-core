---
title: Model Binding
page_title: Model Binding | Telerik UI MultiSelect HtmlHelper for ASP.NET MVC
description: "Learn how to implement model binding with Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: modelbinding_multiselect_aspnetmvc
position: 5
---

# Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data).

## Local Data

Local data is the data that is available on the client when the MultiSelect is initialized.

1. Pass the data to the view through the view model.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                Orders = GetOrders(),
                SelectedOrders = new int[] { 1, 3 }
            });
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

1. Add the MultiSelect to the view and bind it to a property of the view model.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .BindTo(Model.Orders)
        )
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .BindTo(Model.Orders)
        %>
    ```

## Remote Data

You can configure the MultiSelect to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                SelectedOrders = new int[] { 1, 3 }
            });
        }

        public JsonResult GetOrdersAjax()
        {
            var orders = Enumerable.Range(0, 2000).Select(i => new Order
            {
                OrderID = i,
                OrderName = "OrderName" + i
            });

            return Json(orders.ToList(), JsonRequestBehavior.AllowGet);
        }

1. Add the MultiSelect to the view and configure its DataSource to use remote data.

    ```Razor
        @model MvcApplication1.Models.ProductViewModel


        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .Filter("contains")
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetOrdersAjax", "Home");
                })
                .ServerFiltering(false);
            })
        )
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
                source.Read(read =>
                {
                    read.Action("GetOrdersAjax", "Home");
                })
                .ServerFiltering(false);
            })
        %>
    ```

## See Also

* [Basic Usage of the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
