---
title: Batch Editing
page_title: Batch Editing | Kendo UI Grid HtmlHelper
description: "Enable cell editing mode and batch updates in Kendo UI Grid for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/grid/batch-editing
slug: batchediting_grid_aspnetmvc
position: 1
---

# Batch Editing

This article demonstrates how to enable cell editing mode and batch updates in Kendo UI Grid for ASP.NET MVC.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to do cell editing and batch updates.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridBatchEditing`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add new item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3** Pick the **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.

**Figure 2. Choose the connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** table from the **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choose the Products table**

![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)

**Step 5** Add a new class to the `~/Models` folder. Name it `ProductViewModel`.

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

**Step 6**  Open `HomeController.cs` and add a new action method which will return the **Products** as JSON. The Grid will make Ajax requests to this action.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
                return Json(result);
            }
        }

**Step 7** Add a new action method to `HomeController.cs`. It will be responsible for saving the new data items. Name the method `Products_Create`.

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

**Step 8** Add a new action method to `HomeController.cs`. It will be responsible for saving the updated data items. Name the method `Products_Update`.

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

**Step 9** Add a new action method to `HomeController.cs`. It will be responsible for saving the deleted data items. Name the method `Products_Destroy`.

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

**Step 10** In the view, configure the Grid to use the action methods created in the previous steps.

###### Example

```tab-ASPX

        <%: Html.Kendo().Grid<KendoGridBatchEditing.Models.ProductViewModel>()
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
        %>
```
```tab-Razor

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
```

**Step 11** Build and run the application.

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
* [Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/batch-editing)
