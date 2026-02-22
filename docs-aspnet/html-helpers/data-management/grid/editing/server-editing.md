---
title: Server Editing
page_title: Server Editing - Telerik UI Grid HtmlHelper for ASP.NET MVC
description: "Configure server editing of the Kendo UI Grid for ASP.NET MVC."
components: ["grid"]
previous_url: /helpers/grid/server-editing, /helpers/data-management/grid/server-editing
slug: serverediting_grid_aspnetmvc
---

# Server Editing

You can enable the server edit mode for the Telerik UI Grid for ASP.NET MVC.

> The Telerik UI Grid for ASP.NET MVC uses `form` elements internally when the server editing is enabled. This means that you are not able to place the Grid in another `form` element on the page because the nesting of forms is not a standard-compliant characteristic.

1. Define a command column for the `Edit` and `Destroy` commands.

        @(Html.Kendo().Grid<MvcApplication1.Models.Product>()
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
        )

1. Set the editing mode to `InLine`.

        @(Html.Kendo().Grid<MvcApplication1.Models.Product>()
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
        )

1. Add the `Create` command to the Grid toolbar.

        @(Html.Kendo().Grid<MvcApplication1.Models.Product>()
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
        )

1. Specify the action methods which will handle the `Create`, `Update` and `Destroy` operations.

        @(Html.Kendo().Grid<MvcApplication1.Models.Product>()
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
        )

1. Specify the property of the model which is the unique identifier (primary key).

        @(Html.Kendo().Grid<MvcApplication1.Models.Product>()
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
        )
        

1. Implement the `Read` action method.

    ```C# Index
        public ActionResult Index()
        {
            return View(ProductService.GetAll());
        }
    ```
    ```C# ProductService
        public class ProductService : IDisposable
        {
            private static bool UpdateDatabase = false;
            private DemoDBContext entities;

            public ProductService(DemoDBContext entities)
            {
                this.entities = entities;
            }

            public IList<ProductViewModel> GetAll()
            {
                bool IsWebApiRequest = HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith("~/api");
                IList<ProductViewModel> result = null;

                if (!IsWebApiRequest)
                {
                    result = HttpContext.Current.Session["Products"] as IList<ProductViewModel>;
                }

                if (result == null || UpdateDatabase)
                {
                    var data = entities.Products.ToList();
                    result = data.Select(product => new ProductViewModel
                    {
                        ProductID = product.ProductID,
                        ProductName = product.ProductName,
                        UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                        UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                        QuantityPerUnit = product.QuantityPerUnit,
                        Discontinued = product.Discontinued,
                        UnitsOnOrder = product.UnitsOnOrder.HasValue ? (int)product.UnitsOnOrder.Value : default(int),
                        CategoryID = product.CategoryID,
                        Category = new CategoryViewModel()
                        {
                            CategoryID = product.Category.CategoryID,
                            CategoryName = product.Category.CategoryName
                        },
                        LastSupply = DateTime.Today
                    }).ToList();

                    if (!IsWebApiRequest)
                    {
                        HttpContext.Current.Session["Products"] = result;
                    }
                }

                return result;
            }

            public IEnumerable<ProductViewModel> Read()
            {
                return GetAll();
            }

            public void Create(ProductViewModel product)
            {
                if (!UpdateDatabase)
                {
                    var first = GetAll().OrderByDescending(e => e.ProductID).FirstOrDefault();
                    var id = (first != null) ? first.ProductID : 0;

                    product.ProductID = id + 1;

                    if (product.CategoryID == null)
                    {
                        product.CategoryID = 1;
                    }

                    if (product.Category == null)
                    {
                        product.Category = new CategoryViewModel() { CategoryID = 1, CategoryName = "Beverages" };
                    }

                    GetAll().Insert(0, product);
                }
                else
                {
                    var entity = new Product();

                    entity.ProductName = product.ProductName;
                    entity.UnitPrice = product.UnitPrice;
                    entity.UnitsInStock = (short)product.UnitsInStock;
                    entity.Discontinued = product.Discontinued;
                    entity.CategoryID = product.CategoryID;

                    if (entity.CategoryID == null)
                    {
                        entity.CategoryID = 1;
                    }

                    if (product.Category != null)
                    {
                        entity.CategoryID = product.Category.CategoryID;
                    }

                    entities.Products.Add(entity);
                    entities.SaveChanges();

                    product.ProductID = entity.ProductID;
                }
            }

            public void Update(ProductViewModel product)
            {
                if (!UpdateDatabase)
                {
                    var target = One(e => e.ProductID == product.ProductID);

                    if (target != null)
                    {
                        target.ProductName = product.ProductName;
                        target.UnitPrice = product.UnitPrice;
                        target.UnitsInStock = product.UnitsInStock;
                        target.Discontinued = product.Discontinued;

                        if (product.CategoryID == null)
                        {
                            product.CategoryID = 1;
                        }

                        if (product.Category != null)
                        {
                            product.CategoryID = product.Category.CategoryID;
                        }
                        else
                        {
                            product.Category = new CategoryViewModel()
                            {
                                CategoryID = (int)product.CategoryID,
                                CategoryName = entities.Categories.Where(s => s.CategoryID == product.CategoryID).Select(s => s.CategoryName).First()
                            };
                        }
                        
                        target.CategoryID = product.CategoryID;
                        target.Category = product.Category;
                    }
                }
                else
                {
                    var entity = new Product();

                    entity.ProductID = product.ProductID;
                    entity.ProductName = product.ProductName;
                    entity.UnitPrice = product.UnitPrice;
                    entity.UnitsInStock = (short)product.UnitsInStock;
                    entity.Discontinued = product.Discontinued;
                    entity.CategoryID = product.CategoryID;

                    if (product.Category != null)
                    {
                        entity.CategoryID = product.Category.CategoryID;
                    }

                    entities.Products.Attach(entity);
                    entities.Entry(entity).State = EntityState.Modified;
                    entities.SaveChanges();
                }
            }

            public void Destroy(ProductViewModel product)
            {
                if (!UpdateDatabase)
                {
                    var target = GetAll().FirstOrDefault(p => p.ProductID == product.ProductID);
                    if (target != null)
                    {
                        GetAll().Remove(target);
                    }
                }
                else
                {
                    var entity = new Product();

                    entity.ProductID = product.ProductID;

                    entities.Products.Attach(entity);

                    entities.Products.Remove(entity);

                    var orderDetails = entities.OrderDetails.Where(pd => pd.ProductID == entity.ProductID);

                    foreach (var orderDetail in orderDetails)
                    {
                        entities.OrderDetails.Remove(orderDetail);
                    }

                    entities.SaveChanges();
                }
            }

            public ProductViewModel One(Func<ProductViewModel, bool> predicate)
            {
                return GetAll().FirstOrDefault(predicate);
            }

            public void Dispose()
            {
                entities.Dispose();
            }
        }
    ```

1. Implement the `Create` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                // The model is valid. Insert the product and re-display the Grid.
                ProductService.Create(product);
                // GridRouteValues() is an extension method which returns the
                // route values defining the Grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            // The model is invalid. Render the current view to show any validation errors.
            return View("Index", ProductService.GetAll());
        }

1. Implement the `Update` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                // The model is valid. Update the product and re-display the Grid.
                ProductService.Update(product);

                // GridRouteValues() is an extension method which returns the
                // route values defining the Grid state - current page, sort expression, filter etc.
                RouteValueDictionary routeValues = this.GridRouteValues();

                return RedirectToAction("Index", routeValues);
            }

            // The model is invalid. Render the current view to show any validation errors.
            return View("Index", ProductService.GetAll());
        }

1. Implement the `Destroy` action method.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy(int productID)
        {
            // Find a product with ProductID equal to the id action parameter.
            Product product = ProductService.One(p => p.ProductID == productID);

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
            ProductService.Destroy(product);

            routeValues = this.GridRouteValues();

            // Re-display the Grid.
            return RedirectToAction("Index", routeValues);
        }

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Editing Approaches by the Grid HtmlHelper for ASP.NET MVC (Demos)](https://demos.telerik.com/aspnet-mvc/grid/editing)
* [Server-Side API](/api/grid)