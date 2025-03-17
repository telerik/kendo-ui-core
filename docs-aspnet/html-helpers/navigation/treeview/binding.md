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
```TreeViewItemModel
public class TreeViewItemViewModel
{
	public string Id { get; set; }
    public bool Expanded { get; set; }
    public bool Encoded { get; set; }
    public string Text { get; set; }
    public string SpriteCssClass { get; set; }
    public string Url { get; set; }
    public string ImageUrl { get; set; }
    public bool HasChildren { get; set; }
    public bool Checked { get; set; }
    public List<TreeViewItemModel> Items { get; set; }
    public IDictionary<string, string> HtmlAttributes { get; set; }
    public IDictionary<string, string> ImageHtmlAttributes { get; set; }
    public IDictionary<string, string> LinkHtmlAttributes { get; set; }
	public bool Selected { get; set; }
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
        new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 2, ParentID = 1, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 3, ParentID = 1, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 4, ParentID = 2, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 5, ParentID = 2, HasChildren = false, Name = "Item" }
    };

    return result;
}

public IActionResult Read_TreeViewData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
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
        new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 2, ParentID = 1, HasChildren = true, Name = "Parent item" },
        new HierarchicalViewModel() { ID = 3, ParentID = 1, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 4, ParentID = 2, HasChildren = false, Name = "Item" },
        new HierarchicalViewModel() { ID = 5, ParentID = 2, HasChildren = false, Name = "Item" }
    };

    return result;
}

public ActionResult Read_TreeViewData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
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


```HierarchicalViewModel
public class HierarchicalViewModel
{
	public int ID { get; set; }
	public int? ParentID { get; set; }
    public bool HasChildren { get; set; }
    public string Name { get; set; }
    public bool Expanded { get; set; }
    public string ImageUrl { get; set; }
}
```

By default, the TreeView sends to the remote endpoint the `id` of the expanded node. To [send additional data]({% slug htmlhelpers_datasource_aspnetcore %}#pass-additional-data-to-action-methods) use the DataSource `Data` method and provide the name of a JavaScript function which will return a JavaScript object with the additional data.

## See Also

* [Local Data Binding by the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/local-data-binding)
* [Remote Data Binding by the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/remote-data-binding)
{% if site.core %}
* [TreeView in Razor Pages]({% slug htmlhelpers_pager_razorpage_aspnetcore %})
{% endif %}
* [Server-Side API](/api/treeview)
