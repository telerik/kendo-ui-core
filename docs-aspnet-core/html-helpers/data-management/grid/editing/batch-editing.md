---
title: Batch Editing
page_title: Batch Editing | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Enable cell editing mode and batch updates in Kendo UI Grid for ASP.NET Core."
slug: batchediting_grid_aspnetcore
position: 1
---

# Batch Editing

This article demonstrates how to enable cell editing mode and batch updates in Kendo UI Grid for ASP.NET Core.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET Core to do cell editing and batch updates.

1. Add a new class to the `~/Models` folder. The following example uses the `ProductViewModel` name.

    ###### Example

            public class ProductViewModel
            {
                public int ProductID { get; set; }
                // The ProductName property is required.
                [Required]
                public string ProductName { get; set; }
                // Use the Integer editor template for the UnitsInStock property.
                [UIHint("Integer")]
                public short? UnitsInStock { get; set; }
            }

1.  Open `HomeController.cs` and add a new action method which will return the **Products** as JSON. The Grid will make Ajax requests to this action.

    ###### Example

            public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
            {
				//ToDataSourceResult works with IEnumerable and IQueryable
                using (var northwind = new NorthwindEntities())
                {
                    IQueryable<Product> products = northwind.Products;
                    DataSourceResult result = products.ToDataSourceResult(request);
                    return Json(result);
                }
            }

1. Add a new action method to `HomeController.cs`. It will be responsible for saving the new data items. Name the method `Products_Create`.

    ###### Example

            public ActionResult Products_Create([DataSourceRequest]DataSourceRequest request, [Bind(Prefix="models")]IEnumerable<ProductViewModel> products)
            {
                // Will keep the inserted entitites here. Used to return the result later.
                var entities = new List<Product>();
                if (ModelState.IsValid)
                {
                    using (var northwind = new NorthwindEntities())
                    {
                        foreach (var product in products)
                        {
                            // Create a new Product entity and set its properties from the posted ProductViewModel.
                            var entity = new Product
                            {
                                ProductName = product.ProductName,
                                UnitsInStock = product.UnitsInStock
                            };
                            // Add the entity.
                            northwind.Products.Add(entity);
                            // Store the entity for later use.
                            entities.Add(entity);
                        }
                        // Insert the entities in the database.
                        northwind.SaveChanges();
                    }
                }
                // Return the inserted entities. The Grid needs the generated ProductID. Also return any validation errors.
                return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitsInStock = product.UnitsInStock
                }));
            }

1. Add a new action method to `HomeController.cs`. It will be responsible for saving the updated data items. Name the method `Products_Update`.

    ###### Example

            public ActionResult Products_Update([DataSourceRequest]DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
            {
                // Will keep the updated entitites here. Used to return the result later.
                var entities = new List<Product>();
                if (ModelState.IsValid)
                {
                    using (var northwind = new NorthwindEntities())
                    {
                        foreach (var product in products)
                        {
                            // Create a new Product entity and set its properties from the posted ProductViewModel.
                            var entity = new Product
                            {
                                ProductID = product.ProductID,
                                ProductName = product.ProductName,
                                UnitsInStock = product.UnitsInStock
                            };
                            // Store the entity for later use.
                            entities.Add(entity);
                            // Attach the entity.
                            northwind.Products.Attach(entity);
                            // Change its state to Modified so Entity Framework can update the existing product instead of creating a new one.
                            northwind.Entry(entity).State = EntityState.Modified;
                            // Or use ObjectStateManager if using a previous version of Entity Framework.
                            // northwind.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                        }
                        // Update the entities in the database.
                        northwind.SaveChanges();
                    }
                }
                // Return the updated entities. Also return any validation errors.
                return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitsInStock = product.UnitsInStock
                }));
            }

1. Add a new action method to `HomeController.cs`. It will be responsible for saving the deleted data items. Name the method `Products_Destroy`.

    ###### Example

            public ActionResult Products_Destroy([DataSourceRequest]DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
            {
                // Will keep the destroyed entitites here. Used to return the result later.
                var entities = new List<Product>();
                if (ModelState.IsValid)
                {
                    using (var northwind = new NorthwindEntities())
                    {
                        foreach (var product in products)
                        {
                            // Create a new Product entity and set its properties from the posted ProductViewModel.
                            var entity = new Product
                            {
                                ProductID = product.ProductID,
                                ProductName = product.ProductName,
                                UnitsInStock = product.UnitsInStock
                            };
                            // Store the entity for later use.
                            entities.Add(entity);
                            // Attach the entity
                            northwind.Products.Attach(entity);
                            // Delete the entity.
                            northwind.Products.Remove(entity);
                            // Or use DeleteObject if using a previous versoin of Entity Framework.
                            // northwind.Products.DeleteObject(entity);
                        }
                        // Delete the entity in the database.
                        northwind.SaveChanges();
                    }
                }
                // Return the destroyed entities. Also return any validation errors.
                return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitsInStock = product.UnitsInStock
                }));
            }

1. In the view, configure the Grid to use the action methods created in the previous steps.

    ###### Example

            @(Html.Kendo().Grid<KendoGridBatchEditing.Models.ProductViewModel>()
                  .Name("grid")
                  .Columns(columns =>
                  {
                      columns.Bound(product => product.ProductID).Width(100);
                      columns.Bound(product => product.ProductName);
                      columns.Bound(product => product.UnitsInStock).Width(250);
                      columns.Command(commands =>
                      {
                          commands.Destroy(); // The "destroy" command removes data items.
                      }).Title("Commands").Width(200);
                  })
                  .ToolBar(toolbar =>
                  {
                      toolbar.Create(); // The "create" command adds new data items.
                      toolbar.Save(); // The "save" command saves the changed data items.
                  })
                  .Editable(editable => editable.Mode(GridEditMode.InCell)) // Use in-cell editing mode.
                  .DataSource(dataSource =>
                      dataSource.Ajax()
                        .Batch(true) // Enable batch updates.
                        .Model(model =>
                        {
                            model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model.
                            model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable.
                        })
                        .Create(create => create.Action("Products_Create", "Home")) // Action method invoked when the user saves a new data item.
                        .Read(read => read.Action("Products_Read", "Home"))  // Action method invoked when the grid needs data.
                        .Update(update => update.Action("Products_Update", "Home"))  // Action method invoked when the user saves an updated data item.
                        .Destroy(destroy => destroy.Action("Products_Destroy", "Home")) // Action method invoked when the user removes a data item.
                  )
                  .Pageable()
            )

The **Create**, **Update** and **Destroy** action methods must return a collection with the modified/deleted records, which will allow the DataSource to apply the changes accordingly. The **Create** method should return collection with the created records with the assigned ID field.

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
