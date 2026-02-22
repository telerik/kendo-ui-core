---
title: InCell
page_title: InCell Grid Editing Mode
description: "Enable InCell edit mode and batch updates in Telerik UI Grid component for {{ site.framework }}."
components: ["grid"]
slug: batchediting_grid_aspnetcore
position: 4
---

# InCell Editing

InCell editing allows users to click Grid data cells and type new values like in Excel. There is no need for command buttons to enter and exit edit mode. Users can quickly move between the editable cells and rows by using keyboard navigation.

The InCell edit mode provides a different user experience, compared to the Inline and Popup edit modes. InCell edit mode can be more convenient for advanced users, fast users, or users who prefer keyboard navigation rather than clicking command buttons.

> Read the [Grid Editing Overview article]({% slug htmlhelpers_grid_aspnetcore_editing_overview%}) first.

## Basics

To enable the InCell Grid editing, set the `Mode()` option of the `Editable()` configuration to `GridEditMode.InCell`. During InCell editing, only one table cell is in edit mode at a time. Users can:

* Click a specific cell to enter edit mode.
* Press `Tab` or `Shift + Tab` to confirm the current value and edit the next or previous cell.
* Press `Enter` to confirm the current value and exit edit mode when the `Navigatable()` option is enabled.
* Press `Esc` to cancel the current change and exit edit mode when the `Navigatable()` option is enabled.
* Click another cell to confirm the current value and edit the new cell.
* Click outside the Grid to confirm the current value and exit edit mode.
* Perform another Grid operation, for example, paging or sorting, to cancel the current edit operation.
* Click the **Add** toolbar command to add a new row.
* Click the **Save changes** toolbar command to submit any pending changes.
* Click the **Cancel changes** toolbar command to cancel any pending changes.
* Click the **Delete** command button to delete the respective row.

The non-editable cells do not enter edit mode.

Usually, the [`Batch()`](/api/kendo.mvc.ui.fluent/ajaxdatasourcebuilder#batchsystemboolean) option of the DataSource is enabled when the Grid is set up for InCell editing. This way, the `Create`, `Update`, and `Destroy` requests are sent in batches. For example, updating two data items triggers a single `Update` request instead of two.

## Commands

InCell add, edit, and delete operations use the following [command buttons]({% slug htmlhelpers_grid_aspnetcore_editing_overview%}#commands):

* **Add** (toolbar command)
* **Delete** (column command)
* **Save changes** (toolbar command)&mdash;Activated when a new row is added, a row is deleted, or at least one cell is edited.
* **Cancel changes** (column command)&mdash;Activated when the Grid contains a pending change.

In InCell edit mode, the Grid commands execute cell by cell, and the corresponding [Grid client-side events](/api/kendo.mvc.ui.fluent/grideventbuilder) also fire cell by cell.

## Setting the InCell Edit Mode

The example below shows how to implement InCell Grid CRUD operations with the simplest and minimal required setup.

1. Add a new class to the `~/Models` folder, for example, `ProductViewModel`:

    ```C#
    using System.ComponentModel.DataAnnotations;

    public class ProductViewModel
    {
        // The unique model identifier field.
        public int ProductID { get; set; }
        [Required] // The ProductName property is required.
        public string ProductName { get; set; }
        public short? UnitsInStock { get; set; }
    }
    ```

1. Open `HomeController.cs` and add a new action method that returns the dataset `Products` as JSON. The Grid makes Ajax requests to this action to read the data.

    ```C#
    public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
    {
        // ToDataSourceResult works with IEnumerable and IQueryable.
        using (var northwind = new NorthwindEntities())
        {
            IQueryable<Product> products = northwind.Products;
            DataSourceResult result = products.ToDataSourceResult(request);
            return Json(result);
        }
    }
    ```

1. Add a new action method to `HomeController.cs`, responsible for saving the new data items. Name the method `Products_Create`. Intercept the added data items as a collection of `ProductViewModel`, using the `[Bind(Prefix="models")]`.

    ```C#
    public ActionResult Products_Create([DataSourceRequest]DataSourceRequest request, [Bind(Prefix="models")]IEnumerable<ProductViewModel> products)
    {
        // Will keep the inserted entities here. Used to return the result later.
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
        // Return the inserted entities. The Grid needs the generated ProductID. Also, return any validation errors through the ModelState.
        return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
        {
            ProductID = product.ProductID,
            ProductName = product.ProductName,
            UnitsInStock = product.UnitsInStock
        }));
    }
    ```

1. Add an action method to `HomeController.cs`, responsible for saving the edited data items. Name the method `Products_Update`. Intercept the modified data items as a collection of `ProductViewModel`, using the `[Bind(Prefix="models")]`.

    ```C#
    public ActionResult Products_Update([DataSourceRequest]DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
    {
        // Will keep the updated entities here. Used to return the result later.
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
                    // Change its state to Modified so EntityFramework can update the existing product instead of creating a new one.
                    northwind.Entry(entity).State = EntityState.Modified;
                    // Or use ObjectStateManager if using a previous version of EntityFramework.
                    // northwind.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                }
                // Update the entities in the database.
                northwind.SaveChanges();
            }
        }
        // Return the updated entities. Also, return any validation errors through the ModelState.
        return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
        {
            ProductID = product.ProductID,
            ProductName = product.ProductName,
            UnitsInStock = product.UnitsInStock
        }));
    }
    ```

1. Add a new action method to `HomeController.cs`, responsible for saving the deleted data items. Name the method `Products_Destroy`. Intercept the removed data items as a collection of `ProductViewModel`, using the `[Bind(Prefix="models")]`.

    ```C#
    public ActionResult Products_Destroy([DataSourceRequest]DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
    {
        // Will keep the destroyed entities here. Used to return the result later.
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
                    // Delete the entity.
                    northwind.Products.Remove(entity);
                    // Or use DeleteObject if using a previous version of EntityFramework.
                    // northwind.Products.DeleteObject(entity);
                }
                // Delete the entity in the database.
                northwind.SaveChanges();
            }
        }
        // Return the destroyed entities. Also, return any validation errors through the ModelState.
        return Json(entities.ToDataSourceResult(request, ModelState, product => new ProductViewModel
        {
            ProductID = product.ProductID,
            ProductName = product.ProductName,
            UnitsInStock = product.UnitsInStock
        }));
    }
    ```

1. Within the view, configure the Grid to use the action methods created in the previous steps. The `Update` and `Destroy` actions must return a collection with the modified or deleted records to enable the DataSource to apply the changes accordingly. The `Create` method must return a collection of the created records where each data item has an assigned `ID` field.

    ```HtmlHelper
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
            toolbar.Save(); // The "save" command saves the changes.
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell)) // Use InCell editing mode.
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true) // Enable batch updates.
            .Model(model =>
            {
                model.Id(product => product.ProductID); // Specify the property, which is the unique identifier of the model that binds to the Grid.
                model.Field(product => product.ProductID).Editable(false); // Make the "ProductID" property not editable.
            })
            .Create(create => create.Action("Products_Create", "Home")) // Action method invoked when the user saves new data items.
            .Read(read => read.Action("Products_Read", "Home"))  // Action method invoked when the Grid requests the data.
            .Update(update => update.Action("Products_Update", "Home"))  // Action method invoked when the user saves updated data items.
            .Destroy(destroy => destroy.Action("Products_Destroy", "Home")) // Action method invoked when the user removes data items.
        )
        .Pageable()
    )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" height="550">
            <datasource  page-size="20" type="DataSourceTagHelperType.Ajax" batch="true" page-size="20">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="ProductID">
                        <fields>
                            <field name="ProductID" type="number" editable="false"></field>
                            <field name="ProductName" type="string"></field>
                            <field name="UnitsInStock" type="number"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url=@Url.Action("Products_Read", "Home") />
                    <update url=@Url.Action("Products_Update", "Home") />
                    <create url=@Url.Action("Products_Create", "Home") />
                    <destroy url=@Url.Action("Products_Destroy", "Home") />
                </transport>
            </datasource>
            <editable mode="incell" />
            <toolbar> <!-- Enable the built-in Grid's Toolbar commands "create", "save", and "cancel". -->
                <toolbar-button name="create"></toolbar-button> <!-- Adds an empty row to the grid to create a new record. -->
                <toolbar-button name="save"></toolbar-button> <!-- Saves the new and the edited records. -->
            </toolbar>
            <columns>
                <column field="ProductID" width="100" />
                <column field="ProductName" />
                <column field="UnitsInStock" width="250" />
                <column>
                    <commands>
                        <column-command name="destroy"></column-command>
                    </commands>
                </column>
            </columns>
            <pageable enabled="true"/>
        </kendo-grid>
    ```
    {% endif %}

## Editors

@[template](/_contentTemplates/grid-default-editors.md#grid-default-editors-section)

To define a custom editor for a specified column:

1. Add a view that contains the desired editor in the `~/Views/Shared/EditorTemplates/` folder:

    ```Razor CategoryEditor.cshtml
        <!-- ~/Views/Shared/EditorTemplates/CategoryEditor.cshtml-->

        @model int?

        @(Html.Kendo().DropDownListFor(m => m)
            .DataValueField("Id") // The value of the drop-down is taken from the "Id" property.
            .DataTextField("Name") // The text of the item is taken from the "Name" property.
            .BindTo((System.Collections.IEnumerable)ViewData["categories"]) // A list of all optipns, which is populated in the controller.
        )
    ```
    ```C# ProductViewModel
    public class ProductViewModel
    {
        public int ProductID { get; set; }
        [Required]
        public string ProductName { get; set; }
        public short? UnitsInStock { get; set; }
        public int? CategoryID { get; set; }
    }
    ```
    ```C# Controller
    public ActionResult Index()
    {
        List<CategoryViewModel> categories = new List<CategoryViewModel>();
        for (int i = 1; i < 6; i++)
        {
            CategoryViewModel category = new CategoryViewModel
            {
                Id = i,
                Name = "Category " + i
            };
            categories.Add(category);
        }
        ViewData["categories"] = categories;
        return View(); // Return the View that contins the Grid declaration.
    }
    ```
    ```C# CategoryViewModel
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    ```

1. In the model class declaration, decorate the property with the `UIHint` data attribute and specify the name of the created view (**CategoryEditor**):

    ```C# ProductViewModel
    public class ProductViewModel
    {
        public int ProductID { get; set; }
        [Required]
        public string ProductName { get; set; }
        public short? UnitsInStock { get; set; }
        [UIHint("CategoryEditor")]
        public int? CategoryID { get; set; }
    }
    ```

For a live example, visit the [Custom Editing Demo of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom).

For more use-cases and information on the column editor templates, refer to the [Editor Templates documentation]({% slug htmlhelpers_grid_aspnetcore_editing_overview %}).

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [InCell(batch) Editing by the Grid for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}* [Server-Side TagHelper API](/api/taghelpers/grid){% endif %}
