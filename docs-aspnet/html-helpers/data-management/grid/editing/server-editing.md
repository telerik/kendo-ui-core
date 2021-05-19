---
title: Server Editing
page_title: Server Editing | Telerik UI Grid HtmlHelper for ASP.NET MVC
description: "Configure server editing of the Kendo UI Grid for ASP.NET MVC."
previous_url: /helpers/grid/server-editing, /helpers/data-management/grid/server-editing
slug: serverediting_grid_aspnetmvc
---

# Server Editing

You can enable the server edit mode for the Telerik UI Grid for ASP.NET MVC.

> The Telerik UI Grid for ASP.NET MVC uses `form` elements internally when the server editing is enabled. This means that you are not able to place the Grid in another `form` element on the page because the nesting of forms is not a standard-compliant characteristic.

1. Define a command column for the `Edit` and `Destroy` commands.

        <%: Html.Kendo().Grid<MvcApplication1.Models.Product>()
            .Name("Home")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice).Width(140);
                columns.Bound(p => p.UnitsInStock).Width(140);
                columns.Bound(p => p.Discontinued).Width(100);
                // Add the "Edit" and "Destroy" commands.
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
            })
        %>

1. Set the editing mode to `InLine`.

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
            // Set the edit mode to "InLine".
            .Editable(editable => editable.Mode(GridEditMode.InLine))
        %>

1. Add the `Create` command to the Grid toolbar.

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
            // Add the "Create" command.
            .ToolBar(commands => commands.Create())
            .Editable(editable => editable.Mode(GridEditMode.InLine))
        %>

1. Specify the action methods which will handle the `Create`, `Update` and `Destroy` operations.

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
                // Configure CRUD. -->
                .Create(create => create.Action("Create", "Home"))
                .Read(read => read.Action("Index", "Home"))
                .Update(update => update.Action("Update", "Home"))
                .Destroy(destroy => destroy.Action("Destroy", "Home"))
                // <-- Configure CRUD.
            )
        %>

1. Specify the property of the model which is the unique identifier (primary key).

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
                // Specify that the ProductID property is the unique identifier of the model.
                .Model(model => model.Id(p => p.ProductID))
                .Create(create => create.Action("Create", "Home"))
                .Read(read => read.Action("Index", "Home"))
                .Update(update => update.Action("Update", "Home"))
                .Destroy(destroy => destroy.Action("Destroy", "Home"))
            )
        %>

1. Implement the `Read` action method.

        public ActionResult Index()
        {
            return View(ProductRepository.All());
        }

1. Implement the `Create` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                // The model is valid. Insert the product and re-display the Grid.
                ProductRepository.Insert(product);
                // GridRouteValues() is an extension method which returns the
                // route values defining the Grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            // The model is invalid. Render the current view to show any validation errors.
            return View("Index", ProductRepository.All());
        }

1. Implement the `Update` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                // The model is valid. Update the product and re-display the Grid.
                ProductRepository.Update(product);

                // GridRouteValues() is an extension method which returns the
                // route values defining the Grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            // The model is invalid. Render the current view to show any validation errors.
            return View("Index", ProductRepository.All());
        }

1. Implement the `Destroy` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy(int productID)
        {
            // Find a product with ProductID equal to the id action parameter.
            Product product = ProductRepository.One(p => p.ProductID == productID);

            RouteValueDictionary routeValues;

            if (product == null)
            {
                // A product with the specified id does not exist. Re-display the Grid.
                // GridRouteValues() is an extension method which returns the
                // route values defining the Grid state - current page, sort expression, filter etc.
                routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            // Delete the record.
            ProductRepository.Delete(product);

            routeValues = this.GridRouteValues();

            // Re-display the Grid.
            return RedirectToAction("Index", routeValues);
        }

## See Also

* [Editing Approaches by the Grid HtmlHelper for ASP.NET MVC (Demos)](https://demos.telerik.com/aspnet-mvc/grid/editing)
* [Server-Side API](/api/grid)