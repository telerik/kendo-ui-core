---
title: Popup
page_title: Popup
description: "Define commands and set the edit mode to configure the Telerik UI Grid component for {{ site.framework }} for Popup editing."
slug: popupediting_grid_aspnetcore
position: 3
---

# Popup Editing

The Popup editing of the Grid allows the user to modify the Grid content through a popup form with customizable dimensions and layout. 

> Read the [Grid Editing Overview article]({% slug htmlhelpers_grid_aspnetcore_editing_overview%}) first.

## Basics

To enable the Popup Grid editing, set the `Mode()` option of the `Editable()` configuration to `GridEditMode.PopUp`. During Popup editing, only one table row is in edit mode at a time. Users can:

* Click the **Edit** command button to open the editing form of the Grid row.
* Press `Tab` or `Shift + Tab` to focus the next or previous editor.
* Click the **Save** button of the form to confirm the current row changes and exit edit mode.
* Click the **Cancel** button of the form or the window close action to cancel the current row changes and exit edit mode.
* Click the **Add** toolbar command to open an empty form to add a new row.
* Click the **Delete** command button to delete the respective row.

You can modify the default options and appearance of the popup window through the [`Window()`](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#windowsystemaction) settings of the `Editable()` configuration.

```HtmlHelper
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("Grid")
    .Editable(editable => editable.Mode(GridEditMode.PopUp).Window(wnd => wnd.Title("Editing Form").Modal(false)))
    ... // Additional configuration.
)
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <editable mode="popup" >
            <window modal="false" title="Editing Form"/>
        </editable>
        <!-- Other configuration. -->
    </kendo-grid>
```
{% endif %}

## Commands

Popup add, edit, and delete operations use the following [command buttons]({% slug htmlhelpers_grid_aspnetcore_editing_overview%}#commands):

* **Add** (toolbar command)
* **Delete** (column command)
* **Edit** (column command)
* **Save** (popup form button)
* **Cancel** (popup form button)

In Popup edit mode, the Grid commands execute row by row and the corresponding [Grid client-side events](/api/kendo.mvc.ui.fluent/grideventbuilder) also fire row by row. This is similar to [Inline editing]({% slug inlineediting_grid_aspnetcore%}) and unlike [InCell editing]({% slug batchediting_grid_aspnetcore%}), where commands and events relate to cells.

## Setting the Popup Edit Mode

The example below shows how to implement Popup Grid CRUD operations with the simplest and minimal required setup.

1. Add a new class to the `~/Models` folder, for example, `OrderViewModel`:

    ```C#
    using System.ComponentModel.DataAnnotations;

    public class OrderViewModel
    {
        // The unique model identifier field.
        public int OrderID { get; set; }
        [Required]
        public string ShipCountry { get; set; }
        public int Freight { get; set; }
    }
    ```

1. Open `HomeController.cs` and add a new action method that returns the dataset `orders` as JSON. The Grid makes Ajax requests to this action to read the data.

    ```C#
    using AspNetCoreGrid.Models;
    using Kendo.Mvc.Extensions; // Required in order to use the ToDataSourceResult() method for processing the request.
    using Kendo.Mvc.UI; // Required in order to use the DataSourceRequest class and attribute to parse the request.

    public class HomeController : Controller
    {
        // The example uses dummy data but you can use a database Select().
        public static List<OrderViewModel> orders = Enumerable.Range(1, 10).Select(i => new OrderViewModel
        {
            OrderID = i,
            ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2",
            Freight = i * 10
        }).ToList();

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            return Json(orders.ToDataSourceResult(request));
        }
    }
    ```

1. Add a new action method to `HomeController.cs`, responsible for saving the new data items. Name the method `Orders_Create`.

    ```C#
    public ActionResult Orders_Create([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (ModelState.IsValid)
        {
            // Add a unique value for the model Id so that the DataSource recognizes the data item as an existing data item next time.
            order.OrderID = orders.Count + 1;

            // Save the item in the database.
            orders.Add(order);
        }

        // Return a collection with the newly created record. Also, return any validation errors through the ModelState.
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }
    ```

1. Add an action method to `HomeController.cs`, responsible for saving the edited data items. Name the method `Orders_Update`.

    ```C#
    public ActionResult Orders_Update([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (ModelState.IsValid)
        {
            // Save the updated data item in the database or follow with the dummy data.
            for (int i = 0; i < orders.Count; i++)
            {
                // The example uses the model Id to identify the model instance that needs to be updated.
                if(orders[i].OrderID == order.OrderID)
                {
                    orders[i] = order;
                    break;
                }
            }
        }

        // Return a collection with the updated record to the Grid. Also, return any validation errors through the ModelState.
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }
    ```

1. Add a new action method to `HomeController.cs`, responsible for saving the deleted data items. Name the method `Orders_Destroy`.

    ```C#
    public ActionResult Orders_Destroy([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        // Delete the item from the database or follow with the dummy data.
        orders.Remove(order);

        // Return a collection, which contains only the removed data item.
        return Json(new[] { order }.ToDataSourceResult(request));
    }
    ```

1. Within the view, configure the Grid to use the action methods created in the previous steps. The `Update` and `Destroy` actions must return a collection with the modified or deleted records to enable the DataSource to apply the changes accordingly. The `Create` method must return a collection of the created record with the assigned `ID` field.

    ```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(f => f.OrderID);
            columns.Bound(f => f.ShipCountry);
            columns.Bound(f => f.Freight);
            columns.Command(command => {
                command.Edit(); // The "edit" command edits and updates the data items.
                command.Destroy(); // The "destroy" command removes data items.
            });
        })
        .ToolBar(toolbar => toolbar.Create()) // The "create" command adds new data items.
        .Editable(editable => editable.Mode(GridEditMode.PopUp)) // Enable the Popup edit mode.
        .DataSource(d =>
        {
            d.Ajax()
            .Model(model =>
            {
                model.Id(product => product.OrderID); // Specify the property, which is the unique identifier of the model that binds to the Grid.
                model.Field(product => product.OrderID).Editable(false); // Make the "OrderID" property non-editable.
            })
            .Create(create => create.Action("Orders_Create", "Home")) // Action invoked when the user saves a new data item.
            .Read(read => read.Action("Orders_Read", "Home"))  // Action invoked when the Grid requests the data.
            .Update(update => update.Action("Orders_Update", "Home"))  // Action invoked when the user saves an updated data item.
            .Destroy(destroy => destroy.Action("Orders_Destroy", "Home")); // Action invoked when the user removes a data item.
        })
        .Pageable()
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number" editable="false"></field>
                        <field name="ShipCountry" type="string"></field>
                        <field name="Freight" type="number"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url= "@Url.Action("Orders_Read", "Home")" />
                <update url="@Url.Action("Orders_Update", "Home")" />
                <create url="@Url.Action("Orders_Create", "Home")" />
                <destroy url="@Url.Action("Orders_Destroy", "Home")" />
            </transport>
        </datasource>
        <columns>
            <column field="OrderID" />
            <column field="ShipCountry"  />
            <column field="Freight"  />
            <column>
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="create"></toolbar-button>
        </toolbar>
        <editable mode="popup" />
        <pageable enabled="true" />
    </kendo-grid>
    ```
    {% endif %}

## Editors

@[template](/_contentTemplates/grid-default-editors.md#grid-default-editors-section)

### Custom Editors

To define a custom editor for a specified field in the popup form:

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
    ```C# OrderViewModel
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        [Required]
        public string ShipCountry { get; set; }
        public int Freight { get; set; }
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

    ```C# OrderViewModel
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        [Required]
        public string ShipCountry { get; set; }
        public int Freight { get; set; }
        [UIHint("CategoryEditor")]
        public int? CategoryID { get; set; }
    }
    ```

For more use cases and information on the column editor templates, refer to the [Editor Templates documentation]({% slug editortemplates_grid_aspnetcore %}).

### Custom Popup Editor Template

By design, all properties of the model that bind to the Grid are displayed in the default popup form when switching a row to edit mode. When it is required to display specified fields rather than all declared model fields, create a custom popup editor template that contains only the required editors. Also, using the custom template, you can include HTML, CSS, and JavaScript to modify the default form appearance.

The following example shows how to customize the default popup editor template of the Grid:

1. Create a view in the `~/Views/Shared/EditorTemplates/` folder and add a reference to the Grid's model. Define the editors for the editable fields.

    ```Razor CustomPopupEditor.cshtml
    @model OrderViewModel

    @Html.HiddenFor(model => model.OrderID)

    <div class="k-edit-label">
        @Html.LabelFor(model => model.ShipCity)
    </div>
    <div class="k-edit-field">
        @(Html.Kendo().TextBoxFor(model => model.ShipCity))
        @Html.ValidationMessageFor(model => model.ShipCity)
    </div>

    <div class="k-edit-label">
        @Html.LabelFor(model => model.Freight)
    </div>
    <div class="k-edit-field">
        @(Html.Kendo().NumericTextBoxFor(model => model.Freight))
        @Html.ValidationMessageFor(model => model.Freight)
    </div>
    ```
    {% if site.core %}
    ```Razor TagHelper_CustomPopupEditor.cshtml
    @model OrderViewModel

    @Html.HiddenFor(model => model.OrderID)

    <div class="k-edit-label">
        <label asp-for="ShipCity">City:</label>
    </div>
    <div class="k-edit-field">
        <kendo-textbox for="ShipCity" is-in-client-template="true">
        </kendo-textbox> 
    </div>

    <div class="k-edit-label">
        <label asp-for="Freight">Freight:</label>
    </div>
    <div class="k-edit-field">
        <kendo-numerictextbox for="Freight" is-in-client-template="true">
        </kendo-numerictextbox>
    </div>
    ```
    {% endif %}

1. Specify the name of the created view (for example, **CustomPopupEditor**) in the [`TemplateName()`](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#templatenamesystemstring) option in the `Editable()` configuration:

    ```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("CustomPopupEditor"))
        // Other configuration.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <editable mode="popup" template-view="@Html.Partial("~/Views/Shared/EditorTemplates/CustomPopupEditor.cshtml")"/>
        <!--Other configuration-->
    </kendo-grid>
    ```
    {% endif %}

{% if site.core %}
For the complete example, refer to the [ASP.NET Core sample application](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/CustomPopUpEditor.cshtml) in the [UI for ASP.NET Core Examples repository](https://github.com/telerik/ui-for-aspnet-core-examples).
{% else %}
For the complete example, refer to the [ASP.NET MVC sample application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingCustomPopupEditor) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples).
{% endif %}

{% if site.core %}
## Using DateOnly and TimeOnly properties with .NET 6

`DateOnly` and `TimeOnly` types were introduced with .NET 6, however serialization and model binding support were introduced by the framework at a later stage.

In order to edit `DateOnly` or `TimeOnly` properties when using a Grid configured for PopUp editing in a .NET 6 application you will need to provide a custom PopUp editor template where editors for these properties are defined:
```C# OrderViewModel.cs
    public class OrderViewModel
    {
        public int OrderID { get; set; }

        public DateOnly ShipDate { get; set; }
    }
```
```Razor CustomEditorTemplate.cshtml
    @model OrderViewModel

    <div>
        @Html.LabelFor(model => model.OrderID)
        @Html.EditorFor(model => model.OrderID)
    </div>
    <div>
        @Html.LabelFor(model => model.ShipDate)
        @Html.Kendo().DatePickerFor(model => model.ShipDate)
    </div>
```
```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("CustomEditorTemplate"))
    )
```
{% endif%}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Popup Editing by the Grid for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}* [Server-Side TagHelper API](/api/taghelpers/grid){% endif %}
