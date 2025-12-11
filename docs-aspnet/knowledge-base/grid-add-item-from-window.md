---
title: Using a Window to Add a New Item to a Grid
description: Learn how to add a new item in a Telerik UI for {{ site.framework }} Grid by using a Window.
type: how-to
page_title: Using a Window to Add a New Item to a Grid
previous_url: /helpers/layout/window/how-to/update-dialog-ajax-forms, /html-helpers/layout/window/how-to/update-dialog-ajax-forms
slug: grid-add-item-from-window
tags: window, grid, item, create, new
res_type: kb
components: ["general"]
---

## Environment
	
	<table>
	 <tr>
	  <td>Product</td>
	  <td>{{ site.product }} Grid and {{ site.product }} Window</td>
	 </tr>
	 <tr>
	  <td>Product Version</td>
	  <td>Created with version 2024.4.1112</td>
	 </tr>
	</table>

## Description
How can I use the [Window]({% slug htmlhelpers_window_aspnetcore %}) component to add a new item to the Grid?

## Solution

1. Define an external [Button]({% slug htmlhelpers_button_aspnetcore %}) (for example, above or below the Grid) and handle its `Click` event.
1. Define a hidden Window component.
1. Handle the [`Click`](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) event of the Button.
1. Within the `Click` event handler of the Button, call the [`center()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/center) method to center the Window and then the [`open()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open) method to open it.
1. Load the Content for the Window from a Partial View ("_OrderCreate").
1. When submitting the form that is displayed through the Partial View, add the new item to the Grid (`Create` action in the `GridController`).


```HtmlHelper
    <div class="row">
        <div class="col-12">
            @(Html.Kendo().Grid<TelerikMvcApp5.Models.OrderViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(order => order.OrderID);
                    columns.Bound(order => order.CustomerID);
                    columns.Bound(order => order.ContactName);
                    columns.Bound(order => order.OrderDate).Format("{0:d}");
                    columns.Bound(order => order.ShippedDate).Format("{0:d}");
                })
                .Pageable()
                .Sortable()
                .Scrollable()
                .Filterable()
                .HtmlAttributes(new { style = "height:550px;" })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(20)
                    .Read(read => read.Action("Orders_Read", "Grid"))
                )
            )
        </div>
    </div>
    
    <div class="col-xs-12 col-md-3">
        <h2>Add Data</h2>
        @(Html.Kendo().Button()
                    .Name("openCreateBtn")
                    .Content("Create Record")
                    .HtmlAttributes(new { type = "button" })
                    .Events(events => events.Click("openCreateDialog"))
                )
        @(Html.Kendo().Window()
                    .Name("createPopup")
                    .Title("Create Dialog")
                    .LoadContentFrom("OrderCreatePartial", "Home")
                    .Draggable(true)
                    .Resizable(resizable => resizable.Enabled(true))
                    .Visible(false)
                )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div class="row">
        <div class="col-12">
            <kendo-grid name="grid" height="550">
                <columns>
                    <column field="OrderID" title="Order ID">
                        <filterable enabled="false"></filterable>
                    </column>
                    <column field="CustomerID"  />
                    <column field="ContactName"  />
                    <column field="OrderDate"  format="{0:d}" />
                    <column field="ShippedDate" format="{0:d}" />
                </columns>
                <scrollable enabled="true" />
                <sortable enabled="true" />
                <pageable enabled="true" />
                <groupable enabled="true" />
                <filterable enabled="true" />
                <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
                    <transport>
                        <read url="@Url.Action("Orders_Read", "Grid")" />
                    </transport>
                </datasource>
            </kendo-grid>
        </div>
    </div>
    
    <kendo-button name="openCreateBtn" on-click="openCreateDialog">
        Create Record
    </kendo-button>
    
    <kendo-window name="createPopup"
        title="Create Dialog"
        draggable="true"
        resizable="true"
        visible="false"
        content-url="@Url.Action("OrderCreatePartial","Home")">
    </kendo-window>
```
{% endif %}
```JavaScript
    <script>
        function closeCreatePopup() {
            $("#createPopup").data("kendoWindow").refresh({ url: "/Home/OrderCreatePartial" });
            $("#createPopup").data("kendoWindow").close();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    
        function openCreateDialog() {
            $("#createPopup").data("kendoWindow").center().open();
        }
    </script>
```
```Razor _OrderCreate
    @model TelerikAspNetCoreApp24.Models.OrderViewModel

    <div id="updateWrapper">
        <form id="createForm" action="/Grid/Create" method="post">
            <div class="form-horizontal">
                <h4>OrderViewModel</h4>
                <hr />
                <div class="text-danger">
                    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
                </div>
    
                <div class="form-group">
                    @Html.LabelFor(model => model.OrderID, htmlAttributes: new { @class = "control-label col-md-2" })
                    <div class="col-md-10">
                        @Html.EditorFor(model => model.OrderID, new { htmlAttributes = new { @class = "form-control" } })
                        @Html.ValidationMessageFor(model => model.OrderID, "", new { @class = "text-danger" })
                    </div>
                </div>
    
                <div class="form-group">
                    @Html.LabelFor(model => model.CustomerID, htmlAttributes: new { @class = "control-label col-md-2" })
                    <div class="col-md-10">
                        @Html.EditorFor(model => model.CustomerID, new { htmlAttributes = new { @class = "form-control" } })
                        @Html.ValidationMessageFor(model => model.CustomerID, "", new { @class = "text-danger" })
                    </div>
                </div>
    
                <div class="form-group">
                    @Html.LabelFor(model => model.ContactName, htmlAttributes: new { @class = "control-label col-md-2" })
                    <div class="col-md-10">
                        @Html.EditorFor(model => model.ContactName, new { htmlAttributes = new { @class = "form-control" } })
                        @Html.ValidationMessageFor(model => model.ContactName, "", new { @class = "text-danger" })
                    </div>
                </div>
    
                <div class="form-group">
                    @Html.LabelFor(model => model.OrderDate, htmlAttributes: new { @class = "control-label col-md-2" })
                    <div class="col-md-10">
                        @Html.EditorFor(model => model.OrderDate, new { htmlAttributes = new { @class = "form-control" } })
                        @Html.ValidationMessageFor(model => model.OrderDate, "", new { @class = "text-danger" })
                    </div>
                </div>
    
                <div class="form-group">
                    @Html.LabelFor(model => model.ShippedDate, htmlAttributes: new { @class = "control-label col-md-2" })
                    <div class="col-md-10">
                        @Html.EditorFor(model => model.ShippedDate, new { htmlAttributes = new { @class = "form-control" } })
                        @Html.ValidationMessageFor(model => model.ShippedDate, "", new { @class = "text-danger" })
                    </div>
                </div>
    
                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input type="submit" value="Create" class="btn btn-default" />
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("createForm");
    
            form.addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent default form submission
    
                const formData = new FormData(form);
    
                fetch(form.action, {
                    method: form.method,
                    body: formData
                })
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById("updateWrapper").innerHTML = html;
    
                        // Close the popup if no errors are found
                        if (!document.querySelector(".validation-summary-errors")) {
                            closeCreatePopup();
                        }
                    })
                    .catch(error => console.error("Error:", error));
            });
        });
    
        function closeCreatePopup() {
            // Implement your popup close logic here
            console.log("Popup closed");
        }
    </script>

```

```C# HomeController
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult OrderCreatePartial()
        {
            return PartialView("_OrderCreate");
        }
    }
```

```C# GridController
    public partial class GridController : Controller
    {
		private static List<OrderViewModel> _orders = new List<OrderViewModel>()
		{
			new OrderViewModel(){ OrderID = 1, Freight = 10, OrderDate = DateTime.Now.AddDays(1), ShipName = "ShipName " + 1, ShipCity = "ShipCity " + 1},
			new OrderViewModel(){ OrderID = 2, Freight = 20, OrderDate = DateTime.Now.AddDays(2), ShipName = "ShipName " + 2, ShipCity = "ShipCity " + 2},
			new OrderViewModel(){ OrderID = 3, Freight = 30, OrderDate = DateTime.Now.AddDays(3), ShipName = "ShipName " + 3, ShipCity = "ShipCity " + 3},
			new OrderViewModel(){ OrderID = 4, Freight = 40, OrderDate = DateTime.Now.AddDays(4), ShipName = "ShipName " + 4, ShipCity = "ShipCity " + 4},
			new OrderViewModel(){ OrderID = 5, Freight = 50, OrderDate = DateTime.Now.AddDays(5), ShipName = "ShipName " + 5, ShipCity = "ShipCity " + 5},
        };
		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{
			return Json(_orders.ToDataSourceResult(request));
		}

        public ActionResult Create(OrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                _orders.Add(model);
            }

            return View("../Home/Index");
        }
    }
```

For the complete implementation of the suggested approach, refer to the [ASP.NET MVC application on how to use a Window to add a new item to a Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/WindowFormWithAjax). {% if site.core %}You can use this project as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
