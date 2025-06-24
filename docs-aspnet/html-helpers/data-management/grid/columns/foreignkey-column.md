---
title: ForeignKey Column
page_title: ForeignKey Column
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to set up the ForeignKey column."
slug: foreignkeycolumn_aspnetcore_grid
position: 10
---

# ForeignKey Column

The ForeignKey column functionality of the Telerik UI Grid component for {{ site.framework }} is primarily used for matching the value of a bound property to a desired text field from a collection external to the Grid. It follows the convention of the SQL ForeignKey functionality that links two tables based on a foreign key.

## ForeignKey Coulmn Data Binding

You can supply the foreign values for the columns of the Grid using the following approaches:

* [Binding to a local data collection](#binding-to-local-data)
* [Binding to remote data](#binding-to-remote-data)

### Binding to Local Data

To implement a ForeignKey column in the Grid that binds to a local data collection of items, pass a valid `IEnumerable` collection to the [`ForeignKey()`](/api/kendo.mvc.ui.fluent/gridcolumnfactory#foreignkeysystemlinqexpressionsexpressionsystemcollectionsienumerablesystemstringsystemstring) column configuration.

The example below shows the following ForeignKey column declaration:

* The column binds to the `CategoryID` field.
* The column uses a local `IEnumerable` collection received from the controller through a `ViewData`.
* The model property, which stores the data value field, is `CategoryID`.
* The model property, which stores the data text field, is `CategoryName`.

```Razor HtmlHelper
columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName").Title("Category").Width(200);
```
{% if site.core %}
```Razor TagHelper
<foreign-key-column field="CategoryID" title="Category" width="200"
    values='(System.Collections.IEnumerable)ViewData["categories"]' 
    value-field="CategoryID" 
    text-field="CategoryName">
</foreign-key-column>
```
```C# Controller
public class GridController : Controller
{
    public IActionResult Index()
    {
        ViewData["categories"] = GetCategories();
        return View();
    }

    private IEnumerable<CategoryViewModel> GetCategories()
    {
        using (var dataContext = GetContext())
        {
            var categories = dataContext.Categories
            .Select(c => new CategoryViewModel
            {
                CategoryID = c.CategoryID,
                CategoryName = c.CategoryName
            })
            .OrderBy(e => e.CategoryName);
        }
    }
}
```
{% else %}
```C# Controller
public class GridController : Controller
{
    public ActionResult Index()
    {
        ViewData["categories"] = GetCategories();
        return View();
    }

    private IEnumerable<CategoryViewModel> GetCategories()
    {
        var dataContext = new DemoDBContext();
        var categories = dataContext.Categories
        .Select(c => new CategoryViewModel {
            CategoryID = c.CategoryID,
            CategoryName = c.CategoryName
        })
        .OrderBy(e => e.CategoryName);
    }
}
```
{% endif %}
```C# ForeignKeyModel
public class CategoryViewModel{
    public int CategoryID { get; set; }
    public string CategoryName { get; set; }
}
```

For a live example, visit the [ForeignKey Column Demo of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumn).

### Binding to Remote Data

To bind the Grid column to a remote collection of items, specify a URL to the remote endpoint that returns the data instead of a static collection. It is mandatory to supply the `dataFieldValue` and `dataFieldText` parameters to ensure the column values will bind to the correct foreign key value. 

The example below shows the following [`ForeignKey()`](/api/kendo.mvc.ui.fluent/gridcolumnfactory#foreignkeysystemlinqexpressionsexpressionsystemactionsystemstringsystemstring) column configuration:

* The column binds to the `CategoryID` field.
* The column uses a DataSource, which requests the data from the `Categories` action method on the server.
* The model property, which stores the data value field, is `CategoryID`.
* The model property, which stores the data text field, is `CategoryName`.

```Razor HtmlHelper
    columns.ForeignKey(p => p.CategoryID, ds => ds.Read(r => r.Action("Categories", "Grid")), "CategoryID", "CategoryName").Title("Category").Width(200);
```
{% if site.core %}
```Razor TagHelper
    <foreign-key-column field="CategoryID" title="Category" width="200" 
    value-field="CategoryID" 
    text-field="CategoryName">
        <datasource>
            <transport>
                <read url="@Url.Action("Categories", "Grid")"/>
            </transport>
        </datasource>
    </foreign-key-column>
```
```C# GridController.cs
public class GridController : Controller
{
    public JsonResult Categories()
    {
        IEnumerable<CategoryViewModel> categories;
        using (var dataContext = new GetContext())
        {
            categories = dataContext.Categories
            .Select(c => new CategoryViewModel
            {
                CategoryID = c.CategoryID,
                CategoryName = c.CategoryName
            })
            .OrderBy(e => e.CategoryName).ToList();
        }
        return Json(categories);
    }
}
```
{% else %}
```C# GridController.cs
public class GridController : Controller
{
    public JsonResult Categories()
    {
        var dataContext = new DemoDBContext();
        var categories = dataContext.Categories
        .Select(c => new CategoryViewModel
        {
            CategoryID = c.CategoryID,
            CategoryName = c.CategoryName
        })
        .OrderBy(e => e.CategoryName);

        return Json(categories, JsonRequestBehavior.AllowGet);
    }
}
```
{% endif %}
```C# ForeignKeyModel
    public class CategoryViewModel{
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
    }
```

For a live example, visit the [ForeignKey Column Binding Demo of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumnbinding).

## ForeignKey Column Editor

The ForeignKey column supports a [built-in DropDownList editor](#default-editor) and a [custom editor](#custom-editor).

### Default Editor

By design, when the Grid is editable and contains a ForeignKey column, it builds an internal DropDownList editor template **GridForeignKey** located in the `~/Views/Shared/EditorTemplates/` folder. 

```GridForeignKey.cshtml
@model object

@(
 Html.Kendo().DropDownListFor(m => m)
    .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
    .HtmlAttributes(new { title = Html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName("")})
)
```

To enable the default **GridForeignKey** editor when the Grid is set up for [Popup]({% slug popupediting_grid_aspnetcore %}) editing, decorate the model property bound in the ForeignKey column with the `UIHint` data attribute and specify the name of the view that contains the default editor (**GridForeignKey**):

```C# GridModel
public class ProductViewModel
{
    public int ProductID { get; set; }
    [UIHint("GridForeignKey")]
    public int CategoryID { get; set; }
}
```
```Razor GridForeignKey.cshtml
@model object

@(
 Html.Kendo().DropDownListFor(m => m)
    .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
    .HtmlAttributes(new { title = Html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName("")})
)
```
```Razor HtmlHelper
columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName").Title("Category").Width(200);
```
{% if site.core %}
```Razor TagHelper
<foreign-key-column field="CategoryID" title="Category" width="200"
    values='(System.Collections.IEnumerable)ViewData["categories"]' 
    value-field="CategoryID" 
    text-field="CategoryName">
</foreign-key-column>
```
{% endif %}

When the Grid is set up for [Inline]({% slug inlineediting_grid_aspnetcore %}) or [InCell]({% slug batchediting_grid_aspnetcore %}) editing, the default ForeignKey column editor activates automatically when the row or cell enters edit mode.

### Custom Editor

To use a custom editor for the ForeignKey column, use the [`ForeignKey()` overload](/api/kendo.mvc.ui.fluent/gridcolumnfactory#foreignkeysystemlinqexpressionsexpressionsystemactionsystemstringsystemstringsystemboolean) and set its `useServerEditor` argument to `true` to indicate that a custom editor must be used.

> To use a custom editor for the ForeignKey column in HtmlHelper Grid, it is required to [configure the column for remote data-binding](#binding-to-remote-data).

The following example shows how to create a custom editor for a ForeignKey column in an editable HtmlHelper Grid:

1. Define a ForeignKey column in the Grid by using the [remote data-binding approach](#binding-to-remote-data) and set the last argument to `true`:

    ```HtmlHelper
    columns.ForeignKey(p => p.ProductId, ds => ds.Read(r => r.Action("GetProducts", "Home")), "ProductId", "ProductName", true);
    ```

1. Add a view that contains the desired editor in the `~/Views/Shared/EditorTemplates/` folder:

    ```Razor CustomFKeyEditor.cshtml
    @model object

    @(Html.Kendo().DropDownListFor(m => m)
        .Filter("contains")
        .DataTextField("ProductName")
        .DataValueField("ProductId")
        .DataSource(d => d.Read(r => r.Action("GetProducts", "Home")).ServerFiltering(false))
    )
    ```
    {% if site.core %}
    ```C# HomeController.cs
    public JsonResult GetProducts()
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName
            });
            return Json(products.ToList());
        }
    }
    ```
    {% else %}
    ```C# HomeController.cs
    public JsonResult GetProducts()
    {
        var northwind = new DemoDBContext();
        var products = northwind.Products.Select(product => new ProductViewModel
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName
        });
        return Json(products, JsonRequestBehavior.AllowGet);
    }
    ```
    {% endif %}
    ```C# ForeignKeyModel
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
    ```

1. If the Grid is set up for InCell or Popup editing, decorate the `ProductId` property with the `UIHint` data attribute and specify the name of the view that contains the custom editor (**CustomFKeyEditor**). If the Grid is configured for Inline editing, use the [`EditorTemplateName()`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#editortemplatenamesystemstring) option to specify the custom editor.

    ```C# InCell_Popup_editing
    public class GridViewModel
    {
        [UIHint("CustomFKeyEditor")]
        public int ProductId { get; set; }
    }
    ```
    ```Razor Inline_editing
    columns.ForeignKey(p => p.ProductId, ds => ds.Read(r => r.Action("GetProducts", "Home")), "ProductId", "ProductName", true).EditorTemplateName("CustomFKeyEditor");
    ```

1. Specify the default value for the ForeignKey field in the `Model()` configuration of the DataSource. It will be used when adding a new record to the Grid.

    ```HtmlHelper
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                model.Id(p => p.Id);
                model.Field(p => p.Id).Editable(false);
                model.Field(p => p.ProductId).DefaultValue(1);
            })
            // Additional configuration.
        )
    ```

{% if site.core %}
When using TagHelper Grid, the custom editor can be initialized with jQuery by specifying the name of the JavaScript function that creates the editor in the `editor` attribute.

```Razor TagHelper
<foreign-key-column field="ProductId" value-field="ProductId" text-field="ProductName" values='(System.Collections.IEnumerable)ViewData["products"]' editor="customFKeyEditor">
</foreign-key-column>
```
```JS Scripts
function customFKeyEditor(container, options) {
    $('<input required name="ProductId" class="myCustomEditor">')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            dataSource: {
                transport: {
                    read: '@Url.Action("GetProducts","Home")'
                }
            }
        });
}
```
{% endif%}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Foreign Key Column Local Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumn)
* [Foreign Key Column Remote Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumnbinding)
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}* [Server-Side TagHelper API](/api/taghelpers/grid){% endif %}
