---
title: Dragging and Dropping
page_title: Dragging and Dropping
description: "Get started with the {{ site.product }} ListBox and learn how to enable the drag-and-drop functionality."
components: ["listbox"]
previous_url: /helpers/editors/listbox/draganddrop
slug: htmlhelpers_listbox_draganddrop_aspnetcore
position: 4
---

# Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, call its `Draggable()` method with `true` as a parameter.

You can also customize the drag-and-drop appearance of the ListBox by using its `Draggable.Placeholder` and `Draggable.Hint` options.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("listbox1")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .Draggable(true) // Enable drag and drop
        .DropSources("listbox2") // Specify the drop target
        .Events(ev=>ev
            .Add("function(e){setDiscontinued(e, true)}")
            .Remove("function(e){setDiscontinued(e, false)}"))
        .ConnectWith("listbox2")
        .BindTo(new List<string>())
        .Selectable(ListBoxSelectable.Single)
    )

    @(Html.Kendo().ListBox()
        .Name("listbox2")
        .Draggable(true)
        .DropSources("listbox1")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .ConnectWith("listbox1")
        .BindTo(new List<string>())
        .Selectable(ListBoxSelectable.Single)
    )
```
{% if site.core %}
```TagHelper

    @{
    var dropSources1 = new string[]{ "listbox2" };
    var products1 = new List<string>();

    var dropSources2 = new string[]{ "listbox1" };
    var products2 = new List<string>();
    }

    <kendo-listbox name="listbox1"
                    datavaluefield="ProductID"
                    datatextfield="ProductName"
                    drop-sources="dropSources1"
                    on-add="function(e){setDiscontinued(e, true)}"
                    on-remove="function(e){setDiscontinued(e, false)}"
                    connect-with="listbox2"
                    bind-to="products1"
                    selectable="ListBoxSelectable.Single">
        <draggable enabled="true" />
    </kendo-listbox>

    <kendo-listbox name="listbox2"
                    drop-sources="dropSources2"
                    datavaluefield="ProductID"
                    datatextfield="ProductName"
                    connect-with="listbox1"
                    bind-to="products2"
                    selectable="ListBoxSelectable.Single">
        <draggable enabled="true" />
    </kendo-listbox>

```
{% endif %}

## See Also

* [Dragging and Dropping by the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/drag-and-drop)
* [Server-Side API](/api/listbox)
