---
title: Batch Editing
page_title: Cell editing mode and Batch Updates for Kendo UI Grid for ASP.NET MVC
description: Step by step guide how to enable cell editing mode and batch updates in Kendo UI Grid for ASP.NET MVC.
---

# Cell Editing and Batch Updates

## Getting started

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridBatchEditing". If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add ->  New Item". Choose "Data -> ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next". ![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" table from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish". ![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)
1. Add a new class to the `~/Models` folder. Name it `ProductViewModel`.

        public class ProductViewModel
        {
            public int ProductID { get; set; }
            // The ProductName property is required
            [Required]
            public string ProductName { get; set; }
            // Use the Integer editor template for the UnitsInStock property
            [UIHint("Integer")]
            public short? UnitsInStock { get; set; }
        }
1.  Open HomeController.cs and add a new action method which will return the Products as JSON. The grid will make ajax requests to this action.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
                return Json(result);
            }
        }
1.  Add new action method to HomeController.cs. It will be responsible for saving new data items. Name the method "Products_Create".

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
                        // Create a new Product entity and set its properties from the posted ProductViewModel
                        var entity = new Product
                        {
                            ProductName = product.ProductName,
                            UnitsInStock = product.UnitsInStock
                        };
                        // Add the entity
                        northwind.Products.Add(entity);
                        // Store the entity for later use
                        entities.Add(entity);
                    }
                    // Insert the entities in the database
                    northwind.SaveChanges();
                }
            }
            // Return the inserted entities. The grid needs the generated ProductID. Also return any validation errors.
            return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitsInStock = product.UnitsInStock
            }));
        }
1.  Add new action method to HomeController.cs. It will be responsible for saving updated data items. Name the method "Products_Update".

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
                        // Create a new Product entity and set its properties from the posted ProductViewModel
                        var entity = new Product
                        {
                            ProductID = product.ProductID,
                            ProductName = product.ProductName,
                            UnitsInStock = product.UnitsInStock
                        };
                        // Store the entity for later use
                        entities.Add(entity);
                        // Attach the entity
                        northwind.Products.Attach(entity);
                        // Change its state to Modified so Entity Framework can update the existing product instead of creating a new one
                        northwind.Entry(entity).State = EntityState.Modified;
                        // Or use ObjectStateManager if using a previous version of Entity Framework
                        // northwind.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                    }
                    // Update the entities in the database
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
1.  Add new action method to HomeController.cs. It will be responsible for saving deleted data items. Name the method "Products_Destroy".

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
                        // Create a new Product entity and set its properties from the posted ProductViewModel
                        var entity = new Product
                        {
                            ProductID = product.ProductID,
                            ProductName = product.ProductName,
                            UnitsInStock = product.UnitsInStock
                        };
                        // Store the entity for later use
                        entities.Add(entity);
                        // Attach the entity
                        northwind.Products.Attach(entity);
                        // Delete the entity
                        northwind.Products.Remove(entity);
                        // Or use DeleteObject if using a previous versoin of Entity Framework
                        // northwind.Products.DeleteObject(entity);
                    }
                    // Delete the entity in the database
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
1.  In the view configure the grid to use the action methods created in the previous steps.

    ```Razor
    @(Html.Kendo().Grid<KendoGridBatchEditing.Models.ProductViewModel>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID).Width(100);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock).Width(250);
              columns.Command(commands =>
              {
                  commands.Destroy(); // The "destroy" command removes data items
              }).Title("Commands").Width(200);
          })
          .ToolBar(toolbar =>
          {
              toolbar.Create(); // The "create" command adds new data items
              toolbar.Save(); // The "save" command saves the changed data items
          })
          .Editable(editable => editable.Mode(GridEditMode.InCell)) // Use in-cell editing mode
          .DataSource(dataSource =>
              dataSource.Ajax()
                .Batch(true) // Enable batch updates
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable
                })
                .Create(create => create.Action("Products_Create", "Home")) // Action method invoked when the user saves a new data item
                .Read(read => read.Action("Products_Read", "Home"))  // Action method invoked when the grid needs data
                .Update(update => update.Action("Products_Update", "Home"))  // Action method invoked when the user saves an updated data item
                .Destroy(destroy => destroy.Action("Products_Destroy", "Home")) // Action method invoked when the user removes a data item
          )
          .Pageable()
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid<KendoGridBatchEditing.Models.ProductViewModel>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID).Width(100);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock).Width(250);
              columns.Command(commands =>
              {
                  commands.Destroy(); // The "destroy" command removes data items
              }).Title("Commands").Width(200);
          })
          .ToolBar(toolbar =>
          {
              toolbar.Create(); // The "create" command adds new data items
              toolbar.Save(); // The "save" command saves the changed data items
          })
          .Editable(editable => editable.Mode(GridEditMode.InCell)) // Use in-cell editing mode
          .DataSource(dataSource =>
              dataSource.Ajax()
                .Batch(true) // Enable batch updates
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable
                })
                .Create(create => create.Action("Products_Create", "Home")) // Action method invoked when the user saves a new data item
                .Read(read => read.Action("Products_Read", "Home"))  // Action method invoked when the grid needs data
                .Update(update => update.Action("Products_Update", "Home"))  // Action method invoked when the user saves an updated data item
                .Destroy(destroy => destroy.Action("Products_Destroy", "Home")) // Action method invoked when the user removes a data item
          )
          .Pageable()
    %>
    ```
1. Build and run the application


[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/batch-editing)
