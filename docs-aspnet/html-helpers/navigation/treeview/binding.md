---
title: Data Binding
page_title: Data Binding
description: "Learn the binding options for the Telerik UI TreeView component for {{ site.framework }}."
previous_url: /helpers/navigation/treeview/ajax-binding
slug: htmlhelpers_treeview_binding_aspnetcore
position: 2
---

# TreeView Binding

The TreeView provides support for declaratively defining its items and for local (on the server) and remote (using a `DataSource` configuration object) binding.

> Do not use the names of the [`kendo.data.Node` fields and methods](https://docs.telerik.com/kendo-ui/api/javascript/data/node) (for example, `children`) as fields in the TreeView data.

## Declaring TreeView Items

The TreeView allows you to declare all its items within the helper declaration.

The following example demonstrates how to configure a TreeView with three levels of hierarchy.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" load-on-demand="true" name="treeview">
        <items>
            <treeview-item expanded="true" text="My Web Site">
                <items>
                    <treeview-item expanded="true"  text="images">
                        <items>
                            <treeview-item text="logo.png">
                            </treeview-item>
                            <treeview-item text="body-back.png">
                            </treeview-item>
                        </items>
                    </treeview-item>
                    <treeview-item text="about.html" >
                    </treeview-item>
                    <treeview-item text="contacts.html" >
                    </treeview-item>
                </items>
            </treeview-item>
        </items>
    </kendo-treeview>
```
{% endif %}

## Local Data Binding

You can bind the TreeView locally on the server by passing the appropriate collection to the HTML helper `BindTo()` method.

```HtmlHelper
@(Html.Kendo().TreeView()
    .Name("treeview-left")
    .BindTo((IEnumerable<TreeViewItemModel>)ViewBag.treeData)
)
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview-left" bind-to="(IEnumerable<TreeViewItemBase>)ViewBag.inlineDefault">
    </kendo-treeview>
```
{% endif %}
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

The TreeView provides support for remote data binding by using a [`DataSource`]({% slug htmlhelpers_datasource_aspnetcore %}) configuration object.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Read_TreeViewData", "TreeView")"/>
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
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
{% else %}
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

public ActionResult Read_TreeViewData(int? id)
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

    return Json(result, JsonRequestBehavior.AllowGet);
}
```
{% endif %}



By default, the TreeView sends to the remote endpoint the `id` of the expanded node. To [send additional data]({% slug htmlhelpers_datasource_aspnetcore %}#pass-additional-data-to-action-methods) use the DataSource `Data` method and provide the name of a JavaScript function which will return a JavaScript object with the additional data.

{% if site.core %}
## Razor Pages

In order to set up the TreeView component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper(csthml)
@(Html.Kendo().TreeView()
    .Name("treeview")
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(r => r.Url(Url.Page("TreeViewIndex", "TreeViewRead")))
    )
)
```
```tab-TagHelper(cshtml)
    <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Page("TreeViewIndex", "TreeViewRead")"/>
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
```
```tab-PageModel(cshtml.cs)
    public JsonResult OnGetTreeViewRead(int? id)
    {
        var data = result.Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
            .Select(item => new {
                id = item.ID,
                Name = item.Name,
                hasChildren = item.HasChildren
            });

        return new JsonResult(data);
    }
```
{% endif %}

## See Also

* [Local Data Binding by the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/local-data-binding)
* [Remote Data Binding by the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/remote-data-binding)
* [Server-Side API](/api/treeview)
