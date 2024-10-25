---
title: ForeignKey Column
page_title: ForeignKey Column
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to set up the ForeignKey column."
slug: foreignkeycolumn_aspnetcore_grid
position: 10
---

# ForeignKey Column

The ForeignKey column functionality of the Telerik UI Grid component for {{ site.framework }} is primarily used for matching the value of a bound property to a desired text field from an external for the grid collection. It follows the convention of the SQL ForeignKey functionality that is used for linking two tables based on a foreign key.

The foreign values for the columns of the grid could be supplied in two ways:

* [Binding to a local collection](#binding-to-a-local-collection)
* [Binding to a remote collection](#binding-to-a-remote-collection)

## Binding to a Local Collection

Binding the column to a local collection of items can be done by passing a valid IEnumerable collection to the ForeignKey column configuration

```HtmlHelper
    columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName")
            .Title("Category").Width(200);
```
{% if site.core %}
```TagHelper
<foreign-key-column field="CategoryID" title="Category" width="150"
            values='(System.Collections.IEnumerable)ViewData["categories"]' 
            value-field="CategoryID" 
            text-field="CategoryName">
        </foreign-key-column>
```
{% endif %}
```Controller
    public class GridController : Controller
    {
        public ActionResult Index()
        {
            ViewData["categories"] = GetCategories();
            return View();
        }
    }
```
```ForeignKeyModel
    public class CategoryViewModel{
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
    }
```

## Binding to a Remote Collection

In order to bind the column to a remote collection of items, supply a URL Action instead of a static collection. It is mandatory to supply the DataValueField and DataTextField options in order to ensure that the column values will be bound to the correct foreign value. 

```HtmlHelper
    columns.ForeignKey(p => p.CategoryID, ds=> ds.Read(r => r.Action("Categories", "Grid")), "CategoryID", "CategoryName")
            .Title("Category").Width(200);
```
{% if site.core %}
```TagHelper
    <foreign-key-column field="CategoryID" title="Category" width="200" value-field="CategoryID" text-field="CategoryName">
        <datasource>
            <transport>
                <read url="/grid/categories"/>
            </transport>
        </datasource>
    </foreign-key-column>
```
```Controller
    public class GridController : Controller
    {
        public ActionResult Categories()
        {
            IEnumerable<CategoryViewModel> categories;
            using (var dataContext = new SampleEntitiesDataContext())
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
```Controller
    public class GridController : Controller
    {
        public ActionResult Categories()
        {
            IEnumerable<CategoryViewModel> categories;
            using (var dataContext = new SampleEntitiesDataContext())
            {
                 categories = dataContext.Categories
                            .Select(c => new CategoryViewModel
                            {
                                CategoryID = c.CategoryID,
                                CategoryName = c.CategoryName
                            })
                            .OrderBy(e => e.CategoryName).ToList();
            }
            return Json(categories, JsonRequestBehavior.AllowGet);
        }
    }
```
{% endif %}

```ForeignKeyModel
    public class CategoryViewModel{
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
    }
```
## See Also

* [Foreign Key Column Local Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumn)
* [Foreign Key Column Remote Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumnbinding)
* [Server-Side API](/api/grid)
