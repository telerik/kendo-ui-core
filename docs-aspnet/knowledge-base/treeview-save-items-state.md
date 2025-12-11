---
title: Save the State of TreeView Items
description: Learn how to save the state of the {{ site.product }} TreeView items.
type: how-to
page-title: Save the State of TreeView Items
previous-url: /helpers/navigation/treeview/how-to/save-items-state, /html-helpers/navigation/treeview/how-to/save-items-state
slug: treeview-save-items-state
tags: save, treeview, item, state
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TreeView</td>
 </tr>
  <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I save the expanded and checked state of the TreeView items on the server and preserve it the next time the data is loaded?

## Solution

1. Define a TreeView that binds to remote data and handle its [`Change`](/api/kendo.mvc.ui.fluent/treevieweventbuilder#changesystemstring) event.

```HtmlHelper
@(Html.Kendo().TreeView()
    .Name("treeview")
    .Checkboxes(true)
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Read", "Home")
        )
        .Model(model =>
        {
            model.Id("ID");
            model.HasChildren("HasChildren");
        })
        .Events(events => events.Change("OnChange"))
    )
)
```
{% if site.core %}
```TagHelper
<kendo-treeview datatextfield="name" name="treeview" on-change="OnChange">
    <hierarchical-datasource>
        <schema>
            <hierarchical-model id="ID" children="HasChildren"></hierarchical-model>
        </schema>
        <transport>
            <read url="@Url.Action("Read", "Home")" />
        </transport>
    </hierarchical-datasource>
    <checkboxes enabled="true"/>
</kendo-treeview>
```
{% endif %}
```JS
function OnChange(e) {
        if (e.action == "itemchange") {
            var item = e.items[0];
            $.post('@Url.Action("Save", "Home")', { // Submit an AJAX request to the server and send the current state of the selected item.
                id: item.id,
                isChecked: item.checked,
                expanded: item.expanded
            });
        }

}
```
```Controller
public void Save(int id, bool isChecked, bool expanded)
{
    UpdateModel(data.First(v => v.ID == id));
}
```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/TreeViewSaveItemState) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} TreeView Resources

* [{{ site.framework }} TreeView Documentation]({%slug htmlhelpers_treeview_aspnetcore%})

* [{{ site.framework }} TreeView Demos](https://demos.telerik.com/{{ site.platform }}/treeview)

{% if site.core %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-core-ui/treeview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-mvc/panelbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [Server-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treeview)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)