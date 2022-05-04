---
title: Enable ForeignKey Column Sorting by Text
page_title: ForeignKey Column Sorting by Text
description: "An example on how to enable ForeignKey column sorting by text in the Telerik UI Grid for {{ site.framework }}."
slug: howto_enable_foreignkey_sotringby_text_grid
tags: grid, enable, foreignkey, column, sort, text
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik {{ site.product_short }} Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

How can I enable ForeignKey column sorting by text in the {{ site.product }} Grid?

## Solution

The following example demonstrates how to enable the sort-by-text functionality in a ForeignKey column by using a calculated field in a Grid.

* Create an additional text field that will be used for sorting in the ViewModel of the Grid.
```
    public class ProductViewModel
    {
        public string CategoryName
        { 
            get; 
            set; 
        }
    }
```

* Prepopulate the data for the Foreign Key column within the controller.
```
    public class GridController : Controller
    {
        public IActionResult Index()
        {
            ViewData["categories"] = GetCategories();
            return View();
        }
    }
```

* Create a dictionary of key-value pairs using the prepopulated data.
```
    <script type="text/javascript">
        var categories= @Html.Raw(Json.Serialize(@ViewData["categories"])); //serialize the data
    
        //create dictionary of text-values for the FKC
        var categoriesDict = {};
        for (var i = 0; i < categories.length; i++) {
            categoriesDict[categories[i].CategoryID] = categories[i].CategoryName;
        }
    </script>

```
* Bind the additional text field using the [.Bound()](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridColumnFactory?&_ga=2.8632309.1913833702.1649765178-415541100.1638373975#boundsystemlinqexpressionsexpressionsystemfunctt1) configuration option and calculate the field by utilizing the [.ClientTemplate()](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#clienttemplatesystemstring) setting.
```
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.CategoryName).ClientTemplate("#=calculateField(CategoryID)#").EditorTemplateName("CategoryNameEditor");
           
        })
	)


    <script type="text/javascript">
        function calculateField(categoryId){
            return categoriesDict[categoryId];
        }
	</script>
```
* Specify a DropDownList for the text field editor in the **~View/Shared/EditorTemplates** folder and specify the value field with the **data-bind** attribute.
```
    @model ProductViewModel

    @(Html.Kendo().DropDownListFor(m => m.CategoryName)
        .DataValueField("CategoryID")
        .DataTextField("CategoryName")
        .AutoBind(false)
        .HtmlAttributes(new {data_bind="value:CategoryID"})
        .BindTo((System.Collections.IEnumerable)ViewData["categories"])
    )

```

Example:

```Model
     public class ProductViewModel
     {
         public int ProductID
         {
             get;
             set;
         }

         public string ProductName
         {
             get;
             set;
         }

         public decimal UnitPrice
         {
             get;
             set;
         }


         [UIHint("CategoryNameEditor")]
         public string CategoryName
         {
             get;
             set;
         }

         public int? CategoryID { get; set; }
     }
```
```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.CategoryName).ClientTemplate("#=calculateField(CategoryID)#").EditorTemplateName("CategoryNameEditor").Width(200);
                columns.Bound(p => p.UnitPrice).Format("{0:c}").Width(200);
                columns.Command(command => command.Destroy()).Width(150);
            })
            .ToolBar(toolBar =>
            {
                toolBar.Create();
                toolBar.Save();
            })
            .Editable(editable => editable.Mode(GridEditMode.InCell))
            .Pageable()
            .Sortable()
            .Scrollable()
            .HtmlAttributes(new { style = "height:540px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .Batch(true)
                .PageSize(20)
                .ServerOperation(false)
                .Model(model =>
                {
                    model.Id(p => p.ProductID);
                    model.Field(p => p.ProductID).Editable(false);
                })
                .Read(read => read.Action("Products_Read", "Grid"))
                .Update(update => update.Action("Products_Update", "Grid"))
                .Create(create => create.Action("Products_Create", "Grid"))
                .Destroy(destroy => destroy.Action("Products_Destroy", "Grid"))
            )
    )
```
```Controller
    public class GridController : Controller
    {
        public IActionResult Index()
        {
            ViewData["categories"] = GetCategories();
            return View();
        }
        public IEnumerable<CategoryViewModel> GetCategories()
        {
            var firms = Enumerable.Range(1, 10)
               .Select(i => new CategoryViewModel
               {
                   CategoryID = i,
                   CategoryName = "CategoryName " + i
               }).ToList();
           
            return firms;
        }
        public IActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            IEnumerable<ProductViewModel> products = GetProducts();

            return Json(products.ToDataSourceResult(request));
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            return Enumerable.Range(1, 20)
                .Select(i => new ProductViewModel
                {
                    ProductID = i,
                    ProductName = "ProductName" + i,
                    UnitPrice = 1250.50M,
                    CategoryID = i % 5
                });
        }
    }
```
```CategoryNameEditor.cshtml
    @model ProductViewModel

    @(Html.Kendo().DropDownListFor(m=>m.CategoryName)
        .DataValueField("CategoryID")
        .DataTextField("CategoryName")
        .AutoBind(false)
        .HtmlAttributes(new {data_bind="value:CategoryID"})
        .BindTo((System.Collections.IEnumerable)ViewData["categories"])
    )

```
```JavaScript
    <script type="text/javascript">
        var categories= @Html.Raw(Json.Serialize(@ViewData["categories"]));
        
        //create dictionary of text-values for the FKC
        var categoriesDict = {};
        for (var i = 0; i < categories.length; i++) {
            console.log(categories[i]);
            categoriesDict[categories[i].CategoryID] = categories[i].CategoryName;
        }
   
        function calculateField(firmId){
            return categoriesDict[firmId];
        }
    </script>
```