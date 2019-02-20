---
title: Binding
page_title: TreeView Binding | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the binding options for the Kendo UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_binding_aspnetcore
position: 2
---

# TreeView Binding

The TreeView HTML helper provides support for declarative definition of its items, local (on the server) and remote (using a DataSource configuration object) binding.

## Declare TreeView Items

The TreeView widget allows you to declare all its items within the HTML helper declaration. Here you will find a small sample configuring a TreeView widget with three levels of hierarchy:

###### Example

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

## TreeView Local Binding

The TreeView could be bound locally (on the server) by passing appropriate collection to the HTML helper `BindTo()` method:

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

## TreeView Remote Binding

The TheeView also provides support for remote binding using a `DataSource` configuration object:

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

* [Overview of TreeView HTML Helper]({% slug htmlhelpers_treeview_aspnetcore %})
* [Drag and Drop Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_drag_drop_aspnetcore %})
* [TreeView HTML Helper Item Properties]({% slug htmlhelpers_treeview_items_aspnetcore %})
* [Checkboxes Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_checkboxes_aspnetcore %})
