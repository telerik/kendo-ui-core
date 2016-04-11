---
title: Server Editing
page_title: Server Editing | Kendo UI Grid HtmlHelper
description: "Configure server editing of the Kendo UI Grid for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/grid/server-editing
slug: serverediting_grid_aspnetmvc
position: 3
---

# Server Editing

To configure Kendo Grid for ASP.NET MVC for server editing follow these steps:

1.  Define a command column for the `Edit` and `Destroy` commands:

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
                .Name("Home")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                    columns.Bound(p => p.UnitPrice).Width(140);
                    columns.Bound(p => p.UnitsInStock).Width(140);
                    columns.Bound(p => p.Discontinued).Width(100);
                    // Add "Edit" and "Destroy" commands
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
        %>
2.  Set the editing mode to `InLine`:

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
                .Name("Home")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                    columns.Bound(p => p.UnitPrice).Width(140);
                    columns.Bound(p => p.UnitsInStock).Width(140);
                    columns.Bound(p => p.Discontinued).Width(100);
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
                // Set the edit mode to "InLine"
                .Editable(editable => editable.Mode(GridEditMode.InLine))
        %>
3.  Add the `Create` command to the grid toolbar:

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
                .Name("Home")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                    columns.Bound(p => p.UnitPrice).Width(140);
                    columns.Bound(p => p.UnitsInStock).Width(140);
                    columns.Bound(p => p.Discontinued).Width(100);
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
                // Add "Create" command
                .ToolBar(commands => commands.Create())
                .Editable(editable => editable.Mode(GridEditMode.InLine))
        %>
4.  Specify the action methods which will handle the Create, Update and Destroy operations:

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
                .Name("Home")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                    columns.Bound(p => p.UnitPrice).Width(140);
                    columns.Bound(p => p.UnitsInStock).Width(140);
                    columns.Bound(p => p.Discontinued).Width(100);
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
                .ToolBar(toolbar => toolbar.Create())
                .Editable(editable => editable.Mode(GridEditMode.InLine))
                .DataSource(dataSource => dataSource
                    .Server()
                    // Configure CRUD -->
                    .Create(create => create.Action("Create", "Home"))
                    .Read(read => read.Action("Index", "Home"))
                    .Update(update => update.Action("Update", "Home"))
                    .Destroy(destroy => destroy.Action("Destroy", "Home"))
                    // <-- Configure CRUD
                )
        %>
5.  Specify the property of the model which is the unique identifier (primary key):

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
                .Name("Home")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                    columns.Bound(p => p.UnitPrice).Width(140);
                    columns.Bound(p => p.UnitsInStock).Width(140);
                    columns.Bound(p => p.Discontinued).Width(100);
                    columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
                })
                .ToolBar(toolbar => toolbar.Create())
                .Editable(editable => editable.Mode(GridEditMode.InLine))
                .DataSource(dataSource => dataSource
                    .Server()
                    // Specify that the ProductID property is the unique identifier of the model
                    .Model(model => model.Id(p => p.ProductID))
                    .Create(create => create.Action("Create", "Home"))
                    .Read(read => read.Action("Index", "Home"))
                    .Update(update => update.Action("Update", "Home"))
                    .Destroy(destroy => destroy.Action("Destroy", "Home"))
                )
        %>
6.  Implement the `Read` action method:

        public ActionResult Index()
        {
            return View(ProductRepository.All());
        }
7.  Implement the `Create` action method:

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                //The model is valid - insert the product and redisplay the grid.
                ProductRepository.Insert(product);

                //GridRouteValues() is an extension method which returns the
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("Index", ProductRepository.All());
        }
8.  Implement the `Update` action method:

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                //The model is valid - update the product and redisplay the grid.
                ProductRepository.Update(product);

                //GridRouteValues() is an extension method which returns the
                //route values defining the grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            //The model is invalid - render the current view to show any validation errors
            return View("Index", ProductRepository.All());
        }
9.  Implement the `Destroy` action method:

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy(int productID)
        {
            //Find a product with ProductID equal to the id action parameter
            Product product = ProductRepository.One(p => p.ProductID == productID);

            RouteValueDictionary routeValues;

            if (product == null)
            {
                //A product with the specified id does not exist - redisplay the grid

                //GridRouteValues() is an extension method which returns the
                //route values defining the grid state - current page, sort expression, filter etc.
                routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            //Delete the record
            ProductRepository.Delete(product);

            routeValues = this.GridRouteValues();

            //Redisplay the grid
            return RedirectToAction("Index", routeValues);
        }

> **Important**  
> The Kendo UI MVC Grid uses `form` elements internally when server editing is enabled. This means the widget cannot be placed in another `form` element on the page, because nesting forms is not standard-compliant.

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting of the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
