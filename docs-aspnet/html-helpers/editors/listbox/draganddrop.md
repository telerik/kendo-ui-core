---
title: Dragging and Dropping
page_title: Dragging and Dropping
description: "Get started with the {{ site.product }} ListBox and learn how to enable the drag-and-drop functionality."
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
    <kendo-listbox name="listbox" template-id="template" selectable="ListBoxSelectable.Multiple"  datatextfield="ProductName" datavaluefield="ProductID">
            <draggable hint="hint" enabled="true" placeholder="placeholder" />
            <datasource>
                <transport>
                    <read datatype="jsonp" url="https://demos.telerik.com/kendo-ui/service/Products" />
                </transport>
            </datasource>
            <toolbar position="ListBoxToolbarPosition.Right"
                        tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
        </kendo-listbox>

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="background-color:aqua">#=ProductName#</h5>
    </script>

```
{% endif %}

## See Also

* [Dragging and Dropping by the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/drag-and-drop)
* [Server-Side API](/api/listbox)
