---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI TreeView for {{ site.framework }}."
slug: appearance_treeview
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the {{ site.product }} TreeView.

For a live example, refer to the [Appearance Demo of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/appearance).

## Size

The `Size` option controls the overall size of the TreeView. The `k-treeview-{size}` class, which is applied to the wrapping div element of the TreeView, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-treeview-sm` class to the wrapping div element)
- `Medium`—medium size (applies the `k-treeview-md` class to the wrapping div element)
- `Large`—large size (applies the `k-treeview-lg` class to the wrapping div element)
- `None`—unset.

The default size value is `Medium`.

The example below shows a basic TreeView configuration and how to set `Size` to `Large`:

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Size(ComponentSize.Large)
        .Items(items =>
        {
            items.Add().Text("Item 1").Expanded(true)
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 1.1");
                    subItems.Add().Text("Item 1.2");
                    subItems.Add().Text("Item 1.3");
                });
            items.Add().Text("Item 2")
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 2.1");
                    subItems.Add().Text("Item 2.2");
                    subItems.Add().Text("Item 2.3");
                });
            items.Add().Text("Item 3");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview" size="ComponentSize.Large">
        <items>
            <treeview-item expanded="true" text="Item 1">
                <items>
                    <treeview-item text="Item 1.1"></treeview-item>
                    <treeview-item text="Item 1.2"></treeview-item>
                    <treeview-item text="Item 1.3"></treeview-item>
                </items>
            </treeview-item>
            <treeview-item text="Item 2">
                <items>
                    <treeview-item text="Item 2.1"></treeview-item>
                    <treeview-item text="Item 2.2"></treeview-item>
                    <treeview-item text="Item 2.3"></treeview-item>
                </items>
            </treeview-item>
            <treeview-item text="Item 3"></treeview-item>
        </items>
    </kendo-treeview>
```
{% endif %}

Below is the HTML that is affected by the `Size` option. The changes are applied to the `div.k-treeview` wrapping element:

```html
<div id="treeview" data-role="treeview" class="k-treeview k-treeview-lg" tabindex="0" aria-busy="false">
    ...
</div>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/appearance)
