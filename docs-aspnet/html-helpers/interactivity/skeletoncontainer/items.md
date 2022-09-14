---
title: Items
page_title: Items
description: "Learn how to configure the items in the SkeletonContaienr components for {{ site.framework }}."
slug: htmlhelpers_skeletoncontainer_aspnetcore_items
position: 2
---

# Items

The Telerik UI SkeletonContainer component for {{ site.framework }} uses the default [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) layout as a base. Each cell or group of cells from the CSS Grid can be represented by an item from the SkeletonContainer.

Each item contains the following properties:

*   `ColStart` - indicates the starting column of the item.
*   `ColSpan` - indicates how many columns the item will occupy.
*   `CowStart` - indicates the starting row of the item.
*   `RowSpan` - indicates how many rows the item will occupy
*   `Shape` - the type of shape that will fill the selected cells.

The following example shows how to create a SkeletonContainer using a grid featuring all shape types:

```HtmlHelper
    @(Html.Kendo().SkeletonContainer()
        .Name("skeleton")
        .Height("340px")
        .Width("350px")
        .Animation(SkeletonContainerAnimation.Pulse)
        .Grid(g=> {
            g.Rows(20);
            g.Columns(20);
            g.Items(i=> {
                i.Add().ColStart(2).ColSpan(4).RowStart(2).RowSpan(4).Shape(SkeletonContainerItemShape.Circle);
                i.Add().ColStart(7).ColSpan(13).RowStart(2).RowSpan(2).Shape(SkeletonContainerItemShape.Text);
                i.Add().ColStart(7).ColSpan(9).RowStart(4).RowSpan(2).Shape(SkeletonContainerItemShape.Text);
                i.Add().ColStart(1).ColSpan(20).RowStart(7).RowSpan(11).Shape(SkeletonContainerItemShape.Rectangle);
                i.Add().ColStart(2).ColSpan(18).RowStart(19).RowSpan(1).Shape(SkeletonContainerItemShape.Text);
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-skeletoncontainer name="skeleton" 
                             height="340" 
                             width="350" 
                             animation="SkeletonContainerAnimation.Pulse">
        <grid rows="20" columns="20">
            <items>
                <item col-start="2"
                      col-span="4"
                      row-start="2"
                      row-span="4"
                      shape="SkeletonContainerItemShape.Circle">
                </item>
                <item col-start="7"
                      col-span="13"
                      row-start="2"
                      row-span="2"
                      shape="SkeletonContainerItemShape.Text">
                </item>
                <item col-start="7"
                      col-span="9"
                      row-start="4"
                      row-span="2"
                      shape="SkeletonContainerItemShape.Text">
                </item>
                <item col-start="1"
                      col-span="20"
                      row-start="7"
                      row-span="11"
                      shape="SkeletonContainerItemShape.Rectangle">
                </item>
                <item col-start="2"
                      col-span="18"
                      row-start="19"
                      row-span="1"
                      shape="SkeletonContainerItemShape.Text">
                </item>
            </items>
        </grid>
    </kendo-skeletoncontainer>
```
{% endif %}
```CSS
    <style>
        #skeleton {
            border: 1px solid;
            border-color: rgba(0, 0, 0, 0.08);
        }
    </style>    
```

## See Also

* [Overview of the SkeletonContainer (Demo)](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/index)
* [Server-Side API](/api/skeletoncontainer)
