---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DropDownTree component for {{ site.framework }}."
previous_url: /helpers/html-helpers/dropdowntree, /helpers/editors/dropdowntree/overview
slug: htmlhelpers_dropdowntree_aspnetcore
position: 0
---

# {{ site.framework }} DropDownTree Overview

{% if site.core %}
The Telerik UI DropDownTree TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DropDownTree widget.
{% else %}
The Telerik UI DropDownTree HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DropDownTree widget.
{% endif %}

The DropDownTree represents an editor of hierarchical data, rendered in a tree-like structure, which provides multiple selection option and custom nodes.

* [Demo page for the DropDownTree HtmlHelper](https://demos.telerik.com/{{ site.platform }}/dropdowntree/index)
{% if site.core %}
* [Demo page for the DropDownTree TagHelper](https://demos.telerik.com/aspnet-core/dropdowntree/tag-helper)
{% endif %}

## Initializing the DropDownTree

The following example demonstrates how to define the DropDownTree.

```HtmlHelper
@(Html.Kendo().DropDownTree()
    .Name("dropdowntree")
    .DataTextField("Name")
    .DataValueField("id")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read_DropDownTreeData", "Home")
        )
    )
)
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree"  style="width: 100%">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_DropDownTreeData", "Home")" />
            </transport>
        </hierarchical-datasource>
    </kendo-dropdowntree>
```
{% endif %}
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

public IActionResult Read_DropDownTreeData(int? id)
{
    var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren
        });

    return Json(result);
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the DropDownTree.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Items(dropdowntree =>
        {
            dropdowntree.Add().Text("My Web Site")
                .SpriteCssClasses("folder")
                .Expanded(true)
                .Items(root =>
                {
                    root.Add().Text("images")
                        .Expanded(true)
                        .SpriteCssClasses("folder")
                        .Items(images =>
                        {
                            images.Add().Text("logo.png")
                                .SpriteCssClasses("image");
                        });

                    root.Add().Text("resources")
                        .Expanded(true)
                        .SpriteCssClasses("folder")
                        .Items(resources =>
                        {
                            resources.Add().Text("pdf")
                                .Expanded(true)
                                .SpriteCssClasses("folder")
                                .Items(pdf =>
                                {
                                    pdf.Add().Text("prices.pdf")
                                        .SpriteCssClasses("pdf");
                                });

                            resources.Add().Text("zip")
                                .SpriteCssClasses("folder");
                        });

                    root.Add().Text("about.html")
                        .SpriteCssClasses("html");

                    root.Add().Text("index.html")
                        .SpriteCssClasses("html");
                });
        })
    )
```
```TagHelper
    <kendo-dropdowntree name="dropdowntree">
        <items>
            <dropdowntree-item expanded="true" text="My Web Site" sprite-css-class="folder">
                <items>
                    <dropdowntree-item expanded="true" text="images" sprite-css-class="folder">
                        <items>
                            <dropdowntree-item text="logo.png" sprite-css-class="image">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
            <dropdowntree-item expanded="true" text="resources" sprite-css-class="folder">
                <items>
                    <dropdowntree-item expanded="true" text="pdf" sprite-css-class="folder">
                        <items>
                            <dropdowntree-item text="prices.pdf" sprite-css-class="pdf">
                            </dropdowntree-item>
                            <dropdowntree-item text="zip" sprite-css-class="folder">
                                <items>
                                    <dropdowntree-item  text="about.html" sprite-css-class="html">
                                    </dropdowntree-item>
                                    <dropdowntree-item text="index.html" sprite-css-class="html">
                                    </dropdowntree-item>
                                </items>
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
        </items>
    </kendo-dropdowntree>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Checkboxes(true)
        .Filter(FilterType.Contains)
        .DataTextField("Name")
        .DataTextField("ID")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "Home")
            )
        )
    )
```
{% endif %}

## Functionality and Features

|Feature|Description|
|-------|-----------|
| [Data binding]({% slug htmlhelpers_dropdowntree_databinding_aspnetcore %}) | The DropDownTree supports different data binding approaches. |
| [Checkboxes]({% slug htmlhelpers_dropdowntree_checkboxes_aspnetcore %}) | You can add checkboxes to the DropDownTree's items.  |
| [Filtering]({% slug htmlhelpers_dropdowntree_filtering_aspnetcore %}) | You are able to filter the displayed DropDownTree items by their text value. |
| [Items]({% slug htmlhelpers_dropdowntree_items_aspnetcore %}) | You can configure different options for the items of the component. |
| [Templates]({% slug htmlhelpers_dropdowntree_templates_aspnetcore %}) | The DropDownTree supports customizing its look through templates. |
| [Accessibility]({% slug accessibility_aspnetcore_dropdowntree %}) | The DropDownTree is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support. |

## Next Steps

* [Getting Started with the DropDownTree]({% slug aspnetcore_dropdowntree_getting_started %})
* [Basic Usage of the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/index)
{% if site.core %}
* [Basic Usage of the DropDownTree TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdowntree/tag-helper)
{% endif %}

## See Also

* [Using the API of the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/api)
* [Knowledge Base Section](/knowledge-base)
