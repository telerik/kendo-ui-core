---
title: Templates
page_title: Templates
description: "Learn how to configure the template options when working with the Telerik UI TreeView for {{ site.framework }}."
slug: htmlhelpers_treeview_templates_aspnetcore
position: 6
---

# Templates

The Telerik UI for {{ site.framework }} TreeView provides options to customize the appearance of its hierarchical data and the associated checkbox for a given node.

## Node Template

To customize the appearance of the nodes, use the `Template()` configuration method. The available template field for you to use is `item`, which represents the data item of the current node.

The following example demonstrates how to display custom text for a given TreeView node.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Template("(#= item.id #) #= item.text # ")  
        .CheckboxTemplate("<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "TreeView"));
        })    
    )
```
{% if site.core %}
```TagHelper
    <kendo-treeview template="(#= item.id #) #= item.text #" name="treeview">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Read_TemplateData", "TreeView")" />
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
```
{% endif %}



## CheckBox Template

To customize the appearance of the TreeView checkboxes, use the `CheckboxTemplate()` configuration method.

The component supports the following template fields:

* `item`&mdash;The data item of the given node.
* `treeview`&mdash;The TreeView options.

The following example demonstrates how to display a custom checkbox for each of the TreeView nodes.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .CheckboxTemplate("<input type='checkbox' class='k-checkbox k-checkbox-md' name='checkedFiles[#= item.id #]' value='true' />")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "TreeView"));
        })    
    )
```

{% if site.core %}
```TagHelper
    <kendo-treeview  name="treeview">
        <checkboxes template="<input type='checkbox' class='k-checkbox k-checkbox-md' name='checkedFiles[#= item.id #]' value='true' />" />
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Read_TemplateData", "TreeView")" />
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
```
{% endif %}

## See Also

* [Templates of the {{ site.product }} TreeView (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/templates)
* [Server-Side API Reference of the TreeView for {{ site.product }}](/api/treeview)
* [Client-Side API Reference of the TreeView for {{ site.product }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
