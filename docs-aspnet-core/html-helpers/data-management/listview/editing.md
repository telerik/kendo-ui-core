---
title: Editing
page_title: Editing | Kendo UI ListView HtmlHelper for ASP.NET Core
description: "Configure the Kendo UI ListView for ASP.NET Core for editing."
slug: htmlhelpers_listview_aspnetcore_editing
position: 3
---

# Editing

The ListView enables you to edit its records.

## Configuration

Below are the steps for you to follow when configuring the Kendo UI ListView for ASP.NET Core for editing.

###### Example

    namespace ListViewExample.Models
    {
        public class OrderViewModel
        {
            public int OrderID
            {
                get;
                set;
            }

            public decimal? Freight
            {
                get;
                set;
            }

            [Required]
            public DateTime? OrderDate
            {
                get;
                set;
            }

            [Required]
            public string ShipCity
            {
                get;
                set;
            }

            [Required]
            public string ShipName
            {
                get;
                set;
            }
        }
    }

### Define the Item Template

The following example demonstrates how to define the item template for the Kendo UI ListView. Add buttons for the create, update and destroy.

> **Important**
>
> `click` events for elements with `k-edit-button` and `k-delete-button` class names will be automatically handled and treated by the Kendo UI ListView as `update` and `destroy` actions. To facilitate the `create` operation add a click handler to the `k-add-button`, get the Kendo UI ListView instance and call the [`add()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/methods/add) method.

###### Example

    <!-- Button for the Create operation. Use it to call the client ListView method add()  -->
    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>

    @(Html.Kendo().ListView<ListViewExample.Models.OrderViewModel>()
        /* listview configuration */
    )

    <script>
    $(function () {
        var listView = $("#listView").data("kendoListView");

        $(".k-add-button").click(function (e) {
            listView.add();
            e.preventDefault();
        });
    });
    </script>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="order">
            <h3>#= OrderID #</h3>
            <dl>
                <dt>Ship Name:</dt>
                <dd>#= ShipName #</dd>
            </dl>
            <dl>
                <dt>Ship City:</dt>
                <dd>#= ShipCity #</dd>
            </dl>
            <dl>
                <dt>Freight:</dt>
                <dd>#= kendo.toString(Freight, "n2")#</dd>
            </dl>
            <dl>
                <dt>Order Date:</dt>
                <dd>#= kendo.toString(OrderDate, "D")#</dd>
            </dl>
            <!-- The following markup contains the `Edit` and `Delete` buttons -->
            <div class="edit-buttons">
                <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
                <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
            </div>
        </div>
    </script>

### Set the Editor Template

The following example demonstrates how to define the `EditorTemplate` for the model:

1. Declare the editor template in a file that uses the name of the edited model&mdash;for example `OrderViewModel.cshtml`.
1. Place this file in the `~Views\Shared\EditorTemplates` directory of your project.

> **Important**
>
> `click` events for elements with `k-update-button` and `k-cancel-button` class names will be automatically handled and treated by the Kendo UI ListView as `save` and `cancel` actions. Similar to the item template, you have to wrap the editor template in an HTML container.

###### Example

    @model ListViewExample.Models.OrderViewModel
    <div class="order">
        <h3 data-bind="text:OrderID"></h3>
        <dl>
            <dt>Ship Name:</dt>
            <dd>
                @(Html.Kendo().TextBoxFor(o => o.ShipName))
            </dd>
            <dt>Ship City:</dt>
            <dd>
                @(Html.Kendo().TextBoxFor(o => o.ShipCity))
            </dd>
            <dt>Freight</dt>
            <dd>
                @(Html.Kendo().NumericTextBoxFor(o => o.Freight))
            </dd>
            <dt>Order Date:</dt>
            <dd>
                @(Html.Kendo().DatePickerFor(o => o.OrderDate))
                <span data-for="OrderDate" class="k-invalid-msg"></span>
            </dd>

        </dl>
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
        </div>
    </div>
    <style>
        span.k-tooltip {
            position:absolute;
            margin:6px;
        }
    </style>

###	Enable Editing

The following example demonstrates how to enable the ListView editing.

###### Example

    @(Html.Kendo().ListView<ListViewExample.Models.OrderViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("list-view-template")
        .Editable() //<-- Enable editing.
    )

### Specify the Action Methods and Define a Data Source Model ID

> **Important**
>
> The Model Id is required to enable the editing functionality. Use a unique identifier (primary key).

The following example demonstrates how to specify the action methods which will handle the `Create`, `Update` and `Destroy` operations.

###### Example

    @(Html.Kendo().ListView<ListViewExample.Models.OrderViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .Editable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(4)
            .Model(m => m.Id("OrderID"))
            .Read(read => read.Action("Orders_Read", "ListView"))
            .Create(create => create.Action("Orders_Create", "ListView"))
            .Update(update => update.Action("Orders_Update", "ListView"))
            .Destroy(destroy => destroy.Action("Orders_Destroy", "ListView"))
        )
        .Pageable()
    )


### Implement the Action Methods

For a quick test add a static list and copy and paste it in the controller, or use own service or data base which returns an `IEnumerable` or `IQueriable`.

###### Example

    public class ListViewController : Controller
    {
        public static List<OrderViewModel> dbOrders = Enumerable.Range(1, 20).Select(i => new OrderViewModel
        {
            OrderID = i,
            Freight = i * 10,
            OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
            ShipName = "ShipName " + i,
            ShipCity = "ShipCity " + i
        }).ToList();
    }


The following example demonstrates how to implement the `read` action method.

###### Example

    public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
    {
        var dsResult = dbOrders.ToDataSourceResult(request);
        return Json(dsResult);
    }

The following example demonstrates how to implement the `create` action method.

###### Example

    public ActionResult Orders_Create([DataSourceRequest] DataSourceRequest request,  OrderViewModel order)
    {
        if (order != null && ModelState.IsValid)
        {
            // own update logic or use with sample data to test

                var nextId = dbOrders.Count + 1;
                order.OrderID = nextId;
                dbOrders.Add(order);
        }

        //Return any validation errors, if any.
        return Json(new [] { order }.ToDataSourceResult(request, ModelState));
    }

The following example demonstrates how to implement the `update` action method.

###### Example

    public ActionResult Orders_Update([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
    {
        if (order != null && ModelState.IsValid)
        {
            // own create logic or use with sample data to test
            for (int i = 0; i < dbOrders.Count; i++)
            {
                if (order.OrderID == dbOrders[i].OrderID)
                {
                    dbOrders[i] = order;
                }
            }
        }

        //Return any validation errors, if any.
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }

The following example demonstrates how to implement the `destroy` action method.

###### Example

    public ActionResult Orders_Destroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
    {
        if (order != null)
        {
            // own destroy logic or use with sample data to test

            for (int i = 0; i < dbOrders.Count; i++)
            {
                if (order.OrderID == dbOrders[i].OrderID)
                {
                    dbOrders.Remove(dbOrders[i]);
                    break;
                }
            }
        }

        //Return any validation errors, if any.
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }

## See Also

* [Overview of the ListView HtmlHelper]({% slug htmlhelpers_listview_aspnetcore %})
* [Ajax Binding of the ListView HtmlHelper]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %})
* [Official Demo of the Kendo UI ListView for ASP.NET Core Editing](https://demos.telerik.com/aspnet-core/listview/editing)
* [Overview of the jQuery Kendo UI ListView Widget](https://docs.telerik.com/kendo-ui/controls/data-management/listview/overview)
* [JavaScript API Reference of the ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
