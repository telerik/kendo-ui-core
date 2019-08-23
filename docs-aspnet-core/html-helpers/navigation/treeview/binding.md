---
title: Data Binding
page_title: Data Binding | Telerik UI TreeView HtmlHelper for ASP.NET Core
description: "Learn the binding options for the Telerik UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_binding_aspnetcore
position: 2
---

# TreeView Binding

The TreeView HTML helper provides support for declaratively defining its items and for local (on the server) and remote (using a `DataSource` configuration object) binding.

## Declaring TreeView Items

The TreeView allows you to declare all its items within the HTML helper declaration.

The following example demonstrates how to configure a TreeView with three levels of hierarchy.

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Items(treeview =>
        {
            treeview.Add().Text("My Web Site")
                .Items(root =>
                {
                    root.Add().Text("images")
                        .Items(images =>
                        {
                            images.Add().Text("logo.png");
                            images.Add().Text("body-back.png");
                        });
                    root.Add().Text("about.html");
                    root.Add().Text("contacts.html");
                });
        })
    )

## Local Data Binding

You can bind the TreeView locally on the server by passing the appropriate collection to the HTML helper `BindTo()` method.

```Razor
@(Html.Kendo().TreeView()
    .Name("treeview-left")
    .BindTo((IEnumerable<TreeViewItemModel>)ViewBag.treeData)
)
```
```Controller
public ActionResult Local_Data_Binding()
{
    ViewBag.treeData = GetData();

    return View();
}

private IEnumerable<TreeViewItemModel> GetData()
{
    List<TreeViewItemModel> inline = new List<TreeViewItemModel>
    {
        new TreeViewItemModel
        {
            Text = "Furniture",
            Items = new List<TreeViewItemModel>
            {
                new TreeViewItemModel()
                {
                    Text = "Tables & Chairs"
                },
                new TreeViewItemModel
                {
                    Text = "Sofas"
                },
                new TreeViewItemModel
                {
                    Text = "Occasional Furniture"
                }
            }
        },
        new TreeViewItemModel
        {
            Text = "Decor",
            Items = new List<TreeViewItemModel>
            {
                new TreeViewItemModel()
                {
                    Text = "Bed Linen"
                },
                new TreeViewItemModel
                {
                    Text = "Curtains & Blinds"
                },
                new TreeViewItemModel
                {
                    Text = "Carpets"
                }
            }
        }
    };

    return inline;
}
```

## Remote Data Binding

The TreeView provides support for remote data binding by using a `DataSource` configuration object.

```Razor
@(Html.Kendo().TreeView()
    .Name("treeview")
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read_TreeViewData", "TreeView")
        )
    )
)
```
```Controller
public static IList<HierarchicalViewModel> GetHierarchicalData()
{
    var result = new List<HierarchicalViewModel>()
    {
        new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item" }
    };

    return result;
}

public IActionResult Read_TreeViewData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            expanded = item.Expanded,
            imageUrl = item.ImageUrl,
            hasChildren = item.HasChildren
        });

    return Json(result);
}
```

## See Also

* [Local Data Binding by the TreeView HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/local-data-binding)
* [Remote Data Binding by the TreeView HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/remote-data-binding)
* [Server-Side API](/api/treeview)
